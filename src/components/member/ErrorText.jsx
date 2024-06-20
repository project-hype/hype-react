// ErrorText.jsx
import React from 'react';
import styled from 'styled-components';

const Error = styled.div`
  font-family: '해피니스 산스 레귤러';
  font-weight: bold;
  font-size: 11px;
  color: #f00;
  margin-top: 8px;
`;

const ErrorText = ({ children }) => {
  return <Error>{children}</Error>;
};

export default ErrorText;
