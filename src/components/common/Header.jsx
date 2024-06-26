import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import hypeLogo from '../../assets/img/layout/hypeLogo2.png';
import searchIcon from '../../assets/img/layout/searchIcon.png';
import { useRecoilState } from 'recoil';
import { userState } from '../../state/authState';
import MemberAPI from '../../api/member/memberAPI';

/**
 * Footer
 * @author 임원정
 * @since 2024.06.18
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.18   임원정        최초 생성
 * 2024.06.19   임원정        로그인, 로그아웃 기능 추가
 * 2024.06.20   임원정        navigate 수정
 * 2024.06.21   임원정        디자인 변경
 * 2024.06.30   임원정        코드 리팩토링(API 사용)
 * </pre>
 */

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 150px;
  background-color: #ffffff;
  position: relative;
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto; /* 고정 높이 제거 */
  }
`;

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
  height: 100%; /* 부모의 높이를 채우도록 설정 */
`;

const HypeLogo = styled.img`
  width: 140px;
  height: auto;
  cursor: pointer;
`;

const NavbarCenter = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 부모의 높이를 채우도록 설정 */

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const NavbarForm = styled.form`
  display: flex;
  align-items: center;
  flex-grow: 1; /* 나머지 공간을 모두 채우도록 설정 */

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%; /* 전체 너비의 50% */
  margin: 0 auto; /* 가운데 정렬을 위한 설정 */
  background-color: #eaeaea;
  border-radius: 20px;

  @media (max-width: 768px) {
    width: 100%;
    margin: 0; /* 모바일 화면에서는 기존 마진을 제거하고 전체 너비로 설정 */
    margin-bottom: 10px;
  }
`;

const SearchInput = styled.input`
  padding: 5px 10px;
  width: 100%; /* 부모 컨테이너의 너비를 모두 사용 */
  height: 32px;
  border: none;
  background-color: transparent;
  border-radius: 20px 0 0 20px;
  box-shadow: none;
  outline: none;

  @media (max-width: 768px) {
    border-radius: 20px;
  }
`;

const SearchButton = styled.button`
  background-color: #eaeaea;
  width: 42px; /* 고정 너비 설정 */
  height: 42px;
  padding: 5px;
  border: none;
  border-radius: 0 20px 20px 0;
  cursor: pointer;

  @media (max-width: 768px) {
    border-radius: 20px;
  }
`;

const SearchIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  height: 100%; /* 부모의 높이를 채우도록 설정 */

  @media (max-width: 768px) {
    position: static;
    margin-bottom: 10px;
  }
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

const Separator = styled.div`
  justify-content: center;
  height: 1px; /* 구분선 높이 */
  background-color: #dcdcdc;
  width: 100%; /* 구분선 폭을 메뉴 전체 너비에 맞춤 */
`;

const Header = ({ isLoggedIn }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      window.location.href = `/search?keyword=${searchQuery}`;
    } catch (error) {
      console.error('There was an error fetching the search results!', error);
    }
  };

  const handleHomeClick = () => {
    window.location.href = `/`;
  };

  const handleLoginClick = () => {
    window.location.href = `/login`;
  };

  const handleJoinClick = () => {
    window.location.href = `/join`;
  };

  const handleLogoutClick = () => {
    MemberAPI.logout()
      .then(() => {
        setUser({ isLoggedIn: false, userInfo: null, isAdmin: false });
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
        return;
      })
      .catch((error) => {
        console.error('Logout failed!', error);
      });
  };

  const handleMyPageClick = () => {
    window.location.href = `/mypage`;
  };

  const handleConfirm = () => {
    window.location.href = `/`;
  };

  return (
    <>
      <Navbar>
        <NavbarLeft>
          <HypeLogo className="hypeLogo" src={hypeLogo} alt="Home" onClick={handleHomeClick} />
        </NavbarLeft>
        <NavbarCenter>
          <NavbarForm onSubmit={handleSearch}>
            <SearchContainer>
              <SearchInput type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <SearchButton type="submit">
                <SearchIcon src={searchIcon} alt="Search" />
              </SearchButton>
            </SearchContainer>
          </NavbarForm>
        </NavbarCenter>
        <NavbarRight className="navbar-right">
          {isLoggedIn ? (
            <>
              <NavButton className="nav-button" onClick={handleLogoutClick}>
                로그아웃
              </NavButton>
              <NavButton className="nav-button" onClick={handleMyPageClick}>
                마이페이지
              </NavButton>
            </>
          ) : (
            <>
              <NavButton className="nav-button" onClick={handleLoginClick}>
                로그인
              </NavButton>
              <NavButton className="nav-button" onClick={handleJoinClick}>
                회원가입
              </NavButton>
            </>
          )}
        </NavbarRight>
      </Navbar>
      <Separator />
    </>
  );
};

export default Header;
