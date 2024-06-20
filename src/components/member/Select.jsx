import React from 'react';
import styled from 'styled-components';

const SelectField = styled.select`
  width: 30%;
  padding: 10px;
  font-family: '해피니스 산스 볼드';
  font-size: 16px;
  border: 1px solid #e0ded8;
  border-radius: 20px;
  margin-bottom: 8px;
`;

const Select = ({ name, value, onChange, children }) => (
  <SelectField name={name} value={value} onChange={onChange} required>
    {children}
  </SelectField>
);

export default Select;
