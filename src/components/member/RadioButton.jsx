import React from 'react';
import { RadioButtonLabel, RadioButtonInput } from './MemberStyledComponents';

const RadioButton = ({ name, value, checked, onChange, label, required }) => (
  <RadioButtonLabel>
    <RadioButtonInput
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      required={required}
    />
    {label}
  </RadioButtonLabel>
);

export default RadioButton;
