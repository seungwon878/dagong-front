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
//   const res = await fetch(`/purchases/${memberId}`, {
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

  // 🔍 디버깅: 요청 전 상세 정보 로깅
  console.log('🚀 공구 등록 API 호출 시작');
  console.log('📋 memberId:', memberId, '(타입:', typeof memberId, ')');
  console.log('📄 요청 데이터:', JSON.stringify(data, null, 2));
  console.log('🔑 토큰 존재:', !!token, '길이:', token?.length || 0);
  console.log('🌐 요청 URL:', `/purchases/${memberId}`);
  
  // 데이터 유효성 체크
  const requiredFields = ['title', 'content', 'name', 'imageUrl', 'category1', 'category2', 'price', 'quantity', 'maxParticipants'];
  const missingFields = requiredFields.filter(field => !data[field as keyof GroupPurchaseData]);
  if (missingFields.length > 0) {
    console.error('❌ 필수 필드 누락:', missingFields);
  }

  // 2) API 호출
  const res = await fetch(`/purchases/${memberId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 🧪 임시 테스트: Authorization 헤더 제거 (Swagger와 동일하게)
      // ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });

  // 3) 에러 처리 (401, 403, 400 등 status별 분기 가능)
  if (!res.ok) {
    console.error(`🚨 공구 등록 API 에러 - Status: ${res.status}, StatusText: ${res.statusText}`);
    console.error('📝 요청 데이터:', data);
    console.error('🔑 요청 헤더 Authorization:', token ? 'Bearer ***' : 'None');
    console.error('🌐 요청 URL:', `/purchases/${memberId}`);
    
    // 서버 에러 응답 상세 정보 수집
    let errorMessage = `HTTP error! status: ${res.status}`;
    try {
      const errorData = await res.json();
      console.error('🔴 서버 에러 응답:', errorData);
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      console.error('❌ 에러 응답 파싱 실패:', e);
    }
    
    if (res.status === 401) {
      throw new Error('인증이 필요합니다. 로그인 후 다시 시도해주세요.');
    }
    if (res.status === 403) {
      throw new Error('권한이 없습니다.');
    }
    if (res.status === 404) {
      throw new Error('잘못된 요청입니다.');
    }
    if (res.status === 500) {
      throw new Error(`서버 내부 에러가 발생했습니다: ${errorMessage}`);
    }
    throw new Error(`공구 등록에 실패했습니다: ${errorMessage}`);
  }

  // 4) 성공 응답 JSON 파싱
  const json: GroupPurchaseResponse = await res.json();
  return json;
}

// 카테고리별 상품 목록 조회
export const getCategoryProducts = async (category1: string, category2: string, page: number = 1, size: number = 10) => {
  const token = localStorage.getItem('authToken');
  try {
    const response = await fetch(`/purchases/category?category1=${encodeURIComponent(category1)}&category2=${encodeURIComponent(category2)}&page=${page}&size=${size}`, {
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
  try {
    const response = await fetch(`/purchases/${memberId}?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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

/**
 * 인기 공구 목록을 조회합니다. (조회수 또는 찜 수 기준)
 * @param sort 정렬 기준 ('views' 또는 'likes')
 * @param page 페이지 번호
 * @param size 페이지 당 항목 수
 * @returns 정렬된 공구 목록
 */
export const getRankedProducts = async (
  sort: 'views' | 'likes',
  page: number = 1,
  size: number = 10
) => {
  const token = localStorage.getItem('authToken');
  const query = new URLSearchParams({
    sort,
    page: page.toString(),
    size: size.toString(),
  }).toString();

  const response = await fetch(`/purchases/ranking?${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: '응답 본문이 없거나 JSON 형식이 아닙니다.' }));
    console.error('인기 상품 목록 조회 실패:', response.status, errorBody);
    throw new Error(errorBody.message || '인기 상품 목록을 가져오는데 실패했습니다.');
  }

  return await response.json();
};

/**
 * 상품명으로 공구 상품을 검색합니다.
 * @param itemName 검색할 상품명
 * @param sort 정렬 기준 ('views', 'likes', 'latest')
 * @param page 페이지 번호
 * @param size 페이지 당 상품 수
 * @returns 검색된 상품 목록
 */
export const searchProducts = async (
  itemName: string,
  sort: 'views' | 'likes' | 'latest' = 'latest',
  page: number = 1,
  size: number = 10
) => {
  const memberId = localStorage.getItem('memberId');
  if (!memberId) {
    throw new Error('로그인이 필요합니다.');
  }

  const token = localStorage.getItem('authToken');
  const query = new URLSearchParams({
    memberId,
    itemName,
    sort,
    page: page.toString(),
    size: size.toString(),
  }).toString();

  const response = await fetch(`/purchases/search/items?${query}`, {
    method: 'GET',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: '응답 본문이 없거나 JSON 형식이 아닙니다.' }));
    console.error('상품 검색 실패:', response.status, errorBody);
    throw new Error(errorBody.message || '상품을 검색하는데 실패했습니다.');
  }

  return await response.json();
};

/**
 * 최신 공구 목록을 조회합니다. (회원의 동네 기준)
 * @param memberId 회원 ID
 * @param page 페이지 번호
 * @param size 페이지 당 항목 수
 * @returns 최신 공구 목록
 */
export const getLatestProducts = async (
    memberId: number,
    page: number = 1,
    size: number = 10
) => {
    const token = localStorage.getItem('authToken');
    const query = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
    }).toString();

    const response = await fetch(`/purchases/mine/${memberId}?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ message: '응답 본문이 없거나 JSON 형식이 아닙니다.' }));
        console.error('최신 상품 목록 조회 실패:', response.status, errorBody);
        throw new Error(errorBody.message || '최신 상품 목록을 가져오는데 실패했습니다.');
    }

    return await response.json();
};

