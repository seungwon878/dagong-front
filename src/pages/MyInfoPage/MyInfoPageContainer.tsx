import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyInfoPagePresentation from './MyInfoPagePresentation';
import { getMemberInfo } from '../../Apis/userApi';

// API 응답 데이터의 result 부분 타입 정의
interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  kakaoId: number;
  profileUrl: string;
  mainCategory: string;
  subCategory: string;
}

const MyInfoPageContainer: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const memberId = localStorage.getItem('memberId');
        if (!memberId) {
          throw new Error('로그인이 필요합니다.');
        }

        const response = await getMemberInfo(Number(memberId));
        
        if (response.isSuccess) {
          setUserInfo(response.result);
        } else {
          throw new Error(response.message || '정보를 불러오는데 실패했습니다.');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <MyInfoPagePresentation
      userInfo={userInfo}
      loading={loading}
      error={error}
      onBack={handleBack}
    />
  );
};

export default MyInfoPageContainer; 