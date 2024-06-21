import React from 'react';
import styled from 'styled-components';

const StyledDeleteButton = styled.button`
  width: 60px;
  height: 30px;
  margin-left: 10px;
  font-family: 'Happiness Sans-Bold', Helvetica;
  font-size: 14px;
  cursor: pointer;
  background-color: #eaeaea; /* Red background */
  color: #595959; /* White text */
  border: none; /* Remove default border */
  border-radius: 10px;

  &:hover {
    background-color: #eaeaea;
  }
`;

const DeleteButton = ({ onClick }) => {
  return <StyledDeleteButton onClick={onClick}>삭제</StyledDeleteButton>;
};

export default DeleteButton;
