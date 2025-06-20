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

const LandingPagePresentation = ({
  onGoToUpload,  onProductClick,onChat, onMyPage, onCategory,
  products, loading, error, sortType, sortPanelOpen, onSortClick, onSortChange, onSortPanelClose,
  showAddressPopup, setShowAddressPopup, city, district, town
}: LandingPagePresentationProps) => {
  const navigate = useNavigate();

  const renderProductCard = (product: Product) => (
    <div 
      key={product.id} 
      onClick={() => onProductClick(product.id)}
      className="product-card"
    >
      <div className="product-image-container">
        <img 
          src={'/img/dagong.png'}
          alt={product.title} 
          className="product-image"
        />
        {product.status === 'ACTIVE' && <div className="status-badge">공구중</div>}
      </div>
      <div className="product-info">
        <div>
          <h3 className="product-title">{product.title}</h3>
          <p className="product-place">{product.place}</p>
        </div>
        <div className="product-footer">
          <span className="product-price">{product.price.toLocaleString()}원</span>
          <div className="product-meta">
            <span className="meta-item">❤️ {product.likes}</span>
            <span className="meta-item-separator">|</span>
            <span className="meta-item">참여 {product.currentParticipants}/{product.maxParticipants}</span>
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
      {/* 상단 헤더 영역 */}
      <header className="landing-header">
        <div className="search-bar">
          <span className="search-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <input type="text" placeholder="상품명 혹은 브랜드명을 입력해주세요." className="search-input" />
        </div>
        
        <div className="header-row">
          <div className="location-display">
            📍 {city} {district} {town}
          </div>
          {/* --- 정렬 버튼 및 드롭다운 컨테이너 --- */}
          <div className="sort-container">
            <button className="sort-button" onClick={onSortClick}>
              {sortType === 'views' ? '인기순' : '찜 많은순'} ▼
            </button>
            
            {sortPanelOpen && (
              <div className="sort-dropdown" onClick={(e) => e.stopPropagation()}>
                {[
                  { key: 'views', label: '인기순' },
                  { key: 'likes', label: '찜 많은순' },
                ].map((option) => (
                  <div 
                    key={option.key}
                    className={`sort-option ${sortType === option.key ? 'active' : ''}`}
                    onClick={() => onSortChange(option.key as SortType)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* --- 액션 버튼 영역 --- */}
      <div className="action-button-container">
        <button className="landing-upload-btn" onClick={onGoToUpload}>
          + 새로운 공동구매 등록하기
        </button>
      </div>

      {/* 상품 목록 영역 */}
      <main className="product-list-container">
        {loading ? (
          <div className="message-box">로딩 중...</div>
        ) : error ? (
          <div className="message-box error">{error}</div>
        ) : products.length === 0 ? (
          <div className="message-box">등록된 상품이 없습니다.</div>
        ) : (
          <div className="product-grid">
            {products.map(renderProductCard)}
          </div>
        )}
      </main>

      {/* 정렬 기준 선택 패널 (기존 모달 방식은 삭제) */}
      {sortPanelOpen && (
        <div 
          className="dropdown-overlay"
          onClick={onSortPanelClose}
        />
      )}

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

export default LandingPagePresentation; 