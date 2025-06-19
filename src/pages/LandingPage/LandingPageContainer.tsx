import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LandingPagePresentation from './LandingPagePresentation';
import { getKakaoLogin } from '../../Apis/kakaoLoginApi';
import { getAllProducts } from '../../Apis/groupPurchaseApi';

// 상품 타입 정의
interface Product {
  id: number;
  title: string;
  content: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  maxParticipants: number;
  category1: string;
  category2: string;
  views: number;
  likes: number;
}

const defaultCategories = ['식제품', '전자제품'];
const allCategories = ['식제품', '전자제품', '운동 용품', '작업 공구', 'test'];

type SortType = 'views' | 'likes';

const LandingPageContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(defaultCategories);
  const [categoryPanelOpen, setCategoryPanelOpen] = useState(false);
  const [tempSelectedCategories, setTempSelectedCategories] = useState<string[]>(selectedCategories);
  const [isProcessingLogin, setIsProcessingLogin] = useState(false);
  const processedCodeRef = useRef<string | null>(null);
  
  // 새로 추가된 상태들
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortType, setSortType] = useState<SortType>('views');
  const [sortPanelOpen, setSortPanelOpen] = useState(false);

  const handleGoToUpload = () => {
    navigate('/upload');
  };
  const handleLocationClick = () => {
    navigate('/map');
  };
  const handleSearchClick = () => {
    alert('검색 기능은 추후 구현됩니다!');
  };
  const handleProductClick = (id: number) => {
    navigate(`/register/${id}`);
  };

  const handleChat = () => navigate('/chat');
  const handleMyPage = () => navigate('/mypage');
  
  // 네비게이션 버튼 클릭 시 패널 오픈
  const handleCategoryNavClick = () => {
    setTempSelectedCategories(selectedCategories);
    setCategoryPanelOpen(true);
  };
  
  // 카테고리 토글
  const handleCategoryToggle = (cat: string) => {
    setTempSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };
  
  // 카테고리 반영
  const handleCategoryApply = () => {
    setSelectedCategories(tempSelectedCategories.length > 0 ? tempSelectedCategories : defaultCategories);
    setCategoryPanelOpen(false);
  };
  
  // 카테고리 패널 닫기
  const handleCategoryPanelClose = () => {
    setCategoryPanelOpen(false);
  };

  const handleCategory = () => {
    navigate('/category');
  };

  const handleProductListClick = () => {
    navigate('/category');
  };

  // 상품 목록 조회
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllProducts(1, 10); // 전체 상품 조회
      if (response.isSuccess) {
        const sortedProducts = [...response.result.content];
        // 정렬 적용
        sortedProducts.sort((a, b) => {
          if (sortType === 'views') {
            return b.views - a.views;
          } else {
            return b.likes - a.likes;
          }
        });
        setProducts(sortedProducts);
      } else {
        setError(response.message || '상품 목록을 불러오는데 실패했습니다.');
      }
    } catch (err) {
      setError('상품 목록을 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 정렬 기준 변경 시 상품 목록 다시 조회
  useEffect(() => {
    fetchProducts();
  }, [sortType]);

  // 정렬 기준 변경 핸들러
  const handleSortChange = (newSortType: SortType) => {
    setSortType(newSortType);
    setSortPanelOpen(false);
  };

  /**
   * [카카오 로그인 콜백 처리 로직]
   * 백엔드에서 302 redirect로 /landing으로 보내주는 경우를 처리
   * 1. URL에서 code 파라미터를 추출
   * 2. code가 있으면 백엔드에 fetch로 전달
   * 3. 응답(JSON)에서 토큰/ID를 localStorage에 저장
   * 4. 저장 후 /landing으로 이동(파라미터 제거)
   */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    
    if (code && processedCodeRef.current !== code && !isProcessingLogin) {
      console.log('카카오 로그인 코드 감지:', code);
      processedCodeRef.current = code;
      setIsProcessingLogin(true);
      
      // 바로 카카오 로그인 진행
      getKakaoLogin(code)
        .then(data => {
          if (data.isSuccess && data.result) {
            localStorage.setItem('authToken', data.result.token);
            localStorage.setItem('memberId', data.result.id.toString());
            localStorage.setItem('nickname', data.result.nickname);
            localStorage.setItem('email', data.result.email);
            console.log('카카오 로그인 성공:', data.result);
            // code 파라미터를 제거하고 새로고침
            navigate('/landing', { replace: true });
          } else {
            console.error('카카오 로그인 실패:', data);
            alert('카카오 로그인에 실패했습니다.');
            navigate('/landing', { replace: true });
          }
        })
        .catch((error) => {
          console.error('카카오 로그인 에러 상세:', error);
          
          // invalid_grant 에러인 경우 특별한 메시지 표시
          if (error.message.includes('invalid_grant')) {
            alert('인증 코드가 만료되었거나 이미 사용되었습니다. 다시 로그인해주세요.');
          } else {
            alert('카카오 로그인 중 오류가 발생했습니다.');
          }
          
          navigate('/landing', { replace: true });
        })
        .finally(() => {
          setIsProcessingLogin(false);
        });
    }
  }, [location, navigate, isProcessingLogin]);

  // 로딩 중일 때 로딩 화면 표시
  if (isProcessingLogin) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div>카카오 로그인 처리 중...</div>
        <div style={{ fontSize: '14px', color: '#666' }}>잠시만 기다려주세요.</div>
      </div>
    );
  }

  return (
    <LandingPagePresentation
      onGoToUpload={handleGoToUpload}
      onLocationClick={handleLocationClick}
      onSearchClick={handleSearchClick}
      onProductClick={handleProductClick}
      selectedCategories={selectedCategories}
      categoryPanelOpen={categoryPanelOpen}
      tempSelectedCategories={tempSelectedCategories}
      onCategoryNavClick={handleCategoryNavClick}
      onCategoryToggle={handleCategoryToggle}
      onCategoryApply={handleCategoryApply}
      onCategoryPanelClose={handleCategoryPanelClose}
      allCategories={allCategories}
      onChat={handleChat}
      onMyPage={handleMyPage}
      onCategory={handleCategory}
      onProductListClick={handleProductListClick}
      products={products}
      loading={loading}
      error={error}
      sortType={sortType}
      sortPanelOpen={sortPanelOpen}
      onSortClick={() => setSortPanelOpen(true)}
      onSortChange={handleSortChange}
      onSortPanelClose={() => setSortPanelOpen(false)}
    />
  );
};

export default LandingPageContainer; 