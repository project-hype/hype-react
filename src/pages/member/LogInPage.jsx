import React from 'react';
import MainLayout from '../../layout/MainLayout';
import LogInForm from '../../components/member/LogInForm';

function LoginPage() {
  return (
    <div>
      <MainLayout>
        <LogInForm />
      </MainLayout>
    </div>
  );
}

export default LoginPage;
