import './UploadPagePresentation.css';
import type { ChangeEvent } from 'react';

interface UploadPagePresentationProps {
  mode: 'manual';
  image: string | null;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  people: number;
  onPeopleSelect: (num: number) => void;
  amount: number;
  onAmountChange: (delta: number) => void;
  price: string;
  onPriceChange: (e: ChangeEvent<HTMLInputElement>) => void;
  desc: string;
  onDescChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onLocationClick: () => void;
  onRegister: () => void;
  onNaverSearch: () => void;
  onManualRegister: () => void;
  showManualModal: boolean;
  manualName: string;
  setManualName: (name: string) => void;
  manualPrice: string;
  setManualPrice: (price: string) => void;
  manualImage: string | null;
  setManualImage: (image: string | null) => void;
  onManualCancel: () => void;
  onManualSubmit: () => void;
  selectedProduct: { image: string; name: string; title: string } | null;
  onCancel: () => void;
  selectedCategory1: string;
  selectedCategory2: string;
  showCategory1Modal: boolean;
  showCategory2Modal: boolean;
  setShowCategory1Modal: (show: boolean) => void;
  setShowCategory2Modal: (show: boolean) => void;
  onCategory1Select: (category: string) => void;
  onCategory2Select: (category: string) => void;
  onManualImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  mainCategories: string[];
  categoryData: Record<string, string[]>;
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
  selectedCategory1,
  selectedCategory2,
  showCategory1Modal,
  showCategory2Modal,
  setShowCategory1Modal,
  setShowCategory2Modal,
  onCategory1Select,
  onCategory2Select,
  onManualImageChange,
  mainCategories,
  categoryData,
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
        <div className="modal-overlay">
          <div className="modal-content" style={{ width: '90%', maxWidth: 400, background: '#fff', borderRadius: 16, padding: 24 }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: 18 }}>직접 상품 등록하기</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input
                type="text"
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                placeholder="상품명"
                style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8, fontSize: 15 }}
              />
              <input
                type="number"
                value={manualPrice}
                onChange={(e) => setManualPrice(e.target.value)}
                placeholder="가격"
                style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8, fontSize: 15 }}
              />
              {/* 이미지 파일 선택 */}
              <div style={{ position: 'relative' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onManualImageChange}
                  style={{ display: 'none' }}
                  id="manual-image-upload"
                />
                <label
                  htmlFor="manual-image-upload"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 12,
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 15,
                    cursor: 'pointer',
                    background: '#f5f5f5'
                  }}
                >
                  {manualImage ? '이미지 변경' : '이미지 선택'}
                </label>
                {manualImage && (
                  <img
                    src={manualImage}
                    alt="미리보기"
                    style={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                      borderRadius: 8,
                      marginTop: 8
                    }}
                  />
                )}
              </div>
              {/* 카테고리 선택 버튼 */}
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="button" style={{ flex: 1, padding: 12, border: '1px solid #e89cae', borderRadius: 8, background: '#fff', color: '#e89cae', fontSize: 15 }} onClick={() => setShowCategory1Modal(true)}>
                  {selectedCategory1 ? selectedCategory1 : '카테고리1 선택'}
                </button>
                <button type="button" style={{ flex: 1, padding: 12, border: '1px solid #e89cae', borderRadius: 8, background: '#fff', color: '#e89cae', fontSize: 15 }} onClick={() => selectedCategory1 && setShowCategory2Modal(true)} disabled={!selectedCategory1}>
                  {selectedCategory2 ? selectedCategory2 : '카테고리2 선택'}
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              <button onClick={onManualCancel} style={{ flex: 1, padding: 12, border: '1px solid #e89cae', borderRadius: 8, background: '#fff', color: '#e89cae', fontSize: 15 }}>취소</button>
              <button onClick={onManualSubmit} style={{ flex: 1, padding: 12, border: 'none', borderRadius: 8, background: '#e89cae', color: '#fff', fontSize: 15 }}>등록</button>
            </div>
            {/* 카테고리1 모달 */}
            {showCategory1Modal && (
              <div className="modal-overlay" style={{ zIndex: 1000 }}>
                <div className="modal-content" style={{ width: '90%', maxWidth: 400, background: '#fff', borderRadius: 16, padding: 24, maxHeight: 400, overflowY: 'auto' }}>
                  <h4 style={{ marginBottom: 12 }}>카테고리1 선택</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {mainCategories.map((cat) => (
                      <button key={cat} style={{ padding: 10, border: '1px solid #eee', borderRadius: 8, background: cat === selectedCategory1 ? '#f8e6eb' : '#fff', color: cat === selectedCategory1 ? '#e89cae' : '#444', fontWeight: 500 }} onClick={() => onCategory1Select(cat)}>{cat}</button>
                    ))}
                  </div>
                  <button style={{ marginTop: 16, width: '100%', padding: 10, border: 'none', borderRadius: 8, background: '#eee', color: '#888' }} onClick={() => setShowCategory1Modal(false)}>닫기</button>
                </div>
              </div>
            )}
            {/* 카테고리2 모달 */}
            {showCategory2Modal && selectedCategory1 && (
              <div className="modal-overlay" style={{ zIndex: 1000 }}>
                <div className="modal-content" style={{ width: '90%', maxWidth: 400, background: '#fff', borderRadius: 16, padding: 24, maxHeight: 400, overflowY: 'auto' }}>
                  <h4 style={{ marginBottom: 12 }}>카테고리2 선택</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {categoryData[selectedCategory1].map((cat2) => (
                      <button key={cat2} style={{ padding: 10, border: '1px solid #eee', borderRadius: 8, background: cat2 === selectedCategory2 ? '#f8e6eb' : '#fff', color: cat2 === selectedCategory2 ? '#e89cae' : '#444', fontWeight: 500 }} onClick={() => onCategory2Select(cat2)}>{cat2}</button>
                    ))}
                  </div>
                  <button style={{ marginTop: 16, width: '100%', padding: 10, border: 'none', borderRadius: 8, background: '#eee', color: '#888' }} onClick={() => setShowCategory2Modal(false)}>닫기</button>
                </div>
              </div>
            )}
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
        {/* <div className="upload-label">위치</div>
        <input className="upload-input" type="text" value="서울 특별시 상도동 전체" readOnly onClick={onLocationClick} /> */}
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
