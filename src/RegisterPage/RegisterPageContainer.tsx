import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RegisterPagePresentation from './RegisterPagePresentation';
import { cancelParticipation } from '../Apis/groupPurchaseApi'; // 최종 경로 수정

interface Product {
  id: number;
  title: string;
  content: string;
  place: string;
  status: string;
  name: string;
  quantity: number;
  imageUrls: string[];
  maxParticipants: number;
  currentParticipants: number;
  writerName: string;
  category1: string;
  category2: string;
  views: number;
  likes: number;
  deadline: string;
  createdAt: string;
  price: number;
  isLiked: boolean;
}

interface RegisterPageContainerProps {
  bottomButtons?: { text: string; onClick: () => void }[];
  isJoinedMode?: boolean;
}

const RegisterPageContainer = ({ bottomButtons, isJoinedMode }: RegisterPageContainerProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [wishAmount, setWishAmount] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);

  const isEditMode = window.location.pathname.startsWith('/mypro/');
  const isNormalMode = !isEditMode && !isJoinedMode;

  const getProduct = async () => {
    const authToken = localStorage.getItem('authToken');
    const memberId = localStorage.getItem('memberId');

    if (!authToken || !memberId || !id) {
      console.log("Auth token, memberId, or product ID is missing.");
      return;
    }
    
    try {
      // 상품 상세 정보와 찜 목록을 동시에 호출
      const [productDetailResponse, likedItemsResponse] = await Promise.all([
        fetch(`http://13.209.95.208:8080/purchases/detail/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'Cache-Control': 'no-cache',
          },
        }),
        fetch(`http://13.209.95.208:8080/member/members/${memberId}/likes`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'Cache-Control': 'no-cache',
          },
        })
      ]);

      if (!productDetailResponse.ok) {
        throw new Error('상품 상세 정보를 가져오는 데 실패했습니다.');
      }

      const productDetailData = await productDetailResponse.json();
      const likedItemsData = likedItemsResponse.ok ? await likedItemsResponse.json() : null;

      if (productDetailData.isSuccess && productDetailData.result) {
        const productInfo = productDetailData.result;
        let isLiked = false;

        // 찜 목록 API가 성공적으로 응답하고, result가 배열일 경우
        if (likedItemsData && likedItemsData.isSuccess && Array.isArray(likedItemsData.result)) {
          // 현재 상품 ID가 찜 목록에 있는지 확인 (id 또는 groupPurchaseId 필드 모두 체크)
          isLiked = likedItemsData.result.some((item: any) =>
            (item.id === Number(id)) || (item.groupPurchaseId === Number(id))
          );
        } else {
          // 찜 목록 API가 실패하면, 상품 상세 정보의 isLiked를 fallback으로 사용
          isLiked = productInfo.isLiked ?? false;
        }

        setProduct({ ...productInfo, isLiked });
      } else {
        throw new Error(productDetailData.message || '상품 정보를 찾을 수 없습니다.');
      }

    } catch (e: any) {
      alert(e.message || '상품 정보를 불러오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      // 페이지가 bfcache에서 복원되었을 때
      if (event.persisted && id) {
        console.log('페이지가 캐시에서 복원되었습니다. 데이터를 새로고침합니다.');
        getProduct();
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [id]);

  const handleWishAmountChange = (delta: number) => {
    if (isJoinedMode || isNormalMode) {
      setWishAmount(prev => Math.max(1, prev + delta));
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleTitleChange = (title: string) => {
    setProduct(prev => prev ? { ...prev, title } : prev);
  };

  const handleMaxPeopleChange = (maxPeople: number) => {
    setProduct(prev => prev ? { ...prev, maxParticipants: maxPeople } : prev);
  };

  const handleAmountChange = (amount: number) => {
    setProduct(prev => prev ? { ...prev, quantity: amount } : prev);
  };

  const handleDescChange = (desc: string) => {
    setProduct(prev => prev ? { ...prev, content: desc } : prev);
  };

  const handlePriceChange = (price: number) => {
    setProduct(prev => prev ? { ...prev, price } : prev);
  };

  const handleLike = async () => {
    if (!product || !id) return;
    const authToken = localStorage.getItem('authToken');
    const memberId = localStorage.getItem('memberId');

    if (!memberId) {
      alert('로그인이 필요합니다.');
      return;
    }

    const method = product.isLiked ? 'DELETE' : 'POST';

    try {
        const response = await fetch(`http://13.209.95.208:8080/member/${id}/likes?memberId=${memberId}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('찜 처리 중 오류가 발생했습니다.');
        }
        
        setProduct(p => {
            if (!p) return null;
            return {
                ...p,
                isLiked: !p.isLiked,
                likes: p.isLiked ? p.likes - 1 : p.likes + 1,
            };
        });

    } catch (e: any) {
        alert(e.message);
    }
  };

  const handleParticipate = async () => {
    if (!product || !id) return;
    const memberId = localStorage.getItem('memberId');
    const authToken = localStorage.getItem('authToken');
    if (!memberId) {
      alert('로그인이 필요합니다.');
      return;
    }
    try {
      const response = await fetch(`http://13.209.95.208:8080/purchases/participate/${id}/${memberId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('공구 신청에 실패했습니다.');
      }
      alert('공구 신청이 완료되었습니다!');
      navigate(-1);
    } catch (e: any) {
      alert(e.message || '공구 신청 중 오류가 발생했습니다.');
    }
  };

  const handleUpdateAmount = () => {
    alert('구매 희망 개수가 수정되었습니다.');
    navigate(-1);
  };

  const handleLeaveGroup = async () => {
    if (!id) return;
    const memberId = localStorage.getItem('memberId');
    if (!memberId) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (window.confirm('정말로 공구 참여를 취소하시겠습니까?')) {
      try {
        const response = await cancelParticipation(Number(id), Number(memberId));
        if (response.isSuccess) {
          alert('공구 참여가 취소되었습니다.');
          navigate(-1); // 이전 페이지로 이동
        } else {
          throw new Error(response.message || '공구 참여 취소에 실패했습니다.');
        }
      } catch (error: any) {
        alert(error.message || '오류가 발생했습니다.');
      }
    }
  };

  const joinedModeButtons = [
    { text: '개수 수정하기', onClick: handleUpdateAmount },
    { text: '공구에서 빠지기', onClick: handleLeaveGroup }
  ];

  return (
    <RegisterPagePresentation
      product={product}
      wishAmount={isJoinedMode ? wishAmount : (isEditMode ? (product?.quantity ?? 1) : wishAmount)}
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
      onLike={handleLike}
      onParticipate={handleParticipate}
    />
  );
};

export default RegisterPageContainer;
