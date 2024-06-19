import { redirect } from 'react-router-dom';

export const checkAdmin = () => {
  const isAdmin = localStorage.getItem('isAdmin');
  console.log(isAdmin === '1');
  if (isAdmin !== '1') {
    alert('올바르지 않은 권한 접근입니다.');
    return redirect('/');
  }
  return null;
};
