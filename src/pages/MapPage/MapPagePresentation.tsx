import './MapPagePresentation.css';

interface MapPagePresentationProps {
  neighborhoods: { name: string; selected: boolean }[];
  onRemoveNeighborhood: (name: string) => void;
  radius: number;
  onRadiusChange: (value: number) => void;
  onClose: () => void;
}

const MapPagePresentation = ({
  neighborhoods,
  onRemoveNeighborhood,
  radius,
  onRadiusChange,
  onClose,
}: MapPagePresentationProps) => {
  return (
    <div className="map-root">
      {/* 상단바 */}
      <div className="map-topbar">
        <button className="map-close" onClick={onClose}>✕</button>
        <span className="map-title">내 동네 설정</span>
        <button className="map-help">❓</button>
      </div>
      {/* 지도 영역 (더미) */}
      <div className="map-area">
        {/* 실제 지도 대신 더미 SVG/박스 */}
        <div className="map-dummy">
          <svg width="100%" height="100%" viewBox="0 0 300 220">
            <polygon points="30,40 270,40 290,120 250,200 50,200 10,120" fill="#f8e6eb" stroke="#e89cae" strokeWidth="3" />
            <circle cx="150" cy="120" r="10" fill="#3a8fff" />
          </svg>
        </div>
      </div>
      {/* 내 동네 태그 */}
      <div className="map-label">내 동네</div>
      <div className="map-neighborhoods">
        {neighborhoods.map((n, i) => (
          <span key={n.name} className={`map-neighborhood${i === neighborhoods.length - 1 ? ' selected' : ''}`}>
            {n.name} <button className="map-neighborhood-remove" onClick={() => onRemoveNeighborhood(n.name)}>X</button>
          </span>
        ))}
      </div>
      {/* 반경 슬라이더 */}
      <div className="map-slider-box">
        <span className="map-slider-label">가까운 동네</span>
        <input
          type="range"
          min={1}
          max={3}
          value={radius}
          onChange={e => onRadiusChange(Number(e.target.value))}
          className="map-slider"
        />
        <span className="map-slider-label">먼 동네</span>
      </div>
    </div>
  );
};

export default MapPagePresentation;
