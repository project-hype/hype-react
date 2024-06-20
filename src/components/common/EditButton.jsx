import React from 'react';
import styled from 'styled-components';

const StyledEditButton = styled.button`
  width: 80px;
  height: 30px;
  margin-left: 10px;
  font-family: 'Happiness Sans-Bold', Helvetica;
  font-size: 14px;
  cursor: pointer;
  background-color: #007bff; /* Blue background */
  color: white; /* White text */
  border: none; /* Remove default border */
  border-radius: 4px; /* Rounded corners */
`;

const EditButton = ({ onClick }) => {
  return <StyledEditButton onClick={onClick}>수정</StyledEditButton>;
};

export default EditButton;
