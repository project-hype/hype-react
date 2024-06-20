import React, { useEffect, useState } from 'react';
import AdminMainLayout from '../../layout/admin/AdminMainLayout';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userState } from '../../state/authState';
import Modal from '../../components/common/Modal';

function AdminMainPage() {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    setShowModal(false);
    navigate('/'); // 모달 닫힌 후 메인 페이지로 리다이렉트
  };

  useEffect(() => {
    if (!user.isAdmin) {
      setShowModal(true);
    }
  }, [user.isAdmin]);

  if (!user.isAdmin) {
    return navigate('/');
  }

  return (
    <>
      <AdminMainLayout />
      {showModal && <Modal message={'올바르지 않은 접근 권한입니다.'} onConfirm={handleConfirm} />}
    </>
  );
}

export default AdminMainPage;
