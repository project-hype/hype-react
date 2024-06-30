import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useRecoilState } from 'recoil';
import { userState } from '../state/authState';

function MainLayout({ children }) {
  const [user, setUser] = useRecoilState(userState);

  return (
    <>
      <Header isLoggedIn={user.isLoggedIn} />
      {children}
      <Footer />
    </>
  );
}

export default MainLayout;
