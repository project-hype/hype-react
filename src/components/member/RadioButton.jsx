import React from 'react';
import { RadioGroup, RadioButtonLabel, RadioButtonInput } from './MemberStyledComponents';

const RadioButton = ({ name, value, checked, onChange, label, required }) => (
  <RadioGroup>
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
  </RadioGroup>
);

export default RadioButton;
