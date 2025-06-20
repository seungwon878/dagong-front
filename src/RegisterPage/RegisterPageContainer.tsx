import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RegisterPagePresentation from './RegisterPagePresentation';

interface Product {
  id: number;
  title: string;
  content: string;
  place: string;
  status: string;
  name: string;
  quantity: number;
  imageUrls: string[];
  maxParticipants: number;
  currentParticipants: number;
  writerName: string;
  category1: string;
  category2: string;
  views: number;
  likes: number;
  deadline: string;
  createdAt: string;
  price: number;
}

interface RegisterPageContainerProps {
  bottomButtons?: { text: string; onClick: () => void }[];
  isJoinedMode?: boolean;
}

const RegisterPageContainer = ({ bottomButtons, isJoinedMode }: RegisterPageContainerProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [wishAmount, setWishAmount] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);

  const isEditMode = window.location.pathname.startsWith('/mypro/');
  const isNormalMode = !isEditMode && !isJoinedMode;

  const getProduct = async () => {
    const authToken = localStorage.getItem('authToken');
    const response = await fetch(`http://13.209.95.208:8080/purchases/detail/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
    });
    const data = await response.json();
    console.log('getProduct 데이터', data);
    if (data && data.result) {
      setProduct(data.result);
    }
  };

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  const handleWishAmountChange = (delta: number) => {
    if (isJoinedMode || isNormalMode) {
      setWishAmount(prev => Math.max(1, prev + delta));
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleTitleChange = (title: string) => {
    setProduct(prev => prev ? { ...prev, title } : prev);
  };

  const handleMaxPeopleChange = (maxPeople: number) => {
    setProduct(prev => prev ? { ...prev, maxParticipants: maxPeople } : prev);
  };

  const handleAmountChange = (amount: number) => {
    setProduct(prev => prev ? { ...prev, quantity: amount } : prev);
  };

  const handleDescChange = (desc: string) => {
    setProduct(prev => prev ? { ...prev, content: desc } : prev);
  };

  const handlePriceChange = (price: number) => {
    setProduct(prev => prev ? { ...prev, price } : prev);
  };

  const handleUpdateAmount = () => {
    alert('구매 희망 개수가 수정되었습니다.');
    navigate(-1);
  };

  const handleLeaveGroup = () => {
    alert('공구에서 나갔습니다.');
    navigate(-1);
  };

  const joinedModeButtons = [
    { text: '개수 수정하기', onClick: handleUpdateAmount },
    { text: '공구에서 빠지기', onClick: handleLeaveGroup }
  ];

  return (
    <RegisterPagePresentation
      product={product}
      wishAmount={isJoinedMode ? wishAmount : (isEditMode ? (product?.quantity ?? 1) : wishAmount)}
      onWishAmountChange={handleWishAmountChange}
      onCancel={handleCancel}
      bottomButtons={isJoinedMode ? joinedModeButtons : bottomButtons}
      isEditMode={isEditMode}
      isJoinedMode={isJoinedMode}
      onTitleChange={isEditMode ? handleTitleChange : undefined}
      onMaxPeopleChange={isEditMode ? handleMaxPeopleChange : undefined}
      onAmountChange={isEditMode ? handleAmountChange : undefined}
      onDescChange={isEditMode ? handleDescChange : undefined}
      onPriceChange={isEditMode ? handlePriceChange : undefined}
    />
  );
};

export default RegisterPageContainer;
