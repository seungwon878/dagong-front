import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FirstPagePresentation from './FirstPagePresentation';
import { getKakaoLogin } from '../../Apis/kakaoLoginApi';

const REST_API_KEY = '5955280f944cb8528d2e482805bf936e';

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
            if (data.isSuccess && data.result) {
              localStorage.setItem('isSuccess', "true");
              localStorage.setItem('authToken', data.result.token);
              localStorage.setItem('memberId', data.result.user.id.toString());
              localStorage.setItem('nickname', data.result.user.nickname);
              localStorage.setItem('email', data.result.user.email);
              navigate('/upload');
            } else {
              alert('카카오 로그인에 실패했습니다.');
              navigate('/');
            }
          })
          .catch((error) => {
            console.error('카카오 로그인 에러:', error);
            alert('카카오 로그인 중 오류가 발생했습니다.');
            navigate('/');
          });
      }
    }
  }, [location, navigate]);

  const handleKakaoLogin = () => {
    const state = Date.now().toString();
  //  const redirectUri = 'http://13.209.95.208:8080/auth/login/kakao';
    const redirectUri = 'https://splendorous-entremet-55d2d5.netlify.app/landing';
    const kakaoAuthUrl =
      `http://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=code` +
      `&state=${state}`;
    window.location.replace(kakaoAuthUrl);
  };

  return <FirstPagePresentation onKakaoLogin={handleKakaoLogin} />;
};

export default FirstPageContainer;
