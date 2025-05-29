import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingPagePresentation from './LandingPagePresentation';

const defaultCategories = ['식제품', '전자제품'];
const allCategories = ['식제품', '전자제품', '운동 용품', '작업 공구', 'test'];

const LandingPageContainer = () => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(defaultCategories);
  const [categoryPanelOpen, setCategoryPanelOpen] = useState(false);
  const [tempSelectedCategories, setTempSelectedCategories] = useState<string[]>(selectedCategories);

  const handleGoToUpload = () => {
    navigate('/upload');
  };
  const handleLocationClick = () => {
    navigate('/map');
  };
  const handleSearchClick = () => {
    alert('검색 기능은 추후 구현됩니다!');
  };
  const handleProductClick = (id: number) => {
    navigate(`/register/${id}`);
  };
  const handleChat = () => navigate('/chat');
  const handleMyPage = () => navigate('/mypage');
  // 네비게이션 버튼 클릭 시 패널 오픈
  const handleCategoryNavClick = () => {
    setTempSelectedCategories(selectedCategories);
    setCategoryPanelOpen(true);
  };
  // 카테고리 토글
  const handleCategoryToggle = (cat: string) => {
    setTempSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };
  // 카테고리 반영
  const handleCategoryApply = () => {
    setSelectedCategories(tempSelectedCategories.length > 0 ? tempSelectedCategories : defaultCategories);
    setCategoryPanelOpen(false);
  };
  // 카테고리 패널 닫기
  const handleCategoryPanelClose = () => {
    setCategoryPanelOpen(false);
  };

  return (
    <LandingPagePresentation
      onGoToUpload={handleGoToUpload}
      onLocationClick={handleLocationClick}
      onSearchClick={handleSearchClick}
      onProductClick={handleProductClick}
      selectedCategories={selectedCategories}
      categoryPanelOpen={categoryPanelOpen}
      tempSelectedCategories={tempSelectedCategories}
      onCategoryNavClick={handleCategoryNavClick}
      onCategoryToggle={handleCategoryToggle}
      onCategoryApply={handleCategoryApply}
      onCategoryPanelClose={handleCategoryPanelClose}
      allCategories={allCategories}
      onChat={handleChat}
      onMyPage={handleMyPage}
    />
  );
};

export default LandingPageContainer; 