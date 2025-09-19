// API 설정 중앙화
export const API_CONFIG = {
  // 백엔드 기본 URL (Netlify 프록시 사용)
  BASE_URL: '',
  
  // 카카오 API 설정
  KAKAO: {
    REST_API_KEY: '5955280f944cb8528d2e482805bf936e',
    REDIRECT_URI: {
      DEV: 'http://localhost:5173/landing',
      PROD: 'https://dagong.netlify.app/landing'
    }
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
