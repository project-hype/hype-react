import React from 'react';
import styled from 'styled-components';

/**
 * 저장버튼
 * @author 조영욱
 * @since 2024.06.20
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.20   조영욱        최초 생성
 * </pre>
 */

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
