import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Location } from '../../Apis/locationApi';
import EditPagePresentation from './EditPagePresentation';
import { updateNickname, getUserInfo } from '../../Apis/userApi';
import { getUserLocations, deleteUserLocation } from '../../Apis/locationApi';
import useGeocode from '../../hooks/useGeocode';

const EditPageContainer = () => {
  const navigate = useNavigate();
  const geocode = useGeocode();

  // State
  const [nickname, setNickname] = useState('');
  const [memberId, setMemberId] = useState<number | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchLocations = (id: number) => {
    getUserLocations(id)
      .then(response => {
        if (response.isSuccess) {
          setLocations(response.result || []);
        }
      })
      .catch(err => {
        console.error("주소 목록 로딩 실패:", err);
        setError('주소 목록을 불러오는 데 실패했습니다.');
      });
  };
  
  // Effect to fetch user data
  useEffect(() => {
    const storedMemberId = localStorage.getItem('memberId');
    if (storedMemberId) {
      const id = Number(storedMemberId);
      setMemberId(id);
      
      // 사용자 정보(닉네임) 가져오기
      getUserInfo(id).then(response => {
        if (response.isSuccess) {
          setNickname(response.result.nickname);
        }
      }).catch(err => {
        console.error("닉네임 정보 로딩 실패:", err);
        setNickname(localStorage.getItem('nickname') || '');
      });

      fetchLocations(id);

      const handleFocus = () => fetchLocations(id);
      window.addEventListener('focus', handleFocus);

      return () => {
        window.removeEventListener('focus', handleFocus);
      };
    }
  }, []);
  
  // Nickname Handlers
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value);
  
  const handleUpdateNickname = async () => {
    if (!memberId || !nickname.trim()) return setError('닉네임을 확인해주세요.');
    setError(null);
    try {
      await updateNickname(memberId, nickname);
      localStorage.setItem('nickname', nickname);
      alert('닉네임이 성공적으로 수정되었습니다!');
    } catch (err: any) {
      setError(err.message || '닉네임 수정 중 오류가 발생했습니다.');
    }
  };

  // Address Handlers
  const handleDeleteAddress = async (townId: number) => {
    if (!memberId || !confirm('정말로 주소를 삭제하시겠습니까?')) return;
    try {
      setError(null);
      await deleteUserLocation(memberId, townId);
      fetchLocations(memberId);
      alert('주소가 삭제되었습니다.');
    } catch (err: any) {
      setError(err.message || '주소 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleAddAddress = () => navigate('/map');

  const handleCancel = () => navigate('/mypage');

  return (
    <EditPagePresentation
      nickname={nickname}
      locations={locations}
      onNicknameChange={handleNicknameChange}
      onUpdateNickname={handleUpdateNickname}
      onDeleteAddress={handleDeleteAddress}
      onAddAddress={handleAddAddress}
      onCancel={handleCancel}
      error={error}
    />
  );
};

export default EditPageContainer;
