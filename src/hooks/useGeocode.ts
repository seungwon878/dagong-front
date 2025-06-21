import { useCallback } from 'react';

interface Coords {
  lat: number;
  lng: number;
}

export default function useGeocode() {
  const geocode = useCallback(async (address: string): Promise<Coords> => {
    if (!address.trim()) throw new Error('주소를 입력하세요');

    const apiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;
    if (!apiKey) {
      throw new Error('카카오 REST API 키가 설정되지 않았습니다.');
    }

    const res = await fetch(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
        address,
      )}`,
      {
        headers: {
          Authorization: `KakaoAK ${apiKey}`
        },
      },
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Kakao API 오류: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    if (data.documents.length === 0) {
      throw new Error('해당 주소를 찾을 수 없습니다');
    }

    const { x, y } = data.documents[0]; // 문자열 → 숫자
    return { lat: Number(y), lng: Number(x) };
  }, []);

  return geocode;
} 