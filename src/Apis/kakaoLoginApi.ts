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
    // 간단한 HEAD 요청으로 서버 응답 확인
    const res = await fetch('/auth/login/kakao', {
      method: 'HEAD',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('백엔드 헬스체크 응답:', res.status, res.statusText);
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
    const url = `/auth/login/kakao-test?code=${encodeURIComponent(code)}`;
    
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('서버 에러 응답:', errorText);
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }
    
    // Content-Type 확인
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const responseText = await res.text();
      console.error('서버가 JSON이 아닌 응답을 보냄:', responseText);
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
