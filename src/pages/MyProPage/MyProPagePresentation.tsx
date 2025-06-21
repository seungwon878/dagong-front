import React from 'react';
import BottomNavBar from '../../components/BottomNavBar';
import styled from 'styled-components';
import { FaHeart, FaUserFriends } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  status: string;
  price: number;
  likes: number;
  currentParticipants: number;
  maxParticipants: number;
}

interface MyProPagePresentationProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onProductClick: (id: number) => void;
  onCancel: () => void;
  onDeleteProduct: (id: number) => void;
}

const MyProPagePresentation = ({
  products,
  loading,
  error,
  onProductClick,
  onCancel,
  onDeleteProduct,
}: MyProPagePresentationProps) => {

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  if (loading) return <StatusMessage>로딩 중...</StatusMessage>;
  if (error) return <StatusMessage>오류: {error}</StatusMessage>;

  return (
    <Container>
      <Header>
        <Title>내가 올린 공구</Title>
        <CancelButton onClick={onCancel}>취소</CancelButton>
      </Header>

      {products.length === 0 ? (
        <StatusMessage>내가 올린 공구가 없습니다.</StatusMessage>
      ) : (
        <ProductList>
          {products.map(p => (
            <ProductCard key={p.id} onClick={() => onProductClick(p.id)}>
              <ProductImage src={p.imageUrl} alt={p.name} />
              <ProductInfo>
                <StatusTag>{p.status}</StatusTag>
                <ProductTitle>{p.name}</ProductTitle>
                <Price>{formatPrice(p.price)}원</Price>
                <Footer>
                  <FooterInfo>
                    <FaHeart color="#ff7f7f" /> {p.likes}
                  </FooterInfo>
                  <FooterInfo>
                    <FaUserFriends color="#5a67d8" /> {p.currentParticipants}/{p.maxParticipants}
                  </FooterInfo>
                </Footer>
              </ProductInfo>
              <DeleteButton
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  onDeleteProduct(p.id);
                }}
              >
                삭제
              </DeleteButton>
            </ProductCard>
          ))}
        </ProductList>
      )}

      <BottomNavBar activeTab="mypage" />
    </Container>
  );
};

export default MyProPagePresentation;

// Styled Components
const Container = styled.div`
  max-width: 430px;
  margin: 0 auto;
  background: #fff;
  min-height: 100vh;
  font-family: 'Apple SD Gothic Neo', sans-serif;
  padding-bottom: 80px;
`;

const Header = styled.div`
    position: relative;
    padding: 18px 20px 8px 20px;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 1px solid #eee;
    text-align: left;
`;

const Title = styled.span`
    font-weight: 600;
    font-size: 20px;
`;

const CancelButton = styled.button`
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #888;
    font-size: 15px;
    cursor: pointer;
`;

const StatusMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    font-size: 16px;
    color: #888;
`;

const ProductList = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const ProductCard = styled.div`
    display: flex;
    background: #fff;
    border-radius: 12px;
    border: 1px solid #f0f0f0;
    padding: 16px;
    cursor: pointer;
    transition: box-shadow 0.2s;
    position: relative;
    &:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    }
`;

const ProductImage = styled.img`
    width: 90px;
    height: 90px;
    border-radius: 8px;
    object-fit: cover;
    margin-right: 16px;
    background-color: #f0f0f0;
`;

const ProductInfo = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

const StatusTag = styled.div`
    background-color: #fce4ec;
    color: #c2185b;
    font-size: 11px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 6px;
    align-self: flex-start;
    margin-bottom: 8px;
`;

const ProductTitle = styled.h3`
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 6px;
    line-height: 1.4;
`;

const Price = styled.div`
    font-size: 15px;
    font-weight: 700;
    margin-bottom: auto; /* 푸터를 아래로 밀어냄 */
`;

const Footer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 8px;
`;

const FooterInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    color: #555;
`;

const DeleteButton = styled.button`
    position: absolute;
    top: 12px;
    right: 12px;
    background: #fff;
    border: 1px solid #ddd;
    color: #999;
    border-radius: 50px;
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
        background: #f44336;
        color: #fff;
        border-color: #f44336;
    }
`;
