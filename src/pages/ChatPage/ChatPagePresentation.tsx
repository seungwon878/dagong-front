import React, { useState } from 'react';
import type { ChatRoom } from '../../Apis/chatApi';

interface ChatPagePresentationProps {
  chatRooms: ChatRoom[];
  isLoading: boolean;
  onChatRoomClick: (roomId: number) => void;
  onBackClick: () => void;
  error: string | null;
}

// 날짜 포맷팅 유틸 함수
const formatTimeAgo = (dateString: string | null): string => {
  if (!dateString) return '';
  // (실제 구현에서는 moment.js나 date-fns 같은 라이브러리 사용을 권장)
  const date = new Date(dateString);
  const now = new Date();
  const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffSeconds < 60) return `${diffSeconds}초 전`;
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}시간 전`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}일 전`;
};

const ChatPagePresentation: React.FC<ChatPagePresentationProps> = ({
  chatRooms,
  isLoading,
  onChatRoomClick,
  onBackClick,
  error,
}) => {
  const [hoveredRoomId, setHoveredRoomId] = useState<number | null>(null);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={onBackClick} style={styles.iconButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 style={styles.title}>채팅</h1>
      </header>

      {isLoading && <p style={styles.messageText}>채팅 목록을 불러오는 중...</p>}
      {error && <p style={{ ...styles.messageText, color: 'red' }}>{error}</p>}
      
      {!isLoading && !error && chatRooms.length === 0 && (
        <p style={styles.messageText}>채팅방이 없습니다.</p>
      )}

      <main style={styles.chatList}>
        {chatRooms.map((room) => (
          <div 
            key={room.chatRoomId} 
            style={{
              ...styles.chatRoomItem,
              backgroundColor: hoveredRoomId === room.chatRoomId ? '#f0f0f0' : '#fff'
            }} 
            onClick={() => onChatRoomClick(room.chatRoomId)}
            onMouseEnter={() => setHoveredRoomId(room.chatRoomId)}
            onMouseLeave={() => setHoveredRoomId(null)}
          >
            <div style={styles.profileImageContainer}>
              <img src={'/img/dagong.png'} alt={room.roomName} style={styles.profileImage} />
            </div>
            <div style={styles.roomInfo}>
              <div style={styles.roomNameContainer}>
                <h2 style={styles.roomName}>{room.roomName}</h2>
              </div>
              <p style={styles.lastMessage}>{room.lastMessage || '메시지가 없습니다.'}</p>
            </div>
            <div style={styles.metaInfo}>
              <span style={styles.timeAgo}>{formatTimeAgo(room.lastSentAt)}</span>
              {room.unread && <div style={styles.unreadDot} />}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '430px',
    margin: '0 auto',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid #e9ecef',
    position: 'sticky',
    top: 0,
    backgroundColor: '#fff',
    zIndex: 10,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.03)',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    marginRight: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0',
  },
  messageText: {
    textAlign: 'center',
    paddingTop: '60px',
    color: '#868e96',
  },
  chatList: {
    flex: 1,
    overflowY: 'auto',
    backgroundColor: '#fff',
  },
  chatRoomItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid #f1f3f5',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
  },
  profileImageContainer: {
    width: '50px',
    height: '50px',
    borderRadius: '18px',
    overflow: 'hidden',
    marginRight: '16px',
    flexShrink: 0,
    backgroundColor: '#e9ecef',
    border: '1px solid rgba(0, 0, 0, 0.04)',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  roomInfo: {
    flex: 1,
    overflow: 'hidden',
  },
  roomNameContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
  },
  roomName: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0',
    color: '#212529',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  lastMessage: {
    fontSize: '14px',
    color: '#868e96',
    margin: '0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  metaInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: '16px',
    textAlign: 'right',
  },
  timeAgo: {
    fontSize: '12px',
    color: '#adb5bd',
    marginBottom: '7px',
    whiteSpace: 'nowrap',
  },
  unreadDot: {
    backgroundColor: '#e1526f',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  roomDetails: {
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    minWidth: 80,
    justifyContent: 'space-between'
  },
};

export default ChatPagePresentation;
