import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChattingPagePresentation from './ChattingPagePresentation';

const mockRoom = {
  roomTitle: '프로틴 공구',
  productName: '마이프로틴',
  currentPeople: 9,
  maxPeople: 15,
};

const mockMessages = [
  { id: 1, type: 'notice' as const, text: '"프로틴 공구" 방에 User가 참여 했습니다.' },
  { id: 2, type: 'other' as const, text: '어머 안녕하세요~!' },
  { id: 3, type: 'other' as const, text: '어서 오세요 :)' },
  { id: 4, type: 'me' as const, text: '안녕하세요! 공구 인원이 빨리 차면 좋겠네요!' },
  { id: 5, type: 'other' as const, text: '저도요... ㅠㅠ 빨리 받고 싶네요' },
];

const ChattingPageContainer = () => {
  const navigate = useNavigate();
  // const { id } = useParams(); // 실제 구현 시 채팅방 id로 데이터 fetch
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const handleBack = () => {
    navigate('/chat');
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, type: 'me' as const, text: input },
    ]);
    setInput('');
  };

  return (
    <ChattingPagePresentation
      roomTitle={mockRoom.roomTitle}
      productName={mockRoom.productName}
      currentPeople={mockRoom.currentPeople}
      maxPeople={mockRoom.maxPeople}
      messages={messages}
      onBack={handleBack}
      input={input}
      onInputChange={handleInputChange}
      onSend={handleSend}
    />
  );
};

export default ChattingPageContainer;
