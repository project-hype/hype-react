import React from 'react';
import styled from 'styled-components';
import { InputField } from './MemberStyledComponents';

const Input = ({ type, name, value, onChange, placeholder, required, readOnly }) => (
  <InputField
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    readOnly={readOnly}
  />
);

export default Input;
