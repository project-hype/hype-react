import React from 'react';
import MainLayout from '../../layout/MainLayout';
import JoinForm from '../../components/member/join/JoinForm';
import { PageTitle } from '../../components/member/common/MemberStyledComponents';

/**
 * 회원가입 페이지
 * @author 임원정
 * @since 2024.06.18
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.18  	임원정        최초 생성
 * 2024.06.21  	임원정        페이지 제목 추가
 * </pre>
 */

function JoinPage() {
  return (
    <div>
      <MainLayout>
        <PageTitle>회원가입</PageTitle>
        <JoinForm />
      </MainLayout>
    </div>
  );
}

export default JoinPage;
