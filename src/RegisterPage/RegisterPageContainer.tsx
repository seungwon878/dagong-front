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
  },
  // 필요시 추가 상품
];

interface RegisterPageContainerProps {
  bottomButtons?: { text: string; onClick: () => void }[];
}

const RegisterPageContainer = ({ bottomButtons }: RegisterPageContainerProps) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const product = mockProducts.find((p) => p.id === Number(id)) || mockProducts[0];
  const [wishAmount, setWishAmount] = useState(1);

  const handleWishAmountChange = (delta: number) => {
    setWishAmount((prev) => Math.max(1, prev + delta));
  };
  const handleCancel = () => {
    navigate('/');
  };

  return (
    <RegisterPagePresentation
      product={product}
      wishAmount={wishAmount}
      onWishAmountChange={handleWishAmountChange}
      onCancel={handleCancel}
      bottomButtons={bottomButtons}
    />
  );
};

export default RegisterPageContainer;
