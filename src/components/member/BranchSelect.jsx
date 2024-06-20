import React from 'react';
import { SelectField } from './MemberStyledComponents';

const BranchSelect = ({ name, value, onChange }) => (
  <SelectField name={name} value={value} onChange={onChange}>
    <option value="">-----------------------------------</option>
    <option value="1">더현대 서울</option>
    <option value="2">압구정본점</option>
    <option value="3">무역센터점</option>
    <option value="4">천호점</option>
    <option value="5">신촌점</option>
    <option value="6">미아점</option>
    <option value="7">목동점</option>
    <option value="8">디큐브시티</option>
    <option value="9">중동점</option>
    <option value="10">판교점</option>
    <option value="11">킨텍스점</option>
    <option value="12">부산점</option>
    <option value="13">더현대 대구</option>
    <option value="14">울산점</option>
    <option value="15">울산동구점</option>
    <option value="16">충청점</option>
  </SelectField>
);

export default BranchSelect;
