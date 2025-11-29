import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import { getChatRooms, getChatMessages } from '../Apis/chatApi';

interface Message {
  id: string;
  type: 'notice' | 'me' | 'other';
  text: string;
  user?: string;
  chatRoomId: number;
  timestamp: number;
}

interface ChatRoomState {
  messages: Message[];
  hasNextPage: boolean;
  lastMessageId: string | null;
  isLoading: boolean;
}

interface ChatSubscriptionContextType {
  // 채팅방별 메시지 상태
  chatRooms: Map<number, ChatRoomState>;
  // STOMP 클라이언트
  client: Client | null;
  // 연결 상태
  isConnected: boolean;
  // 메시지 추가
  addMessage: (roomId: number, message: Message) => void;
  // 이전 메시지 로드
  loadPreviousMessages: (roomId: number) => Promise<void>;
  // 채팅방 구독
  subscribeToRoom: (roomId: number) => void;
  // 채팅방 구독 해제
  unsubscribeFromRoom: (roomId: number) => void;
  // 메시지 전송
  sendMessage: (roomId: number, content: string) => void;
  // 채팅방 입장
  enterRoom: (roomId: number) => void;
  // 채팅방 퇴장
  leaveRoom: (roomId: number) => void;
}

const ChatSubscriptionContext = createContext<ChatSubscriptionContextType | null>(null);

export const useChatSubscription = () => {
  const context = useContext(ChatSubscriptionContext);
  if (!context) {
    throw new Error('useChatSubscription must be used within a ChatSubscriptionProvider');
  }
  return context;
};

interface ChatSubscriptionProviderProps {
  children: React.ReactNode;
}

