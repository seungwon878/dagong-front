export interface Location {
  townId: number;
  city: string;
  district: string;
  town: string;
  isCurrent?: boolean;
}

/**
 * 회원의 주소 목록을 조회합니다.
 * @param memberId 조회할 회원의 ID
 * @returns 회원의 주소 목록
 */
export const getUserLocations = async (memberId: number): Promise<{ isSuccess: boolean; result: Location[] }> => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`/location/${memberId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: '주소 목록 조회에 실패했습니다.' }));
    throw new Error(errorData.message);
  }

  return response.json();
};

/**
 * 회원의 새 주소를 등록합니다.
 * @param memberId 회원 ID
 * @param latitude 위도
 * @param longitude 경도
 */
export const addUserLocation = async (memberId: number, latitude: number, longitude: number) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`/location`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ memberId, latitude, longitude }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: '주소 등록에 실패했습니다.' }));
        throw new Error(errorData.message);
    }
    return response.json();
}

/**
 * 회원의 현재 설정된 주소 하나를 조회합니다.
 * @param memberId 조회할 회원의 ID
 * @returns 현재 설정된 주소 정보
 */
export const getCurrentLocation = async (memberId: number): Promise<{ isSuccess: boolean; result: Location | null }> => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`/location/${memberId}/current`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (!response.ok) {
        // 200번대 응답이 아닐 경우, 응답 본문이 없을 수 있으므로 에러를 다르게 처리
        if (response.status === 404) { // 현재 주소가 설정되지 않은 경우
             return { isSuccess: true, result: null };
        }
        const errorData = await response.json().catch(() => ({ message: '현재 주소 조회에 실패했습니다.' }));
        throw new Error(errorData.message);
    }
    // 응답 본문이 비어있는 성공 케이스 처리
    const text = await response.text();
    if (!text) {
        return { isSuccess: true, result: null };
    }
    return JSON.parse(text);
};


/**
 * 현재 사용할 주소를 변경합니다.
 * @param memberId 회원의 ID
 * @param townId 현재 사용할 주소(town)의 ID
 */
export const setCurrentLocation = async (memberId: number, townId: number) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`/location/${memberId}/current/${townId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: '현재 주소 설정에 실패했습니다.' }));
        throw new Error(errorData.message);
    }
    return response.json();
};

/**
 * 회원의 주소를 삭제합니다.
 * @param memberId 회원의 ID
 * @param townId 삭제할 주소(town)의 ID
 */
export const deleteUserLocation = async (memberId: number, townId: number) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`/location/${memberId}/${townId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: '주소 삭제에 실패했습니다.' }));
        throw new Error(errorData.message);
    }
    return response.json();
} 