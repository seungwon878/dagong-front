import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPagePresentation from './LoginPagePresentation';
import { useAuth } from '../../contexts/AuthContext';

const LoginPageContainer: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleSubmit = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(undefined);
      
      // TODO: 실제 API 호출로 대체
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '로그인에 실패했습니다');
      }

      // 로그인 성공 시 토큰 저장 및 상태 업데이트
      login();
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginPagePresentation
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default LoginPageContainer;
