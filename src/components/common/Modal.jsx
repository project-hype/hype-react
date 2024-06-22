import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px; /* 너비 설정 */
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Message = styled.p`
  font-family: '해피니스 산스 타이틀';
  font-size: 16px; /* 폰트 크기 설정 */
  text-align: center; /* 중앙 정렬 */
`;

const Modal = ({ message, onConfirm, onCancel }) => {
  return (
    <>
      <Overlay />
      <ModalWrapper>
        <Message>{message}</Message>
        <ButtonContainer>
          <Button text="확인" bgcolor="#FF8C00" onClick={onConfirm} />
          {onCancel && <Button text="취소" bgcolor="#E0DED8" onClick={onCancel}></Button>}
        </ButtonContainer>
      </ModalWrapper>
    </>
  );
};

export default Modal;
