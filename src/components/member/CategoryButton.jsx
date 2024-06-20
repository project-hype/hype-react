import React from 'react';
import styled from 'styled-components';
import { StyledButtonWrapper, StyledButtonText } from './MemberStyledComponents';

const CategoryButton = ({ selected, onClick, children }) => (
  <StyledButtonWrapper selected={selected} onClick={onClick}>
    <StyledButtonText selected={selected}>{children}</StyledButtonText>
  </StyledButtonWrapper>
);

export default CategoryButton;
