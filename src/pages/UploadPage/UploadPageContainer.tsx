import { useNavigate } from 'react-router-dom';
import UploadPagePresentation from './UploadPagePresentation';

const UploadPageContainer = () => {
  const navigate = useNavigate();
  const handleLocationClick = () => {
    navigate('/map');
  };
  const handleRegister = () => {
    alert('공구 등록! (기능은 추후 구현)');
  };
  return (
    <UploadPagePresentation
      onLocationClick={handleLocationClick}
      onRegister={handleRegister}
    />
  );
};

export default UploadPageContainer;
