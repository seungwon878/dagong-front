import './LandingPagePresentation.css';

interface LandingPagePresentationProps {
  onGoToUpload: () => void;
  onLocationClick: () => void;
  onSearchClick: () => void;
  onProductClick: (id: number) => void;
  onHome: () => void;
  onGroup: () => void;
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

const categories = [
  { icon: '🔥', label: '식제품' },
  { icon: '📱', label: '전자제품' },
  { icon: '🏋️‍♂️', label: '운동 용품' },
  { icon: '⚙️', label: '작업 공구' },
  { icon: '🧪', label: 'test' },
];

const LandingPagePresentation = ({ onGoToUpload, onLocationClick, onSearchClick, onProductClick, onHome, onGroup, onChat, onMyPage }: LandingPagePresentationProps) => {
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
      {/* 카테고리 */}
      <div className="landing-categories">
        {categories.map((cat) => (
          <span className="landing-category" key={cat.label}>
            <span className="landing-category-icon">{cat.icon}</span>
            <span className="landing-category-label">{cat.label}</span>
          </span>
        ))}
      </div>
      {/* 상품 리스트 */}
      {categories.slice(0, 3).map((cat) => (
        <div className="landing-section" key={cat.label}>
          <div className="landing-section-title">{cat.icon} {cat.label}</div>
          <div className="landing-cards landing-cards-scroll">
            {getProductsByCategory(cat.label).map((product) => (
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
        <button className="landing-nav-item active" onClick={onHome}>🏠<br />홈</button>
        <button className="landing-nav-item" onClick={onGroup}>👥<br />공구</button>
        <button className="landing-nav-item" onClick={onChat}>💬<br />채팅</button>
        <button className="landing-nav-item" onClick={onMyPage}>👤<br />마이페이지</button>
      </div>
    </div>
  );
};

export default LandingPagePresentation; 