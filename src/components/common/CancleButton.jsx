import React from 'react';
import styled from 'styled-components';

/**
 * 취소 버튼
 * @author 조영욱
 * @since 2024.06.20
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.20  	조영욱        최초 생성
 * </pre>
 */

const StyledCancelButton = styled.button`
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

const CancelButton = ({ onClick }) => {
  return <StyledCancelButton onClick={onClick}>취소</StyledCancelButton>;
};

export default CancelButton;
