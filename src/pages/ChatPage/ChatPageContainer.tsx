import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatPagePresentation from './ChatPagePresentation';
import { getChatRooms, type ChatRoom } from '../../Apis/chatApi';

const ChatPageContainer = () => {
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChatRooms = async () => {
      // TODO: memberId를 실제 로그인한 사용자 ID로 변경해야 합니다.
      const memberId = 1;
      try {
        const response = await getChatRooms(memberId);
        if (response.isSuccess) {
          setChatRooms(response.result);
        }
      } catch (err: any) {
        console.error('Failed to fetch chat rooms:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatRooms();
  }, []);

  const handleChatRoomClick = (roomId: number) => {
    navigate(`/chat/${roomId}`);
  };

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <ChatPagePresentation
      chatRooms={chatRooms}
      isLoading={isLoading}
      error={error}
      onChatRoomClick={handleChatRoomClick}
      onBackClick={handleBackClick}
    />
  );
};

export default ChatPageContainer;
