import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default MainLayout;
