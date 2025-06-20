import { useNavigate } from 'react-router-dom';
import MyPagePresentation from './MyPagePresentation';
import { useAuth } from '../../contexts/AuthContext';
import { deleteMember } from '../../Apis/userApi';

const user = {
  name: 'dagong',
  location: '상도동',
};

const MyPageContainer = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleEditProfile = () => navigate('/mypage/edit');
  const handleMyProducts = () => navigate('/mypage/myproducts');
  const handleMyJoined = () => navigate('/mypage/myjoined');
  const handleMyLiked = () => navigate('/mypage/myliked');
  const handleNavigate = (path: string) => navigate(path);

  const handleLogout = () => {
    logout();
    navigate('/first');
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      try {
        const memberId = localStorage.getItem('memberId');
        if (!memberId) {
          throw new Error('사용자 ID를 찾을 수 없습니다. 다시 로그인해주세요.');
        }
        await deleteMember(Number(memberId));
        alert('회원 탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.');
        logout();
        navigate('/first');
      } catch (error: any) {
        alert(`탈퇴 처리 중 오류가 발생했습니다: ${error.message}`);
        // 필요 시 여기서도 강제 로그아웃 처리
        logout();
        navigate('/first');
      }
    }
  };

  return (
    <MyPagePresentation
      user={user}
      onEditProfile={handleEditProfile}
      onMyProducts={handleMyProducts}
      onMyJoined={handleMyJoined}
      onMyLiked={handleMyLiked}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
      onDeleteAccount={handleDeleteAccount}
    />
  );
};

export default MyPageContainer;
