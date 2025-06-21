import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { NaverSearchItem } from '../Apis/naverSearchApi';
import { searchNaverProducts } from '../Apis/naverSearchApi';

const SearchProductPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<NaverSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialState, setIsInitialState] = useState(true);
  const navigate = useNavigate();

  const handleSearch = async (q?: string) => {
    const searchQuery = typeof q === 'string' ? q : query;
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);
    setIsInitialState(false);
    try {
      const data = await searchNaverProducts(searchQuery);
      setResults(data.result.items);
    } catch (e) {
      setError('검색에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item: NaverSearchItem) => {
    navigate('/upload', { state: { selectedProduct: {
      image: item.image,
      name: item.title,
      title: item.title,
      lprice: item.lprice,
      category1: item.category1,
      category2: item.category2
    }}});
  };

  return (
    <div style={{ maxWidth: 430, margin: '0 auto', minHeight: '100vh', padding: 16 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="상품명을 입력하세요"
          style={{ flex: 1, padding: 10, border: '1px solid #eee', borderRadius: 8, fontSize: 16 }}
          onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
        />
        <button onClick={() => handleSearch()} style={{ padding: '10px 18px', borderRadius: 8, background: '#e89cae', color: '#fff', border: 'none', fontWeight: 600, fontSize: 16 }}>검색</button>
      </div>
      {loading && <div style={{ textAlign: 'center', color: '#888' }}>검색 중...</div>}
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      {isInitialState ? (
        <div style={{ 
          textAlign: 'center', 
          color: '#888', 
          marginTop: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '40px' }}>🔍</span>
          <div style={{ fontSize: '16px' }}>상품 카테고리를 검색하세요</div>
          <div style={{ fontSize: '14px', color: '#aaa' }}>검색어를 입력하고 엔터를 누르거나 검색 버튼을 클릭하세요</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {results.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>
              검색 결과가 없습니다
            </div>
          ) : (
            results.map(item => (
              <div key={item.link} onClick={() => handleSelect(item)} style={{ display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #eee', borderRadius: 10, padding: 10, cursor: 'pointer', background: '#fff' }}>
                <img src={item.image} alt={item.title} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, background: '#f5f5f5' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{item.title}</div>
                  <div style={{ color: '#888', fontSize: 13 }}>{item.brand} {item.category1 && `| ${item.category1}`}</div>
                  <div style={{ color: '#e89cae', fontWeight: 600, fontSize: 15 }}>{item.lprice.toLocaleString()}원</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchProductPage; 