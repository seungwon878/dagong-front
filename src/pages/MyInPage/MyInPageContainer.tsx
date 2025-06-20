import { useNavigate } from 'react-router-dom';
import MyInPagePresentation from './MyInPagePresentation';

const allProducts = [
  { id: 1, name: '프로틴', status: '모집 중', liked: true, joined: true, mine: false },
  { id: 2, name: '프로틴', status: '모집 완료', liked: true, joined: true, mine: false },
  { id: 3, name: '프로틴', status: '배송 완료', liked: false, joined: false, mine: true },
  { id: 4, name: '프로틴', status: '모집 중', liked: false, joined: true, mine: false },
];

const MyInPageContainer = () => {
  const navigate = useNavigate();
  // 참여한 공구만 필터
  const products = allProducts.filter((p) => p.joined && !p.mine);
  const handleProductClick = (id: number) => {
    navigate(`/register/${id}`);
  };
  const handleCancel = () => navigate(-1);

  return (
    <MyInPagePresentation
      products={products}
      onProductClick={handleProductClick}
      onCancel={handleCancel}
    />
  );
};

export default MyInPageContainer;
