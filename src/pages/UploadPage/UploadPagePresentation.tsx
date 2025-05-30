import './UploadPagePresentation.css';

interface UploadPagePresentationProps {
  image: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  people: number;
  onPeopleSelect: (num: number) => void;
  amount: number;
  onAmountChange: (delta: number) => void;
  price: string;
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  desc: string;
  onDescChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onLocationClick: () => void;
  onRegister: () => void;
  mode: 'none' | 'manual';
  onNaverSearch: () => void;
  onManualRegister: () => void;
  showManualModal: boolean;
  manualName: string;
  setManualName: (v: string) => void;
  manualPrice: string;
  setManualPrice: (v: string) => void;
  manualImage: string | null;
  setManualImage: (v: string | null) => void;
  onManualCancel: () => void;
  onManualSubmit: () => void;
  selectedProduct: {
    image: string | null;
    name: string;
    title: string;
  } | null;
  onCancel: () => void;
}

const peopleOptions = [1, 2, 3, 4, 5, 6];

const UploadPagePresentation = ({
  image,
  onImageChange,
  people,
  onPeopleSelect,
  amount,
  onAmountChange,
  price,
  onPriceChange,
  desc,
  onDescChange,
  onLocationClick,
  onRegister,
  mode,
  onNaverSearch,
  onManualRegister,
  showManualModal,
  manualName,
  setManualName,
  manualPrice,
  setManualPrice,
  manualImage,
  setManualImage,
  onManualCancel,
  onManualSubmit,
  selectedProduct,
  onCancel,
}: UploadPagePresentationProps) => {
  return (
    <div className="upload-root">
      {/* 상단바 */}
      <div className="upload-topbar">
        <span className="upload-title">공구 등록하기</span>
        <button className="upload-cancel" onClick={onCancel}>취소</button>
      </div>
      {/* 상품 선택 전: 상단 버튼 2개, 상품 선택 후: 상품 정보 카드 */}
      {(!selectedProduct) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '24px 16px 18px 16px' }}>
          <button onClick={onNaverSearch} style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1.5px solid #e89cae', borderRadius: 12, padding: '14px 16px', fontSize: 15, background: '#fff', color: '#444', fontWeight: 500, boxShadow: '0 1px 2px #f8e6eb55', cursor: 'pointer' }}>
            <span role="img" aria-label="search" style={{ color: '#e89cae', fontSize: 20 }}>🔍</span>
            등록할 상품 찾으러 가기
          </button>
          <button onClick={onManualRegister} style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1.5px solid #e89cae', borderRadius: 12, padding: '14px 16px', fontSize: 15, background: '#fff', color: '#444', fontWeight: 500, boxShadow: '0 1px 2px #f8e6eb55', cursor: 'pointer' }}>
            <span role="img" aria-label="edit" style={{ color: '#e89cae', fontSize: 20 }}>✏️</span>
            직접 상품 등록하기
          </button>
        </div>
      )}
      {(selectedProduct) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '24px 16px 8px 16px' }}>
          <div style={{ width: 64, height: 64, background: '#ededed', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {selectedProduct.image ? (
              <img src={selectedProduct.image} alt="preview" style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover' }} />
            ) : (
              <span role="img" aria-label="camera" style={{ fontSize: 32, color: '#bbb' }}>📷</span>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 2 }}>{selectedProduct.title}</div>
            <div style={{ fontSize: 13, color: '#888' }}>상품명 <b>{selectedProduct.name}</b></div>
          </div>
          <span style={{ fontSize: 22, color: '#bbb' }}>{'>'}</span>
        </div>
      )}
      {/* 직접 등록 모달 */}
      {showManualModal && (
        <div style={{
          position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, width: '90%', maxWidth: 340, boxShadow: '0 4px 24px #0002', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>직접 상품 등록</div>
            <input value={manualName} onChange={e => setManualName(e.target.value)} placeholder="공구 이름" style={{ padding: '12px', border: '1px solid #eee', borderRadius: 8, fontSize: 15 }} />
            <input value={manualPrice} onChange={e => setManualPrice(e.target.value)} placeholder="공구 가격" type="number" style={{ padding: '12px', border: '1px solid #eee', borderRadius: 8, fontSize: 15 }} />
            <input type="file" accept="image/*" onChange={e => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => setManualImage(reader.result as string);
                reader.readAsDataURL(file);
              }
            }} />
            {manualImage && <img src={manualImage} alt="preview" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, alignSelf: 'center' }} />}
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button onClick={onManualSubmit} style={{ flex: 1, background: '#e89cae', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontSize: 16, fontWeight: 500, cursor: 'pointer' }}>등록</button>
              <button onClick={onManualCancel} style={{ flex: 1, background: '#eee', color: '#444', border: 'none', borderRadius: 8, padding: '12px 0', fontSize: 16, fontWeight: 500, cursor: 'pointer' }}>취소</button>
            </div>
          </div>
        </div>
      )}
      {/* 메인 폼(항상 노출) */}
      <div style={{ opacity: showManualModal ? 0.3 : 1, pointerEvents: showManualModal ? 'none' : 'auto' }}>
        {/* 이미지 업로드 */}
        {/* <div className="upload-image-box">
          <label className="upload-image-placeholder" style={{ cursor: 'pointer' }}>
            {image ? (
              <img src={image} alt="preview" style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover' }} />
            ) : (
              <span role="img" aria-label="camera" style={{ fontSize: 32 }}>📷</span>
            )}
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={onImageChange} />
          </label>
          <div className="upload-product-info">
            <div className="upload-product-title">프로틴 공구</div>
            <div className="upload-product-name">상품명 <b>마이프로틴</b></div>
          </div>
          <span className="upload-arrow">&gt;</span>
        </div> */}
        {/* 위치 */}
        <div className="upload-label">위치</div>
        <input className="upload-input" type="text" value="서울 특별시 상도동 전체" readOnly onClick={onLocationClick} />
        {/* 인원 */}
        <div className="upload-label">인원</div>
        <div className="upload-people-options">
          {peopleOptions.map((num) => (
            <button
              key={num}
              className={`upload-people-btn${num === people ? ' selected' : ''}`}
              onClick={() => onPeopleSelect(num)}
            >
              {num}명
            </button>
          ))}
        </div>
        {/* 마감 개수 */}
        <div className="upload-label">마감 개수</div>
        <div className="upload-amount-box">
          <button className="upload-amount-btn" onClick={() => onAmountChange(-1)}>-</button>
          <span className="upload-amount">{amount}개</span>
          <button className="upload-amount-btn" onClick={() => onAmountChange(1)}>+</button>
        </div>
        {/* 설명 */}
        <div className="upload-label">설명</div>
        <textarea
          className="upload-desc"
          value={desc}
          onChange={onDescChange}
        />
        {/* 가격 */}
        <div className="upload-label">개당 가격</div>
        <input
          className="upload-input"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={price}
          onChange={onPriceChange}
          style={{ marginBottom: 8 }}
          placeholder="가격을 입력하세요"
        />
        {/* 하단 버튼 */}
        <button className="upload-register-btn" onClick={onRegister}>공구 등록하기!</button>
      </div>
    </div>
  );
};

export default UploadPagePresentation;
