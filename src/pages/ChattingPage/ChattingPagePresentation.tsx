import React, { useState } from 'react';

interface ChattingPagePresentationProps {
  roomTitle: string;
  productName: string;
  currentPeople: number;
  messages: { id: string; type: 'notice' | 'me' | 'other'; text: string; user?: string }[];
  onBack: () => void;
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
}

const dummyUsers = [
  { id: 1, nickname: '홍길동', img: '' },
  { id: 2, nickname: '이순신', img: '' },
  { id: 3, nickname: '김철수', img: '' },
  { id: 4, nickname: '박영희', img: '' },
];

const UserListModal = ({ open, onClose, users, roomTitle, currentPeople }: { 
  open: boolean; 
  onClose: () => void; 
  users: { id: number; nickname: string; img: string }[];
  roomTitle: string;
  currentPeople: number;
}) => {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      background: 'rgba(0,0,0,0.4)', 
      zIndex: 9999, 
      display: 'flex', 
      alignItems: 'flex-end',
      justifyContent: 'center',
      animation: 'fadeIn 0.2s ease-out'
    }} onClick={onClose}>
      <div style={{
        background: '#fff', 
        width: '100%', 
        maxWidth: 430,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
        padding: '24px 20px 32px 20px',
        position: 'relative',
        animation: 'slideUp 0.3s ease-out',
        maxHeight: '80vh',
        overflowY: 'auto'
      }} onClick={e => e.stopPropagation()}>
        {/* 채팅방 정보 */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: 24,
          paddingBottom: 20,
          borderBottom: '1px solid #f0f0f0'
        }}>
          <div style={{ 
            fontWeight: 700, 
            fontSize: 20, 
            color: '#191919',
            marginBottom: 4
          }}>{roomTitle}</div>
          <div style={{ 
            fontSize: 14, 
            color: '#8e8e8e',
            fontWeight: 500
          }}>참여자 {currentPeople}명</div>
        </div>

        {/* 참여자 목록 */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 16 
        }}>
          {users.map(user => (
            <div key={user.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 12,
              padding: '8px 4px',
              borderRadius: 8,
              cursor: 'pointer'
            }}>
              <div style={{ 
                position: 'relative',
                width: 48,
                height: 48,
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <img 
                  src={user.img} 
                  alt={user.nickname} 
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }} 
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontWeight: 600, 
                  fontSize: 16, 
                  color: '#191919',
                  marginBottom: 2
                }}>{user.nickname}</div>
                <div style={{ 
                  fontSize: 13, 
                  color: '#8e8e8e'
                }}>참여자</div>
              </div>
            </div>
          ))}
        </div>

        {/* 닫기 버튼 */}
        <button 
          onClick={onClose} 
          style={{ 
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'none',
            border: 'none',
            fontSize: 20,
            color: '#8e8e8e',
            cursor: 'pointer',
            padding: 8,
            borderRadius: '50%'
          }}
        >✕</button>
      </div>
    </div>
  );
};

const ChattingPagePresentation = ({
  roomTitle,
  productName,
  currentPeople,
  messages,
  onBack,
  input,
  onInputChange,
  onSend,
}: ChattingPagePresentationProps) => {
  const [userListOpen, setUserListOpen] = useState(false);
  return (
    <div style={{ maxWidth: 430, margin: '0 auto', background: '#fff', minHeight: '100vh', fontFamily: 'Apple SD Gothic Neo, sans-serif', paddingBottom: 80, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 상단바 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        height: 60,
        fontSize: 18,
        fontWeight: 600,
        borderBottom: '1px solid #eee'
      }}>
        <div style={{ width: 40, textAlign: 'left' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: 22, color: '#444', cursor: 'pointer', padding: 0 }}>←</button>
        </div>
        <div style={{
          flex: 1,
          textAlign: 'center',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {/* 제목을 비워달라는 요청에 따라 제거 */}
        </div>
        <div style={{ width: 40, textAlign: 'right' }}>
          <button onClick={() => setUserListOpen(true)} style={{ background: 'none', border: 'none', fontSize: 22, color: '#444', cursor: 'pointer', padding: 0 }}>⋮</button>
        </div>
      </div>
      <UserListModal 
        open={userListOpen} 
        onClose={() => setUserListOpen(false)} 
        users={dummyUsers}
        roomTitle={roomTitle}
        currentPeople={currentPeople}
      />
      {/* 상단 상품 정보 */}
      <div style={{ margin: '18px 16px 0 16px', border: '1px solid #eee', borderRadius: 8, display: 'flex', alignItems: 'center', padding: 12, background: '#fafafa' }}>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>{productName}</div>
        </div>
        <div style={{ fontSize: 15, color: '#888', fontWeight: 500 }}>{currentPeople}명</div>
      </div>
      {/* 채팅 메시지 영역 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 0 0 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ textAlign: 'center', color: '#bbb', fontSize: 13, marginBottom: 12 }}>
          {(() => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const ampm = hours >= 12 ? '오후' : '오전';
            const displayHours = hours % 12 || 12;
            const displayMinutes = minutes.toString().padStart(2, '0');
            return `오늘 ${ampm} ${displayHours}:${displayMinutes}`;
          })()}
        </div>
        {messages.map((msg) =>
          msg.type === 'notice' ? (
            <div key={msg.id} style={{ textAlign: 'center', margin: '8px 0' }}>
              <span style={{ background: '#ffe3e3', color: '#e89cae', borderRadius: 12, padding: '6px 16px', fontSize: 13 }}>{msg.text}</span>
            </div>
          ) : (
            <div key={msg.id} style={{ display: 'flex', flexDirection: msg.type === 'me' ? 'row-reverse' : 'row', alignItems: 'flex-end', margin: '8px 0', padding: '0 16px' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#ddd', margin: msg.type === 'me' ? '0 0 0 8px' : '0 8px 0 0' }} />
              <div style={{ background: '#f5f5f5', color: '#444', borderRadius: 16, padding: '10px 14px', fontSize: 15, maxWidth: 220, textAlign: 'left', marginLeft: msg.type === 'me' ? 0 : 0, marginRight: msg.type === 'me' ? 0 : 0 }}>{msg.text}</div>
            </div>
          )
        )}
      </div>
      {/* 입력창 */}
      <div style={{ position: 'fixed', left: '50%', bottom: 0, transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: '#fff', borderTop: '1px solid #eee', display: 'flex', alignItems: 'center', padding: '8px 8px 8px 8px', zIndex: 100 }}>
        <input
          type="text"
          value={input}
          onChange={onInputChange}
          placeholder="메시지를 입력하세요"
          style={{ flex: 1, border: 'none', borderRadius: 20, background: '#f5f5f5', padding: '12px 16px', fontSize: 15, outline: 'none', marginRight: 8 }}
          onKeyDown={e => { if (e.key === 'Enter') onSend(); }}
        />
        <button onClick={onSend} style={{ background: 'none', border: 'none', fontSize: 24, color: '#e89cae', cursor: 'pointer', padding: 0 }}>➤</button>
      </div>
    </div>
  );
};

export default ChattingPagePresentation;
