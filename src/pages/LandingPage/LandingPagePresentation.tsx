import './LandingPagePresentation.css';

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
  onChat, onMyPage
}: LandingPagePresentationProps) => {
  // 카테고리별 상품 분류
  const getProductsByCategory = (catLabel: string) =>
    products.filter((p) => p.category === catLabel);

  return (
    <div className="landing-root">
      {/* 상단바 */}
      <div className="landing-topbar">
        <button className="landing-location-btn" onClick={onLocationClick}>상도동 ▼</button>
        <span className="landing-title"></span>
        <button className="landing-search-btn" onClick={onSearchClick}>🔍</button>
        <span className="landing-bell">🔔</span>
      </div>
      {/* 검색/필터/정렬 바 */}
      <div className="landing-toolbar">
        <span className="landing-toolbar-title">공구 중인 상품 보기</span>
        <button className="landing-upload-btn" onClick={onGoToUpload}>공구 등록하러 가기</button>
      </div>
      {/* 카테고리 바 */}
      <div className="landing-categories">
        <button className="landing-category-nav" onClick={onCategoryNavClick} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 20, marginRight: 8 }}>☰</button>
        {selectedCategories.map((cat) => (
          <span className="landing-category" key={cat}>
            <span className="landing-category-icon">{categoryIcons[cat]}</span>
            <span className="landing-category-label">{cat}</span>
          </span>
        ))}
      </div>
      {/* 카테고리 패널(오버레이) */}
      {categoryPanelOpen && (
        <div className="category-panel-overlay" style={{ position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.15)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }} onClick={onCategoryPanelClose}>
          <div className="category-panel" style={{ background: '#fff', borderRadius: 12, marginTop: 40, boxShadow: '0 4px 24px #0002', padding: 16, minWidth: 220, maxHeight: 500, overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 12 }}>카테고리 선택</div>
            {allCategories.map((cat) => (
              <div
                key={cat}
                onClick={() => onCategoryToggle(cat)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', cursor: 'pointer',
                  color: tempSelectedCategories.includes(cat) ? '#e89cae' : '#444',
                  fontWeight: tempSelectedCategories.includes(cat) ? 700 : 400,
                  background: tempSelectedCategories.includes(cat) ? '#f8e6eb' : 'transparent',
                  borderRadius: 8,
                  paddingLeft: 8,
                }}
              >
                <span style={{ fontSize: 18 }}>{categoryIcons[cat]}</span>
                <span>{cat}</span>
                {tempSelectedCategories.includes(cat) && <span style={{ marginLeft: 'auto', color: '#e89cae', fontSize: 18 }}>✔</span>}
              </div>
            ))}
            <button
              onClick={onCategoryApply}
              style={{ width: '100%', marginTop: 16, background: '#444', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontSize: 16, fontWeight: 500, cursor: 'pointer' }}
            >카테고리 반영</button>
          </div>
        </div>
      )}
      {/* 카테고리별 상품 리스트 */}
      {selectedCategories.map((cat) => (
        <div className="landing-section" key={cat}>
          <div className="landing-section-title">{categoryIcons[cat]} {cat}</div>
          <div className="landing-cards landing-cards-scroll">
            {getProductsByCategory(cat).map((product) => (
              <button
                key={product.id}
                className="landing-card landing-card-half"
                onClick={() => onProductClick(product.id)}
              >
                {/* 이미지 영역 */}
                <div className="landing-card-imgbox">
                  {product.image ? (
                    <img src={product.image} alt={product.name} style={{ width: '70%', height: '70%', objectFit: 'contain' }} />
                  ) : (
                    <span role="img" aria-label="camera" style={{ fontSize: 32, color: '#bbb' }}>📷</span>
                  )}
                </div>
                {/* 하단 상품명/가격 */}
                <div className="landing-card-info">
                  <div className="landing-card-name">{product.name}</div>
                  <div className="landing-card-price">{product.price.toLocaleString()}원</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
      {/* 하단 네비게이션 */}
      <div className="landing-bottomnav">
        <div className="landing-nav-item active">🏠<br />홈</div>
        <div className="landing-nav-item">👥<br />공구</div>
        <button className="landing-nav-item" onClick={onChat} style={{ background: 'none', border: 'none' }}>💬<br />채팅</button>
        <button className="landing-nav-item" onClick={onMyPage} style={{ background: 'none', border: 'none' }}>👤<br />마이페이지</button>
      </div>
    </div>
  );
};

export default LandingPagePresentation; 