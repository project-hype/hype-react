import React from 'react';
import styled from 'styled-components';

const StyledAddButton = styled.button`
  width: 120px;
  height: 50px;
  margin-bottom: 20px;
  font-family: '해피니스 산스 볼드', Helvetica;
  font-size: 16px;
  cursor: pointer;
  background-color: #1e9d8b; /* Blue background */
  color: white; /* White text */
  border: none; /* Remove default border */
  border-radius: 10px;
  margin-left: auto;

  &:hover {
    background-color: #eaeaea;
  }
`;

const AddButton = ({ onClick, domain }) => {
  return <StyledAddButton onClick={onClick}>{domain} 추가</StyledAddButton>;
};

export default AddButton;
