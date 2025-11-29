import type { LikedItem } from './MyHeartContainer';
import BottomNavBar from '../../components/BottomNavBar';

interface MyHeartPresentationProps {
  products: LikedItem[];
  onProductClick: (id: number) => void;
  onCancel: () => void;
}

const MyHeartPresentation = ({ 
  products, 
  onProductClick, 
  onCancel, 
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
              <img src={p.imageUrl.startsWith('http://') ? p.imageUrl.replace('http://', 'https://') : p.imageUrl} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
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
      <BottomNavBar activeTab="mypage" />
    </div>
  );
};

export default MyHeartPresentation;
