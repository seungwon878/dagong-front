import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%);
  color: #1F2937;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const LoginBox = styled.div`
  background: white;
  padding: 3.0rem;
  border-radius: 24px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-out;
  border: 1px solid rgba(99, 102, 241, 0.1);

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.75rem;
  text-align: center;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #6B7280;
  text-align: center;
  margin: 1.5rem 0 2.5rem;
  line-height: 1.6;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4B5563;
  margin-left: 0.5rem;
`;

const Input = styled.input<{ hasError?: boolean }>`
  padding: 1rem 1.5rem;
  border: 1px solid ${props => props.hasError ? '#EF4444' : '#E5E7EB'};
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
  color: #1F2937;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#EF4444' : '#6366F1'};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)'};
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

const ErrorMessage = styled.div`
  color: #EF4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  margin-left: 0.5rem;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const SignupLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: #6B7280;
  font-size: 0.875rem;

  a {
    color: #6366F1;
    text-decoration: none;
    font-weight: 500;
    margin-left: 0.5rem;
    transition: all 0.2s ease;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: -2px;
      left: 0;
      background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.3s ease;
    }

    &:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #6B7280;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.5rem;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    color: #4B5563;
  }
`;

interface LoginPagePresentationProps {
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean;
  error?: string;
}

const LoginPagePresentation: React.FC<LoginPagePresentationProps> = ({
  onSubmit,
  isLoading,
  error
}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('이메일을 입력해주세요');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('올바른 이메일 형식이 아닙니다');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('비밀번호를 입력해주세요');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('비밀번호는 6자 이상이어야 합니다');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      onSubmit(email, password);
    }
  };

  return (
    <Container>
      <LoginBox>
        <Title>로그인</Title>
        <Subtitle>다공에 오신 것을 환영합니다!</Subtitle>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              hasError={!!emailError}
              onBlur={() => validateEmail(email)}
            />
            {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              hasError={!!passwordError}
              onBlur={() => validatePassword(password)}
            />
            {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
          </InputGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? '로그인 중...' : '로그인하기'}
          </SubmitButton>

          <SignupLink>
            계정이 없으신가요?
            <a href="/signup" onClick={(e) => {
              e.preventDefault();
              navigate('/signup');
            }}>
              회원가입하기
            </a>
          </SignupLink>
        </Form>

        <BackButton onClick={() => navigate('/first')}>
          ← 처음으로 돌아가기
        </BackButton>
      </LoginBox>
    </Container>
  );
};

export default LoginPagePresentation;
