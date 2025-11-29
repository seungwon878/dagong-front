/**
 * 사용자 닉네임을 업데이트하기 위한 API 요청 함수 (닉네임 전용)
 * @param memberId 수정할 사용자의 ID
 * @param nickname 새로운 닉네임
 * @returns API 응답
 */
export const updateNickname = async (memberId: number, nickname: string) => {
  const token = localStorage.getItem('authToken');
  const res = await fetch(`/member/${memberId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ nickname }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || '닉네임 수정에 실패했습니다.');
  }
  return res.json();
};

/**
 * 사용자 주소를 업데이트하기 위한 API 요청 함수 (주소 전용)
 * @param memberId 수정할 사용자의 ID
 * @param address 새로운 주소
 * @param detailAddress 새로운 상세주소
 * @returns API 응답
 */
export const updateAddress = async (
  memberId: number,
  address: string,
  detailAddress: string
) => {
  const token = localStorage.getItem('authToken');
  // 주소 변경을 위한 API 엔드포인트가 닉네임 변경과 동일하다고 가정합니다.
  // 백엔드에서 body의 필드를 보고 부분 업데이트를 지원해야 합니다.
  const res = await fetch(`/member/${memberId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ address, detailAddress }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || '주소 수정에 실패했습니다.');
  }
  return res.json();
};

/**
 * @deprecated updateNickname과 updateAddress로 분리되었습니다.
 */
export const updateUserInfo = async (
  memberId: number, 
  nickname: string, 
  address: string, 
  detailAddress: string
) => {
  // 이 함수는 이제 사용되지 않지만, 다른 곳에서 참조할 경우를 대비해 남겨둡니다.
  // 실제로는 updateNickname과 updateAddress를 각각 사용해야 합니다.
  console.warn('updateUserInfo is deprecated. Use updateNickname or updateAddress instead.');
  const token = localStorage.getItem('authToken');
  const res = await fetch(`/member/${memberId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ nickname, address, detailAddress }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || '정보 수정에 실패했습니다.');
  }
  return res.json();
};

/**
 * 사용자 정보를 가져오기 위한 API 요청 함수
 * @param memberId 조회할 사용자의 ID
 * @returns API 응답 (사용자 정보 포함)
 */
export const getUserInfo = async (memberId: number): Promise<{ 
  isSuccess: boolean;
  result: { 
    nickname: string;
  } 
}> => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`/member/${memberId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('사용자 정보 조회 실패');
  }
  return response.json();
};

/**
 * 사용자 관심 카테고리를 업데이트하기 위한 API 요청 함수
 * @param memberId 수정할 사용자의 ID
 * @param categories 새로운 카테고리 정보
 * @returns API 응답
 */
export async function updateUserCategories(memberId: number, categories: { category1: string, category2: string }) {
  const token = localStorage.getItem('authToken');

  const response = await fetch(`/member/${memberId}/categories`, {
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
  const response = await fetch(`/member/${memberId}`, {
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
  const response = await fetch(`/member/${memberId}`, {
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
  const response = await fetch(`/member/members/${memberId}/likes`, {
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