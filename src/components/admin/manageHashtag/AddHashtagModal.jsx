import React from 'react';
import { ModalOverlay, ModalContent, ModalInput, ButtonContainer, SaveButton, CancelButton } from '../common/styled';

/**
 * 관리자 페이지 - 해시태그 추가 모달창
 * @author 조영욱
 * @since 2024.06.20
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.20  	조영욱        최초 생성
 * 2024.06.30   조영욱        구조 리팩토링
 * </pre>
 */
const AddHashtagModal = ({ isOpen, onClose, onSave, newHashtagName, setNewHashtagName }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>해시태그 추가</h2>
        <ModalInput
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
