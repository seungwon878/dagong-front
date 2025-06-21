import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupPagePresentation from './SignupPagePresentation';

const SignupPageContainer: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleCheckEmail = async (_email: string): Promise<void> => {
    try {
      // TODO: API 연동
      // 임시로 중복 체크 로직 구현
      await new Promise(resolve => setTimeout(resolve, 1000));
      const isDuplicate = Math.random() > 0.5; // 임시로 랜덤하게 중복 여부 결정
      
      if (isDuplicate) {
        throw new Error('이미 사용 중인 이메일입니다');
      }
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error('이메일 중복 확인 중 오류가 발생했습니다');
    }
  };

  const handleCheckNickname = async (_nickname: string): Promise<void> => {
    try {
      // TODO: API 연동
      // 임시로 중복 체크 로직 구현
      await new Promise(resolve => setTimeout(resolve, 1000));
      const isDuplicate = Math.random() > 0.5; // 임시로 랜덤하게 중복 여부 결정
      
      if (isDuplicate) {
        throw new Error('이미 사용 중인 닉네임입니다');
      }
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error('닉네임 중복 확인 중 오류가 발생했습니다');
    }
  };

  const handleSubmit = async (_data: {
    email: string;
    username: string;
    nickname: string;
    password: string;
    address: string;
  }) => {
    setIsLoading(true);
    setError(undefined);

    try {
      // TODO: API 연동
      // 임시로 회원가입 로직 구현
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 회원가입 성공 시 로그인 페이지로 이동
      navigate('/login');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('회원가입 중 오류가 발생했습니다');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SignupPagePresentation
      onSubmit={handleSubmit}
      onCheckEmail={handleCheckEmail}
      onCheckNickname={handleCheckNickname}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default SignupPageContainer;
