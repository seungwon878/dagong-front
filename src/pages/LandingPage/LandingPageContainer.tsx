import { useNavigate } from 'react-router-dom';
import LandingPagePresentation from './LandingPagePresentation';

const LandingPageContainer = () => {
  const navigate = useNavigate();
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
  return (
    <LandingPagePresentation
      onGoToUpload={handleGoToUpload}
      onLocationClick={handleLocationClick}
      onSearchClick={handleSearchClick}
      onProductClick={handleProductClick}
    />
  );
};

export default LandingPageContainer; 