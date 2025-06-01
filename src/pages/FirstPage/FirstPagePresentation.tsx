import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f6f9fc 0%, #eef2f7 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  max-width: 480px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const Logo = styled.div`
  font-size: 3.5rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #4a5568;
  margin-bottom: 3rem;
  line-height: 1.6;
  font-weight: 400;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'kakao' }>`
  padding: 1rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
          color: white;
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
          }
        `;
      case 'secondary':
        return `
          background: white;
          color: #4F46E5;
          border: 2px solid #E5E7EB;
          &:hover {
            background: #F9FAFB;
            transform: translateY(-2px);
            border-color: #4F46E5;
          }
        `;
      case 'kakao':
        return `
          background-color: #FEE500;
          color: #000000;
          &:hover {
            background-color: #F4DC00;
            transform: translateY(-2px);
          }
        `;
      default:
        return '';
    }
  }}
`;

const KakaoIcon = styled.span`
  font-size: 1.2rem;
`;

const DecorativeCircle = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%);
  top: -200px;
  right: -200px;
  z-index: 0;
`;

const DecorativeCircle2 = styled(DecorativeCircle)`
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%);
  top: auto;
  right: auto;
  bottom: -100px;
  left: -100px;
`;

const FeatureList = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 3rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  font-size: 0.875rem;
`;

const FirstPagePresentation: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/signup');
  };

  const handleKakaoLogin = () => {
    console.log('카카오 로그인');
  };

  return (
    <Container>
      <DecorativeCircle />
      <DecorativeCircle2 />
      <ContentWrapper>
        <Logo>다공</Logo>
        <Subtitle>
          당신의 일상을 더 스마트하게<br />
          새로운 공동구매 경험을 시작하세요
        </Subtitle>
        <ButtonContainer>
          <Button variant="primary" onClick={handleLogin}>
            로그인하기
          </Button>
          <Button variant="secondary" onClick={handleRegister}>
            회원가입하기
          </Button>
          <Button variant="kakao" onClick={handleKakaoLogin}>
            <KakaoIcon>K</KakaoIcon>
            카카오톡으로 로그인하기
          </Button>
        </ButtonContainer>
        <FeatureList>
          <FeatureItem>✓ 빠른 시작</FeatureItem>
          <FeatureItem>✓ 안전한 보안</FeatureItem>
          <FeatureItem>✓ 실시간 동기화</FeatureItem>
        </FeatureList>
      </ContentWrapper>
    </Container>
  );
};

export default FirstPagePresentation;
