interface UploadPagePresentationProps {
  onLocationClick: () => void;
  onRegister: () => void;
}

const UploadPagePresentation = ({ onLocationClick, onRegister }: UploadPagePresentationProps) => {
  return (
    <div style={{ padding: 24 }}>
      <h1>공구 등록</h1>
      <div style={{ margin: '16px 0' }}>
        <label>위치</label>
        <input
          type="text"
          placeholder="서울 특별시 상도동 전체"
          onClick={onLocationClick}
          readOnly
          style={{ width: 200, marginLeft: 8, cursor: 'pointer' }}
        />
      </div>
      {/* 나머지 입력 UI는 추후 구현 */}
      <button onClick={onRegister} style={{ fontSize: 18, padding: 12, marginTop: 24 }}>
        공구 등록하기
      </button>
    </div>
  );
};

export default UploadPagePresentation;
