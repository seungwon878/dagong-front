export interface Location {
  townId: number;
  city: string;
  district: string;
  town: string;
}

/**
 * 회원의 주소 목록을 조회합니다.
 * @param memberId 조회할 회원의 ID
 * @returns 회원의 주소 목록
 */
export const getUserLocations = async (memberId: number): Promise<{ isSuccess: boolean; result: Location[] }> => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`/api/location/${memberId}`, {
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
    const response = await fetch(`/api/location`, {
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
 * 회원의 주소를 삭제합니다.
 * @param memberId 회원의 ID
 * @param townId 삭제할 주소(town)의 ID
 */
export const deleteUserLocation = async (memberId: number, townId: number) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`/api/location/${memberId}/${townId}`, {
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