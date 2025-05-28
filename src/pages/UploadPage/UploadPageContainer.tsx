import { useState } from 'react';
import type { ChangeEvent } from 'react';
import UploadPagePresentation from './UploadPagePresentation';

const peopleOptions = [1, 2, 3, 4, 5, 6];

const UploadPageContainer = () => {
  const [image, setImage] = useState<string | null>(null);
  const [people, setPeople] = useState(3);
  const [amount, setAmount] = useState(30);
  const [price, setPrice] = useState<string>('5000');
  const [desc, setDesc] = useState<string>(
    '고추 참치캔입니다. 30개 이상 구매했을 때 개당 가격이 1000원 싸지며 마감 개수 30개로 하고, 인원이 너무 많아지면 모이는 데 오래걸릴 거 같아, 인당 10개 이상 구매하실 분만 신청해주세요. 그렇게 3명 모집하겠습니다.'
  );

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
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

  const handleLocationClick = () => {
    // 위치 설정 페이지로 이동 (기존 로직)
    alert('위치 설정 기능은 추후 구현됩니다!');
  };
  const handleRegister = () => {
    alert('공구 등록! (기능은 추후 구현)');
  };

  return (
    <UploadPagePresentation
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
    />
  );
};

export default UploadPageContainer;
