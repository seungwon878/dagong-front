// 카카오 주소 검색 API 연동
// 실제 REST API KEY는 환경변수로 분리해서 사용하세요.

export interface KakaoAddressResult {
  address_name: string;
  address_type: string;
  x: string; // 경도
  y: string; // 위도
  address: {
    address_name: string;
    b_code: string;
    h_code: string;
    main_address_no: string;
    mountain_yn: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_h_name: string;
    region_3depth_name: string;
    sub_address_no: string;
    x: string;
    y: string;
  };
  road_address: {
    address_name: string;
    building_name: string;
    main_building_no: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    road_name: string;
    sub_building_no: string;
    underground_yn: string;
    x: string;
    y: string;
    zone_no: string;
  };
}

export interface KakaoAddressResponse {
  documents: KakaoAddressResult[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    same_name: {
      keyword: string;
      region: string[];
      selected_region: string;
    };
    total_count: number;
  };
}

export interface LatLngInfo {
  latitude: number;
  longitude: number;
  address: string;
}

/**
 * 주소를 위도/경도로 변환하는 함수
 * @param placeAddress 변환할 주소
 * @returns 위도/경도 정보
 */
export async function getLatLngFromAddress(placeAddress: string): Promise<LatLngInfo> {
  
  try {
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(placeAddress)}`;
    
    // 환경 변수 확인
    const apiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;
    
    if (!apiKey) {
      throw new Error('카카오 REST API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.');
    }
    
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `KakaoAK ${apiKey}`,
        'Content-Type': 'application/json',
        'KA': 'sdk/1.0.0 os/javascript sdktype/jssdk libver/1.0.0',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API 응답 에러 내용:', errorText);
      throw new Error(`카카오 주소 검색 실패: ${response.status} - ${errorText}`);
    }

    const data: KakaoAddressResponse = await response.json();
    
    if (data.documents.length === 0) {
      console.log('⚠️ 검색 결과 없음');
      throw new Error('해당 주소를 찾을 수 없습니다.');
    }

    const result = data.documents[0];
    
    const latLngInfo = {
      latitude: parseFloat(result.y),
      longitude: parseFloat(result.x),
      address: result.address_name,
    };
    
    return latLngInfo;
  } catch (error) {
    console.error('💥 getLatLngFromAddress 함수 오류:', error);
    throw error;
  }
}

export async function getLatLngFromAddresses(addresses: string[]): Promise<LatLngInfo[]> {
  const promises = addresses.map(address => getLatLngFromAddress(address));
  return Promise.all(promises);
} 