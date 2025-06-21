import React from 'react';

interface EditPagePresentationProps {
  nickname: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEdit: () => void;
  onCancel: () => void;
  error: string | null;
}

const EditPagePresentation: React.FC<EditPagePresentationProps> = ({
  nickname,
  onChange,
  onEdit,
  onCancel,
  error,
}) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onCancel} style={styles.backButton}>←</button>
        <h1 style={styles.title}>내 정보 수정</h1>
      </div>
      
      <div style={styles.form}>
        <label htmlFor="nickname" style={styles.label}>닉네임</label>
        <input
          id="nickname"
          type="text"
          value={nickname}
          onChange={onChange}
          style={styles.input}
          placeholder="새 닉네임을 입력하세요"
        />

        {error && <p style={styles.errorText}>{error}</p>}
        
        <button onClick={onEdit} style={styles.saveButton}>
          수정 완료
        </button>
      </div>
    </div>
  );
};

// 스타일 (기존 스타일에서 카테고리 관련 부분 제거)
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    fontFamily: "'Pretendard', sans-serif",
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
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
  form: {
    width: '100%',
  },
  label: {
    display: 'block',
    fontSize: '15px',
    fontWeight: '500',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxSizing: 'border-box',
  },
  saveButton: {
    width: '100%',
    padding: '15px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#e89cae',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: '14px',
    marginTop: '10px',
  }
};


export default EditPagePresentation;
