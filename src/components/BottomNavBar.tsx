import React from 'react';
import { useNavigate } from 'react-router-dom';

type ActiveTab = 'home' | 'category' | 'chat' | 'mypage';

interface BottomNavBarProps {
  activeTab: ActiveTab;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab }) => {
  const navigate = useNavigate();

  const navItems = [
    { name: 'home', path: '/', label: '홈', icon: <HomeIcon color={activeTab === 'home' ? '#E89CAE' : '#888'} /> },
    { name: 'category', path: '/category', label: '카테고리', icon: <CategoryIcon color={activeTab === 'category' ? '#E89CAE' : '#888'} /> },
    { name: 'chat', path: '/chat', label: '채팅', icon: <ChatIcon color={activeTab === 'chat' ? '#E89CAE' : '#888'} /> },
    { name: 'mypage', path: '/mypage', label: '마이페이지', icon: <MyPageIcon color={activeTab === 'mypage' ? '#E89CAE' : '#888'} /> },
  ];

  return (
    <nav style={styles.nav}>
      {navItems.map((item) => (
        <button key={item.name} onClick={() => navigate(item.path)} style={styles.button}>
          {item.icon}
          <span style={{ ...styles.label, color: activeTab === item.name ? '#E89CAE' : '#888' }}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

// SVG 아이콘 컴포넌트들
const HomeIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 22V12H15V22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CategoryIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3H10V10H3V3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 3H21V10H14V3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 14H21V21H14V14Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 14H10V21H3V14Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChatIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MyPageIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


const styles: { [key: string]: React.CSSProperties } = {
  nav: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '430px',
    height: '60px',
    backgroundColor: '#fff',
    borderTop: '1px solid #f0f0f0',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 1000,
  },
  button: {
    background: 'none',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    cursor: 'pointer',
    padding: '4px 0',
  },
  label: {
    fontSize: '10px',
    marginTop: '2px',
  },
};

export default BottomNavBar; 