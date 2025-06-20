// export async function registerGroupPurchase(memberId: number, data: {
//   title: string;
//   content: string;
//   name: string;
//   imageUrl: string;
//   category1: string;
//   category2: string;
//   price: number;
//   quantity: number;
//   maxParticipants: number;
// }) {
//   const token = localStorage.getItem('authToken');
//   const res = await fetch(`/api/purchases/${memberId}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
//     },
//     body: JSON.stringify(data),
//   });
//   if (!res.ok) throw new Error('공구 등록에 실패했습니다.');
//   return res.json();
// } 





// src/apis/purchaseApi.ts

export interface GroupPurchaseData {
  title: string;
  content: string;
  name: string;
  imageUrl: string;
  category1: string;
  category2: string;
  price: number;
  quantity: number;
  maxParticipants: number;
}

export interface GroupPurchaseResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    groupPurchaseId: number;
  };
}

/**
 * 로그인한 멤버(memberId)가 새로운 공구를 등록합니다.
 * @param memberId  등록 요청하는 멤버의 ID
 * @param data      공구 등록에 필요한 정보
 * @throws Error   네트워크/응답 오류 시
 */
export async function registerGroupPurchase(
  memberId: number,
  data: GroupPurchaseData
): Promise<GroupPurchaseResponse> {
  // 1) 로컬스토리지에서 토큰 꺼내기
  const token = localStorage.getItem('authToken');

  // 2) API 호출
  const res = await fetch(`/api/purchases/${memberId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 토큰이 있으면 Authorization 헤더 추가
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });

  // 3) 에러 처리 (401, 403, 400 등 status별 분기 가능)
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('인증이 필요합니다. 로그인 후 다시 시도해주세요.');
    }
    if (res.status === 403) {
      throw new Error('권한이 없습니다.');
    }
    if (res.status === 404) {
      throw new Error('잘못된 요청입니다.');
    }
    throw new Error('공구 등록에 실패했습니다.');
  }

  // 4) 성공 응답 JSON 파싱
  const json: GroupPurchaseResponse = await res.json();
  return json;
}

// 카테고리별 상품 목록 조회
export const getCategoryProducts = async (category1: string, category2: string, page: number = 1, size: number = 10) => {
  const token = localStorage.getItem('authToken');
  try {
    const response = await fetch(`/api/purchases/category?category1=${encodeURIComponent(category1)}&category2=${encodeURIComponent(category2)}&page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch category products');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching category products:', error);
    throw error;
  }
};

// 전체 상품 목록 조회
export const getAllProducts = async (memberId: number, page: number = 1, size: number = 10) => {
  const token = localStorage.getItem('authToken');
  console.log("토큰", token);
  try {
    const response = await fetch(`/api/purchases/${memberId}?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    
    if (!response.ok) {
      // 500 에러를 포함하여 서버에서 오는 모든 에러를 처리합니다.
      const errorBody = await response.json().catch(() => ({ message: '응답 본문이 없거나 JSON 형식이 아닙니다.' }));
      console.error('상품 목록 조회 실패:', response.status, errorBody);
      throw new Error(errorBody.message || '상품 목록을 가져오는데 실패했습니다.');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
