import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  // 여기에 추가 라우트를 설정하세요
]); 