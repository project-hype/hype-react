import React from 'react';
import styled from 'styled-components';

/**
 * 수정 버튼
 * @author 조영욱
 * @since 2024.06.20
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.20  	조영욱        최초 생성
 * 2024.06.21   임원정        디자인 수정
 * </pre>
 */

const StyledEditButton = styled.button`
  width: 80px;
  height: 30px;
  margin-left: 10px;
  font-family: 'Happiness Sans-Bold', Helvetica;
  font-size: 14px;
  cursor: pointer;
  background-color: #ff8c00; /* Blue background */
  color: white; /* White text */
  border: none; /* Remove default border */
  border-radius: 10px;
  &:hover {
    background-color: #eaeaea;
  }
`;

const EditButton = ({ onClick }) => {
  return <StyledEditButton onClick={onClick}>수정</StyledEditButton>;
};

export default EditButton;
