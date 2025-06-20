import React from 'react';

interface MyPagePresentationProps {
  user: { name: string; location: string };
  onEditProfile: () => void;
  onMyProducts: () => void;
  onMyJoined: () => void;
  onMyLiked: () => void;
  onDelivery: () => void;
  onHome: () => void;
  onChat: () => void;
  onUpload: () => void;
  onMyPage: () => void;
  onCategory: () => void;
  onNavigate: (path: string) => void;
  onLogout: () => void;
  onDeleteAccount: () => void;
}

const MyPagePresentation = ({
  user,
  onEditProfile,
  onMyProducts,
  onMyJoined,
  onMyLiked,
  onDelivery,
  onHome,
  onChat,
  onUpload,
  onMyPage,
  onCategory,
  onNavigate,
  onLogout,
  onDeleteAccount,
}: MyPagePresentationProps) => {
  return (
    <div style={{ maxWidth: 430, margin: '0 auto', background: '#fff', minHeight: '100vh', fontFamily: 'Apple SD Gothic Neo, sans-serif', paddingBottom: 80 }}>
      {/* 상단바 */}
      <div style={{ padding: '18px 0 8px 0', fontSize: 18, fontWeight: 600, borderBottom: '1px solid #eee', textAlign: 'left', paddingLeft: 20 }}></div>
      {/* 유저 정보 */}
      <div style={{ display: 'flex', alignItems: 'center', margin: '32px 0 32px 24px' }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#ededed', marginRight: 16 }} />
        <div>
          <div style={{ fontWeight: 600, fontSize: 16 }}>{user.name}</div>
          <div style={{ color: '#bbb', fontSize: 13 }}>{user.location}</div>
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
      <div style={{ position: 'fixed', left: '50%', bottom: 0, transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: '#fff', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-around', padding: '6px 0 2px 0', zIndex: 100 }}>
        <button onClick={onHome} style={{ flex: 1, background: 'none', border: 'none', color: '#bbb', fontWeight: 500, fontSize: 13, textAlign: 'center', lineHeight: 1.2, cursor: 'pointer' }}>
          🏠<br />홈
        </button>
        <button onClick={onCategory} style={{ flex: 1, background: 'none', border: 'none', color: '#bbb', fontWeight: 500, fontSize: 13, textAlign: 'center', lineHeight: 1.2, cursor: 'pointer' }}>
          📂<br />카테고리
        </button>
        <button onClick={onChat} style={{ flex: 1, background: 'none', border: 'none', color: '#bbb', fontWeight: 500, fontSize: 13, textAlign: 'center', lineHeight: 1.2, cursor: 'pointer' }}>
          💬<br />채팅
        </button>
        <button onClick={onMyPage} style={{ flex: 1, background: 'none', border: 'none', color: '#e89cae', fontWeight: 500, fontSize: 13, textAlign: 'center', lineHeight: 1.2, cursor: 'pointer' }}>
          👤<br />마이페이지
        </button>
      </div>
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
