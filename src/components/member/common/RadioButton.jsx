import React from 'react';
import { RadioButtonLabel, RadioButtonInput } from './MemberStyledComponents';

/**
 * 성별 선택 라디오 버튼
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
