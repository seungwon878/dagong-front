import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChatPagePresentation from './ChatPagePresentation';

const chatRooms = [
  { id: 1, title: '프로틴 공구', location: '상도동', lastMessage: '', timeAgo: '5분 전' },
  { id: 2, title: '이천 쌀 공구', location: '상도동', lastMessage: '', timeAgo: '일주일 전' },
  { id: 3, title: '옷걸이 공구', location: '독립', lastMessage: '', timeAgo: '9일 전' },
  { id: 4, title: '닭가슴살 공구하실 분 구합니다', location: '신사동', lastMessage: '', timeAgo: '9일 전' },
  { id: 5, title: '코카콜라 싸게 사요!', location: '숭실대', lastMessage: '', timeAgo: '2주일 전' },
  { id: 6, title: '어린이 집 수업 키트 공구합니다', location: '숭실대', lastMessage: '', timeAgo: '2주일 전' },
];

const ChatPageContainer = () => {
  const navigate = useNavigate();
  const handleRoomClick = (id: number) => {
    navigate(`/chat/${id}`);
  };
  const handleHomeClick = () => {
    navigate('/');
  };
  const handleMyPageClick = () => {
    navigate('/mypage');
  };
  const handleCategory = () => {
    navigate('/category');
  };
  return (
    <ChatPagePresentation
      chatRooms={chatRooms}
      onRoomClick={handleRoomClick}
      onHomeClick={handleHomeClick}
      onMyPageClick={handleMyPageClick}
      onCategory={handleCategory}
    />
  );
};

export default ChatPageContainer;