export const ChatSubscriptionProvider: React.FC<ChatSubscriptionProviderProps> = ({ children }) => {
  const [chatRooms, setChatRooms] = useState<Map<number, ChatRoomState>>(new Map());
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef<Client | null>(null);
  const messageIdCounter = useRef(0);
  const receivedMessages = useRef<Set<string>>(new Set());
  const subscribedRooms = useRef<Set<number>>(new Set());
  const currentUser = {
    id: localStorage.getItem('memberId') || '',
    nickname: localStorage.getItem('nickname') || '',
  };

  // localStorage에서 메시지 복원
  const loadMessagesFromStorage = useCallback(() => {
    if (!currentUser.id) return;
    
    try {
      const storedData = localStorage.getItem(`chatMessages_${currentUser.id}`);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const restoredMap = new Map();
        
        Object.entries(parsedData).forEach(([roomId, state]) => {
          restoredMap.set(parseInt(roomId), state as ChatRoomState);
        });
        
        setChatRooms(restoredMap);
        console.log('Messages restored from localStorage');
      }
    } catch (error) {
      console.error('Failed to load messages from localStorage:', error);
    }
  }, [currentUser.id]);

  // localStorage에 메시지 저장
  const saveMessagesToStorage = useCallback((chatRoomsMap: Map<number, ChatRoomState>) => {
    if (!currentUser.id) return;
    
    try {
      const dataToStore: Record<string, ChatRoomState> = {};
      chatRoomsMap.forEach((state, roomId) => {
        // 최근 100개 메시지만 유지
        const limitedMessages = state.messages.slice(-100);
        dataToStore[roomId.toString()] = {
          ...state,
          messages: limitedMessages,
        };
      });
      
      localStorage.setItem(`chatMessages_${currentUser.id}`, JSON.stringify(dataToStore));
    } catch (error) {
      console.error('Failed to save messages to localStorage:', error);
    }
  }, [currentUser.id]);

  // 고유한 메시지 ID 생성
  const generateMessageId = () => {
    messageIdCounter.current += 1;
    return `${Date.now()}-${messageIdCounter.current}`;
  };

  // 중복 메시지 체크
  const isDuplicateMessage = (payload: any) => {
    const messageKey = `${payload.messageType}-${payload.content}-${payload.timestamp}-${payload.senderId}`;
    if (receivedMessages.current.has(messageKey)) {
      return true;
    }
    receivedMessages.current.add(messageKey);
    return false;
  };

  // 메시지 추가 - 먼저 정의
  const addMessage = useCallback((roomId: number, message: Message) => {
    console.log('Adding message to room', roomId, message);
    setChatRooms(prev => {
      const newMap = new Map(prev);
      const currentState = newMap.get(roomId) || {
        messages: [],
        hasNextPage: true,
        lastMessageId: null,
        isLoading: false,
      };
      
      const updatedState = {
        ...currentState,
        messages: [...currentState.messages, message],
      };
      
      newMap.set(roomId, updatedState);
      
      // localStorage에 저장
      saveMessagesToStorage(newMap);
      
      return newMap;
    });
  }, [saveMessagesToStorage]);

  // 이전 메시지 로드
  const loadPreviousMessages = useCallback(async (roomId: number) => {
    const currentState = chatRooms.get(roomId);
    if (!currentState || !currentState.hasNextPage || currentState.isLoading) return;

    setChatRooms(prev => {
      const newMap = new Map(prev);
      const currentState = newMap.get(roomId);
      if (currentState) {
        newMap.set(roomId, { ...currentState, isLoading: true });
      }
      return newMap;
    });

    try {
      // API 호출 시 size 파라미터 추가 (30개씩 로드)
      const response = await getChatMessages(roomId.toString(), currentState?.lastMessageId || null, 30);
      if (response.isSuccess) {
        const talkMessages = response.result.messages.filter(
          (msg) => msg.messageType === 'TALK'
        );

        const fetchedMessages: Message[] = talkMessages.map((msg) => ({
          id: msg.messageId,
          type: msg.senderId === parseInt(currentUser.id) ? 'me' : 'other',
          text: msg.content,
          user: msg.senderNick,
          chatRoomId: roomId,
          timestamp: new Date(msg.timestamp).getTime(),
        }));

        setChatRooms(prev => {
          const newMap = new Map(prev);
          const currentState = newMap.get(roomId) || {
            messages: [],
            hasNextPage: true,
            lastMessageId: null,
            isLoading: false,
          };
          
          const updatedState = {
            ...currentState,
            messages: [...fetchedMessages.reverse(), ...currentState.messages],
            hasNextPage: response.result.hasNext,
            lastMessageId: response.result.messages.length > 0 
              ? response.result.messages[response.result.messages.length - 1].messageId 
              : currentState.lastMessageId,
            isLoading: false,
          };
          
          newMap.set(roomId, updatedState);
          
          // localStorage에 저장
          saveMessagesToStorage(newMap);
          
          return newMap;
        });
      }
    } catch (error) {
      console.error('Failed to fetch previous messages:', error);
      setChatRooms(prev => {
        const newMap = new Map(prev);
        const currentState = newMap.get(roomId);
        if (currentState) {
          newMap.set(roomId, { ...currentState, isLoading: false });
        }
        return newMap;
      });
    }
  }, [chatRooms, currentUser.id, saveMessagesToStorage]);

  // 채팅방 입장 시 초기 메시지 로드
  const loadInitialMessages = useCallback(async (roomId: number) => {
    const currentState = chatRooms.get(roomId);
    if (currentState && currentState.messages.length > 0) {
      console.log(`Room ${roomId} already has messages, skipping initial load`);
      return;
    }

    setChatRooms(prev => {
      const newMap = new Map(prev);
      const currentState = newMap.get(roomId);
      if (currentState) {
        newMap.set(roomId, { ...currentState, isLoading: true });
      }
      return newMap;
    });

    try {
      // 초기 로드 시 lastId는 null, size는 30
      const response = await getChatMessages(roomId.toString(), null, 30);
      if (response.isSuccess) {
        const talkMessages = response.result.messages.filter(
          (msg) => msg.messageType === 'TALK'
        );

        const fetchedMessages: Message[] = talkMessages.map((msg) => ({
          id: msg.messageId,
          type: msg.senderId === parseInt(currentUser.id) ? 'me' : 'other',
          text: msg.content,
          user: msg.senderNick,
          chatRoomId: roomId,
          timestamp: new Date(msg.timestamp).getTime(),
        }));

        setChatRooms(prev => {
          const newMap = new Map(prev);
          const currentState = newMap.get(roomId) || {
            messages: [],
            hasNextPage: true,
            lastMessageId: null,
            isLoading: false,
          };
          
          const updatedState = {
            ...currentState,
            messages: fetchedMessages.reverse(), // 최신 메시지가 아래에 오도록 역순으로
            hasNextPage: response.result.hasNext,
            lastMessageId: response.result.messages.length > 0 
              ? response.result.messages[response.result.messages.length - 1].messageId 
              : null,
            isLoading: false,
          };
          
          newMap.set(roomId, updatedState);
          
          // localStorage에 저장
          saveMessagesToStorage(newMap);
          
          return newMap;
        });
        
        console.log(`Loaded ${fetchedMessages.length} initial messages for room ${roomId}`);
      }
    } catch (error) {
      console.error('Failed to fetch initial messages:', error);
      setChatRooms(prev => {
        const newMap = new Map(prev);
        const currentState = newMap.get(roomId);
        if (currentState) {
          newMap.set(roomId, { ...currentState, isLoading: false });
        }
        return newMap;
      });
    }
  }, [chatRooms, currentUser.id, saveMessagesToStorage]);

  // STOMP 클라이언트 초기화 - addMessage를 의존성으로 추가
  const initializeClient = useCallback(() => {
    if (clientRef.current) {
      console.log('STOMP client already exists');
      return;
    }

    console.log('Creating new STOMP connection...');
    
    // HTTPS 환경에서는 WebSocket 연결을 시도하지 않음
    if (!import.meta.env.DEV && window.location.protocol === 'https:') {
      console.warn('🚫 HTTPS 환경에서는 HTTP WebSocket이 차단됩니다.');
      console.warn('💬 실시간 채팅 기능이 비활성화됩니다.');
      setIsConnected(false);
      return;
    }
    
    const client = new Client({
      brokerURL: 'ws://3.39.43.178:8080/ws', // 개발환경에서만 사용
      reconnectDelay: 3000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: function (str) {
        console.log('STOMP Debug:', str);
      },
    });

    client.onConnect = () => {
      console.log('STOMP WebSocket connected!');
      setIsConnected(true);
      
      // 이미 구독된 채팅방들에 대해 메시지 수신 구독
      subscribedRooms.current.forEach(roomId => {
        client.subscribe(`/topic/room/${roomId}`, (msg) => {
          const payload = JSON.parse(msg.body);
          console.log('[RECV]', payload);
          
          if (isDuplicateMessage(payload)) {
            console.log('Duplicate message ignored:', payload.content);
            return;
          }
          
          if (payload.messageType === 'TALK') {
            const newMessage: Message = {
              id: generateMessageId(),
              type: payload.senderId === parseInt(currentUser.id) ? 'me' : 'other',
              text: payload.content,
              user: payload.senderNick || '사용자',
              chatRoomId: payload.chatRoomId,
              timestamp: Date.now(),
            };
            addMessage(payload.chatRoomId, newMessage);
          } else if (payload.messageType === 'SYSTEM') {
            const noticeMessage: Message = {
              id: generateMessageId(),
              type: 'notice',
              text: payload.content,
              chatRoomId: payload.chatRoomId,
              timestamp: Date.now(),
            };
            addMessage(payload.chatRoomId, noticeMessage);
          }
        });
        console.log(`Re-subscribed to room ${roomId} after connection`);
      });
    };

    client.onStompError = (frame) => {
      console.error('STOMP error:', frame);
      setIsConnected(false);
    };

    client.onWebSocketError = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    client.onWebSocketClose = () => {
      console.log('WebSocket connection closed');
      setIsConnected(false);
    };

    client.onDisconnect = () => {
      console.log('STOMP disconnected');
      setIsConnected(false);
    };

    client.activate();
    clientRef.current = client;
  }, [currentUser.id, addMessage]);

  // 채팅방 구독
  const subscribeToRoom = useCallback((roomId: number) => {
    if (subscribedRooms.current.has(roomId)) {
      console.log(`Already subscribed to room ${roomId}`);
      return;
    }

    subscribedRooms.current.add(roomId);
    
    // 채팅방 상태 초기화
    setChatRooms(prev => {
      const newMap = new Map(prev);
      if (!newMap.has(roomId)) {
        const newState = {
          messages: [],
          hasNextPage: true,
          lastMessageId: null,
          isLoading: false,
        };
        newMap.set(roomId, newState);
        
        // localStorage에 저장
        saveMessagesToStorage(newMap);
      }
      return newMap;
    });

    // STOMP 클라이언트가 연결되어 있다면 즉시 구독
    if (clientRef.current && isConnected) {
      clientRef.current.subscribe(`/topic/room/${roomId}`, (msg) => {
        const payload = JSON.parse(msg.body);
        console.log('[RECV]', payload);
        
        if (isDuplicateMessage(payload)) {
          console.log('Duplicate message ignored:', payload.content);
          return;
        }
        
        if (payload.messageType === 'TALK') {
          const newMessage: Message = {
            id: generateMessageId(),
            type: payload.senderId === parseInt(currentUser.id) ? 'me' : 'other',
            text: payload.content,
            user: payload.senderNick || '사용자',
            chatRoomId: payload.chatRoomId,
            timestamp: Date.now(),
          };
          addMessage(payload.chatRoomId, newMessage);
        } else if (payload.messageType === 'SYSTEM') {
          const noticeMessage: Message = {
            id: generateMessageId(),
            type: 'notice',
            text: payload.content,
            chatRoomId: payload.chatRoomId,
            timestamp: Date.now(),
          };
          addMessage(payload.chatRoomId, noticeMessage);
        }
      });
      
      console.log(`Subscribed to room ${roomId}`);
    } else {
      console.log(`STOMP not connected yet, will subscribe to room ${roomId} when connected`);
    }

    // 이전 메시지 로드
    loadPreviousMessages(roomId);
    
    // 초기 메시지 로드 (채팅방에 메시지가 없는 경우)
    loadInitialMessages(roomId);
  }, [isConnected, currentUser.id, addMessage, loadPreviousMessages, saveMessagesToStorage, loadInitialMessages]);

  // 채팅방 구독 해제
  const unsubscribeFromRoom = useCallback((roomId: number) => {
    subscribedRooms.current.delete(roomId);
    
    if (clientRef.current && isConnected) {
      // STOMP 구독 해제는 자동으로 처리됨 (컴포넌트 언마운트 시)
    }
  }, [isConnected]);

  // 메시지 전송
  const sendMessage = useCallback((roomId: number, content: string) => {
    if (!isConnected || !clientRef.current) {
      console.log('STOMP connection not ready. Please wait...');
      return;
    }

    try {
      clientRef.current.publish({
        destination: '/app/chat/send',
        headers: { memberId: currentUser.id.toString() },
        body: JSON.stringify({ 
          chatRoomId: roomId, 
          content: content 
        }),
      });
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }, [isConnected, currentUser.id]);

  // 채팅방 입장
  const enterRoom = useCallback((roomId: number) => {
    if (!isConnected || !clientRef.current) {
      console.log('STOMP connection not ready. Please wait...');
      return;
    }

    try {
      clientRef.current.publish({
        destination: '/app/chat/enter',
        headers: { memberId: currentUser.id.toString() },
        body: JSON.stringify({ chatRoomId: roomId }),
      });
    } catch (error) {
      console.error('Failed to enter room:', error);
    }
  }, [isConnected, currentUser.id]);

  // 채팅방 퇴장
  const leaveRoom = useCallback((roomId: number) => {
    if (!isConnected || !clientRef.current) {
      console.log('STOMP connection not ready. Please wait...');
      return;
    }

    try {
      clientRef.current.publish({
        destination: '/app/chat/leave',
        headers: { memberId: currentUser.id.toString() },
        body: JSON.stringify({ chatRoomId: roomId }),
      });
    } catch (error) {
      console.error('Failed to leave room:', error);
    }
  }, [isConnected, currentUser.id]);

  // 로그인 시 모든 참여 채팅방 구독
  useEffect(() => {
    const initializeChatRooms = async () => {
      if (!currentUser.id) return;

      // 먼저 localStorage에서 메시지 복원
      loadMessagesFromStorage();

      try {
        const response = await getChatRooms(parseInt(currentUser.id));
        if (response.isSuccess) {
          // 모든 참여 채팅방에 구독
          response.result.forEach(room => {
            subscribeToRoom(room.chatRoomId);
          });
        }
      } catch (error) {
        console.error('Failed to fetch chat rooms:', error);
      }
    };

    // STOMP 클라이언트 초기화
    if (!clientRef.current) {
      initializeClient();
    }
    
    // 채팅방 구독은 한 번만 실행되도록 조건 추가
    if (currentUser.id && subscribedRooms.current.size === 0) {
      initializeChatRooms();
    }
  }, [currentUser.id, initializeClient, subscribeToRoom, loadMessagesFromStorage]);

  // 컴포넌트 언마운트 시 정리 - 연결을 유지하도록 수정
  useEffect(() => {
    return () => {
      // 연결을 유지하고 정리하지 않음
      console.log('ChatSubscriptionProvider unmounting, but keeping connection alive');
    };
  }, []);

  const value: ChatSubscriptionContextType = {
    chatRooms,
    client: clientRef.current,
    isConnected,
    addMessage,
    loadPreviousMessages,
    subscribeToRoom,
    unsubscribeFromRoom,
    sendMessage,
    enterRoom,
    leaveRoom,
  };

  return (
    <ChatSubscriptionContext.Provider value={value}>
      {children}
    </ChatSubscriptionContext.Provider>
  );
}; 