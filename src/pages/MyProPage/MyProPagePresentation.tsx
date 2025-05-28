import React from 'react';

interface Product {
  id: number;
  name: string;
  status: string;
  liked: boolean;
}

interface MyProPagePresentationProps {
  products: Product[];
  onProductClick: (id: number) => void;
  onHome: () => void;
  onChat: () => void;
  onMyPage: () => void;
}

const MyProPagePresentation = ({ products, onProductClick, onHome, onChat, onMyPage }: MyProPagePresentationProps) => {
  return (
    <div style={{ maxWidth: 430, margin: '0 auto', background: '#fff', minHeight: '100vh', fontFamily: 'Apple SD Gothic Neo, sans-serif', paddingBottom: 80 }}>
      <div style={{ padding: '18px 0 8px 0', fontSize: 18, fontWeight: 600, borderBottom: '1px solid #eee', textAlign: 'left', paddingLeft: 20 }}></div>
      <div style={{ fontWeight: 600, fontSize: 20, margin: '32px 0 24px 24px' }}>내가 올린 공구</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, margin: '0 0 32px 0' }}>
        {products.map((p) => (
          <button
            key={p.id}
            onClick={() => onProductClick(p.id)}
            style={{ display: 'flex', alignItems: 'center', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0, margin: 0 }}
          >
            <div style={{ width: 110, height: 90, background: '#ededed', borderRadius: 12, position: 'relative', marginLeft: 24, marginRight: 18, flexShrink: 0 }}>
              <span style={{ position: 'absolute', top: 10, right: 10, fontSize: 22, color: p.liked ? '#e89cae' : '#ccc' }}>♡</span>
            </div>
            <div style={{ flex: 1, textAlign: 'left', fontSize: 16, color: '#222', fontWeight: 500 }}>
              <div style={{ marginBottom: 6 }}>상품명: {p.name}</div>
              <div style={{ color: '#888', fontSize: 15 }}>현재 상태: {p.status}</div>
            </div>
            <div style={{ marginRight: 24, color: '#bbb', fontSize: 22 }}>{'>'}</div>
          </button>
        ))}
      </div>
      {/* 하단 네비게이션 */}
      <div style={{ position: 'fixed', left: '50%', bottom: 0, transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: '#fff', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-around', padding: '6px 0 2px 0', zIndex: 100 }}>
        <button onClick={onHome} style={{ flex: 1, background: 'none', border: 'none', color: '#e89cae', fontWeight: 500, fontSize: 13, textAlign: 'center', lineHeight: 1.2, cursor: 'pointer' }}>
          🏠<br />홈
        </button>
        <div style={{ flex: 1, color: '#bbb', fontWeight: 500, fontSize: 13, textAlign: 'center', lineHeight: 1.2 }}>👥<br />공구</div>
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

export default MyProPagePresentation;
