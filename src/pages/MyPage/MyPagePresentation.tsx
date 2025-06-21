import React from 'react';
import BottomNavBar from '../../components/BottomNavBar';

interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  kakaoId: number;
  profileUrl: string;
  mainCategory: string;
  subCategory: string;
}

interface MyPagePresentationProps {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
  onEditProfile: () => void;
  onMyProducts: () => void;
  onMyJoined: () => void;
  onMyLiked: () => void;
  onNavigate: (path: string) => void;
  onLogout: () => void;
  onDeleteAccount: () => void;
}

const MyPagePresentation = ({
  userInfo,
  loading,
  error,
  onEditProfile,
  onMyProducts,
  onMyJoined,
  onMyLiked,
  onNavigate,
  onLogout,
  onDeleteAccount,
}: MyPagePresentationProps) => {
  // 로딩 중일 때
  if (loading) {
    return (
      <div style={{ maxWidth: 430, margin: '0 auto', background: '#fff', minHeight: '100vh', fontFamily: 'Apple SD Gothic Neo, sans-serif', paddingBottom: 80 }}>
        <div style={{ padding: '18px 0 8px 0', fontSize: 18, fontWeight: 600, borderBottom: '1px solid #eee', textAlign: 'left', paddingLeft: 20 }}></div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 16, color: '#666', marginBottom: 10 }}>정보를 불러오는 중...</div>
          </div>
        </div>
        <BottomNavBar activeTab="mypage" />
      </div>
    );
  }

  // 에러가 발생했을 때
  if (error) {
    return (
      <div style={{ maxWidth: 430, margin: '0 auto', background: '#fff', minHeight: '100vh', fontFamily: 'Apple SD Gothic Neo, sans-serif', paddingBottom: 80 }}>
        <div style={{ padding: '18px 0 8px 0', fontSize: 18, fontWeight: 600, borderBottom: '1px solid #eee', textAlign: 'left', paddingLeft: 20 }}></div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 16, color: '#d32f2f', marginBottom: 10 }}>오류가 발생했습니다</div>
            <div style={{ fontSize: 14, color: '#666', marginBottom: 20 }}>{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              style={{
                background: '#007AFF',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: 14,
                cursor: 'pointer'
              }}
            >
              다시 시도
            </button>
          </div>
        </div>
        <BottomNavBar activeTab="mypage" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 430, margin: '0 auto', background: '#fff', minHeight: '100vh', fontFamily: 'Apple SD Gothic Neo, sans-serif', paddingBottom: 80 }}>
      {/* 상단바 */}
      <div style={{ padding: '18px 0 8px 0', fontSize: 18, fontWeight: 600, borderBottom: '1px solid #eee', textAlign: 'left', paddingLeft: 20 }}></div>
      {/* 유저 정보 */}
      <div style={{ display: 'flex', alignItems: 'center', margin: '32px 0 32px 24px' }}>
        <img 
          src={userInfo?.profileUrl || 'https://via.placeholder.com/44'} 
          alt="프로필" 
          style={{ width: 44, height: 44, borderRadius: '50%', marginRight: 16, objectFit: 'cover' }} 
        />
        <div>
          <div style={{ fontWeight: 600, fontSize: 16 }}>{userInfo?.nickname}</div>
          <div style={{ color: '#bbb', fontSize: 13 }}>{userInfo?.mainCategory}</div>
        </div>
      </div>
      {/* 메뉴 리스트 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginLeft: 24, marginRight: 24 }}>
        <button onClick={onEditProfile} style={{ background: 'none', border: 'none', fontWeight: 700, fontSize: 18, textAlign: 'left', padding: 0, cursor: 'pointer' }}>내 정보 수정하기</button>
        <button onClick={onMyProducts} style={{ background: 'none', border: 'none', fontWeight: 700, fontSize: 18, textAlign: 'left', padding: 0, cursor: 'pointer' }}>내가 올린 공구</button>
        <button onClick={onMyJoined} style={{ background: 'none', border: 'none', fontWeight: 700, fontSize: 18, textAlign: 'left', padding: 0, cursor: 'pointer' }}>내가 참여한 공구</button>
        <button onClick={onMyLiked} style={{ background: 'none', border: 'none', fontWeight: 700, fontSize: 18, textAlign: 'left', padding: 0, cursor: 'pointer' }}>내가 찜 해놓은 공구</button>
        <button onClick={() => onNavigate('/my-info')} style={{ background: 'none', border: 'none', fontWeight: 700, fontSize: 18, textAlign: 'left', padding: 0, cursor: 'pointer' }}>내 정보 조회</button>
      </div>

      {/* 구분선 및 로그아웃/회원탈퇴 버튼 */}
      <div style={{ margin: '30px 24px 0 24px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '100px', paddingBottom: '50px' }}>
          <button onClick={onLogout} style={actionButtonStyle}>로그아웃</button>
          <button onClick={onDeleteAccount} style={{...actionButtonStyle, color: '#d32f2f'}}>회원탈퇴</button>
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <BottomNavBar activeTab="mypage" />
    </div>
  );
};

const actionButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  fontSize: '14px',
  color: '#888',
  cursor: 'pointer',
  padding: '8px 12px',
};

export default MyPagePresentation;
