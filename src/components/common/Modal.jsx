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

const Modal = ({ message, onConfirm }) => {
  return (
    <>
      <Overlay />
      <ModalWrapper>
        <p>{message}</p>
        <Button text="확인" bgColor="#FF8C00" onClick={onConfirm} />
      </ModalWrapper>
    </>
  );
};

export default Modal;
