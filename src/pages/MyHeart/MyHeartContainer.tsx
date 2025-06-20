import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyHeartPresentation from './MyHeartPresentation';
import { getLikedItems } from '../../Apis/userApi';

// 찜한 상품 타입
export interface LikedItem {
  groupPurchaseId: number;
  title: string;
  imageUrl: string;
}

const MyHeartContainer = () => {
  const navigate = useNavigate();
  const memberId = localStorage.getItem('memberId');

  const [products, setProducts] = useState<LikedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (memberId) {
      const numericMemberId = parseInt(memberId, 10);
      const fetchLikedItems = async () => {
        setLoading(true);
        try {
          const response = await getLikedItems(numericMemberId);
          if (response.isSuccess) {
            setProducts(response.result);
          } else {
            setError(response.message);
          }
        } catch (err) {
          setError('찜한 목록을 불러오는데 실패했습니다.');
        } finally {
          setLoading(false);
        }
      };
      fetchLikedItems();
    }
  }, [memberId]);

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

  if (loading) return <div>로딩 중...</div>
  if (error) return <div>에러: {error}</div>

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
