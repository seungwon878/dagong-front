import React from 'react';
import styled from '@emotion/styled';
import type { Location } from '../../Apis/locationApi';

declare global {
  interface Window {
    daum: any;
  }
}

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f4f7f6;
  color: #333;
  align-items: flex-start;
  justify-content: center;
  padding: 2rem;
  font-family: 'Pretendard', sans-serif;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1rem;
`;

const EditCard = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 24px;
  box-shadow: 0 8px 25px -10px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8e8e8;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #555;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 1rem 1.25rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #e89cae;
    box-shadow: 0 0 0 3px rgba(232, 156, 174, 0.2);
  }
`;

const ActionButton = styled.button`
  background: #34495e;
  color: white;
  padding: 1rem 1.25rem;
  border: none;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: #2c3e50;
  }
`;

const SaveButton = styled(ActionButton)`
  width: 100%;
  margin-top: 0.5rem;
  background-color: #e89cae;

  &:hover {
    background-color: #e18a9f;
  }
`;

const BackButton = styled.button`
  background: #ecf0f1;
  color: #7f8c8d;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: #e0e6e8;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 1rem;
  min-height: 1.2em;
`;

const AddressItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f8f9fa;
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  border: 1px solid #e9ecef;
`;

const AddressText = styled.span`
  font-size: 0.95rem;
  color: #495057;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #adb5bd;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #e74c3c;
  }
`;

const AddAddressButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background: none;
  border: 2px dashed #ced4da;
  border-radius: 12px;
  color: #868e96;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #343a40;
    border-color: #868e96;
    background-color: #f8f9fa;
  }
`;

interface EditPagePresentationProps {
  nickname: string;
  locations: Location[];
  onNicknameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateNickname: () => void;
  onDeleteAddress: (locationId: number) => void;
  onAddAddress: () => void;
  onCancel: () => void;
  error: string | null;
}

const EditPagePresentation: React.FC<EditPagePresentationProps> = ({
  nickname,
  locations,
  onNicknameChange,
  onUpdateNickname,
  onDeleteAddress,
  onAddAddress,
  onCancel,
  error,
}) => {
  return (
    <Container>
      <Wrapper>
        <Title>내 정보 수정</Title>
        
        {/* 닉네임 변경 카드 */}
        <EditCard>
          <Form>
            <InputGroup>
              <Label htmlFor="nickname">닉네임</Label>
              <InputRow>
                <Input
                  id="nickname"
                  type="text"
                  value={nickname}
                  onChange={onNicknameChange}
                  placeholder="새 닉네임을 입력하세요"
                />
                <ActionButton onClick={onUpdateNickname}>닉네임 수정</ActionButton>
              </InputRow>
            </InputGroup>
          </Form>
        </EditCard>

        {/* 주소 변경 카드 */}
        <EditCard>
          <Form>
            <InputGroup>
              <Label>내 주소 목록</Label>
              {locations.length > 0 ? (
                locations.map(loc => (
                  <AddressItem key={loc.townId}>
                    <AddressText>{`${loc.city} ${loc.district} ${loc.town}`}</AddressText>
                    <DeleteButton onClick={() => onDeleteAddress(loc.townId)}>×</DeleteButton>
                  </AddressItem>
                ))
              ) : (
                <AddressText style={{ textAlign: 'center', color: '#868e96' }}>등록된 주소가 없습니다.</AddressText>
              )}
            </InputGroup>

            {locations.length < 2 && (
              <AddAddressButton onClick={onAddAddress}>
                <span>+</span> 새 주소 추가하기
              </AddAddressButton>
            )}
          </Form>
        </EditCard>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <BackButton onClick={onCancel}>마이페이지로 돌아가기</BackButton>

      </Wrapper>
    </Container>
  );
};

export default EditPagePresentation;
