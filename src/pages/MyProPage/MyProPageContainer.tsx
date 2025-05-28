import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyProPagePresentation from './MyProPagePresentation';

const products = [
  { id: 1, name: '프로틴', status: '모집 중', liked: true },
  { id: 2, name: '프로틴', status: '모집 완료', liked: true },
  { id: 3, name: '프로틴', status: '배송 완료', liked: false },
];

const MyProPageContainer = () => {
  const navigate = useNavigate();
  const handleProductClick = (id: number) => {
    navigate(`/mypro/${id}`);
  };
  const handleHome = () => navigate('/');
  const handleChat = () => navigate('/chat');
  const handleMyPage = () => navigate('/mypage');

  return (
    <MyProPagePresentation
      products={products}
      onProductClick={handleProductClick}
      onHome={handleHome}
      onChat={handleChat}
      onMyPage={handleMyPage}
    />
  );
};

export default MyProPageContainer;
