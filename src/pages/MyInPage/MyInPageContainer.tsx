import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MyInPagePresentation from './MyInPagePresentation';
import { getMyJoinedProducts } from '../../Apis/groupPurchaseApi';

// API 응답 및 Presentation 컴포넌트를 위한 타입 (MyProPage와 유사할 것으로 가정)
export interface JoinedProduct {
  id: number;
  name: string; // title을 name으로 매핑
  imageUrl: string;
  status: string;
  price: number;
  likes: number; // 찜 개수
  currentParticipants: number;
  maxParticipants: number;
}

const MyInPageContainer = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<JoinedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMyJoinedProducts = useCallback(async () => {
    const memberId = localStorage.getItem('memberId');
    if (!memberId) {
      setError('로그인이 필요합니다.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await getMyJoinedProducts(Number(memberId));

      if (response.isSuccess && Array.isArray(response.result.content)) {
        // API 응답(ApiProduct)을 Presentation에 맞게 가공(JoinedProduct)
        const formattedProducts = response.result.content.map((p: any) => ({
          id: p.id,
          name: p.title,
          imageUrl: p.imageUrl || '/img/dagong.png', // 이미지가 없는 경우 기본 로고
          status: p.status,
          price: p.price,
          likes: p.likes ?? 0,
          currentParticipants: p.currentParticipants,
          maxParticipants: p.maxParticipants,
        }));
        setProducts(formattedProducts);
      } else {
        setError(response.message || '참여한 공구 목록을 불러오는 데 실패했습니다.');
        setProducts([]);
      }
    } catch (err: any) {
      setError(err.message || '알 수 없는 오류가 발생했습니다.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyJoinedProducts();
  }, [fetchMyJoinedProducts]);

  const handleProductClick = (id: number) => {
    // 참여한 공구 상세 페이지로 이동
    navigate(`/myjoined/${id}`);
  };

  const handleCancel = () => navigate(-1); // 이전 페이지로 돌아가기

  return (
    <MyInPagePresentation
      products={products}
      loading={loading}
      error={error}
      onProductClick={handleProductClick}
      onCancel={handleCancel}
    />
  );
};

export default MyInPageContainer;
