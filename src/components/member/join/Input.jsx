import React from 'react';
import { InputField } from '../common/MemberStyledComponents';

/**
 * 회원가입 Input
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
