// 


// src/pages/KakaoRedirectPage.tsx

import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getKakaoLogin } from '../../Apis/kakaoLoginApi';

const KakaoRedirectPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;

    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    if (!code) return;

    handledRef.current = true;

    // 카카오 개발자 콘솔에 등록된, 고정된 redirect URI
 //   const redirectUri = 'http://localhost:5173/kakao';

    getKakaoLogin(code)
      .then(data => {
        if (data.isSuccess && data.result) {
          localStorage.setItem('authToken', data.result.token);
          localStorage.setItem('memberId', data.result.id.toString());
          localStorage.setItem('nickname', data.result.nickname);
          localStorage.setItem('email', data.result.email);
          navigate('/landing', { replace: true });
        } else {
          alert('카카오 로그인에 실패했습니다.');
          navigate('/', { replace: true });
        }
      })
      .catch(err => {
        console.error('Kakao login error:', err);
        alert('카카오 로그인 중 오류가 발생했습니다.');
        navigate('/', { replace: true });
      });
  }, [location, navigate]);

  return null;
};

export default KakaoRedirectPage;
