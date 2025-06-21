import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MyProPagePresentation from './MyProPagePresentation';
import { getMyProducts, deleteProduct } from '../../Apis/groupPurchaseApi';

// API 응답을 위한 타입
interface ApiProduct {
  id: number;
  title: string;
  imageUrl: string;
  status: string;
  price: number;
  deadline: string;
  maxParticipants: number;
  currentParticipants: number;
  place: string;
  likes: number; // likes 추가
}

// Presentation 컴포넌트를 위한 타입
interface PresentationProduct {
  id: number;
  name: string; // title을 name으로 매핑
  imageUrl: string;
  status: string;
  price: number;
  liked: boolean; // API에 없으므로 기본값 처리 (찜 여부)
  likes: number; // 찜 개수
  currentParticipants: number;
  maxParticipants: number;
}

const MyProPageContainer = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<PresentationProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMyProducts = useCallback(async () => {
    const memberId = localStorage.getItem('memberId');
    if (!memberId) {
      setError('로그인이 필요합니다.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await getMyProducts(Number(memberId));
      if (response.isSuccess && Array.isArray(response.result.content)) {
        // API 응답을 Presentation에 맞게 가공
        const formattedProducts = response.result.content.map(
          (p: ApiProduct) => ({
            id: p.id,
            name: p.title,
            imageUrl: p.imageUrl,
            status: p.status,
            price: p.price,
            liked: p.likes > 0, // 찜 개수가 0보다 크면 liked로 간주 (혹은 다른 기준)
            likes: p.likes ?? 0,
            currentParticipants: p.currentParticipants,
            maxParticipants: p.maxParticipants,
          })
        );
        setProducts(formattedProducts);
      } else {
        setError('상품 목록을 불러오는 데 실패했습니다.');
      }
    } catch (err: any) {
      setError(err.message || '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyProducts();
  }, [fetchMyProducts]);

  const handleProductClick = (id: number) => {
    navigate(`/mypro/${id}`);
  };

  const handleCancel = () => navigate(-1);

  const handleDeleteProduct = async (id: number) => {
    const confirmation = window.confirm('정말로 이 공구를 삭제하시겠습니까?');
    if (confirmation) {
      try {
        await deleteProduct(id);
        alert('공구가 삭제되었습니다.');
        // 삭제 성공 시, 화면에서 해당 상품을 즉시 제거
        setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
      } catch (err: any) {
        alert(`삭제 실패: ${err.message}`);
      }
    }
  };

  return (
    <MyProPagePresentation
      products={products}
      loading={loading}
      error={error}
      onProductClick={handleProductClick}
      onCancel={handleCancel}
      onDeleteProduct={handleDeleteProduct}
    />
  );
};

export default MyProPageContainer;
