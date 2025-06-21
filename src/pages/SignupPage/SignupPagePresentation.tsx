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

const SignupBox = styled.div`
  background: white;
  padding: 3.0rem;
  border-radius: 24px;
  width: 100%;
  max-width: 520px;
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

const SuccessMessage = styled.div`
  color: #10B981;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  margin-left: 0.5rem;
`;

const CheckButton = styled.button`
  background: #F3F4F6;
  color: #4B5563;
  padding: 0.75rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
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
      rgba(99, 102, 241, 0.1),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    background: #E5E7EB;
    color: #6366F1;
    border-color: #6366F1;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
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

const LoginLink = styled.div`
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

interface SignupPagePresentationProps {
  onSubmit: (data: {
    email: string;
    username: string;
    nickname: string;
    password: string;
    address: string;
  }) => void;
  onCheckEmail: (email: string) => Promise<void>;
  onCheckNickname: (nickname: string) => Promise<void>;
  isLoading: boolean;
  error?: string;
}

const SignupPagePresentation: React.FC<SignupPagePresentationProps> = ({
  onSubmit,
  onCheckEmail,
  onCheckNickname,
  isLoading,
  error
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    nickname: '',
    password: '',
    address: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    username: '',
    nickname: '',
    password: '',
    address: ''
  });
  const [emailChecked, setEmailChecked] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setErrors(prev => ({ ...prev, email: '이메일을 입력해주세요' }));
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrors(prev => ({ ...prev, email: '올바른 이메일 형식이 아닙니다' }));
      return false;
    }
    setErrors(prev => ({ ...prev, email: '' }));
    return true;
  };

  const validateUsername = (username: string) => {
    if (!username) {
      setErrors(prev => ({ ...prev, username: '사용자 이름을 입력해주세요' }));
      return false;
    }
    if (username.length < 2) {
      setErrors(prev => ({ ...prev, username: '사용자 이름은 2자 이상이어야 합니다' }));
      return false;
    }
    setErrors(prev => ({ ...prev, username: '' }));
    return true;
  };

  const validateNickname = (nickname: string) => {
    if (!nickname) {
      setErrors(prev => ({ ...prev, nickname: '닉네임을 입력해주세요' }));
      return false;
    }
    if (nickname.length < 2) {
      setErrors(prev => ({ ...prev, nickname: '닉네임은 2자 이상이어야 합니다' }));
      return false;
    }
    setErrors(prev => ({ ...prev, nickname: '' }));
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setErrors(prev => ({ ...prev, password: '비밀번호를 입력해주세요' }));
      return false;
    }
    if (password.length < 6) {
      setErrors(prev => ({ ...prev, password: '비밀번호는 6자 이상이어야 합니다' }));
      return false;
    }
    setErrors(prev => ({ ...prev, password: '' }));
    return true;
  };

  const validateAddress = (address: string) => {
    if (!address) {
      setErrors(prev => ({ ...prev, address: '주소를 입력해주세요' }));
      return false;
    }
    setErrors(prev => ({ ...prev, address: '' }));
    return true;
  };

  const handleCheckEmail = async () => {
    if (!validateEmail(formData.email)) return;
    
    setIsCheckingEmail(true);
    try {
      await onCheckEmail(formData.email);
      setEmailChecked(true);
    } catch (err) {
      setEmailChecked(false);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const handleCheckNickname = async () => {
    if (!validateNickname(formData.nickname)) return;
    
    setIsCheckingNickname(true);
    try {
      await onCheckNickname(formData.nickname);
      setNicknameChecked(true);
    } catch (err) {
      setNicknameChecked(false);
    } finally {
      setIsCheckingNickname(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(formData.email);
    const isUsernameValid = validateUsername(formData.username);
    const isNicknameValid = validateNickname(formData.nickname);
    const isPasswordValid = validatePassword(formData.password);
    const isAddressValid = validateAddress(formData.address);

    if (!emailChecked) {
      setErrors(prev => ({ ...prev, email: '이메일 중복 확인이 필요합니다' }));
      return;
    }

    if (!nicknameChecked) {
      setErrors(prev => ({ ...prev, nickname: '닉네임 중복 확인이 필요합니다' }));
      return;
    }

    if (isEmailValid && isUsernameValid && isNicknameValid && isPasswordValid && isAddressValid) {
      onSubmit(formData);
    }
  };

  return (
    <Container>
      <SignupBox>
        <Title>회원가입</Title>
        <Subtitle>다공과 함께 시작하세요</Subtitle>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={formData.email}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, email: e.target.value }));
                setEmailChecked(false);
              }}
              hasError={!!errors.email}
              onBlur={() => validateEmail(formData.email)}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            {emailChecked && <SuccessMessage>사용 가능한 이메일입니다</SuccessMessage>}
            <CheckButton
              type="button"
              onClick={handleCheckEmail}
              disabled={isCheckingEmail || !formData.email}
            >
              {isCheckingEmail ? '확인 중...' : '이메일 중복 확인'}
            </CheckButton>
          </InputGroup>

          <InputGroup>
            <Label htmlFor="username">사용자 이름</Label>
            <Input
              id="username"
              type="text"
              placeholder="사용자 이름을 입력하세요"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              hasError={!!errors.username}
              onBlur={() => validateUsername(formData.username)}
            />
            {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="nickname">닉네임</Label>
            <Input
              id="nickname"
              type="text"
              placeholder="닉네임을 입력하세요"
              value={formData.nickname}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, nickname: e.target.value }));
                setNicknameChecked(false);
              }}
              hasError={!!errors.nickname}
              onBlur={() => validateNickname(formData.nickname)}
            />
            {errors.nickname && <ErrorMessage>{errors.nickname}</ErrorMessage>}
            {nicknameChecked && <SuccessMessage>사용 가능한 닉네임입니다</SuccessMessage>}
            <CheckButton
              type="button"
              onClick={handleCheckNickname}
              disabled={isCheckingNickname || !formData.nickname}
            >
              {isCheckingNickname ? '확인 중...' : '닉네임 중복 확인'}
            </CheckButton>
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              hasError={!!errors.password}
              onBlur={() => validatePassword(formData.password)}
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="address">주소</Label>
            <Input
              id="address"
              type="text"
              placeholder="주소를 입력하세요"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              hasError={!!errors.address}
              onBlur={() => validateAddress(formData.address)}
            />
            {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
          </InputGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? '회원가입 중...' : '회원가입하기'}
          </SubmitButton>

          <LoginLink>
            이미 계정이 있으신가요?
            <a href="/login" onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }}>
              로그인하기
            </a>
          </LoginLink>
        </Form>

        <BackButton onClick={() => navigate('/first')}>
          ← 처음으로 돌아가기
        </BackButton>
      </SignupBox>
    </Container>
  );
};

export default SignupPagePresentation;
