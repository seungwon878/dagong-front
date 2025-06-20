import React from 'react';
import type { ChatRoom } from '../../Apis/chatApi';

interface ChatPagePresentationProps {
  chatRooms: ChatRoom[];
  onChatRoomClick: (roomId: number) => void;
  onBackClick: () => void;
  loading: boolean;
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
  onChatRoomClick,
  onBackClick,
  loading,
  error,
}) => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={onBackClick} style={styles.backButton}>←</button>
        <h1 style={styles.title}>채팅</h1>
      </header>

      {loading && <p style={styles.messageText}>채팅 목록을 불러오는 중...</p>}
      {error && <p style={{ ...styles.messageText, color: 'red' }}>{error}</p>}
      
      {!loading && !error && chatRooms.length === 0 && (
        <p style={styles.messageText}>채팅방이 없습니다.</p>
      )}

      <main style={styles.chatList}>
        {chatRooms.map((room) => (
          <div key={room.chatRoomId} style={styles.chatRoomItem} onClick={() => onChatRoomClick(room.chatRoomId)}>
            <div style={styles.roomInfo}>
              <h2 style={styles.roomName}>{room.roomName}</h2>
              <p style={styles.lastMessage}>{room.lastMessage || '메시지가 없습니다.'}</p>
            </div>
            <div style={styles.metaInfo}>
              <span style={styles.timeAgo}>{formatTimeAgo(room.lastSentAt)}</span>
              {room.unread && <span style={styles.unreadBadge}>N</span>}
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
    backgroundColor: '#fff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid #f0f0f0',
    position: 'sticky',
    top: 0,
    backgroundColor: '#fff',
    zIndex: 10,
  },
  backButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  title: {
    fontSize: '20px',
    fontWeight: '600',
    margin: '0',
  },
  messageText: {
    textAlign: 'center',
    marginTop: '40px',
    color: '#888',
  },
  chatList: {
    flex: 1,
    overflowY: 'auto',
  },
  chatRoomItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px',
    borderBottom: '1px solid #f0f0f0',
    cursor: 'pointer',
  },
  roomInfo: {
    flex: 1,
  },
  roomName: {
    fontSize: '16px',
    fontWeight: '500',
    margin: '0 0 4px 0',
  },
  lastMessage: {
    fontSize: '14px',
    color: '#888',
    margin: '0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  metaInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: '12px',
  },
  timeAgo: {
    fontSize: '12px',
    color: '#aaa',
    marginBottom: '4px',
  },
  unreadBadge: {
    backgroundColor: '#e89cae',
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
  }
};

export default ChatPagePresentation;
