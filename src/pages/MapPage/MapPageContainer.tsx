import { useNavigate } from 'react-router-dom';
import MapPagePresentation from './MapPagePresentation';

const MapPageContainer = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate('/upload');
  };
  return <MapPagePresentation onClose={handleClose} />;
};

export default MapPageContainer;
