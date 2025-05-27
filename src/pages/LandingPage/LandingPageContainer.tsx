import { useNavigate } from 'react-router-dom';
import LandingPagePresentation from './LandingPagePresentation';

const LandingPageContainer = () => {
  const navigate = useNavigate();
  const handleGoToUpload = () => {
    navigate('/upload');
  };
  return <LandingPagePresentation onGoToUpload={handleGoToUpload} />;
};

export default LandingPageContainer; 