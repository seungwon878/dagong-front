import React, { useCallback, useEffect, useRef, useState } from 'react';
import MapPagePresentation from './MapPagePresentation';
import useGeocode from '../../hooks/useGeocode';
import { useAppContext } from '../../AppContext';

declare global {
  interface Window {
    kakao: any;
  }
}

const loadKakaoScript = () =>
  new Promise<void>((resolve, reject) => {
    if (window.kakao?.maps) return resolve();
    const JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY;
    if (!JS_KEY) return reject(new Error('VITE_KAKAO_JS_KEY 가 없습니다'));

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${JS_KEY}&autoload=false`;
    script.async = true;
    script.onload = () => window.kakao.maps.load(resolve);
    script.onerror = reject;
    document.head.appendChild(script);
  });

const MapPageContainer: React.FC = () => {
  const { memberid, authToken } = useAppContext();
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const [lastCoords, setLastCoords] = useState<{ lat: number; lng: number } | null>(null);

    
  /* ---- refs ---- */
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  /* ---- 의존 훅 ---- */
  const geocode = useGeocode();

  /* 1) Kakao 지도 SDK 로드 및 Map 객체 생성 */
  useEffect(() => {
    loadKakaoScript()
      .then(() => {
        if (mapDivRef.current && !mapInstance.current) {
          const map = new window.kakao.maps.Map(mapDivRef.current, {
            center: new window.kakao.maps.LatLng(37.4964289688636, 126.955157917408),
            level: 3,
            zoomControl: true,
            zoomControlPosition: window.kakao.maps.ControlPosition.RIGHT
          });
          mapInstance.current = map;
          setIsMapLoading(false);
        } else {
          setIsMapLoading(false);
        }
      })
      .catch(console.error);
  }, []);

  /* 2) 위·경도 변경 시 마커 & 중심 이동 */
  useEffect(() => {
    if (!coords || !window.kakao?.maps || !mapInstance.current) return;

    const { lat, lng } = coords;
    const position = new window.kakao.maps.LatLng(lat, lng);
    
    // 이전 마커 제거
    if (mapInstance.current.__marker) {
      mapInstance.current.__marker.setMap(null);
    }
    // 새 마커
    const marker = new window.kakao.maps.Marker({ position });
    marker.setMap(mapInstance.current);
    mapInstance.current.__marker = marker;
    
    // 마커가 지도 중앙에 오도록 이동
    mapInstance.current.setCenter(position);

    // 지도가 깨지는 현상을 방지하기 위해 relayout()을 호출합니다.
    setTimeout(() => {
      if (mapInstance.current) {
        mapInstance.current.relayout();
      }
    }, 100);
  }, [coords]);
  
  const handleClose = () => {
    window.history.back();
  };

  const postLocation = async (memberId: number, latitude: number, longitude: number) => {
    try {
      const res = await fetch('http://13.209.95.208:8080/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          memberId: Number(memberId),
          latitude: Number(latitude),
          longitude: Number(longitude)
        }),
      });
      if (!res.ok) throw new Error('서버 저장 실패');
      alert('위치 정보가 서버에 저장되었습니다.');
    } catch (e: any) {
      alert('위치 저장 실패: ' + e.message);
    }
  };
  
 
  const handleSaveLocation = () => {
    const memberIdRaw = localStorage.getItem('memberId');
    const memberId = memberIdRaw ? Number(memberIdRaw) : NaN;
    if (!lastCoords) return;
    const lat = Number(lastCoords.lat);
    const lng = Number(lastCoords.lng);

    if (isNaN(memberId) || isNaN(lat) || isNaN(lng)) {
      alert('memberId 또는 좌표 값이 올바르지 않습니다.');
      return;
    }
    postLocation(memberId, lat, lng);
  };

  /* 3) 주소→좌표 변환 & 상태 갱신 */
  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!address.trim()) return;
      setIsGeocoding(true);
      try {
        const c = await geocode(address);
        setCoords(c);
        setLastCoords(c);
        setShowSaveBtn(true);
      } catch (err: any) {
        alert(err.message);
      } finally {
        setIsGeocoding(false);
      }
    },
    [address, geocode],
  );

  return (
    <MapPagePresentation
      onClose={handleClose}
      address={address}
      onAddressChange={(e) => setAddress(e.target.value)}
      onSubmit={onSubmit}
      mapRef={mapDivRef}
      isLoading={isGeocoding}
      isMapLoading={isMapLoading}
      coords={coords}
      memberid={memberid}
      postLocation={postLocation}
      showSaveBtn={showSaveBtn}
      onSaveLocation={handleSaveLocation}
    />
  );
};

export default MapPageContainer;
