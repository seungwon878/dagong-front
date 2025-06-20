import { useNavigate } from 'react-router-dom';
import MyPagePresentation from './MyPagePresentation';
import { useAuth } from '../../contexts/AuthContext';
import { deleteMember, getMemberInfo } from '../../Apis/userApi';
import { useEffect, useState } from 'react';

interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  kakaoId: number;
  profileUrl: string;
  mainCategory: string;
  subCategory: string;
}

const MyPageContainer = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleEditProfile = () => navigate('/mypage/edit');
  const handleMyProducts = () => navigate('/mypage/myproducts');
  const handleMyJoined = () => navigate('/mypage/myjoined');
  const handleMyLiked = () => navigate('/mypage/myliked');
  const handleDelivery = () => alert('배송 조회 기능은 준비중입니다.');
  const handleNavigate = (path: string) => navigate(path);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const memberId = localStorage.getItem('memberId');
        if (!memberId) {
          throw new Error('로그인이 필요합니다.');
        }

        const response = await getMemberInfo(Number(memberId));
        
        if (response.isSuccess) {
          setUserInfo(response.result);
        } else {
          throw new Error(response.message || '정보를 불러오는데 실패했습니다.');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

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
      userInfo={userInfo}
      onEditProfile={handleEditProfile}
      onMyProducts={handleMyProducts}
      onMyJoined={handleMyJoined}
      onMyLiked={handleMyLiked}
      onDelivery={handleDelivery}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
      onDeleteAccount={handleDeleteAccount}
    />
  );
};

export default MyPageContainer;
