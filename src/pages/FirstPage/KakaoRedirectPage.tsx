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
    
    // 디버그: URL 파라미터 확인
    console.log('=== KakaoRedirectPage 디버그 ===');
    console.log('현재 URL:', window.location.href);
    console.log('location.search:', location.search);
    console.log('전체 URL 파라미터:', Object.fromEntries(params.entries()));
    console.log('추출된 code:', code);
    console.log('code 타입:', typeof code);
    console.log('code 길이:', code?.length);
    console.log('handledRef.current:', handledRef.current);
    console.log('========================');
    
    if (!code) {
      console.log('❌ code 파라미터가 없습니다.');
      return;
    }

    console.log('✅ code 파라미터 발견 - 로그인 처리 시작');
    handledRef.current = true;

    // 백엔드 서버 상태 먼저 확인
    checkBackendHealth().then(isHealthy => {
      console.log('백엔드 서버 상태:', isHealthy);
      if (!isHealthy) {
        console.error('백엔드 서버가 응답하지 않습니다.');
        alert('서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.');
        navigate('/', { replace: true });
        return;
      }
      
      // 백엔드가 정상이면 카카오 로그인 진행
      getKakaoLogin(code)
        .then(data => {
          console.log('카카오 로그인 성공 응답:', data);
          if (data.isSuccess && data.result) {
            localStorage.setItem('isSuccess', "true");
            localStorage.setItem('authToken', data.result.token);
            localStorage.setItem('memberId', data.result.user.id.toString());
            localStorage.setItem('nickname', data.result.user.nickname);
            localStorage.setItem('email', data.result.user.email);
            navigate('/upload', { replace: true });
          } else {
            console.error('카카오 로그인 실패:', data);
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
