import React from 'react';
import './MapPagePresentation.css';
import { useNavigate } from 'react-router-dom';

interface Props {
  onClose: () => void;
  /** 검색창 값 */
  address: string;
  /** 입력 값 변경 핸들러 */
  onAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 변환(검색) 버튼 제출 */
  onSubmit: (e: React.FormEvent) => void;
  /** 지도를 그릴 div 엘리먼트 ref */
  mapRef: React.RefObject<HTMLDivElement | null>;
  isLoading: boolean;
  isMapLoading: boolean;
  coords: { lat: number; lng: number } | null;
  memberid: string;
  postLocation: (memberId: number, latitude: number, longitude: number) => Promise<void>;
  showSaveBtn: boolean;
  onSaveLocation: () => void;
  isSaving: boolean; // 저장 중 상태 추가
}

const MapPagePresentation: React.FC<Props> = ({
  onClose,
  address,
  onAddressChange,
  onSubmit,
  mapRef,
  isLoading,
  isMapLoading,
  coords,
  showSaveBtn,
  onSaveLocation,
  isSaving,
}) => {
  const navigate = useNavigate();

  return (
  <div className="map-root">
    {/* 상단바 */}
    <div className="map-topbar">
      <button className="map-close" onClick={onClose}>✕</button>
      <span className="map-title">내 동네 설정</span>
      <button className="map-help">❓</button>
    </div>
    
    {/* 주소 검색 영역 */}
    <div className="map-search-section">
      <form onSubmit={onSubmit} className="map-search-box">
        <input
          type="text"
          placeholder="도로명 주소를 입력하세요"
          value={address}
          onChange={onAddressChange}
          className="map-search-input"
          disabled={isLoading || isMapLoading}
        />
        <button 
          type="submit"
          disabled={isLoading || isMapLoading || !address.trim()}
          className="map-search-button"
        >
          {isLoading ? '검색 중...' : '검색'}
        </button>
      </form>
      <div className="map-search-examples">
        <small>예시: 서울특별시 강남구 테헤란로 152</small>
      </div>
    </div>

    {/* 지도 영역 */}
    <div className="map-area">
      <div ref={mapRef} className="map-kakao" style={{ visibility: isMapLoading ? 'hidden' : 'visible' }} />
      {isMapLoading && (
        <div className="map-loading-overlay">
          <span>지도 로딩 중...</span>
        </div>
      )}
    </div>

    {showSaveBtn && (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <button 
          onClick={() => {
            onSaveLocation();
            navigate('/');
          }} 
          style={{ padding: '10px 24px', fontSize: 16, borderRadius: 8, background: '#e89cae', color: '#fff', border: 'none', cursor: 'pointer' }}
          disabled={isSaving}
        >
          {isSaving ? '저장 중...' : '위치 저장'}
        </button>
      </div>
    )}

    {/* 위도/경도 정보 표시 */}
    {coords && (
      <div className="map-location-info">
        <h4>위치 정보</h4>
        <p>위도: {coords.lat}</p>
        <p>경도: {coords.lng}</p>
      </div>
    )}

  </div>
  );
};

export default MapPagePresentation;
