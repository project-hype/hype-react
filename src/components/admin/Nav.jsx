import React from 'react';
import styled from 'styled-components';
import hypeLogo from '../../assets/img/layout/hypeLogo.png';

const NavContainer = styled.div`
  -webkit-backdrop-filter: blur(5px) brightness(100%);
  align-items: center;
  backdrop-filter: blur(5px) brightness(100%);
  background-color: #ffffff;
  display: inline-flex;
  gap: 984px;
  left: 0;
  padding: 24px 56px;
  position: absolute;
  top: 0;
`;

const Logo = styled.img`
  height: 65px;
  object-fit: cover;
  position: relative;
  width: 130px;
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

const Nav = () => {
  return (
    <NavContainer>
      <Logo src={hypeLogo} alt="logo" />
      <Menu2>
        <TextWrapper14>로그아웃</TextWrapper14>
      </Menu2>
    </NavContainer>
  );
};

export default Nav;
