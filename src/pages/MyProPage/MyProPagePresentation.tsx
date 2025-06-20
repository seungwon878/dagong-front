import BottomNavBar from '../../components/BottomNavBar';

interface Product {
  id: number;
  name: string;
  status: string;
  liked: boolean;
}

interface MyProPagePresentationProps {
  products: Product[];
  onProductClick: (id: number) => void;
  onCancel: () => void;
  onDeleteProduct: (id: number) => void;
}

const MyProPagePresentation = ({ products, onProductClick, onCancel, onDeleteProduct }: MyProPagePresentationProps) => {
  return (
    <div style={{ maxWidth: 430, margin: '0 auto', background: '#fff', minHeight: '100vh', fontFamily: 'Apple SD Gothic Neo, sans-serif', paddingBottom: 80 }}>
      {/* 상단바 + 취소 버튼 */}
      <div style={{ position: 'relative', padding: '18px 0 8px 0', fontSize: 18, fontWeight: 600, borderBottom: '1px solid #eee', textAlign: 'left', paddingLeft: 20 }}>
        <span style={{ fontWeight: 600, fontSize: 20 }}>내가 올린 공구</span>
        <button onClick={onCancel} style={{ position: 'absolute', right: 16, top: 18, background: 'none', border: 'none', color: '#bbb', fontSize: 15, cursor: 'pointer' }}>취소</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, margin: '0 0 32px 0' }}>
        {products.map((p) => (
          <div key={p.id} style={{ position: 'relative', borderRadius: 12, padding: '18px 0', minHeight: 110 }}>
            <button
              onClick={() => onProductClick(p.id)}
              style={{ display: 'flex', alignItems: 'center', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0, margin: 0 }}
            >
              <div style={{ width: 110, height: 90, background: '#ededed', borderRadius: 12, position: 'relative', marginLeft: 24, marginRight: 18, flexShrink: 0 }}>
                <span style={{ position: 'absolute', top: 10, right: 10, fontSize: 22, color: p.liked ? '#e89cae' : '#ccc' }}>♡</span>
              </div>
              <div style={{ flex: 1, textAlign: 'left', fontSize: 16, color: '#222', fontWeight: 500 }}>
                <div style={{ marginBottom: 6 }}>상품명: {p.name}</div>
                <div style={{ color: '#888', fontSize: 15 }}>현재 상태: {p.status}</div>
                {/* 공구 삭제하기 버튼 - 현재 상태 바로 아래 우측 정렬 */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                  <button onClick={() => onDeleteProduct(p.id)} style={{ background: '#fff', color: '#e89cae', border: '1px solid #e89cae', borderRadius: 8, fontSize: 13, fontWeight: 600, padding: '4px 12px', cursor: 'pointer', boxShadow: '0 1px 4px #0001' }}>
                    공구 삭제하기
                  </button>
                </div>
              </div>
              <div style={{ marginRight: 24, color: '#bbb', fontSize: 22 }}>{'>'}</div>
            </button>
          </div>
        ))}
      </div>
      {/* 하단 네비게이션 */}
      <BottomNavBar activeTab="mypage" />
    </div>
  );
};

export default MyProPagePresentation;
