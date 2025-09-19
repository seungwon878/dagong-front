import { createApiUrl, createKakaoLoginUrl } from '../config/api';

export interface KakaoLoginResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: {
    token: string;
    user: {
      id: number;
      nickname: string;
      email: string;
    }
  };
}

// 백엔드 서버 상태 확인 함수
export async function checkBackendHealth(): Promise<boolean> {
  try {
    console.log('백엔드 서버 상태 확인 중...');
    
    const url = createApiUrl('/auth/login/kakao');
    
    // 간단한 HEAD 요청으로 서버 응답 확인
    const res = await fetch(url, {
      method: 'HEAD',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('백엔드 헬스체크 응답:', res.status, res.statusText);
    console.log('백엔드 헬스체크 헤더:', Object.fromEntries(res.headers.entries()));
    
    // 401, 403, 404 등은 서버가 응답하고 있다는 의미이므로 true 반환
    // 네트워크 오류나 서버 다운 시에만 false 반환
    return true;
  } catch (error) {
    console.error('백엔드 헬스체크 실패:', error);
    return false;
  }
}

export async function getKakaoLogin(code: string): Promise<KakaoLoginResponse> {
  try {
    // 코드 유효성 검증
    if (!code || code.trim() === '') {
      throw new Error('카카오 인증 코드가 비어있습니다.');
    }
    
    if (code.length < 10) {
      console.warn('⚠️ 카카오 인증 코드가 너무 짧습니다:', code);
    }
    
    const url = createKakaoLoginUrl(code);
    console.log('🚀 카카오 로그인 요청 URL:', url);
    console.log('🔒 환경:', import.meta.env.DEV ? '개발(Vite 프록시)' : '프로덕션(Netlify Functions)');
    console.log('📝 원본 code:', code);
    console.log('🔒 인코딩된 code:', encodeURIComponent(code));
    console.log('📏 코드 길이:', code.length);
    console.log('전체 요청 정보:', {
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('카카오 로그인 응답 상태:', res.status, res.statusText);
    console.log('카카오 로그인 응답 헤더:', Object.fromEntries(res.headers.entries()));
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('❌ 서버 에러 응답:', errorText);
      console.error('🔍 에러 상세 정보:', {
        status: res.status,
        statusText: res.statusText,
        errorText: errorText,
        requestUrl: url,
        headers: Object.fromEntries(res.headers.entries()),
        timestamp: new Date().toISOString()
      });
      
      // 에러 텍스트를 JSON으로 파싱 시도
      try {
        const errorJson = JSON.parse(errorText);
        console.error('📋 파싱된 에러 JSON:', errorJson);
        
        // 카카오 에러 코드 확인
        if (errorJson.result && typeof errorJson.result === 'string') {
          const kakaoErrorMatch = errorJson.result.match(/error_code":"([^"]+)"/);
          if (kakaoErrorMatch) {
            console.error('🔑 카카오 에러 코드:', kakaoErrorMatch[1]);
          }
        }
      } catch (parseError) {
        console.error('⚠️ 에러 응답 JSON 파싱 실패:', parseError);
      }
      
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }
    
    // Content-Type 확인
    const contentType = res.headers.get('content-type');
    console.log('응답 Content-Type:', contentType);
    
    if (!contentType || !contentType.includes('application/json')) {
      const responseText = await res.text();
      console.error('서버가 JSON이 아닌 응답을 보냄:', responseText);
      
      // 백엔드 서버 연결 실패인지 확인
      if (responseText.includes('<!doctype html>') || responseText.includes('<html')) {
        console.error('백엔드 서버에 연결할 수 없습니다. HTML 응답을 받았습니다.');
        throw new Error('백엔드 서버 연결 실패: 서버가 HTML 응답을 보냈습니다.');
      }
      
      throw new Error(`서버가 JSON이 아닌 응답을 보냈습니다. Content-Type: ${contentType}`);
    }
    
    const data = await res.json();
    console.log('카카오 로그인 응답:', data);
    return data;
  } catch (error) {
    console.error('카카오 로그인 에러:', error);
    throw error;
  }
}
