import React from 'react';
import MainLayout from '../../layout/MainLayout';
import LogInForm from '../../components/member/LogInForm';
import { PageTitle } from '../../components/member/MemberStyledComponents';

function LoginPage() {
  return (
    <div>
      <MainLayout />
      <PageTitle>로그인</PageTitle>
      <LogInForm />
    </div>
  );
}

export default LoginPage;
