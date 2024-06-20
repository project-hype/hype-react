import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputContainer } from './MemberStyledComponents';

const MemberInfo = ({ member_id }) => {
  const [memberInfo, setMemberInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMemberInfo() {
      try {
        const response = await axios.get(`http://localhost:8080/member/${member_id}`);
        setMemberInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching member info:', error);
        setLoading(false);
      }
    }

    fetchMemberInfo();
  }, [member_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!memberInfo) {
    return <div>No member info found</div>;
  }

  return (
    <>
      <InputContainer label="ID" divider>
        <input type="text" value={memberInfo.loginId} readOnly />
      </InputContainer>
      <InputContainer label="이름" divider>
        <input type="text" value={memberInfo.name} readOnly />
      </InputContainer>
      <InputContainer label="생년월일" divider>
        <input type="text" value={memberInfo.birthdate} readOnly />
      </InputContainer>
      <InputContainer label="성별" divider>
        <input type="text" value={memberInfo.gender} readOnly />
      </InputContainer>
      {/* 필요한 다른 정보들을 추가적으로 표시 */}
    </>
  );
};

export default MemberInfo;
