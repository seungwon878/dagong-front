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
  console.log('🚀 getLatLngFromAddress 함수 시작');
  console.log('📍 입력된 주소:', placeAddress);
  
  try {
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(placeAddress)}`;
    
    // 환경 변수 확인
    const apiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;
    console.log('🔑 API Key 확인:', apiKey ? '설정됨' : '설정되지 않음');
    console.log('🔑 API Key (처음 10자리):', apiKey ? apiKey.substring(0, 10) + '...' : '없음');
    
    if (!apiKey) {
      throw new Error('카카오 REST API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.');
    }
    
    console.log('🌐 요청 URL:', url);
    console.log('📤 요청 헤더:', {
      'Authorization': `KakaoAK ${apiKey.substring(0, 10)}...`,
      'Content-Type': 'application/json',
    });
    
    console.log('📡 API 요청 시작...');
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `KakaoAK ${apiKey}`,
        'Content-Type': 'application/json',
        'KA': 'sdk/1.0.0 os/javascript sdktype/jssdk libver/1.0.0',
      },
    });

    console.log('📥 API 응답 받음');
    console.log('📊 응답 상태:', response.status);
    console.log('📋 응답 헤더:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API 응답 에러 내용:', errorText);
      throw new Error(`카카오 주소 검색 실패: ${response.status} - ${errorText}`);
    }

    console.log('✅ API 응답 성공');
    const data: KakaoAddressResponse = await response.json();
    console.log('📄 응답 데이터:', data);
    
    if (data.documents.length === 0) {
      console.log('⚠️ 검색 결과 없음');
      throw new Error('해당 주소를 찾을 수 없습니다.');
    }

    const result = data.documents[0];
    console.log('🎯 첫 번째 검색 결과:', result);
    
    const latLngInfo = {
      latitude: parseFloat(result.y),
      longitude: parseFloat(result.x),
      address: result.address_name,
    };
    
    console.log('📍 변환된 위도/경도 정보:', latLngInfo);
    console.log('✅ getLatLngFromAddress 함수 완료');
    
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