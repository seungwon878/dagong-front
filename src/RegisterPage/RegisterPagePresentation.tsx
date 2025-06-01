import React from 'react';

interface ProductDetail {
  id: number;
  image?: string;
  title: string;
  productName: string;
  location: string;
  currentPeople: number;
  maxPeople: number;
  amount: number;
  desc: string;
  price: number;
}

interface RegisterPagePresentationProps {
  product: ProductDetail;
  wishAmount: number;
  onWishAmountChange: (delta: number) => void;
  onCancel: () => void;
  bottomButtons?: { text: string; onClick: () => void }[];
  isEditMode: boolean;
  isJoinedMode?: boolean;
  onTitleChange?: (title: string) => void;
  onMaxPeopleChange?: (maxPeople: number) => void;
  onAmountChange?: (amount: number) => void;
  onDescChange?: (desc: string) => void;
  onPriceChange?: (price: number) => void;
}

const RegisterPagePresentation = ({ 
  product, 
  wishAmount, 
  onWishAmountChange, 
  onCancel, 
  bottomButtons, 
  isEditMode,
  isJoinedMode,
  onTitleChange, 
  onMaxPeopleChange, 
  onAmountChange, 
  onDescChange, 
  onPriceChange 
}: RegisterPagePresentationProps) => {
  return (
    <div style={{ maxWidth: 430, margin: '0 auto', background: '#fff', minHeight: '100vh', fontFamily: 'Apple SD Gothic Neo, sans-serif', paddingBottom: 80 }}>
      {/* 상단바 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '18px 16px 8px 16px', fontSize: 18, borderBottom: '1px solid #eee' }}>
        <span style={{ fontWeight: 'bold', fontSize: 18 }}>
          {isJoinedMode ? '내가 참여한 공구 정보' : isEditMode ? '공구 수정하기' : '공구 신청하기'}
        </span>
        <button style={{ position: 'absolute', right: 16, top: 18, background: 'none', border: 'none', color: '#bbb', fontSize: 15, cursor: 'pointer' }} onClick={onCancel}>취소</button>
      </div>
      {/* 상품 정보 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '24px 16px 8px 16px' }}>
        <div style={{ width: 64, height: 64, background: '#ededed', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {product.image ? (
            <img src={product.image} alt="preview" style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover' }} />
          ) : (
            <span role="img" aria-label="camera" style={{ fontSize: 32 }}>📷</span>
          )}
        </div>
        <div style={{ flex: 1 }}>
          {isEditMode ? (
            <input 
              type="text"
              value={product.title}
              onChange={(e) => onTitleChange?.(e.target.value)}
              style={{ 
                fontSize: 16, 
                fontWeight: 600, 
                marginBottom: 2,
                border: '1px solid #eee',
                borderRadius: 8,
                padding: '8px 12px',
                width: '100%',
                background: '#fafafa'
              }}
            />
          ) : (
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 2 }}>{product.title}</div>
          )}
          <div style={{ fontSize: 13, color: '#888' }}>상품명 <b>{product.productName}</b></div>
        </div>
        <span style={{ fontSize: 22, color: '#bbb' }}>{'>'}</span>
      </div>
      {/* 위치 */}
      <input style={{ width: 'calc(100% - 32px)', margin: '0 16px', padding: '10px 12px', border: '1px solid #eee', borderRadius: 8, fontSize: 15, background: '#fafafa', color: '#444', cursor: 'pointer', marginBottom: 8 }} type="text" value={product.location} readOnly />
      {/* 마감 인원 수정 */}
      <div style={{ margin: '18px 0 6px 16px', fontSize: 14, fontWeight: 500 }}>{isEditMode ? '마감 인원 수정' : '현재 참여 인원'}</div>
      <div style={{ margin: '0 16px 8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
        {isEditMode ? (
          <input 
            type="number"
            value={product.maxPeople}
            onChange={(e) => onMaxPeopleChange?.(parseInt(e.target.value))}
            style={{ 
              background: '#f8e6eb', 
              color: '#e89cae', 
              borderRadius: 8, 
              padding: '6px 18px', 
              fontSize: 16, 
              fontWeight: 600,
              border: 'none',
              width: '100px'
            }}
          />
        ) : (
          <span style={{ background: '#f8e6eb', color: '#e89cae', borderRadius: 8, padding: '6px 18px', fontSize: 16, fontWeight: 600 }}>{product.currentPeople}/{product.maxPeople}명</span>
        )}
      </div>
      {/* 구매 마감 개수 */}
      <div style={{ margin: '18px 0 6px 16px', fontSize: 14, fontWeight: 500 }}>{isEditMode ? '구매 마감 개수' : '구매 희망 개수'}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '0 16px 8px 16px' }}>
        {isEditMode ? (
          <input 
            type="number"
            value={product.amount}
            onChange={(e) => onAmountChange?.(parseInt(e.target.value))}
            style={{ 
              background: '#f8e6eb', 
              color: '#e89cae', 
              borderRadius: 8, 
              padding: '6px 18px', 
              fontSize: 16, 
              fontWeight: 600,
              border: 'none',
              width: '100px'
            }}
          />
        ) : (
          <>
            {isJoinedMode ? (
              <>
                <button style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: '#f8e6eb', color: '#e89cae', fontSize: 22, cursor: 'pointer' }} onClick={() => onWishAmountChange(-1)}>-</button>
                <span style={{ background: '#f8e6eb', color: '#e89cae', borderRadius: 8, padding: '6px 18px', fontSize: 16, fontWeight: 600 }}>{wishAmount}개</span>
                <button style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: '#f8e6eb', color: '#e89cae', fontSize: 22, cursor: 'pointer' }} onClick={() => onWishAmountChange(1)}>+</button>
              </>
            ) : (
              <>
                <button style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: '#f8e6eb', color: '#e89cae', fontSize: 22, cursor: 'pointer' }} onClick={() => onWishAmountChange(-1)}>-</button>
                <span style={{ background: '#f8e6eb', color: '#e89cae', borderRadius: 8, padding: '6px 18px', fontSize: 16, fontWeight: 600 }}>{wishAmount}개</span>
                <button style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: '#f8e6eb', color: '#e89cae', fontSize: 22, cursor: 'pointer' }} onClick={() => onWishAmountChange(1)}>+</button>
              </>
            )}
          </>
        )}
      </div>
      {/* 설명 */}
      <div style={{ margin: '18px 0 6px 16px', fontSize: 14, fontWeight: 500 }}>설명</div>
      {isEditMode ? (
        <textarea 
          value={product.desc}
          onChange={(e) => onDescChange?.(e.target.value)}
          style={{ 
            width: 'calc(100% - 32px)', 
            margin: '0 16px', 
            minHeight: 80, 
            border: '1px solid #eee', 
            borderRadius: 8, 
            padding: '10px 12px', 
            fontSize: 14, 
            background: '#fafafa', 
            color: '#444', 
            resize: 'none' 
          }}
        />
      ) : (
        <textarea style={{ width: 'calc(100% - 32px)', margin: '0 16px', minHeight: 80, border: '1px solid #eee', borderRadius: 8, padding: '10px 12px', fontSize: 14, background: '#fafafa', color: '#888', resize: 'none' }} value={product.desc} readOnly />
      )}
      {/* 개당 가격 */}
      {isEditMode ? (
        <>
          <div style={{ margin: '18px 0 6px 16px', fontSize: 14, fontWeight: 500 }}>개당 가격</div>
          <input 
            type="number"
            value={product.price}
            onChange={(e) => onPriceChange?.(parseInt(e.target.value))}
            style={{ 
              width: 'calc(100% - 32px)', 
              margin: '0 16px', 
              border: '1px solid #eee', 
              borderRadius: 8, 
              padding: '10px 12px', 
              fontSize: 14, 
              background: '#fafafa',
              color: '#444'
            }}
          />
        </>
      ) : (
        <>
          <div style={{ margin: '18px 0 6px 16px', fontSize: 14, fontWeight: 500 }}>개당 가격</div>
          <div style={{ margin: '0 16px 8px 16px', fontSize: 16, fontWeight: 600, color: '#444' }}>{product.price.toLocaleString()}원</div>
        </>
      )}
      {/* 하단 버튼 */}
      {bottomButtons && bottomButtons.length > 0 ? (
        <div style={{ position: 'fixed', left: '50%', bottom: 18, transform: 'translateX(-50%)', width: 'calc(100% - 32px)', maxWidth: 430, display: 'flex', gap: 12, zIndex: 100 }}>
          {bottomButtons.map((btn, i) => (
            <button
              key={btn.text}
              onClick={btn.onClick}
              style={{ flex: 1, background: i === 0 ? '#444' : '#fff', color: i === 0 ? '#fff' : '#444', border: '1.5px solid #444', borderRadius: 12, padding: '16px 0', fontSize: 17, fontWeight: 500, cursor: 'pointer' }}
            >
              {btn.text}
            </button>
          ))}
        </div>
      ) : (
        <button style={{ position: 'fixed', left: '50%', bottom: 18, transform: 'translateX(-50%)', width: 'calc(100% - 32px)', maxWidth: 430, background: '#444', color: '#fff', border: 'none', borderRadius: 12, padding: '16px 0', fontSize: 17, fontWeight: 500, cursor: 'pointer', zIndex: 100 }}>
          공구 신청하기!
        </button>
      )}
    </div>
  );
};

export default RegisterPagePresentation;
