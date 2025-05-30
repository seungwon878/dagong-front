// 네이버 쇼핑 상품 검색 API 연동
// 실제 clientId, clientSecret은 환경변수로 분리해서 사용하세요.

export async function searchNaverProducts(query: string) {
  const clientId = 'YOUR_NAVER_CLIENT_ID'; // process.env.REACT_APP_NAVER_CLIENT_ID
  const clientSecret = 'YOUR_NAVER_CLIENT_SECRET'; // process.env.REACT_APP_NAVER_CLIENT_SECRET
  const url = `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent(query)}&display=10`;

  const res = await fetch(url, {
    headers: {
      'X-Naver-Client-Id': clientId,
      'X-Naver-Client-Secret': clientSecret,
    },
  });
  if (!res.ok) throw new Error('네이버 상품 검색 실패');
  return res.json();
} 