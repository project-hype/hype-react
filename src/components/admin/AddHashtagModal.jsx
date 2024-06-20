import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const SaveButton = styled.button`
  width: 48%;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #28a745; /* Green background */
  color: white; /* White text */
  border: none; /* Remove default border */
  border-radius: 4px; /* Rounded corners */
`;

const CancelButton = styled.button`
  width: 48%;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #dc3545; /* Red background */
  color: white; /* White text */
  border: none; /* Remove default border */
  border-radius: 4px; /* Rounded corners */
`;

const AddHashtagModal = ({ isOpen, onClose, onSave, newHashtagName, setNewHashtagName }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>해시태그 추가</h2>
        <Input
          type="text"
          placeholder="해시태그 이름"
          value={newHashtagName}
          onChange={(e) => setNewHashtagName(e.target.value)}
        />
        <ButtonContainer>
          <SaveButton onClick={onSave}>확인</SaveButton>
          <CancelButton onClick={onClose}>취소</CancelButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddHashtagModal;
