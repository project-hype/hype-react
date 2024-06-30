import React from 'react';
import MainLayout from '../../layout/MainLayout';
import LogInForm from '../../components/member/login/LogInForm';

/**
 * 로그인페이지
 * @author 임원정
 * @since 2024.06.18
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.18  	임원정        최초 생성
 * </pre>
 */

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
