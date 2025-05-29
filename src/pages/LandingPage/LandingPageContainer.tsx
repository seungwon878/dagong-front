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
  const handleHome = () => navigate('/');
  const handleGroup = () => navigate('/'); // TODO: 공구 메인 페이지로 연결 시 경로 수정
  const handleChat = () => navigate('/chat');
  const handleMyPage = () => navigate('/mypage');
  return (
    <LandingPagePresentation
      onGoToUpload={handleGoToUpload}
      onLocationClick={handleLocationClick}
      onSearchClick={handleSearchClick}
      onProductClick={handleProductClick}
      onHome={handleHome}
      onGroup={handleGroup}
      onChat={handleChat}
      onMyPage={handleMyPage}
    />
  );
};

export default LandingPageContainer; 