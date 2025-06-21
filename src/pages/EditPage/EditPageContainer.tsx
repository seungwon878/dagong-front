import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditPagePresentation from './EditPagePresentation';
import { updateUserInfo, getUserInfo } from '../../Apis/userApi';

const EditPageContainer = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [memberId, setMemberId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedMemberId = localStorage.getItem('memberId');
    if (storedMemberId) {
      const id = Number(storedMemberId);
      setMemberId(id);
      // 사용자 정보 불러오기
      getUserInfo(id).then(response => {
        if (response.isSuccess && response.result) {
          setNickname(response.result.nickname);
          setAddress(response.result.address || ''); 
          setDetailAddress(response.result.detailAddress || ''); 
        }
      }).catch(err => {
        console.error("사용자 정보 로딩 실패:", err);
        // localStorage의 닉네임이라도 보여주기
        setNickname(localStorage.getItem('nickname') || '');
      });
    }
  }, []);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleDetailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(e.target.value);
  };

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function(data: any) {
        setAddress(data.address);
        setDetailAddress(''); 
        document.getElementById('detailAddress')?.focus();
      },
    }).open();
  };

  const handleEdit = async () => {
    if (!memberId) {
      setError('사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
      return;
    }
    if (!nickname.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }
    setError(null);

    try {
      await updateUserInfo(memberId, nickname, address, detailAddress);
      
      localStorage.setItem('nickname', nickname);
      alert('수정이 완료되었습니다!');
      navigate('/mypage');
    } catch (err: any) {
      const errorMessage = err.message || '수정 중 오류가 발생했습니다.';
      setError(errorMessage);
    }
  };

  const handleCancel = () => navigate('/mypage');

  return (
    <EditPagePresentation
      nickname={nickname}
      address={address}
      detailAddress={detailAddress}
      onNicknameChange={handleNicknameChange}
      onDetailAddressChange={handleDetailAddressChange}
      onAddressSearch={handleAddressSearch}
      onEdit={handleEdit}
      onCancel={handleCancel}
      error={error}
    />
  );
};

export default EditPageContainer;
