import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChattingPagePresentation from './ChattingPagePresentation';
import { Client } from '@stomp/stompjs';
import { getChatMessages, getChatRooms, type ChatRoom } from '../../Apis/chatApi';

// 메시지 타입을 정의합니다.
interface Message {
  id: string; // number에서 string으로 변경
  type: 'notice' | 'me' | 'other';
  text: string;
  user?: string; // 메시지를 보낸 사용자 닉네임
}

const mockRoom = {
  roomTitle: '프로틴 공구',
  productName: '마이프로틴',
  currentPeople: 9,
  maxPeople: 15,
};

// 현재 사용자 정보를 가정합니다. 실제로는 로그인 정보 등에서 가져와야 합니다.
const currentUser = {
  id: localStorage.getItem('memberId') || '',
  nickname: localStorage.getItem('nickname') || '',
};

const ChattingPageContainer = () => {
  const navigate = useNavigate();
  const { id: roomId } = useParams<{ id: string }>();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [lastMessageId, setLastMessageId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [roomInfo, setRoomInfo] = useState<ChatRoom | null>(null);
  
  const clientRef = useRef<Client | null>(null);
  const messageIdCounter = useRef(0);
  const receivedMessages = useRef<Set<string>>(new Set()); // 중복 메시지 방지용

  // 고유한 메시지 ID 생성 함수
  const generateMessageId = () => {
    messageIdCounter.current += 1;
    return `${Date.now()}-${messageIdCounter.current}`;
  };

  // 중복 메시지 체크 함수
  const isDuplicateMessage = (payload: any) => {
    const messageKey = `${payload.messageType}-${payload.content}-${payload.timestamp}`;
    if (receivedMessages.current.has(messageKey)) {
      return true;
    }
    receivedMessages.current.add(messageKey);
    return false;
  };

  const fetchPreviousMessages = useCallback(async () => {
    if (!hasNextPage || isLoading || !roomId) return;

    setIsLoading(true);
    try {
      const response = await getChatMessages(roomId, lastMessageId);
      if (response.isSuccess) {
        // 'SYSTEM' 타입 메시지를 필터링하여 입장/퇴장 메시지가 누적되지 않도록 합니다.
        const talkMessages = response.result.messages.filter(
          (msg) => msg.messageType === 'TALK'
        );

        const fetchedMessages: Message[] = talkMessages.map((msg) => ({
          id: msg.messageId,
          type: msg.senderId === parseInt(currentUser.id) ? 'me' : 'other',
          text: msg.content,
          user: msg.senderNick,
        }));

        setMessages((prev) => [...fetchedMessages.reverse(), ...prev]);
        setHasNextPage(response.result.hasNext);
        if (response.result.messages.length > 0) {
          const oldestMessageId = response.result.messages[response.result.messages.length - 1].messageId;
          setLastMessageId(oldestMessageId);
        }
      }
    } catch (error) {
      console.error('Failed to fetch previous messages:', error);
    } finally {
      setIsLoading(false);
    }
  }, [roomId, hasNextPage, isLoading, lastMessageId]);

  useEffect(() => {
    // 채팅방 정보 불러오기
    const fetchRoomInfo = async () => {
      if (!roomId) return;
      // TODO: memberId를 실제 로그인한 사용자 ID로 변경해야 합니다.
      const memberId = 1;
      try {
        const response = await getChatRooms(memberId);
        if (response.isSuccess) {
          const currentRoom = response.result.find(
            (room) => room.chatRoomId === parseInt(roomId, 10)
          );
          if (currentRoom) {
            setRoomInfo(currentRoom);
          }
        }
      } catch (error) {
        console.error('Failed to fetch room info:', error);
      }
    };
    
    fetchRoomInfo();
    fetchPreviousMessages();
    
    // 이미 연결된 경우 새로운 연결을 생성하지 않음
    if (clientRef.current) {
      console.log('STOMP client already exists, skipping connection');
      return;
    }

    console.log('Creating new STOMP connection...');
    
    // STOMP 클라이언트 생성
    const client = new Client({
      brokerURL: 'ws://13.209.95.208:8080/ws',
      reconnectDelay: 3000,
    });

    client.onConnect = () => {
      console.log('STOMP WebSocket connected!');
      setIsConnected(true);
      
      // 1) 채팅방 메시지 구독
      client.subscribe(`/topic/room/${roomId}`, (msg) => {
        const payload = JSON.parse(msg.body);
        console.log('[RECV]', payload);
        
        // 중복 메시지 체크
        if (isDuplicateMessage(payload)) {
          console.log('Duplicate message ignored:', payload.content);
          return;
        }
        
        // 메시지 타입에 따라 처리
        if (payload.messageType === 'TALK') {
          const newMessage: Message = {
            id: generateMessageId(),
            type: payload.senderId === parseInt(currentUser.id) ? 'me' : 'other',
            text: payload.content,
            user: payload.senderNick || '사용자',
          };
          setMessages((prev) => [...prev, newMessage]);
        } else if (payload.messageType === 'SYSTEM') {
          const noticeMessage: Message = {
            id: generateMessageId(),
            type: 'notice',
            text: payload.content,
          };
          setMessages((prev) => [...prev, noticeMessage]);
        }
      });

      // 2) 채팅방 입장
      client.publish({
        destination: '/app/chat/enter',
        headers: { memberId: currentUser.id.toString() },
        body: JSON.stringify({ chatRoomId: parseInt(roomId || '1') }),
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

    // STOMP 클라이언트 활성화
    client.activate();
    clientRef.current = client;

    // 컴포넌트가 언마운트될 때 연결 해제
    return () => {
      if (clientRef.current) {
        console.log('Cleaning up STOMP connection...');
        if (isConnected) {
          // 채팅방 퇴장 메시지 전송
          clientRef.current.publish({
            destination: '/app/chat/leave',
            headers: { memberId: currentUser.id.toString() },
            body: JSON.stringify({ chatRoomId: parseInt(roomId || '1') }),
          });
        }
        
        // 연결 해제
        clientRef.current.deactivate();
        clientRef.current = null;
        setIsConnected(false);
        console.log('STOMP WebSocket disconnected.');
      }
    };
  }, [roomId]);

  const handleBack = () => {
    navigate('/chat');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSend = () => {
    if (input.trim() === '') return;
    
    if (!isConnected || !clientRef.current) {
      console.log('STOMP connection not ready. Please wait...');
      return;
    }

    try {
      // STOMP를 통해 메시지 전송
      clientRef.current.publish({
        destination: '/app/chat/send',
        headers: { memberId: currentUser.id.toString() },
        body: JSON.stringify({ 
          chatRoomId: parseInt(roomId || '1'), 
          content: input 
        }),
      });

      // 입력창 초기화
      setInput('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <ChattingPagePresentation
      roomTitle={roomInfo?.roomName || mockRoom.roomTitle}
      productName={roomInfo?.roomName || mockRoom.productName}
      currentPeople={roomInfo?.participants || 0}
      messages={messages}
      onBack={handleBack}
      input={input}
      onInputChange={handleInputChange}
      onSend={handleSend}
    />
  );
};

export default ChattingPageContainer;
