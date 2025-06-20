export interface ChatRoom {
  chatRoomId: number;
  groupPurchaseId: number;
  roomName: string;
  participants: string; // "3"과 같은 문자열로 올 수 있음
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
  const response = await fetch(`/api/chat/rooms/${memberId}`, {
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