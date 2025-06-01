import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import UploadPage from '../pages/UploadPage';
import MapPage from '../pages/MapPage';
import RegisterPage from '../RegisterPage';
import ChatPage from '../pages/ChatPage';
import ChattingPage from '../pages/ChattingPage';
import MyPage from '../pages/MyPage';
import EditPage from '../pages/EditPage';
import MyProPage from '../pages/MyProPage';
import RegisterPageContainer from '../RegisterPage/RegisterPageContainer';
import SearchProductPage from '../pages/SearchProductPage';
import MyInPage from '../pages/MyInPage';
import MyHeart from '../pages/MyHeart';
import CatePage from '../pages/CatePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/landing',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/upload',
    element: <UploadPage />,
  },
  {
    path: '/map',
    element: <MapPage />,
  },
  {
    path: '/register/:id',
    element: <RegisterPage />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
  {
    path: '/chat/:id',
    element: <ChattingPage />,
  },
  {
    path: '/mypage',
    element: <MyPage />,
  },
  {
    path: '/mypage/edit',
    element: <EditPage />,
  },
  {
    path: '/mypage/myproducts',
    element: <MyProPage />,
  },
  {
    path: '/mypro/:id',
    element: <RegisterPageContainer bottomButtons={[
      { text: '수정하기', onClick: () => alert('수정하기') },
      { text: '공구 내리기', onClick: () => alert('공구 내리기') },
    ]} />,
  },
  {
    path: '/search-product',
    element: <SearchProductPage />,
  },
  {
    path: '/mypage/myjoined',
    element: <MyInPage />,
  },
  {
    path: '/mypage/myliked',
    element: <MyHeart />,
  },
  {
    path: '/category',
    element: <CatePage />,
  },
  // 여기에 추가 라우트를 설정하세요
]); 