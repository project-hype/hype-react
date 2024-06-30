import React from 'react';
import { SelectField } from './MemberStyledComponents';

/**
 * 지점 선택
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

const BranchSelect = ({ name, value, onChange }) => (
  <SelectField name={name} value={value} onChange={onChange}>
    <option value="">자주 가는 지점을 선택하세요</option>
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
