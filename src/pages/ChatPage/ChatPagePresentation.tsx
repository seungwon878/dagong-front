import React from 'react';

interface ChatRoom {
  id: number;
  title: string;
  location: string;
  lastMessage: string;
  timeAgo: string;
}

interface ChatPagePresentationProps {
  chatRooms: ChatRoom[];
  onRoomClick: (id: number) => void;
  onHomeClick: () => void;
}

const ChatPagePresentation = ({ chatRooms, onRoomClick, onHomeClick }: ChatPagePresentationProps) => {
  return (
    <div style={{ maxWidth: 430, margin: '0 auto', background: '#fff', minHeight: '100vh', fontFamily: 'Apple SD Gothic Neo, sans-serif', paddingBottom: 80 }}>
      {/* 상단바 */}
      <div style={{ padding: '18px 0 8px 0', fontSize: 18, fontWeight: 600, borderBottom: '1px solid #eee', textAlign: 'left', paddingLeft: 20 }}>채팅</div>
      {/* 상단 더미(광고/공지) */}
      <div style={{ margin: '18px 16px 18px 16px', height: 48, background: '#ededed', borderRadius: 12 }} />
      {/* 채팅방 리스트 */}
      <div style={{ padding: '0 8px' }}>
        {chatRooms.map((room) => (
          <button
            key={room.id}
            onClick={() => onRoomClick(room.id)}
            style={{
              display: 'flex', alignItems: 'center', width: '100%', border: 'none', background: '#fff', padding: '0', margin: '0 0 16px 0', cursor: 'pointer', borderRadius: 16, boxShadow: '0 2px 8px #0001', transition: 'box-shadow 0.2s', minHeight: 68, position: 'relative', overflow: 'hidden'
            }}
            onMouseOver={e => (e.currentTarget.style.boxShadow = '0 4px 16px #0002')}
            onMouseOut={e => (e.currentTarget.style.boxShadow = '0 2px 8px #0001')}
          >
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#ddd', margin: '0 16px 0 12px', flexShrink: 0 }} />
            <div style={{ flex: 1, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#222', marginBottom: 2 }}>{room.title} <span style={{ fontSize: 13, color: '#bbb', fontWeight: 400 }}>{room.location}</span></div>
              <div style={{ fontSize: 13, color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 }}>{room.lastMessage}</div>
            </div>
            <div style={{ fontSize: 12, color: '#bbb', marginLeft: 8, minWidth: 48, textAlign: 'right', alignSelf: 'flex-start', marginTop: 12 }}>{room.timeAgo}</div>
          </button>
        ))}
      </div>
      {/* 하단 네비게이션 */}
      <div style={{ position: 'fixed', left: '50%', bottom: 0, transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: '#fff', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-around', padding: '6px 0 2px 0', zIndex: 100 }}>
        <button onClick={onHomeClick} style={{ flex: 1, background: 'none', border: 'none', color: '#bbb', fontWeight: 500, fontSize: 13, textAlign: 'center', lineHeight: 1.2, cursor: 'pointer' }}>
          🏠<br />홈
        </button>
        <div style={{ flex: 1, color: '#bbb', fontWeight: 500, fontSize: 13, textAlign: 'center', lineHeight: 1.2 }}>👥<br />공구</div>
        <div style={{ flex: 1, color: '#e89cae', fontWeight: 500, fontSize: 13, textAlign: 'center', lineHeight: 1.2 }}>💬<br />채팅</div>
        <div style={{ flex: 1, color: '#bbb', fontWeight: 500, fontSize: 13, textAlign: 'center', lineHeight: 1.2 }}>👤<br />마이페이지</div>
      </div>
    </div>
  );
};

export default ChatPagePresentation;
