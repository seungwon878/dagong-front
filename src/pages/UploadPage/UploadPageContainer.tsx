import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UploadPagePresentation from './UploadPagePresentation';
import { registerGroupPurchase } from '../../Apis/groupPurchaseApi';

const peopleOptions = [1, 2, 3, 4, 5, 6];

// 상품 정보 타입
interface ProductInfo {
  image: string | null;
  name: string;
  title: string;
}

// 카테고리 데이터
const categoryData = {
  '여성의류': ['공식몰단독', '상의', '팬츠/스커트', '아우터', '원피스', '수트/셋업', '스포츠웨어', '언더웨어', '잠옷/홈웨어', '수영복/스윔웨어'],
  '남성의류': ['편집샵', '상의', '팬츠', '셋업', '아우터', '트레이닝복', '수영복/비치웨어', '테마의류', '언더웨어', '잠옷/홈웨어'],
  '패션잡화': ['명품가방/지갑', '여성가방', '남성가방', '여행용가방/소품', '주얼리', '모자', '양말', '벨트', '패션소픔', '안경', '시계', '선글라스', '지갑'],
  '신발': ['명품신발', '운동화/스니커즈', '여성단화', '힐/펌프스', '남성구두', '슬리프/샌들', '부츠/워커', '뮬/실내화', '아쿠아슈즈', '기능화', '모카신/털신', '신발용품'],
  '화장품/미용': ['스킨케어', '선케어', '마스크/팩', '클렌징', '메이크업', '헤어케어', '바디케어', '핸드케어', '네일케어', '뷰티소품', '향수', '남성화장품', '보습필수템', '뷰티디바이스'],
  '신선식품': ['과일', '채소', '쌀/잡곡', '건과류', '계란/알류', '정육', '수산물', '건어물', '김치', '반찬', '전통주'],
  '가공식품': ['생수/탄산수', '커피/차류', '음료', '우유/두유/요거트', '치즈/유가공품', '밀키트', '간편조리식품', '라면/면류', '과자/떡/베이커리', '소스/드레싱', '잼/시럽', '장류', '조미료', '식용유/참기름', '가루/분말류', '다이어트식품', '통조림/캔'],
  '건강식품': ['비타민', '프로바이오틱스', '오메가3', '혈당관리', '영양제', '단백질보충제', '건강/과일즙', '홍삼/인삼', '다이어트', '콜라겐/이너뷰티', '효소/효모', '환자식/영양보충식', '건강환/정', '숙취해소제', '꿀/로얄젤리', '한방재료', '대상별 건강식품'],
  '출산/유아동': ['유아동 브랜드패션', '유아동의류', '유아동신발/가방', '유아언더웨어/잠옥', '유아패션잡화', '유아동주얼리', '기저귀', '분유', '이유식/유아간식', '물티슈', '놀이방매트', '유모차/웨건', '유아가구', '카시트', '소독/살균용품', '수유용품', '목욕/스킨케어', '위생/건강/세제', '안전용품', '이유식용품', '임부/태교용품', '출산기념품', '캐릭터용품', '코스튬/파티', '신학기', '물놀이/수영'],
  '반려동물용품': ['강아지 사료', '강아지 간식', '강아지 배변용품', '강아지 영양관리', '고양이 사료', '고양이 간식', '고양이 배변용품', '고양이 영양관리', '고양이 실내용품', '외출용품', '실내용품', '패션/악세서리', '미용/위생용품', '개르신', '묘르신', '퍼피', '키튼', '관상어용품', '소동물용품', '기타반려동물용품'],
  '가전': ['TV', '청소기', '냉장고', '세탁기/건조기', '계절가전', '주바가전', '건강가전', '음향가전', '생활가전', '이미용가전', '프로젝터/플레이어', '욕실가전'],
  '휴대폰/카메라': ['휴대폰', '카메라', '웨어러블', '1인방송/촬영', '휴대폰액세서리'],
  'PC/주변기기': ['노트북', '브랜드PC', '모니터', '태블릿PC', 'PC주변기기', '키보드/마우스', '소프트웨어', 'PC부품', '음향기기', '복합기/프린터', '저장장치', '게이밍'],
  '가구': ['침대', '매트리스/토퍼', '옷장/행거', '소파', '거실장/테이블', '책상/책장', '의자', '식탁/주방수납장', '수납장/선반', '화장대', '아동/주니어가구', '야외가구', '1인가구', '재택근무', '이사/혼수가구'],
  '조명/인테리어': ['조명/스탠드', '디퓨저/캔들', '인테리어소품', '시계', '액자/갤러리', '거울', '시공/리모델링', '셀프인테리어'],
  '패브릭/홈데코': ['추천테마', '침구', '베개/베개커버', '침구커버', '요/패드', '침구세트', '담요/브랭킷', '커튼', '카페트/러그', '쿠션/방석', '소파/생활커버', '주방패브릭', '블라인드/롤스크린', '솜류', '수예'],
  '주방용품': ['키친 스페셜 큐레이션', '프라이팬', '냄비/솥', '도마', '칼/커팅기구', '조리기구', '그릇/홈세트', '수저/커트러리', '잔/컵', '와인용품', '보관/밀폐용기', '보온/보냉용품', '주방수납용품', '주전자/티포트', '커피용품', '제과/제빵용품', '교자상/밥상', '제수용품', '주방잡화', '위생장감', '일회용품/종이컵', '수입공식관', '신혼준비관', '홈술/홈카페'],
  '생활용품': ['수납/정리용품', '욕실용품', '목욕욕품', '칫솔/치약/가글', '수건/타월', '세탁용품', '세탁세제', '청소용품', '청소세제', '섬유유연제', '생활잡화', '화장지', '성인용기저귀', '생리대', '제습/방향/탈취', '해충퇴치용품', '헤어케어', '바디케어', '보안용품', '여행필수템', '생활선물템'],
  '스포츠/레저': ['캠핑', '골프', '등산/아웃도어', '낚시', '러닝용품', '라이딩', '홈트레이닝', '보호대', '구기스포츠', '라켓스포츠', '수영/수상스포츠', '스케이트/보드', '복싱/무도/댄스', '스포츠액세서리/기타'],
  '자동차/오토바이': ['타이어/휠', '블랙박스', '내비게이션', '하이패스', '세차용품', '오일/소모품', '인테리어용품', '차량용방향제/탈취제', '익스테리어용품', '편의용품', '수납용품', '램프', '배터리용품', 'DIY/전기/튜닝용품', '자동차기기', '오토바이'],
  '키덜트/취미': ['키덜트 브랜드', '피규어/프라모델', '보드게임', '드론', 'R/C', '수집품', '음반/DVD', '서바이벌', '코스튬/아이돌굿즈', '종교', '원예용품/식물'],
  '건강/의료용품': ['건강관리용품', '안마용품', '의료용품', '건강측정용품', '발건강용품', '재활운동용품', '냉온/찜질용품', '눈건가용품', '당뇨관리용품', '물리치료/저주차', '실버용품', '족욕/좌훈용품', '마스크', '손소독제', '건강액세서리'],
  '악기/문구': ['문구/사무용품', '악기', '화방용품'],
  '공구': ['안전용품', '전기용품', '전동공구', '수공구', '측정공구', '운반용품', '에어공구', '절삭/연마공구', '설비공구', '소형기계', '원예공구', '예초기', '목공공구', '용접공구', '체결용품', '접착용품', '포장용품', '페인트/페인트용품'],
  '렌탈관': ['디지털/가전', '생활/건강'],
  'E쿠폰/티켓/생활편의': ['e쿠폰교환권', '원데이클레스', '지류/카드 상품권', '온라인 컨텐츠', '꽃/케이크배달', '자기계발/취미 레슨', '홈케어서비스', '공연/티켓'],
  '여행': ['국내여행/체험', '국내숙박', '국내렌터카', '해외여행']
};

