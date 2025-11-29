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
  const alertShownRef = useRef<boolean>(false); // 알림 표시 여부 추적
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
      const res = await fetch(`/location/${memberId}/current`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
      });
      if (!res.ok) {
        // 404 또는 500 에러면 위치 정보가 없는 것으로 판단
        if (res.status === 404 || res.status === 500) {
          console.log('📍 위치 정보 없음 - 위치 등록 페이지로 이동');
          if (isAuthenticated) {
            alert('위치 정보가 등록되지 않았습니다. 위치를 등록해주세요.');
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
      console.error('인기 상품 목록 조회 실패:', err);
      
      // 404 에러의 경우 위치 정보 문제로 간주
      if (err.message && err.message.includes('404')) {
        console.log('📍 위치 정보 없음으로 인한 상품 조회 실패');
        setError('위치 정보를 등록한 후 상품 목록을 확인할 수 있습니다.');
      } else {
        setError(err.message || '상품 목록을 불러오는데 실패했습니다.');
      }
      
      setProducts([]);
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
    
    // 중복 실행 방지 강화
    if (code && !isProcessingLogin && processedCodeRef.current !== code) {
      console.log('✅ 카카오 로그인 조건 만족 - 로그인 진행');
      console.log('🔒 코드 중복 검사 통과 - 새로운 코드:', code.substring(0, 10) + '...');
      processedCodeRef.current = code;
      setIsProcessingLogin(true);
      
      // 바로 카카오 로그인 진행
      getKakaoLogin(code)
        .then(data => {
          console.log('카카오 로그인 성공 응답:', data);
          
          // 응답 구조 검증 및 토큰 추출
          if (data.isSuccess && data.result && data.result.user && typeof data.result.user.id === 'number') {
            const token = data.result.token; // result.token에서 토큰 추출
            const user = data.result.user;
            
            console.log('🔑 추출된 토큰:', token);
            console.log('👤 사용자 정보:', user);
            
            if (token) {
              // AuthContext의 login 함수를 사용하여 로그인 상태 업데이트
              login(
                token,
                user.id.toString(),
                user.nickname,
                user.email
              );
              localStorage.setItem('isSuccess', "true");
              localStorage.setItem('authToken', token);
              localStorage.setItem('memberId', user.id.toString());
              localStorage.setItem('nickname', user.nickname);
              localStorage.setItem('email', user.email);
              
              console.log('✅ 로그인 성공! URL 파라미터 즉시 제거하여 재시도 방지');
              // React Router와 브라우저 히스토리 모두에서 파라미터 제거
              window.history.replaceState({}, document.title, '/landing');
              navigate('/landing', { replace: true });
              
              console.log('🔄 로그인 완료 - 재시도 방지 완료');
            } else {
              console.error('❌ 토큰이 없습니다:', data);
              alert('로그인 토큰을 받지 못했습니다. 다시 시도해주세요.');
              window.history.replaceState({}, document.title, '/landing');
              navigate('/landing', { replace: true });
            }
          } else {
            console.error('❌ 카카오 로그인 실패: 백엔드 응답 데이터가 올바르지 않습니다.', data);
            alert('카카오 로그인에 실패했습니다. (서버 응답 데이터 오류)');
            // 실패 시에도 URL 파라미터 제거하여 재시도 방지
            window.history.replaceState({}, document.title, '/landing');
            navigate('/landing', { replace: true });
          }
        })
        .catch((error: Error) => {
          console.error('카카오 로그인 에러 상세:', error);
          if (error?.message) {
            console.error('백엔드 응답 에러 메시지:', error.message);
          }
          
          // invalid_grant 에러인 경우 특별한 메시지 표시 (한 번만)
          if (!alertShownRef.current) {
            alertShownRef.current = true;
            if (error?.message?.includes('invalid_grant')) {
              alert('인증 코드가 만료되었거나 이미 사용되었습니다. 다시 로그인해주세요.');
            } else {
              alert('카카오 로그인 중 오류가 발생했습니다.');
            }
          }
          
          // 에러 발생 시에도 URL 파라미터 제거하여 재시도 방지
          window.history.replaceState({}, document.title, '/landing');
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
      console.log('- 코드 중복 체크:', processedCodeRef.current !== code);
      console.log('- 기존 처리된 코드:', processedCodeRef.current ? processedCodeRef.current.substring(0, 10) + '...' : 'null');
      console.log('- 현재 받은 코드:', code ? code.substring(0, 10) + '...' : 'null');
    }
  }, [location.search]); // location.search만 의존성으로 설정하여 불필요한 재실행 방지

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