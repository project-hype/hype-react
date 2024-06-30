import React from 'react';
import { StyledButtonWrapper, StyledButtonText } from '../MemberStyledComponents';

/**
 * 지점 선택
 * @author 임원정
 * @since 2024.06.20
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.20   임원정        최초 생성
 * </pre>
 */

const CategoryButton = ({ selected, onClick, children }) => (
  <StyledButtonWrapper selected={selected} onClick={onClick}>
    <StyledButtonText selected={selected}>{children}</StyledButtonText>
  </StyledButtonWrapper>
);

export default CategoryButton;
