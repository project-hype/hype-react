import React from 'react';
import { SelectField } from '../MemberStyledComponents';

const CitySelect = ({ name, value, onChange, required }) => (
  <SelectField name={name} value={value} onChange={onChange} required={required}>
    <option value="1">서울특별시</option>
    <option value="2">부산광역시</option>
    <option value="3">대구광역시</option>
    <option value="4">인천광역시</option>
    <option value="5">대전광역시</option>
    <option value="6">광주광역시</option>
    <option value="7">울산광역시</option>
    <option value="8">세종시</option>
    <option value="9">경기도</option>
    <option value="10">강원도</option>
    <option value="11">충청북도</option>
    <option value="12">충청남도</option>
    <option value="13">전라북도</option>
    <option value="14">전라남도</option>
    <option value="15">경상북도</option>
    <option value="16">경상남도</option>
    <option value="17">제주도</option>
  </SelectField>
);

export default CitySelect;
