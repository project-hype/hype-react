import React from 'react';
import styled from 'styled-components';

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const RadioButtonLabel = styled.label`
  margin-right: 20px;
  font-family: '해피니스 산스 레귤러';
  font-size: 16px;
  color: #595959;
`;

const RadioButtonInput = styled.input`
  margin-right: 5px;
`;

const RadioButton = ({ name, value, checked, onChange, label }) => (
  <RadioGroup>
    <RadioButtonLabel>
      <RadioButtonInput type="radio" name={name} value={value} checked={checked} onChange={onChange} required />
      {label}
    </RadioButtonLabel>
  </RadioGroup>
);

export default RadioButton;
