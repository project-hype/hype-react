import React from 'react';
import styled from 'styled-components';

/**
 * 관리자 페이지 - 삭제 확인 창
 * @author 조영욱
 * @since 2024.06.18
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.18  	조영욱        최초 생성
 * 2024.06.30   조영욱        구조 리팩토링
 * </pre>
 */
const ConfirmDelete = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>정말 삭제하시겠습니까?</ModalHeader>
        <ButtonContainer>
          <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
          <CancelButton onClick={onCancel}>취소</CancelButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmDelete;

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
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

const ModalHeader = styled.h3`
  margin-top: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const ConfirmButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
`;
