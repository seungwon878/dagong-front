import styled from 'styled-components';
import { FaHeart, FaUserFriends } from 'react-icons/fa';

interface Product {
  id: number;
  title: string;
  content: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  maxParticipants: number;
  currentParticipants: number;
  likes: number;
  status: string;
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
  onProductClick: (id: number) => void; // onProductClick prop 타입 추가
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
  error,
  onProductClick // onProductClick prop 받기
}: CatePagePresentationProps) => {
  const detail = categoryDetails[selectedMain];
  const formatPrice = (price: number) => new Intl.NumberFormat('ko-KR').format(price);

  // 상품 카드 렌더링 함수
  const renderProductCard = (product: Product) => (
    <ProductCard key={product.id} onClick={() => onProductClick(product.id)}>
      <ProductImage src={product.imageUrl || '/img/dagong.png'} alt={product.title} />
      <ProductInfo>
        <StatusTag status={product.status}>
          {product.status === 'ACTIVE' ? '모집중' : '모집완료'}
        </StatusTag>
        <ProductTitle>{product.title}</ProductTitle>
        <Price>{formatPrice(product.price)}원</Price>
        <Footer>
          <FooterInfo>
            <FaHeart color="#ff7f7f" /> {product.likes}
          </FooterInfo>
          <FooterInfo>
            <FaUserFriends color="#5a67d8" /> {product.currentParticipants}/{product.maxParticipants}
          </FooterInfo>
        </Footer>
      </ProductInfo>
    </ProductCard>
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
                {detail.details.map((d) => (
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
                <StatusMessage>로딩 중...</StatusMessage>
              ) : error ? (
                <StatusMessage error>{error}</StatusMessage>
              ) : products.length === 0 ? (
                <StatusMessage>등록된 상품이 없습니다.</StatusMessage>
              ) : (
                <ProductList>
                  {products.map(renderProductCard)}
                </ProductList>
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

// --- Styled Components ---

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProductCard = styled.div`
  display: flex;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  padding: 16px;
  cursor: pointer;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 12px;
  background-color: #f0f0f0;
`;

const ProductInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const StatusTag = styled.div<{ status: string }>`
  background-color: ${({ status }) => status === 'ACTIVE' ? '#e3f2fd' : '#fce4ec'};
  color: ${({ status }) => status === 'ACTIVE' ? '#1e88e5' : '#c2185b'};
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
  align-self: flex-start;
  margin-bottom: 8px;
`;

const ProductTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 6px;
  line-height: 1.4;
  color: #333;
`;

const Price = styled.div`
  font-size: 15px;
  font-weight: 700;
  margin-bottom: auto;
  color: #111;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
`;

const FooterInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #555;
`;

const StatusMessage = styled.div<{ error?: boolean }>`
  text-align: center;
  padding: 40px 0;
  color: ${({ error }) => error ? '#e89cae' : '#888'};
`;
