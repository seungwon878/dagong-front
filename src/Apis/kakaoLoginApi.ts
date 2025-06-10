// 


// src/Apis/kakaoLoginApi.ts

export interface KakaoLoginResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: {
    token: string;
    id: number;
    nickname: string;
    email: string;
  };
}

export async function getKakaoLogin(code: string): Promise<KakaoLoginResponse> {
  const url = `/auth/login/kakao?code=${encodeURIComponent(code)}`;
  const res = await fetch(url, {
    // credentials 등 필요하다면 여기에 추가
    // credentials: 'include'
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json();
}
