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
    
    // 간단한 HEAD 요청으로 서버 응답 확인
    const res = await fetch('/auth/login/kakao', {
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
    const url = `/auth/login/kakao?code=${encodeURIComponent(code)}`;
    console.log('카카오 로그인 요청 URL:', url);
    
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
      console.error('서버 에러 응답:', errorText);
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
        console.warn('백엔드 서버에 연결할 수 없습니다. 개발 모드에서 모의 응답을 사용합니다.');
        
        // 개발 환경에서 모의 응답 반환 (테스트용)
        if (import.meta.env.DEV) {
          return {
            isSuccess: true,
            code: '200',
            message: '개발 모드 - 모의 로그인 성공',
            result: {
              token: 'mock-token-' + Date.now(),
              user: {
                id: 1,
                nickname: '테스트 사용자',
                email: 'test@example.com'
              }
            }
          };
        }
        
        throw new Error('백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
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
