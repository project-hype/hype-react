import React from 'react';
import MainLayout from '../../layout/MainLayout';
import SignInForm from '../../components/member/SignInForm';

function LoginPage() {
  return (
    <div>
      <MainLayout />
      <SignInForm />
    </div>
  );
}

export default LoginPage;
