import './LandingPagePresentation.css';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  status: string;
  place: string;
  price: number;
  maxParticipants: number;
  currentParticipants: number;
  views: number;
  likes: number;
  deadline: string;
}

type SortType = 'views' | 'likes';

interface LandingPagePresentationProps {
  onGoToUpload: () => void;
  onLocationClick: () => void;
  onSearchClick: () => void;
  onProductClick: (id: number) => void;
  selectedCategories: string[];
  categoryPanelOpen: boolean;
  tempSelectedCategories: string[];
  onCategoryNavClick: () => void;
  onCategoryToggle: (cat: string) => void;
  onCategoryApply: () => void;
  onCategoryPanelClose: () => void;
  allCategories: string[];
  onChat: () => void;
  onMyPage: () => void;
  onCategory: () => void;
  onProductListClick: () => void;
  products: Product[];
  loading: boolean;
  error: string | null;
  sortType: SortType;
  sortPanelOpen: boolean;
  onSortClick: () => void;
  onSortChange: (type: SortType) => void;
  onSortPanelClose: () => void;
  showAddressPopup?: boolean;
  setShowAddressPopup?: (show: boolean) => void;
  city?: string | null;
  district?: string | null;
  town?: string | null;
}

// 예시 mock 상품 데이터 (카테고리별 5~6개씩)
const products = [
  // 식제품
  { id: 1, name: '마이프로틴', price: 10000, image: '', category: '식제품' },
  { id: 2, name: '닭가슴살', price: 12000, image: '', category: '식제품' },
  { id: 3, name: '고구마말랭이', price: 8000, image: '', category: '식제품' },
  { id: 4, name: '오트밀', price: 9000, image: '', category: '식제품' },
  { id: 5, name: '단백질바', price: 7000, image: '', category: '식제품' },
  { id: 6, name: '아몬드', price: 6000, image: '', category: '식제품' },
  // 전자제품
  { id: 11, name: '에어팟', price: 150000, image: '', category: '전자제품' },
  { id: 12, name: '갤럭시버즈', price: 110000, image: '', category: '전자제품' },
  { id: 13, name: '아이패드', price: 450000, image: '', category: '전자제품' },
  { id: 14, name: '갤럭시탭', price: 420000, image: '', category: '전자제품' },
  { id: 15, name: '블루투스스피커', price: 35000, image: '', category: '전자제품' },
  { id: 16, name: '스마트워치', price: 90000, image: '', category: '전자제품' },
  // 운동 용품
  { id: 21, name: '덤벨', price: 20000, image: '', category: '운동 용품' },
  { id: 22, name: '요가매트', price: 25000, image: '', category: '운동 용품' },
  { id: 23, name: '폼롤러', price: 18000, image: '', category: '운동 용품' },
  { id: 24, name: '푸쉬업바', price: 15000, image: '', category: '운동 용품' },
  { id: 25, name: '헬스장갑', price: 12000, image: '', category: '운동 용품' },
  { id: 26, name: '스트레칭밴드', price: 9000, image: '', category: '운동 용품' },
];

const categoryIcons: Record<string, string> = {
  '식제품': '🔥',
  '전자제품': '📱',
  '운동 용품': '🏋️‍♂️',
  '작업 공구': '⚙️',
  'test': '🧪',
};

