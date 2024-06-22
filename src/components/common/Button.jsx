import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  align-items: center;
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
  height: 55px;
  padding: 10px;
  width: 142px;
  cursor: pointer;
  background-color: ${(props) => props.bgcolor || '#1e9d8b'};
`;

const ButtonText = styled.div`
  color: #ffffff;
  font-family: '해피니스 산스 타이틀';
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  letter-spacing: 1px;
`;

const Button = ({ text, bgcolor, onClick }) => {
  return (
    <ButtonWrapper bgcolor={bgcolor} onClick={onClick}>
      <ButtonText>{text}</ButtonText>
    </ButtonWrapper>
  );
};

export default Button;
