import React from 'react';
import { Container, LabelContainer, Label, Asterisk, ErrorText, Divider } from './MemberStyledComponents';

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
