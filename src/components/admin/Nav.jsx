import React from 'react';
import styled from 'styled-components';
import hypeLogo from '../../assets/img/layout/hypeLogo2.png';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '../../state/authState';

const NavContainer = styled.div`
  align-items: center;
  background-color: #ffffff;
  display: inline-flex;
  gap: 984px;
  left: 0;
  padding: 16px 72px;
  position: absolute;
  top: 0;
  width: 1440px;
  border-bottom: 1px solid #dcdcdc;
`;

const Separator = styled.div`
  justify-content: center;
  height: 1px; /* 구분선 높이 */
  background-color: #dcdcdc;
  width: 100%; /* 구분선 폭을 메뉴 전체 너비에 맞춤 */
`;

const Logo = styled.img`
  width: 140px;
  height: auto;
  cursor: pointer;
`;

const Menu2 = styled.div`
  align-items: center;
  display: flex;
  gap: 24px;
  justify-content: flex-end;
  position: relative;
  width: 214px;
`;

const TextWrapper14 = styled.div`
  color: #000000;
  font-family: 'Happiness Sans-Title', Helvetica;
  font-size: 22px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  width: fit-content;
`;

const NavButton = styled.button`
  font-family: '해피니스 산스 타이틀';
  font-size: 22px;
  margin-left: 10px;
  padding: 5px 10px;
  background: none;
  color: #595959;
  border: none;
  cursor: pointer;

  &:hover {
    color: #ff8c00;
  }

  &:hover .icon {
    color: #ff8c00;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-bottom: 10px;
  }
`;

const Nav = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  };

  const handleLogoutClick = () => {
    axios
      .post('http://localhost:8080/member/logout', {}, { withCredentials: true })
      .then(() => {
        setUser({ isLoggedIn: false, userInfo: null, isAdmin: false });
        localStorage.clear();
        navigate('/');
        return;
      })
      .catch((error) => {
        console.error('Logout failed!', error);
      });
  };
  return (
    <NavContainer>
      <Logo className="hypeLogo" src={hypeLogo} alt="Home" onClick={handleHomeClick} />
      <NavButton className="nav-button" onClick={handleLogoutClick}>
        로그아웃
      </NavButton>
    </NavContainer>
  );
};

export default Nav;
