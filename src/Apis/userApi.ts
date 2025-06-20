/**
 * 사용자 정보를 업데이트하기 위한 API 요청 함수
 * @param memberId 수정할 사용자의 ID
 * @param nickname 새로운 닉네임
 * @returns API 응답
 */
export async function updateUserInfo(memberId: number, nickname: string) {
  const token = localStorage.getItem('authToken');

  const response = await fetch(`/api/member/${memberId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ nickname }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '닉네임 변경에 실패했습니다.');
  }

  return response.json();
}

/**
 * 사용자 정보를 가져오기 위한 API 요청 함수
 * @param memberId 조회할 사용자의 ID
 * @returns API 응답 (사용자 정보 포함)
 */
export async function getUserInfo(memberId: number) {
  const token = localStorage.getItem('authToken');

  const response = await fetch(`/api/member/${memberId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '사용자 정보 조회에 실패했습니다.');
  }

  return response.json();
}

/**
 * 사용자 관심 카테고리를 업데이트하기 위한 API 요청 함수
 * @param memberId 수정할 사용자의 ID
 * @param categories 새로운 카테고리 정보
 * @returns API 응답
 */
export async function updateUserCategories(memberId: number, categories: { category1: string, category2: string }) {
  const token = localStorage.getItem('authToken');

  const response = await fetch(`/api/member/${memberId}/categories`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(categories),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '카테고리 변경에 실패했습니다.');
  }

  return response.json();
}

/**
 * ID로 특정 회원 정보를 조회합니다.
 * @param memberId 조회할 회원의 ID
 * @returns 회원의 상세 정보
 */
export const getMemberInfo = async (memberId: number) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`/api/member/${memberId}`, {
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
      // 응답이 JSON 형식이 아닐 경우
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  return response.json();
};

/**
 * ID로 회원을 탈퇴 처리합니다.
 * @param memberId 탈퇴할 회원의 ID
 * @returns 성공 여부
 */
export const deleteMember = async (memberId: number) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`/api/member/${memberId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || '회원 탈퇴에 실패했습니다.');
    } catch (e) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  return response.json();
};

/**
 * 특정 회원이 찜한 상품 목록을 조회합니다.
 * @param memberId 조회할 회원의 ID
 * @returns 찜한 상품 목록
 */
export const getLikedItems = async (memberId: number) => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`/api/member/members/${memberId}/likes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || '찜한 상품 목록 조회에 실패했습니다.');
    } catch (e) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  return response.json();
} 