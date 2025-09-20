// 네이버 쇼핑 상품 검색 API 연동
// 실제 clientId, clientSecret은 환경변수로 분리해서 사용하세요.

export interface NaverSearchItem {
  title: string;
  link: string;
  image: string;
  lprice: number;
  brand: string;
  category1: string;
  category2: string;
}

export interface NaverSearchResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    totalCount: number;
    page: number;
    pageSize: number;
    items: NaverSearchItem[];
  };
}

export async function searchNaverProducts(query: string, page = 1, size = 10): Promise<NaverSearchResponse> {
  const url = `/search?query=${encodeURIComponent(query)}&page=${page}&size=${size}`;
  const token = localStorage.getItem('authToken');
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error('네이버 상품 검색 실패');
  return res.json();
} 