/**
 * 사용자가 등록한 공구 목록을 최신순으로 조회합니다.
 * @param memberId 회원 ID
 * @param page 페이지 번호
 * @param size 페이지 당 항목 수
 * @returns 사용자가 등록한 공구 목록
 */
export const getMyProducts = async (
    memberId: number,
    page: number = 1,
    size: number = 20
) => {
    const token = localStorage.getItem('authToken');
    const query = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
    }).toString();

    const response = await fetch(`/purchases/mine/${memberId}?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ message: '응답 본문이 없거나 JSON 형식이 아닙니다.' }));
        console.error('내가 올린 공구 목록 조회 실패:', response.status, errorBody);
        throw new Error(errorBody.message || '내가 올린 공구 목록을 가져오는데 실패했습니다.');
    }

    return await response.json();
};

// 내가 참여한 공구 목록 조회
export const getMyJoinedProducts = async (memberId: number) => {
  try {
    const response = await fetch(
      `/purchases/participate/${memberId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('내가 참여한 공구 목록 조회 실패:', error);
    throw error;
  }
};

// 공구 참여 취소
export const cancelParticipation = async (groupPurchaseId: number, memberId: number) => {
  try {
    const response = await fetch(
      `/purchases/participate/${groupPurchaseId}/${memberId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('공구 참여 취소 실패:', error);
    throw error;
  }
};

/**
 * ID로 특정 공구 상품을 삭제합니다.
 * @param groupPurchaseId 삭제할 공구 상품의 ID
 */
export const deleteProduct = async (groupPurchaseId: number) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`/purchases/${groupPurchaseId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: '응답 본문이 없거나 JSON 형식이 아닙니다.' }));
        console.error('공구 삭제 실패:', response.status, errorData);
        throw new Error(errorData.message || '공구 삭제에 실패했습니다.');
    }

    return response.json();
};


/**
 * ID로 특정 공구 상품의 상세 정보를 조회합니다.
 * @param groupPurchaseId 조회할 공구 상품의 ID
 * @returns 공구 상품의 상세 정보
 */
export const getGroupPurchaseDetail = async (groupPurchaseId: number) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`/purchases/detail/${groupPurchaseId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    } catch (e) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  return response.json();
}