const LandingPagePresentation = ({
  onGoToUpload, onLocationClick, onSearchClick, onProductClick,
  selectedCategories, categoryPanelOpen, tempSelectedCategories,
  onCategoryNavClick, onCategoryToggle, onCategoryApply, onCategoryPanelClose, allCategories,
  onChat, onMyPage, onCategory, onProductListClick,
  products, loading, error, sortType, sortPanelOpen, onSortClick, onSortChange, onSortPanelClose,
  showAddressPopup, setShowAddressPopup, city, district, town
}: LandingPagePresentationProps) => {
  const navigate = useNavigate();

  const renderProductCard = (product: Product) => (
    <div 
      key={product.id} 
      onClick={() => onProductClick(product.id)}
      style={styles.productCard}
    >
      <div style={styles.productImageContainer}>
        <img 
          src={'/img/dagong.png'}
          alt={product.title} 
          style={styles.productImage}
        />
        {product.status === 'ACTIVE' && <div style={styles.statusBadge}>공구중</div>}
      </div>
      <div style={styles.productInfo}>
        <div>
          <h3 style={styles.productTitle}>{product.title}</h3>
          <p style={styles.productPlace}>{product.place}</p>
        </div>
        <div style={styles.productFooter}>
          <span style={styles.productPrice}>{product.price.toLocaleString()}원</span>
          <div style={styles.productMeta}>
            <span style={styles.metaItem}>❤️ {product.likes}</span>
            <span style={styles.metaItem}>|</span>
            <span style={styles.metaItem}>참여 {product.currentParticipants}/{product.maxParticipants}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="landing-root">
      {/* 주소 등록 팝업 */}
      {showAddressPopup && setShowAddressPopup && (
        <div style={{
          position: 'fixed', left: 0, top: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.3)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: '#fff', padding: '30px 20px', borderRadius: 12, textAlign: 'center', minWidth: 250
          }}>
            <p style={{ fontSize: 18, marginBottom: 20 }}>주소를 등록해주세요!</p>
            <button onClick={() => navigate('/map')} style={{ padding: '8px 20px', borderRadius: 8, background: '#e89cae', color: '#fff', border: 'none', fontWeight: 600, fontSize: 16, marginRight: 8 }}>주소 등록하러 가기</button>
          </div>
        </div>
      )}
      {/* 상단 검색 영역 - 네이버 스토어 스타일 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: 340, background: '#fff', border: '2px solid #8854d9', borderRadius: 8, padding: '0 12px', height: 48, boxSizing: 'border-box', boxShadow: '0 2px 8px #0001' }}>
          <img src="/img/dagong.png" alt="DAGONG 로고" style={{ width: 38, height: 38, marginRight: 8 }} />
          <span style={{ fontSize: 20, marginRight: 4 }}>🔍</span>
          <input type="text" placeholder="   상품명 또는 브랜드 입력" style={{ flex: 1, border: 'none', outline: 'none', fontSize: 16, background: 'transparent', color: '#222', marginRight: 8 }} />
          <span style={{ color: '#8854d9', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>▼</span>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, padding: '0 16px' }}>
          <div>
            {city} {district} {town}
          </div>
          <button className="landing-location-btn" onClick={onSortClick}>
            {sortType === 'views' ? '조회수 순' : '찜 순'} ▼
          </button>
        </div>
      </div>

      {/* 상품 목록 영역 (기존 애니메이션 영역 대체) */}
      <div style={{ margin: '24px 16px', minHeight: 350 }}>
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

      {/* 정렬 기준 선택 패널 */}
      {sortPanelOpen && (
        <div 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            background: 'rgba(0,0,0,0.4)', 
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingTop: 100
          }}
          onClick={onSortPanelClose}
        >
          <div 
            style={{ 
              background: '#fff', 
              borderRadius: 12, 
              padding: 16, 
              width: '90%', 
              maxWidth: 300,
              boxShadow: '0 4px 24px rgba(0,0,0,0.1)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 16, color: '#222' }}>정렬 기준</div>
            <button 
              onClick={() => onSortChange('views')}
              style={{ 
                width: '100%',
                padding: '12px',
                marginBottom: 8,
                border: 'none',
                borderRadius: 8,
                background: sortType === 'views' ? '#f8e6eb' : '#f5f5f5',
                color: sortType === 'views' ? '#e89cae' : '#444',
                fontSize: 15,
                fontWeight: sortType === 'views' ? 600 : 400,
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              조회수 순
            </button>
            <button 
              onClick={() => onSortChange('likes')}
              style={{ 
                width: '100%',
                padding: '12px',
                border: 'none',
                borderRadius: 8,
                background: sortType === 'likes' ? '#f8e6eb' : '#f5f5f5',
                color: sortType === 'likes' ? '#e89cae' : '#444',
                fontSize: 15,
                fontWeight: sortType === 'likes' ? 600 : 400,
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              찜 순
            </button>
          </div>
        </div>
      )}

      {/* 하단 버튼 */}
      <div style={{ display: 'flex', gap: 20, width: 'fit-content', margin: '10px auto 0 auto' }}>
        <button className="landing-toolbar-btn" onClick={onProductListClick} style={{ fontSize: 15, padding: '10px 18px', borderRadius: 20, background: '#fff', color: '#e89cae', border: '2px solid #e89cae', fontWeight: 600, boxShadow: '0 2px 8px #0001', cursor: 'pointer' }}>
          공구 중인 상품 보기
        </button>
        <button className="landing-upload-btn" onClick={onGoToUpload} style={{ fontSize: 15, padding: '10px 18px', borderRadius: 20 }}>
          공구 등록하러 가기
        </button>
      </div>

      {/* 하단 네비게이션 */}
      <div className="landing-bottomnav">
        <div className="landing-nav-item active">🏠<br />홈</div>
        <button className="landing-nav-item" onClick={onCategory} style={{ background: 'none', border: 'none' }}>📂<br />카테고리</button>
        <button className="landing-nav-item" onClick={onChat} style={{ background: 'none', border: 'none' }}>💬<br />채팅</button>
        <button className="landing-nav-item" onClick={onMyPage} style={{ background: 'none', border: 'none' }}>👤<br />마이페이지</button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  productCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '10px',
    marginBottom: '10px',
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.07)',
    border: '1px solid #f0f0f0',
    overflow: 'hidden',
  },
  productImageContainer: {
    position: 'relative',
    width: '90px',
    height: '90px',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    marginRight: '12px',
    flexShrink: 0,
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  statusBadge: {
    position: 'absolute',
    top: '0',
    left: '0',
    backgroundColor: 'rgba(232, 156, 174, 0.9)',
    color: '#fff',
    padding: '4px 9px',
    borderRadius: '10px 0 8px 0',
    fontSize: '10px',
    fontWeight: '600',
  },
  productInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  productTitle: {
    margin: '0 0 6px 0',
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    lineHeight: 1.35,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    minHeight: '38px',
  },
  productPlace: {
    margin: 0,
    fontSize: '12px',
    color: '#888',
  },
  productFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px',
  },
  productPrice: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#e89cae',
  },
  productMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11px',
    color: '#888',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
  },
};

export default LandingPagePresentation; 