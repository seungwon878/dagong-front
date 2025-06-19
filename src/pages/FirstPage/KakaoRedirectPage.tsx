// 


// src/pages/KakaoRedirectPage.tsx

import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getKakaoLogin, checkBackendHealth } from '../../Apis/kakaoLoginApi';

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

    // 백엔드 서버 상태 먼저 확인
    checkBackendHealth().then(isHealthy => {
      if (!isHealthy) {
        console.error('백엔드 서버가 응답하지 않습니다.');
        alert('서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.');
        navigate('/', { replace: true });
        return;
      }
      
      // 백엔드가 정상이면 카카오 로그인 진행
      getKakaoLogin(code)
        .then(data => {
          if (data.isSuccess && data.result) {
            localStorage.setItem('authToken', data.result.token);
            localStorage.setItem('memberId', data.result.id.toString());
            localStorage.setItem('nickname', data.result.nickname);
            localStorage.setItem('email', data.result.email);
            navigate('/upload', { replace: true });
          } else {
            alert('카카오 로그인에 실패했습니다.');
            navigate('/', { replace: true });
          }
        })
        .catch(err => {
          console.error('카카오 로그인 에러 상세:', err);
          alert('카카오 로그인 중 오류가 발생했습니다.');
          navigate('/', { replace: true });
        });
    });
  }, [location, navigate]);

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
};

export default KakaoRedirectPage;
