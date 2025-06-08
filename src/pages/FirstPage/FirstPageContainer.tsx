import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FirstPagePresentation from './FirstPagePresentation';
import { getKakaoLogin } from '../../Apis/kakaoLoginApi';

const REST_API_KEY = '1f60ce581c951d8faae4ace440a8c707';

const FirstPageContainer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 카카오 인증 후 콜백 처리
  useEffect(() => {
    if (location.pathname === '/kakao') {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');
      if (code) {
        getKakaoLogin(code)
          .then(data => {
            if (data.isSuccess && data.result) {
              localStorage.setItem('authToken', data.result.token);
              localStorage.setItem('memberId', data.result.id.toString());
              localStorage.setItem('nickname', data.result.nickname);
              localStorage.setItem('email', data.result.email);
              navigate('/landing');
            } else {
              alert('카카오 로그인에 실패했습니다.');
              navigate('/');
            }
          })
          .catch(() => {
            alert('카카오 로그인 중 오류가 발생했습니다.');
            navigate('/');
          });
      }
    }
  }, [location, navigate]);

  const handleKakaoLogin = () => {
    const state = Date.now().toString();
    const redirectUri = 'http://localhost:5173/kakao';
    const kakaoAuthUrl =
      `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=code` +
      `&state=${state}`;
    window.location.replace(kakaoAuthUrl);
  };

  return <FirstPagePresentation onKakaoLogin={handleKakaoLogin} />;
};

export default FirstPageContainer;
