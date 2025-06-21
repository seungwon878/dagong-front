import React from 'react';

interface Product {
  id: number;
  title: string;
  content: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  maxParticipants: number;
  category1: string;
  category2: string;
}

interface CatePagePresentationProps {
  mainCategories: string[];
  selectedMain: string;
  onSelectMain: (cat: string) => void;
  categoryDetails: Record<string, { emoji: string; details: string[] }>;
  onHome: () => void;
  onCategory: () => void;
  onChat: () => void;
  onMyPage: () => void;
  onDetailCategoryClick: (detail: string) => void;
  selectedDetail: string;
  products: Product[];
  loading: boolean;
  error: string | null;
}

const CatePagePresentation = ({ 
  mainCategories, 
  selectedMain, 
  onSelectMain, 
  categoryDetails, 
  onHome, 
  onCategory, 
  onChat, 
  onMyPage, 
  onDetailCategoryClick,
  selectedDetail,
  products,
  loading,
  error
}: CatePagePresentationProps) => {
  const detail = categoryDetails[selectedMain];

  // 상품 카드 렌더링 함수
  const renderProductCard = (product: Product) => (
    <div key={product.id} style={{ 
      border: '1px solid #eee',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      cursor: 'pointer',
      transition: 'transform 0.2s',
    }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ width: 100, height: 100, borderRadius: 8, overflow: 'hidden' }}>
          <img 
            src={product.imageUrl} 
            alt={product.title} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }} 
          />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: 16, fontWeight: 600 }}>{product.title}</h3>
          <p style={{ margin: '0 0 8px 0', fontSize: 14, color: '#666' }}>{product.content}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 600, color: '#e89cae' }}>
              {product.price.toLocaleString()}원
            </span>
            <span style={{ fontSize: 14, color: '#888' }}>
              {product.maxParticipants}명 모집 중
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', background: '#fff', minHeight: '100vh', fontFamily: 'Apple SD Gothic Neo, sans-serif', display: 'flex', flexDirection: 'column', position: 'relative', paddingBottom: 80 }}>
      {/* 상단 타이틀 */}
      <div style={{ fontWeight: 700, fontSize: 20, padding: '24px 0 16px 24px', borderBottom: '1px solid #eee' }}>전체 카테고리</div>
      <div style={{ display: 'flex', flex: 1, minHeight: 500 }}>
        {/* 왼쪽 대분류 카테고리 */}
        <div style={{ width: 160, background: '#fafafa', borderRight: '1px solid #eee', padding: '16px 0' }}>
          {mainCategories.map(cat => (
            <div
              key={cat}
              onClick={() => onSelectMain(cat)}
              style={{
                padding: '10px 18px',
                fontWeight: selectedMain === cat ? 700 : 400,
                color: selectedMain === cat ? '#e89cae' : '#222',
                background: selectedMain === cat ? '#fff' : 'transparent',
                borderLeft: selectedMain === cat ? '4px solid #e89cae' : '4px solid transparent',
                cursor: 'pointer',
                fontSize: 16,
                transition: 'background 0.2s',
              }}
            >
              {cat}
            </div>
          ))}
        </div>
        {/* 오른쪽 상세 카테고리 영역 */}
        <div style={{ flex: 1, padding: '24px 32px', minHeight: 400 }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 18, color: '#222' }}>{selectedMain}</div>
          {!selectedDetail ? (
            // 상세 카테고리 목록
            detail ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {detail.details.map((d, idx) => (
                  <button 
                    key={d} 
                    onClick={() => onDetailCategoryClick(d)} 
                    style={{ 
                      fontSize: 16, 
                      color: '#222', 
                      padding: '8px 0', 
                      background: 'none', 
                      border: 'none', 
                      borderRadius: 0, 
                      cursor: 'pointer', 
                      textAlign: 'left', 
                      paddingLeft: 0 
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            ) : (
              <div style={{ color: '#bbb', fontSize: 15 }}>상세 카테고리가 없습니다.</div>
            )
          ) : (
            // 상품 목록
            <div>
              <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <button 
                  onClick={() => onDetailCategoryClick('')} 
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    padding: 0, 
                    color: '#888', 
                    cursor: 'pointer' 
                  }}
                >
                  ← 카테고리로 돌아가기
                </button>
                <span style={{ color: '#222', fontWeight: 600 }}>{selectedDetail}</span>
              </div>
              
              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#888' }}>
                  로딩 중...
                </div>
              ) : error ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#e89cae' }}>
                  {error}
                </div>
              ) : products.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#888' }}>
                  등록된 상품이 없습니다.
                </div>
              ) : (
                <div>
                  {products.map(renderProductCard)}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* 하단 네비게이션 (공통) */}
      <div style={{ position: 'fixed', left: '50%', bottom: 0, transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: '#fff', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-around', padding: '6px 0 2px 0', zIndex: 100 }}>
        <button onClick={onHome} style={{ flex: 1, background: 'none', border: 'none', color: '#bbb', fontWeight: 500, fontSize: 13, textAlign: 'center', lineHeight: 1.2, cursor: 'pointer' }}>
          🏠<br />홈
        </button>
        <button onClick={onCategory} style={{ flex: 1, background: 'none', border: 'none', color: '#e89cae', fontWeight: 500, fontSize: 13, textAlign: 'center', lineHeight: 1.2, cursor: 'pointer' }}>
          📂<br />카테고리
        </button>
        <button onClick={onChat} style={{ flex: 1, background: 'none', border: 'none', color: '#bbb', fontWeight: 500, fontSize: 13, textAlign: 'center', lineHeight: 1.2, cursor: 'pointer' }}>
          💬<br />채팅
        </button>
        <button onClick={onMyPage} style={{ flex: 1, background: 'none', border: 'none', color: '#bbb', fontWeight: 500, fontSize: 13, textAlign: 'center', lineHeight: 1.2, cursor: 'pointer' }}>
          👤<br />마이페이지
        </button>
      </div>
    </div>
  );
};

export default CatePagePresentation;
