import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LandingPagePresentation from './LandingPagePresentation';
import { getKakaoLogin } from '../../Apis/kakaoLoginApi';
import { searchProducts, getRankedProducts } from '../../Apis/groupPurchaseApi';
import { useAuth } from '../../contexts/AuthContext';

// 상품 타입 정의
interface Product {
  id: number;
  title: string;
  // name: string; // API 응답에 없음
  // imageUrl: string; // API 응답에 없음. 상세 조회 시 있을 수 있음
  // content: string; // API 응답에 없음
  status: string;
  place: string;
  price: number;
  maxParticipants: number;
  currentParticipants: number;
  views: number;
  likes: number;
  deadline: string;
}

type SortType = 'views' | 'likes';

const LandingPageContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();
  const [isProcessingLogin, setIsProcessingLogin] = useState(false);
  const processedCodeRef = useRef<string | null>(null);
  // const { memberid, authToken, isSuccess } = useAppContext();
  const memberid = localStorage.getItem('memberId');
  const authToken = localStorage.getItem('authToken');
  const isSuccess = localStorage.getItem('isSuccess');

  // 새로 추가된 상태들
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortType, setSortType] = useState<SortType>('views');
  const [sortPanelOpen, setSortPanelOpen] = useState(false);
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [city, setCity] = useState<string | null>(null);
  const [district, setDistrict] = useState<string | null>(null);
  const [town, setTown] = useState<string | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query.trim());
  };

  const getLocation = async (memberId: number) => {
    if (!isAuthenticated) return; // 로그인 안 했으면 실행하지 않음
    try {
      setLoadingLocation(true);
      const res = await fetch(`/api/location/${memberId}/current`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
      });
      if (!res.ok) {
        // 500 에러면 로그인 상태일 때만 /map으로 이동
        if (res.status === 500) {
          if (isAuthenticated) {
            navigate('/map');
          } else {
            alert('로그인 후 주소를 등록할 수 있습니다.');
            navigate('/first');
          }
          return;
        }
        // 그 외 에러는 기존대로 처리
        throw new Error('위치 정보 조회 실패');
      }
      const data = await res.json();
      // result가 빈 배열이면 팝업 오픈
      if (Array.isArray(data.result) && data.result.length === 0) {
        setShowAddressPopup(true);
      } else if (data.result && typeof data.result === 'object') {
        setCity(data.result.city);
        setDistrict(data.result.district);
        setTown(data.result.town);
      }
      console.log(city, district, town);
    } catch (e: any) {
      alert('위치 저장 실패: ' + e.message);
    } finally {
      setLoadingLocation(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && isSuccess) {
      getLocation(Number(memberid));
    }
  }, [isAuthenticated, isSuccess, memberid]);

  const handleGoToUpload = () => {
    navigate('/upload');
  };
  const handleLocationClick = () => {
    navigate('/map');
  };
  const handleProductClick = (id: number) => {
    navigate(`/register/${id}`);
  };

  const handleChat = () => navigate('/chat');
  const handleMyPage = () => navigate('/mypage');

  const handleCategory = () => {
    navigate('/category');
  };

  const handleLogin = () => {
    navigate('/first');
  };

  // 상품 목록 조회
  const fetchProducts = async () => {
    const memberId = localStorage.getItem('memberId');

    if (!memberId || !isAuthenticated) {
      console.warn('로그인 정보가 없어 상품 목록 조회를 중단합니다.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (searchQuery) {
        response = await searchProducts(searchQuery, 'latest', 1, 20);
      } else {
        // '인기순' 또는 '찜 많은순' 정렬 기준에 따라 랭킹 API 호출
        response = await getRankedProducts(sortType, 1, 10); 
      }

      if (response.isSuccess && response.result.content) {
        const fetchedProducts = response.result.content.map((p: any) => ({
          ...p,
          views: p.views ?? 0,
          likes: p.likes ?? 0,
        }));
        setProducts(fetchedProducts); // API가 이미 정렬된 데이터를 주므로, 프론트 정렬 제거
      } else {
        setError(response.message || '상품 목록을 불러오는데 실패했습니다.');
        setProducts([]);
      }
    } catch (err: any) {
      setError(err.message || '상품 목록을 불러오는데 실패했습니다.');
      setProducts([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 정렬 기준 변경 시 상품 목록 다시 조회
  useEffect(() => {
    // 인증된 경우에만 상품 목록을 가져옴
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [sortType, isAuthenticated, searchQuery]);

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
    
    // 디버그: URL 파라미터 확인
    console.log('=== 카카오 로그인 디버그 ===');
    console.log('🌐 현재 URL:', window.location.href);
    console.log('🔗 location.search:', location.search);
    console.log('📋 전체 URL 파라미터:', Object.fromEntries(params.entries()));
    console.log('🔑 추출된 code:', code);
    console.log('📝 code 타입:', typeof code);
    console.log('📏 code 길이:', code?.length);
    console.log('⚡ code 첫 10글자:', code?.substring(0, 10));
    console.log('⚡ code 마지막 10글자:', code?.substring(code.length - 10));
    console.log('🔄 processedCodeRef.current:', processedCodeRef.current);
    console.log('🔒 isProcessingLogin:', isProcessingLogin);
    console.log('⏰ 현재 시간:', new Date().toISOString());
    console.log('========================');
    
    if (code && !isProcessingLogin) {
      console.log('✅ 카카오 로그인 조건 만족 - 로그인 진행');
      processedCodeRef.current = code;
      setIsProcessingLogin(true);
      
      // 바로 카카오 로그인 진행
      getKakaoLogin(code)
        .then(data => {
          console.log('카카오 로그인 성공 응답:', data);
          if (data.isSuccess && data.result && data.result.user && typeof data.result.user.id === 'number' && data.result.token) {
            // AuthContext의 login 함수를 사용하여 로그인 상태 업데이트
            login(
              data.result.token,
              data.result.user.id.toString(),
              data.result.user.nickname,
              data.result.user.email
            );
            localStorage.setItem('isSuccess', "true");
            localStorage.setItem('authToken', data.result.token);
            localStorage.setItem('memberId', data.result.user.id.toString());
            localStorage.setItem('nickname', data.result.user.nickname);
            localStorage.setItem('email', data.result.user.email);
            // code 파라미터를 제거하고 새로고침
            navigate('/landing', { replace: true });
          } else {
            console.error('카카오 로그인 실패: 백엔드 응답 데이터가 올바르지 않습니다.', data);
            alert('카카오 로그인에 실패했습니다. (서버 응답 데이터 오류)');
            navigate('/landing', { replace: true });
          }
        })
        .catch((error: Error) => {
          console.error('카카오 로그인 에러 상세:', error);
          if (error?.message) {
            console.error('백엔드 응답 에러 메시지:', error.message);
          }
          
          // invalid_grant 에러인 경우 특별한 메시지 표시
          if (error?.message?.includes('invalid_grant')) {
            alert('인증 코드가 만료되었거나 이미 사용되었습니다. 다시 로그인해주세요.');
          } else {
            alert('카카오 로그인 중 오류가 발생했습니다.');
          }
          
          navigate('/landing', { replace: true });
        })
        .finally(() => {
          console.log('카카오 로그인 처리 완료 - 상태 초기화');
          setIsProcessingLogin(false);
          // 처리 완료 후 processedCodeRef 초기화
          processedCodeRef.current = null;
        });
    } else {
      console.log('❌ 카카오 로그인 조건 불만족:');
      console.log('- code 존재:', !!code);
      console.log('- 로그인 처리 중 아님:', !isProcessingLogin);
    }
  }, [location, navigate, isProcessingLogin, login]);

  // 로딩 중일 때 로딩 화면 표시
  if (isProcessingLogin || (isAuthenticated && loadingLocation)) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div>{isProcessingLogin ? '카카오 로그인 처리 중...' : '위치 정보 불러오는 중...'}</div>
        <div style={{ fontSize: '14px', color: '#666' }}>잠시만 기다려주세요.</div>
      </div>
    );
  }

  return (
    <LandingPagePresentation
      onGoToUpload={handleGoToUpload}
      onLocationClick={handleLocationClick}
      onSearch={handleSearch}
      onProductClick={handleProductClick}
      onChat={handleChat}
      onMyPage={handleMyPage}
      onCategory={handleCategory}
      onLogin={handleLogin}
      isAuthenticated={isAuthenticated}
      products={products}
      loading={loading}
      error={error}
      sortType={sortType}
      sortPanelOpen={sortPanelOpen}
      onSortClick={() => setSortPanelOpen(true)}
      onSortChange={handleSortChange}
      onSortPanelClose={() => setSortPanelOpen(false)}
      showAddressPopup={showAddressPopup}
      setShowAddressPopup={setShowAddressPopup}
      city={city}
      district={district}
      town={town}
    />
  );
};

export default LandingPageContainer; 