export interface ChatRoom {
  chatRoomId: number;
  groupPurchaseId: number;
  roomName: string;
  participants: number; // string에서 number로 변경
  lastMessage: string | null;
  lastSentAt: string | null; // ISO 날짜 문자열
  unread: boolean;
}

export interface ChatRoomListResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: ChatRoom[];
}


/**
 * 특정 멤버의 모든 채팅방 목록을 조회합니다.
 * @param memberId 채팅방 목록을 조회할 멤버의 ID
 * @returns 채팅방 목록을 포함하는 API 응답
 */
export const getChatRooms = async (memberId: number): Promise<ChatRoomListResponse> => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`/chat/rooms/${memberId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    // 서버에서 보내는 구체적인 에러 메시지를 사용
    const errorData = await response.json().catch(() => ({ message: '채팅방 목록을 불러오는데 실패했습니다.' }));
    throw new Error(errorData.message);
  }

  return response.json();
};

export interface ChatMessage {
  messageId: string;
  messageType: 'TALK' | 'SYSTEM';
  chatRoomId: number;
  senderId: number | null;
  senderNick: string;
  content: string;
  timestamp: string;
}

export interface ChatMessagesResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    messages: ChatMessage[];
    hasNext: boolean;
  };
}

/**
 * 특정 채팅방의 메시지 목록을 조회합니다. (페이지네이션)
 * @param roomId 채팅방 ID
 * @param lastId 이전 페이지의 마지막 메시지 ID (첫 페이지는 null)
 * @param size 가져올 메시지 개수
 * @returns 메시지 목록과 다음 페이지 존재 여부를 포함하는 API 응답
 */
export const getChatMessages = async (
  roomId: string,
  lastId: string | null,
  size: number = 30,
): Promise<ChatMessagesResponse> => {
  const token = localStorage.getItem('authToken');
  const query = new URLSearchParams({
    size: size.toString(),
  });
  if (lastId) {
    query.set('lastId', lastId);
  }

  const response = await fetch(`/chat/rooms/${roomId}/messages?${query.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: '메시지를 불러오는데 실패했습니다.' }));
    throw new Error(errorData.message);
  }

  return response.json();
};

/**
 * 특정 채팅방의 좌표 정보를 조회합니다.
 * @param chatRoomId 채팅방 ID
 * @returns 좌표 정보를 포함하는 API 응답
 */
export const getChatRoomCoordinates = async (chatRoomId: string): Promise<any> => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`/chat/rooms/${chatRoomId}/coordinates`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: '좌표 정보를 불러오는데 실패했습니다.' }));
    throw new Error(errorData.message);
  }

  return response.json();
};

/**
 * 사용자들의 위치를 기반으로 추천 지하철역을 조회합니다.
 * @param users 사용자들의 위치 정보 배열
 * @returns 추천 지하철역 정보를 포함하는 API 응답
 */
export const getRecommendedStation = async (users: Array<{latitude: number, longitude: number}>): Promise<any> => {
  try {
    console.log('🚇 AI 지하철역 추천 요청:', users);
    const response = await fetch('https://dagong-ai.onrender.com/station/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ users }),
    });

    if (!response.ok) {
      console.warn(`⚠️ AI API 응답 에러 (${response.status}):`, response.statusText);
      // 422 에러는 입력 데이터 형식 문제일 가능성
      if (response.status === 422) {
        console.warn('📝 AI API 요청 데이터 형식 확인 필요:', { users });
      }
      const errorData = await response.json().catch(() => ({ message: '추천 지하철역을 불러오는데 실패했습니다.' }));
      throw new Error(`AI 서비스 에러 (${response.status}): ${errorData.message}`);
    }

    const result = await response.json();
    console.log('✅ AI 지하철역 추천 성공:', result);
    return result;
  } catch (error) {
    console.error('❌ AI 지하철역 추천 실패:', error);
    // AI 서비스 에러는 치명적이지 않으므로 재발생시켜 호출자가 처리하도록 함
    throw error;
  }
}; 