import React from 'react';
import { Container, LabelContainer, Label, Asterisk, ErrorText, Divider } from '../common/MemberStyledComponents';

/**
 * 회원가입 Input Container
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

const InputContainer = ({ label, required, children, error, divider }) => (
  <Container>
    <LabelContainer>
      <Label>
        {required && <Asterisk>*</Asterisk>} {label}
      </Label>
    </LabelContainer>
    {children}
    {divider && <Divider />}
    {error && <ErrorText>{error}</ErrorText>}
  </Container>
);

export default InputContainer;
