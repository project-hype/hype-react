import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useRecoilState } from 'recoil';
import { userState } from '../state/authState';

/**
 * 메인 레이아웃
 * @author 정은지
 * @since 2024.06.18
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.18  	정은지        최초 생성
 * 2024.06.20   임원정        React Recoil 적용
 * 2024.06.21  	임원정        Footer 추가
 * </pre>
 */

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
