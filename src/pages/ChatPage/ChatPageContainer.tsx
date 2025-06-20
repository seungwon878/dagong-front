import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatPagePresentation from './ChatPagePresentation';
import { getChatRooms, type ChatRoom } from '../../Apis/chatApi';

const ChatPageContainer: React.FC = () => {
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const memberId = localStorage.getItem('memberId');
      if (!memberId) {
        setError('로그인이 필요합니다.');
        setLoading(false);
        return;
      }

      try {
        const response = await getChatRooms(Number(memberId));
        if (response.isSuccess) {
          setChatRooms(response.result);
        } else {
          setError(response.message || '채팅방 목록을 불러오지 못했습니다.');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChatRooms();
  }, []);

  const handleChatRoomClick = (roomId: number) => {
    navigate(`/chat/${roomId}`);
  };

  const handleBackClick = () => {
    navigate(-1);
  };
  
  return (
    <ChatPagePresentation 
      chatRooms={chatRooms}
      onChatRoomClick={handleChatRoomClick}
      onBackClick={handleBackClick}
      loading={loading}
      error={error}
    />
  );
};

export default ChatPageContainer;
