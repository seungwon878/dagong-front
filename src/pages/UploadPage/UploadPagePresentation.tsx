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
}: UploadPagePresentationProps) => {
  return (
    <div className="upload-root">
      {/* 상단바 */}
      <div className="upload-topbar">
        <span className="upload-title">공구 등록하기</span>
        <button className="upload-cancel">취소</button>
      </div>
      {/* 이미지 업로드 */}
      <div className="upload-image-box">
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
      </div>
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
  );
};

export default UploadPagePresentation;
