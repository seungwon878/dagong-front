import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CatePagePresentation from './CatePagePresentation';
import { getCategoryProducts } from '../../Apis/groupPurchaseApi';

// 상품 타입 정의
interface Product {
  id: number;
  title: string;
  content: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  maxParticipants: number;
  currentParticipants: number; // 현재 참여 인원
  likes: number; // 찜 수
  status: string; // 공구 상태
  category1: string;
  category2: string;
}

const mainCategories = [
  '여성의류', '남성의류', '패션잡화', '신발', '화장품/미용', '신선식품', '가공식품', '건강식품',
  '출산/유아동', '반려동물용품', '가전', '휴대폰/카메라', 'PC/주변기기', '가구', '조명/인테리어',
  '페브릭/홈데코', '주방용품', '생활용품', '스포츠/레저', '자동차/오토바이', '키덜트/취미',
  '건강/의료용품', '악기/문구', '공구', '렌탈관', 'E쿠폰/티켓/생활편의'
];

const categoryDetails: Record<string, { emoji: string; details: string[] }> = {
  '여성의류': {
    emoji: '👗',
    details: ['여름 쿨링 티셔츠', '공식몰단독', '상의', '팬츠/스커트', '아우터', '원피스', '수트/셋업', '스포츠웨어', '언더웨어', '잠옷/홈웨어', '수영복/스윔웨어'],
  },
  '남성의류': {
    emoji: '👔',
    details: ['여름 쿨링 티셔츠', '편집샵', '상의', '팬츠', '셋업', '아우터', '트레이닝복', '수영복/비치웨어', '테마의류', '언더웨어', '잠옷/홈웨어'],
  },
  '패션잡화': {
    emoji: '👜',
    details: ['명품가방/지갑', '여성가방', '남성가방', '여행용가방/소품', '주얼리', '모자', '양말', '벨트', '패션소품', '안경', '시계', '선그라스', '지갑'],
  },
  '신발': {
    emoji: '👟',
    details: ['명품신발', '운동화/스니커즈', '여성단화', '힐/펌프스', '남성구두', '슬리퍼/샌들', '부츠/워커', '뮬/실내화', '아쿠아슈즈', '기능화', '모카신/털신', '신발용품'],
  },
  '화장품/미용': {
    emoji: '💄',
    details: ['스킨케어', '선케어', '마스크/팩', '클렌징', '메이크업', '헤어케어', '바디케어', '핸드케어', '네일케어', '뷰티소품', '향수', '남성화장품', '보습필수템', '뷰티디바이스'],
  },
  '신선식품': {
    emoji: '🍎',
    details: ['과일', '채소', '쌀/잡곡', '견과류', '건과류', '계란/알류', '정육', '수산물', '건어물', '김치', '반찬', '전통주'],
  },
  '가공식품': {
    emoji: '🥫',
    details: ['생수/탄산수', '커피/차류', '음료', '우유/두유/요거트', '치즈/유가공품', '밀키트', '간편조리식품', '라면/면류', '과자/떡/베이커리', '소스/드레싱', '잼/시럽', '장류', '조미료', '식용유/참기름', '가루/분말류', '다이어트식품', '통조림/캔'],
  },
  '건강식품': {
    emoji: '💊',
    details: ['비타민', '프로바이오틱스', '오메가3', '혈당관리', '영양제', '단백질보충제', '건강/과일즙', '홍삼/인삼', '다이어트', '콜라겐/이너뷰티', '효소/효모', '환자식/영양보충식', '건강환/정', '숙취해소제', '꿀/로얄제리', '한방재료', '대상별 건강식품'],
  },
  '출산/유아동': {
    emoji: '🧸',
    details: ['유아동브랜드패션', '유아동의류', '유아동신발/가방', '유아언더웨어/잠옷', '유아패션잡화', '유아동주얼리', '기저귀', '분유', '이유식/유아간식', '물티슈', '놀이방매트', '유모차/웨건', '유아가구', '카시트', '소독/살균용품', '수유용품'],
  },
  '반려동물용품': {
    emoji: '🐶',
    details: ['강아지 사료', '강아지 간식', '강아지 배변용품', '강아지 영양관리', '고양이 사료', '고양이 간식', '고양이 배변용품', '고양이 영양관리', '고양이 실내용품', '외출용품', '실내용품', '패션/액세서리', '미용/위생용품'],
  },
  '가전': {
    emoji: '📺',
    details: ['TV', '청소기', '냉장고', '세탁기/건조기', '게절가전', '주방가전', '건강가전', '음향가전', '생활가전', '이미용가전', '프로젝터/플레이어', '욕실가전'],
  },
  '휴대폰/카메라': {
    emoji: '📱',
    details: ['휴대폰', '카메라', '웨어러블', '1인방송/촬영', '휴대폰 액세서리'],
  },
  'PC/주변기기': {
    emoji: '💻',
    details: ['노트북', '브랜드PC', '모니터', '태블릿PC', 'PC주변기기', '키보드/마우스', '소프트웨어', 'PC부품', '음향기기', '복합기/프린터', '저장장치', '게이밍'],
  },
  '가구': {
    emoji: '🛏️',
    details: ['침대', '매트리스/토퍼', '옷장/행거', '소파', '거실장/테이블', '책상/책장', '의자', '식탕/주방수납장', '수납장/선반', '화장대', '야외가구', '1인가구'],
  },
};

const CatePageContainer = () => {
  const [selectedMain, setSelectedMain] = useState(mainCategories[0]);
  const [selectedDetail, setSelectedDetail] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  // 상품 목록 조회
  const fetchProducts = async (category1: string, category2: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getCategoryProducts(category1, category2);
      if (response.isSuccess && Array.isArray(response.result.content)) {
        // API 응답에 likes, status 등이 없을 경우를 대비해 기본값 설정
        const formattedProducts = response.result.content.map((p: any) => ({
          ...p,
          likes: p.likes ?? 0,
          status: p.status || 'ACTIVE',
          currentParticipants: p.currentParticipants ?? 0,
        }));
        setProducts(formattedProducts);
      } else {
        setError(response.message || '상품 목록을 불러오는데 실패했습니다.');
        setProducts([]);
      }
    } catch (err) {
      setError('상품 목록을 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 상세 카테고리 클릭 시 상품 목록 조회
  const handleDetailCategoryClick = async (detail: string) => {
    setSelectedDetail(detail);
    await fetchProducts(selectedMain, detail);
  };

  // 상품 클릭 시 상세 페이지로 이동
  const handleProductClick = (id: number) => {
    navigate(`/register/${id}`);
  };

  return (
    <CatePagePresentation
      mainCategories={mainCategories}
      selectedMain={selectedMain}
      onSelectMain={setSelectedMain}
      categoryDetails={categoryDetails}
      onHome={() => navigate('/')}
      onCategory={() => navigate('/category')}
      onChat={() => navigate('/chat')}
      onMyPage={() => navigate('/mypage')}
      onDetailCategoryClick={handleDetailCategoryClick}
      selectedDetail={selectedDetail}
      products={products}
      loading={loading}
      error={error}
      onProductClick={handleProductClick} // prop으로 전달
    />
  );
};

export default CatePageContainer;
