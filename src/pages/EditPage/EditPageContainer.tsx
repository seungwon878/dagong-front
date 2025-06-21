import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import EditPagePresentation from './EditPagePresentation';
import { getUserInfo, updateNickname } from '../../Apis/userApi';
import {
    getUserLocations,
    deleteUserLocation,
    setCurrentLocation,
    getCurrentLocation,
} from '../../Apis/locationApi';
import type { Location } from '../../Apis/locationApi';

const EditPageContainer = () => {
    const navigate = useNavigate();
    const [memberId, setMemberId] = useState<number | null>(null);
    const [nickname, setNickname] = useState('');
    const [initialNickname, setInitialNickname] = useState('');
    const [locations, setLocations] = useState<Location[]>([]);
    const [currentTownId, setCurrentTownId] = useState<number | null>(null);

    const fetchUserData = useCallback(async (id: number) => {
        try {
            const userInfo = await getUserInfo(id);
            setNickname(userInfo.result.nickname);
            setInitialNickname(userInfo.result.nickname);
        } catch (error) {
            console.error('Failed to fetch user info:', error);
        }
    }, []);

    const fetchPageData = useCallback(async (id: number) => {
        console.log('🔄 주소 데이터 로딩 시작...');
        try {
            const [locationsResponse, currentLocationResponse] = await Promise.all([
                getUserLocations(id),
                getCurrentLocation(id),
            ]);

            console.log('✅ 전체 주소 목록 API 응답:', locationsResponse);
            console.log('✅ 현재 사용 주소 API 응답:', currentLocationResponse);

            if (locationsResponse.isSuccess && Array.isArray(locationsResponse.result)) {
                setLocations(locationsResponse.result);
            } else {
                setLocations([]);
            }

            if (currentLocationResponse.isSuccess && currentLocationResponse.result) {
                const currentId = currentLocationResponse.result.townId;
                setCurrentTownId(currentId);
                console.log(`📍 현재 사용 주소 ID 설정됨: ${currentId}`);
            } else {
                setCurrentTownId(null);
                console.log('📍 현재 사용 주소가 설정되지 않았습니다.');
            }
        } catch (error) {
            console.error('페이지 데이터 로딩 실패:', error);
            setLocations([]);
            setCurrentTownId(null);
        }
    }, []);

    useEffect(() => {
        const storedMemberId = localStorage.getItem('memberId');
        if (storedMemberId) {
            const id = Number(storedMemberId);
            setMemberId(id);
            fetchUserData(id);
            fetchPageData(id);

            const handleFocus = () => {
                fetchPageData(id);
            };

            window.addEventListener('focus', handleFocus);
            return () => {
                window.removeEventListener('focus', handleFocus);
            };
        }
    }, [fetchUserData, fetchPageData]);

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    const handleUpdateNickname = async () => {
        if (!memberId) return;
        if (nickname === initialNickname) {
            alert('기존 닉네임과 동일합니다.');
            return;
        }
        try {
            await updateNickname(memberId, nickname);
            alert('닉네임이 성공적으로 변경되었습니다.');
            setInitialNickname(nickname);
            localStorage.setItem('nickname', nickname);
        } catch (error) {
            console.error('Failed to update nickname:', error);
            alert('닉네임 변경에 실패했습니다.');
        }
    };

    const handleAddAddress = () => {
        if (locations.length >= 2) {
            alert('주소는 최대 2개까지 등록할 수 있습니다.');
            return;
        }
        navigate('/map');
    };

    const handleDeleteAddress = async (townId: number) => {
        if (!memberId) return;
        const confirmation = window.confirm('정말로 이 주소를 삭제하시겠습니까?');
        if (confirmation) {
            try {
                await deleteUserLocation(memberId, townId);
                alert('주소가 삭제되었습니다.');
                fetchPageData(memberId);
            } catch (error) {
                console.error('Failed to delete location:', error);
                alert('주소 삭제에 실패했습니다.');
            }
        }
    };

    const handleSetCurrentLocation = async (townId: number) => {
        if (!memberId || townId === currentTownId) return;

        console.log(`▶️ 주소 변경 시도: ${townId}번 주소를 현재 주소로 설정`);
        try {
            await setCurrentLocation(memberId, townId);
            alert('현재 사용하는 주소로 설정되었습니다.');
            fetchPageData(memberId);
        } catch (error) {
            console.error('현재 주소 설정 실패:', error);
            alert('현재 주소 설정에 실패했습니다.');
        }
    };

    const handleGoToMyPage = () => {
        navigate('/mypage');
    };

    return (
        <EditPagePresentation
            nickname={nickname}
            onNicknameChange={handleNicknameChange}
            onUpdateNickname={handleUpdateNickname}
            locations={locations}
            onAddAddress={handleAddAddress}
            onDeleteAddress={handleDeleteAddress}
            currentTownId={currentTownId}
            onSetCurrentLocation={handleSetCurrentLocation}
            onGoToMyPage={handleGoToMyPage}
        />
    );
};

export default EditPageContainer;
