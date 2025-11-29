/**
 * 이미지 URL을 HTTPS로 변환하는 유틸리티 함수
 * Mixed Content 에러를 방지하기 위해 HTTP 이미지 URL을 HTTPS로 변경
 */
export const ensureHttpsImageUrl = (url: string | undefined | null): string => {
  if (!url) {
    return '/img/dagong.png'; // 기본 이미지
  }

  // 이미 HTTPS이거나 상대 경로인 경우 그대로 반환
  if (url.startsWith('https://') || url.startsWith('/') || url.startsWith('./')) {
    return url;
  }

  // HTTP URL을 HTTPS로 변환
  if (url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }

  // 프로토콜이 없는 경우 HTTPS 추가
  if (url.startsWith('//')) {
    return `https:${url}`;
  }

  // 기타 경우 HTTPS 프로토콜 추가
  return `https://${url}`;
};

/**
 * 카카오 이미지 URL을 안전한 HTTPS URL로 변환
 */
export const ensureHttpsKakaoImageUrl = (url: string | undefined | null): string => {
  const httpsUrl = ensureHttpsImageUrl(url);
  
  // 카카오 CDN의 경우 특별 처리
  if (httpsUrl.includes('k.kakaocdn.net') && httpsUrl.startsWith('http://')) {
    return httpsUrl.replace('http://k.kakaocdn.net', 'https://k.kakaocdn.net');
  }
  
  return httpsUrl;
};
