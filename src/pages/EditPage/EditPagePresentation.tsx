import React from 'react';

interface EditPagePresentationProps {
  nickname: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEdit: () => void;
  onCancel: () => void;
  error: string | null;
  // 카테고리 관련 props
  selectedCategory1: string;
  selectedCategory2: string;
  showCategory1Modal: boolean;
  showCategory2Modal: boolean;
  setShowCategory1Modal: (show: boolean) => void;
  setShowCategory2Modal: (show: boolean) => void;
  onCategory1Select: (category: string) => void;
  onCategory2Select: (category: string) => void;
  mainCategories: string[];
  categoryData: Record<string, string[]>;
}

const EditPagePresentation = ({
  nickname,
  onChange,
  onEdit,
  onCancel,
  error,
  // 카테고리 props
  selectedCategory1,
  selectedCategory2,
  showCategory1Modal,
  showCategory2Modal,
  setShowCategory1Modal,
  setShowCategory2Modal,
  onCategory1Select,
  onCategory2Select,
  mainCategories,
  categoryData,
}: EditPagePresentationProps) => {
  return (
    <div style={{ maxWidth: 430, margin: '24px auto', background: '#fff', minHeight: '90vh', fontFamily: 'Apple SD Gothic Neo, sans-serif', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 24, position: 'relative', border: '1px solid #eee' }}>
      {/* 상단 */}
      <button onClick={onCancel} style={{ position: 'absolute', right: 24, top: 24, background: 'none', border: 'none', color: '#bbb', fontSize: 16, cursor: 'pointer' }}>취소</button>
      <div style={{ fontSize: 28, fontWeight: 700, margin: '32px 0 32px 0' }}>내 정보 수정</div>
      
      {/* 폼 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* 닉네임 수정 */}
        <div>
          <div style={{ fontWeight: 500, fontSize: 16, marginBottom: 8 }}>닉네임</div>
          <input name="nickname" value={nickname} onChange={onChange} placeholder="변경할 닉네임을 입력하세요" style={{ width: '100%', border: '1px solid #bbb', borderRadius: 8, padding: '14px 16px', fontSize: 16 }} />
        </div>

        {/* 관심 카테고리 수정 */}
        <div>
          <div style={{ fontWeight: 500, fontSize: 16, marginBottom: 8 }}>관심 카테고리</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setShowCategory1Modal(true)} style={categoryButtonStyle}>
              {selectedCategory1 || '카테고리1 선택'}
            </button>
            <button onClick={() => setShowCategory2Modal(true)} style={categoryButtonStyle} disabled={!selectedCategory1}>
              {selectedCategory2 || '카테고리2 선택'}
            </button>
          </div>
        </div>

        {error && <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</div>}
      </div>

      <button onClick={onEdit} style={{ width: '100%', marginTop: 36, background: '#111', color: '#fff', border: 'none', borderRadius: 8, padding: '16px 0', fontSize: 18, fontWeight: 600, cursor: 'pointer' }}>수정 완료</button>

      {/* 카테고리1 모달 */}
      {showCategory1Modal && (
        <CategoryModal
          title="대분류 선택"
          categories={mainCategories}
          onSelect={onCategory1Select}
          onClose={() => setShowCategory1Modal(false)}
        />
      )}

      {/* 카테고리2 모달 */}
      {showCategory2Modal && selectedCategory1 && (
        <CategoryModal
          title="소분류 선택"
          categories={categoryData[selectedCategory1]}
          onSelect={onCategory2Select}
          onClose={() => setShowCategory2Modal(false)}
        />
      )}
    </div>
  );
};

// 카테고리 모달 컴포넌트
const CategoryModal = ({ title, categories, onSelect, onClose }: { title: string, categories: string[], onSelect: (cat: string) => void, onClose: () => void }) => (
  <div style={modalOverlayStyle}>
    <div style={modalContentStyle}>
      <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {title}
        <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#888' }}>&times;</button>
      </div>
      <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        {categories.map(cat => (
          <div key={cat} onClick={() => onSelect(cat)} style={categoryItemStyle}>
            {cat}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// 스타일 정의
const categoryButtonStyle: React.CSSProperties = {
  flex: 1,
  padding: '14px 16px',
  border: '1px solid #bbb',
  borderRadius: 8,
  background: '#fff',
  fontSize: 16,
  textAlign: 'left',
  cursor: 'pointer',
};

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
  background: '#fff',
  padding: 24,
  borderRadius: 12,
  width: '90%',
  maxWidth: 400,
  boxShadow: '0 4px 16px #0002'
};

const categoryItemStyle: React.CSSProperties = {
  padding: '16px 12px',
  borderBottom: '1px solid #eee',
  cursor: 'pointer',
  fontSize: 16
};


export default EditPagePresentation;
