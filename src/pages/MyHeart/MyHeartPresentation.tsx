import type { LikedItem } from './MyHeartContainer';

interface MyHeartPresentationProps {
  products: LikedItem[];
  onProductClick: (id: number) => void;
  onHome: () => void;
  onChat: () => void;
  onMyPage: () => void;
  onCancel: () => void;
  onCategory: () => void;
}

const MyHeartPresentation = ({ 
  products, 
  onProductClick, 
  onHome, 
  onChat, 
  onMyPage, 
  onCancel, 
  onCategory
}: MyHeartPresentationProps) => {
  return (
    <div style={{ maxWidth: 430, margin: '0 auto', background: '#fff', minHeight: '100vh', fontFamily: 'Apple SD Gothic Neo, sans-serif', paddingBottom: 80 }}>
      {/* 상단바 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '18px 16px 8px 16px', fontSize: 18, borderBottom: '1px solid #eee' }}>
        <span style={{ fontWeight: 600, fontSize: 18 }}>내가 찜한 공구</span>
        <button style={{ position: 'absolute', right: 16, top: 18, background: 'none', border: 'none', color: '#bbb', fontSize: 15, cursor: 'pointer' }} onClick={onCancel}>취소</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, margin: '16px 0' }}>
        {products.length > 0 ? products.map((p) => (
          <button
            key={p.groupPurchaseId}
            onClick={() => onProductClick(p.groupPurchaseId)}
            style={{ display: 'flex', alignItems: 'center', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '0 16px', margin: 0 }}
          >
            <div style={{ width: 110, height: 90, background: '#ededed', borderRadius: 12, position: 'relative', flexShrink: 0, overflow: 'hidden' }}>
              <img src={p.imageUrl} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
              <span style={{ position: 'absolute', top: 10, right: 10, fontSize: 22, color: '#e89cae' }}>♡</span>
            </div>
            <div style={{ flex: 1, textAlign: 'left', fontSize: 16, color: '#222', fontWeight: 500, marginLeft: 16 }}>
              <div style={{ marginBottom: 6 }}>{p.title}</div>
            </div>
            <div style={{ color: '#bbb', fontSize: 22 }}>{'>'}</div>
          </button>
        )) : (
          <div style={{textAlign: 'center', color: '#888', padding: '40px 0'}}>찜한 상품이 없습니다.</div>
        )}
      </div>
      {/* 하단 네비게이션 */}
      <div style={{ position: 'fixed', left: '50%', bottom: 0, transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: '#fff', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-around', padding: '6px 0 2px 0', zIndex: 100 }}>
        <button onClick={onHome} style={{ flex: 1, background: 'none', border: 'none', color: '#e89cae', fontWeight: 500, fontSize: 13, textAlign: 'center', lineHeight: 1.2, cursor: 'pointer' }}>
          🏠<br />홈
        </button>
        <button onClick={onCategory} style={{ flex: 1, background: 'none', border: 'none', color: '#bbb', fontWeight: 500, fontSize: 13, textAlign: 'center', lineHeight: 1.2, cursor: 'pointer' }}>
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

export default MyHeartPresentation;
