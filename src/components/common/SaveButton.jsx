import React from 'react';
import styled from 'styled-components';

const StyledSaveButton = styled.button`
  width: 80px;
  height: 30px;
  margin-left: 10px;
  font-family: 'Happiness Sans-Bold', Helvetica;
  font-size: 14px;
  cursor: pointer;
  background-color: #28a745; /* Green background */
  color: white; /* White text */
  border: none; /* Remove default border */
  border-radius: 4px; /* Rounded corners */
`;

const SaveButton = ({ onClick }) => {
  return <StyledSaveButton onClick={onClick}>적용</StyledSaveButton>;
};

export default SaveButton;
