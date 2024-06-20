import React from 'react';
import AdminMainLayout from '../../layout/admin/AdminMainLayout';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userState } from '../../state/authState';

function AdminMainPage() {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  if (!user.isAdmin) {
    alert('올바르지 않은 권한 접근입니다.');
    return navigate('/'); // 관리자가 아니면 메인 페이지로 리다이렉트
  }
  return (
    <>
      <AdminMainLayout />
    </>
  );
}

export default AdminMainPage;
