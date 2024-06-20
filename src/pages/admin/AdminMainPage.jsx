import React, { useEffect, useState } from 'react';
import AdminMainLayout from '../../layout/admin/AdminMainLayout';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userState } from '../../state/authState';

function AdminMainPage() {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isAdmin) {
      return navigate('/'); // 관리자가 아니면 메인 페이지로 리다이렉트
    }
  }, [user.isAdmin, navigate]);

  return (
    <>
      <AdminMainLayout />
    </>
  );
}

export default AdminMainPage;
