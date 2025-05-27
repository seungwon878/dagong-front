import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import UploadPage from '../pages/UploadPage';
import MapPage from '../pages/MapPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/upload',
    element: <UploadPage />,
  },
  {
    path: '/map',
    element: <MapPage />,
  },
  // 여기에 추가 라우트를 설정하세요
]); 