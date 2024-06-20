import React from 'react';
import styled from 'styled-components';

const StyledDeleteButton = styled.button`
  width: 60px;
  height: 30px;
  margin-left: 10px;
  font-family: 'Happiness Sans-Bold', Helvetica;
  font-size: 14px;
  cursor: pointer;
  background-color: #dc3545; /* Red background */
  color: white; /* White text */
  border: none; /* Remove default border */
  border-radius: 4px; /* Rounded corners */
`;

const DeleteButton = ({ onClick }) => {
  return <StyledDeleteButton onClick={onClick}>삭제</StyledDeleteButton>;
};

export default DeleteButton;
