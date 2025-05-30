import React from 'react';

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
}

const CatePagePresentation = ({ mainCategories, selectedMain, onSelectMain, categoryDetails, onHome, onCategory, onChat, onMyPage, onDetailCategoryClick }: CatePagePresentationProps) => {
  const detail = categoryDetails[selectedMain];
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
          {detail ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {detail.details.map((d, idx) => (
                <button key={d} onClick={() => onDetailCategoryClick(d)} style={{ fontSize: 16, color: '#222', padding: '8px 0', background: 'none', border: 'none', borderRadius: 0, cursor: 'pointer', textAlign: 'left', paddingLeft: 0 }}>{d}</button>
              ))}
              {/* 더보기 예시 */}
              <div style={{ marginTop: 8 }}>
                <a href="#" style={{ color: '#2966e3', fontSize: 15, textDecoration: 'none' }}>더보기 &gt;</a>
              </div>
            </div>
          ) : (
            <div style={{ color: '#bbb', fontSize: 15 }}>상세 카테고리와 이미지는 추후 추가 예정</div>
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
