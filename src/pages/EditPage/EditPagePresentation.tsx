import React from 'react';
import styled from '@emotion/styled';

declare global {
  interface Window {
    daum: any;
  }
}

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9ecf2 100%);
  color: #333;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-family: 'Pretendard', sans-serif;
`;

const EditBox = styled.div`
  background: white;
  padding: 3.0rem;
  border-radius: 24px;
  width: 100%;
  max-width: 520px;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-out;
  border: 1px solid #e8e8e8;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 2.5rem;
  text-align: center;
`;

const Form = styled.div`
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
  font-size: 0.9rem;
  font-weight: 600;
  color: #555;
`;

const Input = styled.input`
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

const AddressContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const AddressInput = styled(Input)`
  flex-grow: 1;
`;

const AddressButton = styled.button`
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const StyledButton = styled.button`
  flex: 1;
  padding: 1rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
`;

const SaveButton = styled(StyledButton)`
  background: #e89cae;
  color: white;
  &:hover {
    background: #e18a9f;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(232, 156, 174, 0.3);
  }
`;

const CancelButton = styled(StyledButton)`
  background: #ecf0f1;
  color: #7f8c8d;
  &:hover {
    background: #e0e6e8;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 1rem;
`;

interface EditPagePresentationProps {
  nickname: string;
  address: string;
  detailAddress: string;
  onNicknameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDetailAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddressSearch: () => void;
  onEdit: () => void;
  onCancel: () => void;
  error: string | null;
}

const EditPagePresentation: React.FC<EditPagePresentationProps> = ({
  nickname,
  address,
  detailAddress,
  onNicknameChange,
  onDetailAddressChange,
  onAddressSearch,
  onEdit,
  onCancel,
  error,
}) => {
  return (
    <Container>
      <EditBox>
        <Title>내 정보 수정</Title>
        <Form>
          <InputGroup>
            <Label htmlFor="nickname">닉네임</Label>
            <Input
              id="nickname"
              type="text"
              value={nickname}
              onChange={onNicknameChange}
              placeholder="새 닉네임을 입력하세요"
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="address">주소</Label>
            <AddressContainer>
              <AddressInput
                id="address"
                type="text"
                value={address}
                readOnly
                placeholder="주소 검색 버튼을 클릭하세요"
              />
              <AddressButton onClick={onAddressSearch}>주소 검색</AddressButton>
            </AddressContainer>
            {address && (
              <Input
                type="text"
                value={detailAddress}
                onChange={onDetailAddressChange}
                placeholder="상세 주소를 입력하세요"
              />
            )}
          </InputGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <ButtonContainer>
            <CancelButton onClick={onCancel}>취소</CancelButton>
            <SaveButton onClick={onEdit}>수정 완료</SaveButton>
          </ButtonContainer>
        </Form>
      </EditBox>
    </Container>
  );
};

export default EditPagePresentation;