const mainCategories = Object.keys(categoryData);

const UploadPageContainer = () => {
  const [image, setImage] = useState<string | null>(null);
  const [people, setPeople] = useState(3);
  const [amount, setAmount] = useState(30);
  const [price, setPrice] = useState<string>('5000');
  const [desc, setDesc] = useState<string>(
    '고추 참치캔입니다. 30개 이상 구매했을 때 개당 가격이 1000원 싸지며 마감 개수 30개로 하고, 인원이 너무 많아지면 모이는 데 오래걸릴 거 같아, 인당 10개 이상 구매하실 분만 신청해주세요. 그렇게 3명 모집하겠습니다.'
  );
  const [showManualModal, setShowManualModal] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualPrice, setManualPrice] = useState('');
  const [manualImage, setManualImage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductInfo | null>(null);
  
  // 카테고리 관련 상태
  const [selectedCategory1, setSelectedCategory1] = useState<string>('');
  const [selectedCategory2, setSelectedCategory2] = useState<string>('');
  const [showCategory1Modal, setShowCategory1Modal] = useState(false);
  const [showCategory2Modal, setShowCategory2Modal] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // 수동 등록 모달에서 이미지 파일 처리
  const handleManualImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setManualImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePeopleSelect = (num: number) => setPeople(num);
  const handleAmountChange = (delta: number) => setAmount((prev) => Math.max(1, prev + delta));
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 빈 문자열 허용, 숫자만 입력 가능
    if (value === '' || /^[0-9]+$/.test(value)) {
      setPrice(value);
    }
  };
  const handleDescChange = (e: ChangeEvent<HTMLTextAreaElement>) => setDesc(e.target.value);

  // 카테고리 관련 함수들
  const handleCategory1Select = (category: string) => {
    setSelectedCategory1(category);
    setSelectedCategory2(''); // 카테고리1 변경 시 카테고리2 초기화
    setShowCategory1Modal(false);
  };

  const handleCategory2Select = (category: string) => {
    setSelectedCategory2(category);
    setShowCategory2Modal(false);
  };

  const handleLocationClick = () => {
    // 위치 설정 페이지로 이동 (기존 로직)
    alert('위치 설정 기능은 추후 구현됩니다!');
  };
  const handleRegister = async () => {
    if (!selectedProduct && !manualName) {
      alert('상품을 선택하거나 직접 등록해주세요.');
      return;
    }
    const product = selectedProduct
      ? {
          name: selectedProduct.name,
          imageUrl: selectedProduct.image,
          title: selectedProduct.title,
        }
      : {
          name: manualName,
          imageUrl: manualImage,
          title: manualName,
        };
    const payload = {
      title: product.title,
      content: desc,
      name: product.name,
      imageUrl: product.imageUrl || '',
      category1: selectedCategory1,
      category2: selectedCategory2,
      price: Number(price || manualPrice),
      quantity: amount,
      maxParticipants: people,
    };
    try {
      const memberId = Number(localStorage.getItem('memberId'));
      await registerGroupPurchase(memberId, payload);
      alert('공구가 등록되었습니다!');
      navigate('/');
    } catch (e) {
      alert('등록에 실패했습니다.');
    }
  };

  // 상단 버튼 핸들러
  const handleNaverSearch = () => {
    navigate('/search-product');
  };
  const handleManualRegister = () => {
    setShowManualModal(true);
  };
  // 모달 취소
  const handleManualCancel = () => {
    setShowManualModal(false);
    setManualName('');
    setManualPrice('');
    setManualImage(null);
  };
  // 모달 등록
  const handleManualSubmit = () => {
    setSelectedProduct({
      image: manualImage,
      name: manualName,
      title: manualName,
    });
    if (manualPrice) setPrice(manualPrice);
    setShowManualModal(false);
  };
  // 네이버 상품 선택 시 호출될 함수(실제 연동 시 props로 넘기거나 location.state 등 활용)
  function handleNaverProductSelect(product: { image: string; name: string; title: string }) {
    setSelectedProduct(product);
    setImage(product.image);
    setDesc(product.title);
    navigate('/upload', { state: { selectedProduct: product } });
  }

  const handleCancel = () => { 
    navigate(-1); 
  };

  // 네이버 상품 검색에서 돌아왔을 때 상품 정보 자동 반영
  useEffect(() => {
    const state = location.state as any;
    if (state && state.selectedProduct) {
      setSelectedProduct(state.selectedProduct);
      setImage(state.selectedProduct.image);
      setDesc(state.selectedProduct.title);
      if (state.selectedProduct.lprice) {
        setPrice(state.selectedProduct.lprice.toString());
      }
      // history state 초기화 (뒤로가기 시 중복 방지)
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <UploadPagePresentation
      mode="manual"
      image={image}
      onImageChange={handleImageChange}
      people={people}
      onPeopleSelect={handlePeopleSelect}
      amount={amount}
      onAmountChange={handleAmountChange}
      price={price}
      onPriceChange={handlePriceChange}
      desc={desc}
      onDescChange={handleDescChange}
      onLocationClick={handleLocationClick}
      onRegister={handleRegister}
      onNaverSearch={handleNaverSearch}
      onManualRegister={handleManualRegister}
      showManualModal={showManualModal}
      manualName={manualName}
      setManualName={setManualName}
      manualPrice={manualPrice}
      setManualPrice={setManualPrice}
      manualImage={manualImage}
      setManualImage={setManualImage}
      onManualCancel={handleManualCancel}
      onManualSubmit={handleManualSubmit}
      selectedProduct={selectedProduct}
      onCancel={handleCancel}
      // 카테고리 관련 props 추가
      selectedCategory1={selectedCategory1}
      selectedCategory2={selectedCategory2}
      showCategory1Modal={showCategory1Modal}
      showCategory2Modal={showCategory2Modal}
      setShowCategory1Modal={setShowCategory1Modal}
      setShowCategory2Modal={setShowCategory2Modal}
      onCategory1Select={handleCategory1Select}
      onCategory2Select={handleCategory2Select}
      onManualImageChange={handleManualImageChange}
      mainCategories={mainCategories}
      categoryData={categoryData}
    />
  );
};

export default UploadPageContainer;
