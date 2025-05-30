
import { useNavigate } from 'react-router-dom';
import MyPagePresentation from './MyPagePresentation';

const user = {
  name: 'Alice',
  location: '서울특별시 상도동',
};

const MyPageContainer = () => {
  const navigate = useNavigate();
  const handleEditProfile = () => navigate('/mypage/edit');
  const handleMyProducts = () => navigate('/mypage/myproducts');
  const handleMyJoined = () => navigate('/mypage/myjoined');
  const handleMyLiked = () => navigate('/mypage/myliked');
  const handleDelivery = () => navigate('/mypage/delivery');
  const handleHome = () => navigate('/');
  const handleChat = () => navigate('/chat');
  const handleMyPage = () => navigate('/mypage');

  return (
    <MyPagePresentation
      user={user}
      onEditProfile={handleEditProfile}
      onMyProducts={handleMyProducts}
      onMyJoined={handleMyJoined}
      onMyLiked={handleMyLiked}
      onDelivery={handleDelivery}
      onHome={handleHome}
      onChat={handleChat}
      onMyPage={handleMyPage}
    />
  );
};

export default MyPageContainer;
