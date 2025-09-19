// API 설정 중앙화
export const API_CONFIG = {
  // 백엔드 기본 URL 
  BASE_URL: import.meta.env.DEV ? '' : '',
  
  // Netlify Functions URL (HTTPS 보장)
  NETLIFY_FUNCTIONS_URL: '/.netlify/functions',
  
  // 카카오 API 설정
  KAKAO: {
    REST_API_KEY: '5955280f944cb8528d2e482805bf936e',
    REDIRECT_URI: {
      DEV: 'http://localhost:5173/landing',
      PROD: 'https://dagong.netlify.app/landing'
    },
    // 카카오 개발자 콘솔에 등록해야 할 모든 URI 목록
    ALL_REDIRECT_URIS: [
      'http://localhost:5173/landing',
      'https://dagong.netlify.app/landing',
      'http://localhost:5173/',
      'https://dagong.netlify.app/',
      'http://localhost:5173/kakao',
      'https://dagong.netlify.app/kakao'
    ]
  }
} as const;

// 환경별 Redirect URI 가져오기
export const getKakaoRedirectUri = () => {
  return import.meta.env.DEV 
    ? API_CONFIG.KAKAO.REDIRECT_URI.DEV 
    : API_CONFIG.KAKAO.REDIRECT_URI.PROD;
};

// API URL 생성 헬퍼
export const createApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// 카카오 로그인 전용 URL (Netlify Functions 사용)
export const createKakaoLoginUrl = (code: string) => {
  if (import.meta.env.DEV) {
    // 개발환경: 기존 프록시 사용
    return `/auth/login/kakao?code=${encodeURIComponent(code)}`;
  } else {
    // 프로덕션: Netlify Functions 사용 (HTTPS 보장)
    // 만약 Netlify Functions가 실패하면 CORS 프록시 대안 사용 가능
    // return `https://cors-anywhere.herokuapp.com/http://3.39.43.178:8080/auth/login/kakao?code=${encodeURIComponent(code)}`;
    return `${API_CONFIG.NETLIFY_FUNCTIONS_URL}/kakao-login?code=${encodeURIComponent(code)}`;
  }
};
