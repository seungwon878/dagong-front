import './LandingPagePresentation.css';
import { FadeTextSlider } from '../../components/FadeTextSlider';

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
  onChat, onMyPage, onCategory, onProductListClick
}: LandingPagePresentationProps) => {
  // 카테고리별 상품 분류
  const getProductsByCategory = (catLabel: string) =>
    products.filter((p) => p.category === catLabel);

  return (
    <div className="landing-root">
      {/* 상단 검색 영역 - 네이버 스토어 스타일 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: 340, background: '#fff', border: '2px solid #8854d9', borderRadius: 8, padding: '0 12px', height: 48, boxSizing: 'border-box', boxShadow: '0 2px 8px #0001' }}>
          <img src="/img/dagong.png" alt="DAGONG 로고" style={{ width: 38, height: 38, marginRight: 8 }} />
          <span style={{ fontSize: 20, marginRight: 4 }}>🔍</span>
          <input type="text" placeholder="   상품명 또는 브랜드 입력" style={{ flex: 1, border: 'none', outline: 'none', fontSize: 16, background: 'transparent', color: '#222', marginRight: 8 }} />
          <span style={{ color: '#8854d9', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>▼</span>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginTop: 14 }}>
          <button className="landing-location-btn" onClick={onLocationClick} style={{ marginLeft: 16 }}>
            상도동 ▼
          </button>
        </div>
      </div>
      {/* 중앙 소개/페이드 애니메이션 영역 + 배경 */}
      <div className="landing-intro-fade" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 350, margin: '30px 0', position: 'relative', background: 'linear-gradient(135deg, #fff7e6 0%, #ffe6f7 100%)', borderRadius: 24, boxShadow: '0 4px 24px #0001' }}>
        <img src="/img/dagong.png" alt="DAGONG 로고" style={{ width: 120, marginBottom: 24, zIndex: 1 }} />
        <FadeTextSlider />
      </div>
      {/* 애니메이션 하단 버튼 2개를 배경 바깥 하단으로 이동 */}
      <div style={{ display: 'flex', gap: 20, width: 'fit-content', margin: '10px auto 0 auto' }}>
        <button className="landing-toolbar-btn" onClick={onProductListClick} style={{ fontSize: 15, padding: '10px 18px', borderRadius: 20, background: '#fff', color: '#e89cae', border: '2px solid #e89cae', fontWeight: 600, boxShadow: '0 2px 8px #0001', cursor: 'pointer' }}>
          공구 중인 상품 보기
        </button>
        <button className="landing-upload-btn" onClick={onGoToUpload} style={{ fontSize: 15, padding: '10px 18px', borderRadius: 20 }}>
          공구 등록하러 가기
        </button>
      </div>
      {/* 카테고리 바 */}
      {/* <div className="landing-categories">
        <button className="landing-category-nav" onClick={onCategoryNavClick} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 20, marginRight: 8 }}>☰</button>
        {selectedCategories.map((cat) => (
          <span className="landing-category" key={cat}>
            <span className="landing-category-icon">{categoryIcons[cat]}</span>
            <span className="landing-category-label">{cat}</span>
          </span>
        ))}
      </div> */}
      {/* 카테고리 패널(오버레이) */}
      {/* {categoryPanelOpen && (
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
      )}  */}
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