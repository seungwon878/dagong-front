import BottomNavBar from '../../components/BottomNavBar';

interface Product {
  id: number;
  name: string;
  status: string;
}

interface MyInPagePresentationProps {
  products: Product[];
  onProductClick: (id: number) => void;
  onCancel: () => void;
}

const MyInPagePresentation = ({ products, onProductClick, onCancel }: MyInPagePresentationProps) => {
  return (
    <div style={{ maxWidth: 430, margin: '0 auto', background: '#fff', minHeight: '100vh', fontFamily: 'Apple SD Gothic Neo, sans-serif', paddingBottom: 80 }}>
      {/* 상단바 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '18px 16px 8px 16px', fontSize: 18, borderBottom: '1px solid #eee' }}>
        <span style={{ fontWeight: 600, fontSize: 18 }}>참여한 공구</span>
        <button style={{ position: 'absolute', right: 16, top: 18, background: 'none', border: 'none', color: '#bbb', fontSize: 15, cursor: 'pointer' }} onClick={onCancel}>취소</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, margin: '0 0 32px 0' }}>
        {products.map((p) => (
          <button
            key={p.id}
            onClick={() => onProductClick(p.id)}
            style={{ display: 'flex', alignItems: 'center', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0, margin: 0 }}
          >
            <div style={{ width: 110, height: 90, background: '#ededed', borderRadius: 12, position: 'relative', marginLeft: 24, marginRight: 18, flexShrink: 0 }}>
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
      <BottomNavBar activeTab="mypage" />
    </div>
  );
};

export default MyInPagePresentation;
