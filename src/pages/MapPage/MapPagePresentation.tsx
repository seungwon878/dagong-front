interface MapPagePresentationProps {
  onClose: () => void;
}

const MapPagePresentation = ({ onClose }: MapPagePresentationProps) => {
  return (
    <div style={{ padding: 24 }}>
      <button onClick={onClose} style={{ fontSize: 24, position: 'absolute', left: 16, top: 16 }}>X</button>
      <h1 style={{ marginTop: 48 }}>위치 설정</h1>
      {/* 지도 및 동네 선택 UI는 추후 구현 */}
    </div>
  );
};

export default MapPagePresentation;
