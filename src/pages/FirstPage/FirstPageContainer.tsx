import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FirstPagePresentation from './FirstPagePresentation';
import { getKakaoLogin } from '../../Apis/kakaoLoginApi';
import { API_CONFIG } from '../../config/api';

const FirstPageContainer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 카카오 인증 후 콜백 처리 (백엔드 redirect를 사용하지 않는 경우)
  useEffect(() => {
    if (location.pathname === '/kakao') {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');
      if (code) {
        getKakaoLogin(code)
          .then(data => {
            console.log('카카오 로그인 응답:', data);
            if (data.isSuccess && data.result && data.result.token && data.result.user) {
              // 로그인 성공
              localStorage.setItem('isSuccess', "true");
              localStorage.setItem('authToken', data.result.token);
              localStorage.setItem('memberId', data.result.user.id.toString());
              localStorage.setItem('nickname', data.result.user.nickname);
              if (data.result.user.email) {
                localStorage.setItem('email', data.result.user.email);
              }
              console.log('로그인 성공, /upload로 이동');
              navigate('/upload');
            } else {
              console.error('로그인 실패 - 응답 데이터 구조 오류:', data);
              alert(`카카오 로그인에 실패했습니다.\n${data.message || '알 수 없는 오류'}`);
              navigate('/');
            }
          })
          .catch((error) => {
            console.error('카카오 로그인 에러 상세:', error);
            let errorMessage = '카카오 로그인 중 오류가 발생했습니다.';
            
            if (error.message.includes('백엔드 서버 연결 실패')) {
              errorMessage = '서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.';
            } else if (error.message.includes('HTTP 400')) {
              errorMessage = '잘못된 요청입니다. 다시 로그인해주세요.';
            } else if (error.message.includes('HTTP 401')) {
              errorMessage = '인증에 실패했습니다. 다시 로그인해주세요.';
            }
            
            alert(errorMessage);
            navigate('/');
          });
      }
    }
  }, [location, navigate]);

  const handleKakaoLogin = () => {
    const state = Date.now().toString();
    
    // 하드코딩된 버전으로 테스트
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${API_CONFIG.KAKAO.REST_API_KEY}&redirect_uri=https://dagong.netlify.app/landing&state=${state}`;
    
    console.log('🔗 하드코딩된 카카오 로그인 설정:', {
      url: KAKAO_AUTH_URL,
      isDev: import.meta.env.DEV,
      currentUrl: window.location.href,
      fixedRedirectUri: 'https://dagong.netlify.app/landing'
    });
    
    console.log('📋 카카오 개발자 콘솔에 등록된 URI:', 'https://dagong.netlify.app/landing');
    console.log('🚀 하드코딩된 카카오 인증 URL:', KAKAO_AUTH_URL);
    
    window.location.replace(KAKAO_AUTH_URL);
  };

  return <FirstPagePresentation onKakaoLogin={handleKakaoLogin} />;
};

export default FirstPageContainer;
