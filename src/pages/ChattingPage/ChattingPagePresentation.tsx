import React from 'react';

interface ChattingPagePresentationProps {
  roomTitle: string;
  productName: string;
  currentPeople: number;
  maxPeople: number;
  messages: { id: number; type: 'notice' | 'me' | 'other'; text: string; user?: string }[];
  onBack: () => void;
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
}

const ChattingPagePresentation = ({
  roomTitle,
  productName,
  currentPeople,
  maxPeople,
  messages,
  onBack,
  input,
  onInputChange,
  onSend,
}: ChattingPagePresentationProps) => {
  return (
    <div style={{ maxWidth: 430, margin: '0 auto', background: '#fff', minHeight: '100vh', fontFamily: 'Apple SD Gothic Neo, sans-serif', paddingBottom: 80, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 상단바 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '18px 0 8px 0', fontSize: 18, fontWeight: 600, borderBottom: '1px solid #eee' }}>
        <button onClick={onBack} style={{ position: 'absolute', left: 16, top: 18, background: 'none', border: 'none', fontSize: 22, color: '#444', cursor: 'pointer' }}>←</button>
        <span>{roomTitle}</span>
        <button style={{ position: 'absolute', right: 16, top: 18, background: 'none', border: 'none', fontSize: 22, color: '#444', cursor: 'pointer' }}>⋮</button>
      </div>
      {/* 상단 상품 정보 */}
      <div style={{ margin: '18px 16px 0 16px', border: '1px solid #eee', borderRadius: 8, display: 'flex', alignItems: 'center', padding: 12, background: '#fafafa' }}>
        <div style={{ width: 48, height: 48, background: '#ededed', borderRadius: 8, marginRight: 14 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>공구품</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>{productName}</div>
        </div>
        <div style={{ fontSize: 15, color: '#888', fontWeight: 500 }}>{currentPeople}명 / {maxPeople}명</div>
      </div>
      {/* 채팅 메시지 영역 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 0 0 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ textAlign: 'center', color: '#bbb', fontSize: 13, marginBottom: 12 }}>오늘 오전 9:36</div>
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
