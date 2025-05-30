import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyHeartPresentation from './MyHeartPresentation';

const allProducts = [
  { id: 1, name: '프로틴', status: '모집 중', liked: true, joined: true, mine: false },
  { id: 2, name: '프로틴', status: '모집 완료', liked: true, joined: true, mine: false },
  { id: 3, name: '프로틴', status: '배송 완료', liked: false, joined: false, mine: true },
  { id: 4, name: '프로틴', status: '모집 중', liked: false, joined: true, mine: false },
];

const MyHeartContainer = () => {
  const navigate = useNavigate();
  // 찜한 공구만 필터
  const products = allProducts.filter((p) => p.liked);
  const handleProductClick = (id: number) => {
    navigate(`/register/${id}`);
  };
  const handleHome = () => navigate('/');
  const handleChat = () => navigate('/chat');
  const handleMyPage = () => navigate('/mypage');
  const handleCancel = () => navigate(-1);
  const handleCategory = () => {
    navigate('/category');
  };

  return (
    <MyHeartPresentation
      products={products}
      onProductClick={handleProductClick}
      onHome={handleHome}
      onChat={handleChat}
      onMyPage={handleMyPage}
      onCancel={handleCancel}
      onCategory={handleCategory}
    />
  );
};

export default MyHeartContainer;
