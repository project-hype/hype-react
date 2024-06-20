import React from 'react';
import styled from 'styled-components';

const StyledAddButton = styled.button`
  width: 160px;
  height: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: 'Happiness Sans-Bold', Helvetica;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff; /* Blue background */
  color: white; /* White text */
  border: none; /* Remove default border */
  border-radius: 4px; /* Rounded corners */
`;

const AddButton = ({ onClick, domain }) => {
  return <StyledAddButton onClick={onClick}>{domain} 추가</StyledAddButton>;
};

export default AddButton;
