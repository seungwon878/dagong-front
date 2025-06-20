import React from 'react';

// API 응답 데이터의 result 부분 타입 정의
interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  kakaoId: number;
  profileUrl: string;
  mainCategory: string;
  subCategory: string;
}

interface MyInfoPagePresentationProps {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
  onBack: () => void;
}

const MyInfoPagePresentation: React.FC<MyInfoPagePresentationProps> = ({ userInfo, loading, error, onBack }) => {
  
  if (loading) {
    return <div style={styles.container}><p>로딩 중...</p></div>;
  }

  if (error) {
    return <div style={styles.container}><p style={styles.errorText}>{error}</p></div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backButton}>←</button>
        <h1 style={styles.title}>내 정보</h1>
      </div>

      {userInfo && (
        <div style={styles.infoCard}>
          <img src={userInfo.profileUrl || 'https://via.placeholder.com/100'} alt="profile" style={styles.profileImage} />
          
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <span style={styles.label}>회원 ID</span>
              <span style={styles.value}>{userInfo.id}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.label}>카카오 ID</span>
              <span style={styles.value}>{userInfo.kakaoId}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.label}>닉네임</span>
              <span style={styles.value}>{userInfo.nickname}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.label}>이메일</span>
              <span style={styles.value}>{userInfo.email}</span>
            </div>
            <div style={styles.infoItemFull}>
              <span style={styles.label}>관심 카테고리</span>
              <span style={styles.value}>{userInfo.mainCategory} &gt; {userInfo.subCategory}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 스타일 정의
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    fontFamily: "'Pretendard', sans-serif",
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  backButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    margin: 0,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '24px',
    border: '4px solid #f0f0f0',
  },
  infoGrid: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  },
  infoItem: {
    textAlign: 'left',
    padding: '12px',
    border: '1px solid #eee',
    borderRadius: '8px',
    backgroundColor: '#fafafa'
  },
  infoItemFull: {
    gridColumn: '1 / -1',
    textAlign: 'left',
    padding: '12px',
    border: '1px solid #eee',
    borderRadius: '8px',
    backgroundColor: '#fafafa'
  },
  label: {
    display: 'block',
    fontSize: '13px',
    color: '#888',
    marginBottom: '4px',
  },
  value: {
    fontSize: '15px',
    color: '#333',
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  }
};

export default MyInfoPagePresentation; 