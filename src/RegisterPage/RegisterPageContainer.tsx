import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RegisterPagePresentation from './RegisterPagePresentation';

// 임시 mock 데이터
const mockProducts = [
  {
    id: 1,
    image: '',
    title: '프로틴 공구',
    productName: '마이프로틴',
    location: '서울특별시 동작구 상도동 전체',
    currentPeople: 3,
    maxPeople: 7,
    amount: 30,
    desc: '이건 프로틴이고 어쩌구 저쩌구 (상품 등록할 때 들어간 설명 문구 그대로.)',
    price: 10000,
    joinedAmount: 2, // 참여 시 구매 희망 개수
  },
  // 필요시 추가 상품
];

interface RegisterPageContainerProps {
  bottomButtons?: { text: string; onClick: () => void }[];
  isJoinedMode?: boolean;
}

const RegisterPageContainer = ({ bottomButtons, isJoinedMode }: RegisterPageContainerProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [wishAmount, setWishAmount] = useState(1);
  const [product, setProduct] = useState(mockProducts[0]); // 실제로는 id에 따라 상품 정보를 가져와야 함

  const isEditMode = window.location.pathname.startsWith('/mypro/');
  const isNormalMode = !isEditMode && !isJoinedMode;

  const handleWishAmountChange = (delta: number) => {
    if (isJoinedMode || isNormalMode) {
      setWishAmount(prev => Math.max(1, prev + delta));
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleTitleChange = (title: string) => {
    setProduct(prev => ({ ...prev, title }));
  };

  const handleMaxPeopleChange = (maxPeople: number) => {
    setProduct(prev => ({ ...prev, maxPeople }));
  };

  const handleAmountChange = (amount: number) => {
    setProduct(prev => ({ ...prev, amount }));
  };

  const handleDescChange = (desc: string) => {
    setProduct(prev => ({ ...prev, desc }));
  };

  const handlePriceChange = (price: number) => {
    setProduct(prev => ({ ...prev, price }));
  };

  const handleUpdateAmount = () => {
    // TODO: API 호출하여 구매 희망 개수 업데이트
    alert('구매 희망 개수가 수정되었습니다.');
    navigate(-1);
  };

  const handleLeaveGroup = () => {
    // TODO: API 호출하여 공구에서 나가기
    alert('공구에서 나갔습니다.');
    navigate(-1);
  };

  const joinedModeButtons = [
    { text: '개수 수정하기', onClick: handleUpdateAmount },
    { text: '공구에서 빠지기', onClick: handleLeaveGroup }
  ];

  return (
    <RegisterPagePresentation
      product={product}
      wishAmount={isJoinedMode ? wishAmount : (isEditMode ? product.amount : wishAmount)}
      onWishAmountChange={handleWishAmountChange}
      onCancel={handleCancel}
      bottomButtons={isJoinedMode ? joinedModeButtons : bottomButtons}
      isEditMode={isEditMode}
      isJoinedMode={isJoinedMode}
      onTitleChange={isEditMode ? handleTitleChange : undefined}
      onMaxPeopleChange={isEditMode ? handleMaxPeopleChange : undefined}
      onAmountChange={isEditMode ? handleAmountChange : undefined}
      onDescChange={isEditMode ? handleDescChange : undefined}
      onPriceChange={isEditMode ? handlePriceChange : undefined}
    />
  );
};

export default RegisterPageContainer;
