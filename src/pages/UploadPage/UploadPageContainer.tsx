import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UploadPagePresentation from './UploadPagePresentation';
import { registerGroupPurchase } from '../../Apis/groupPurchaseApi';
import categoryData from './categoryData.json';

// 상품 정보 타입
interface ProductInfo {
  image: string;
  name: string;
  title: string;
}

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
    alert('위치 설정 기능은 준비중입니다.');
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
      image: manualImage || '',
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
    navigate('/landing'); 
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
      if (state.selectedProduct.category1) {
        setSelectedCategory1(state.selectedProduct.category1);
      }
      if (state.selectedProduct.category2) {
        setSelectedCategory2(state.selectedProduct.category2);
      }
      // history state 초기화 (뒤로가기 시 중복 방지)
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const safeSelectedProduct = selectedProduct
    ? { ...selectedProduct, image: selectedProduct.image ?? '' }
    : null;

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
      selectedProduct={safeSelectedProduct}
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
