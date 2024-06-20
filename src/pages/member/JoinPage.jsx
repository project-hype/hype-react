import React from 'react';
import MainLayout from '../../layout/MainLayout';
import JoinForm from '../../components/member/JoinForm';
import { PageTitle } from '../../components/member/MemberStyledComponents';

function JoinPage() {
  return (
    <div>
      <MainLayout />
      <PageTitle>회원가입</PageTitle>
      <JoinForm />
    </div>
  );
}

export default JoinPage;
