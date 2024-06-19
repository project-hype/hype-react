import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import hypeLogo from '../../assets/img/layout/hypeLogo.png';
import searchIcon from '../../assets/img/layout/searchIcon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 56px; /* 양옆에 56px, 위아래로 24px */
  background-color: #ffffff;
  position: relative;
  height: 50px; /* 고정 높이로 설정 */

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
  width: 130px;
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
    color: #0056b3;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-bottom: 10px;
  }
`;

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:8080/member/session', { withCredentials: true });
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.get(`http://localhost:5000/search?q=${searchQuery}`);
      // setSearchResults(response.data);
      navigate('/search');
    } catch (error) {
      console.error('There was an error fetching the search results!', error);
    }
  };

  const handleHomeClick = () => {
    console.log('Home button clicked');
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleJoinClick = () => {
    navigate('/join');
  };

  const handleLogoutClick = () => {
    axios
      .post('http://localhost:8080/member/logout', {}, { withCredentials: true })
      .then(() => {
        setIsLoggedIn(false);
        setShowModal(true);
      })
      .catch((error) => {
        console.error('Logout failed!', error);
      });
  };

  const handleMyPageClick = () => {
    navigate('/mypage');
  };

  const handleConfirm = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <>
      {showModal && <Modal message="로그아웃 되었습니다." onConfirm={handleConfirm} />}
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
          <NavButton className="nav-button">
            <FontAwesomeIcon icon={faBars} size="2x" style={{ color: '#595959' }} />
          </NavButton>
        </NavbarRight>
      </Navbar>
    </>
  );
};

export default Header;
