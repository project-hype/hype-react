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
      return navigate('/');
    }
  }, [user.isAdmin]);

  if (!user.isAdmin) {
    return navigate('/');
  }

  return <AdminMainLayout />;
}

export default AdminMainPage;
