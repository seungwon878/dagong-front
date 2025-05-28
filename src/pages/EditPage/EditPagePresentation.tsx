import React from 'react';

interface EditPagePresentationProps {
  email: string;
  username: string;
  password: string;
  address: string;
  showPassword: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: () => void;
  onEdit: () => void;
  onCancel: () => void;
}

const EditPagePresentation = ({
  email,
  username,
  password,
  address,
  showPassword,
  onChange,
  onTogglePassword,
  onEdit,
  onCancel,
}: EditPagePresentationProps) => {
  return (
    <div style={{ maxWidth: 430, margin: '24px auto', background: '#fff', minHeight: '90vh', fontFamily: 'Apple SD Gothic Neo, sans-serif', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 24, position: 'relative', border: '1px solid #eee' }}>
      {/* 상단 */}
      <button onClick={onCancel} style={{ position: 'absolute', right: 24, top: 24, background: 'none', border: 'none', color: '#bbb', fontSize: 16, cursor: 'pointer' }}>취소</button>
      <div style={{ fontSize: 28, fontWeight: 700, margin: '32px 0 32px 0' }}>정보 수정하기</div>
      {/* 폼 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <div style={{ fontWeight: 500, fontSize: 16, marginBottom: 8 }}>Email</div>
          <input name="email" value={email} onChange={onChange} placeholder="기존 정보" style={{ width: '100%', border: '1px solid #bbb', borderRadius: 8, padding: '14px 16px', fontSize: 16, marginBottom: 0 }} />
        </div>
        <div>
          <div style={{ fontWeight: 500, fontSize: 16, marginBottom: 8 }}>User name</div>
          <input name="username" value={username} onChange={onChange} placeholder="기존 정보" style={{ width: '100%', border: '1px solid #bbb', borderRadius: 8, padding: '14px 16px', fontSize: 16, marginBottom: 0 }} />
        </div>
        <div>
          <div style={{ fontWeight: 500, fontSize: 16, marginBottom: 8 }}>Password</div>
          <div style={{ position: 'relative' }}>
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={onChange}
              placeholder="기존 정보"
              style={{ width: '100%', border: '1px solid #bbb', borderRadius: 8, padding: '14px 44px 14px 16px', fontSize: 16, marginBottom: 0 }}
            />
            <button type="button" onClick={onTogglePassword} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#888' }}>
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 500, fontSize: 16, marginBottom: 8 }}>address</div>
          <input name="address" value={address} onChange={onChange} placeholder="기존 정보" style={{ width: '100%', border: '1px solid #bbb', borderRadius: 8, padding: '14px 16px', fontSize: 16, marginBottom: 0 }} />
        </div>
      </div>
      <button onClick={onEdit} style={{ width: '100%', marginTop: 36, background: '#111', color: '#fff', border: 'none', borderRadius: 8, padding: '16px 0', fontSize: 18, fontWeight: 600, cursor: 'pointer' }}>edit</button>
    </div>
  );
};

export default EditPagePresentation;
