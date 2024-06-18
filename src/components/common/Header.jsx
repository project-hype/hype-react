import React, { useState } from 'react';
import axios from 'axios';
import SearchResults from '../SearchResults/SearchResults';
import hypeLogo from '../../assets/img/layout/hypeLogo.png';
import searchIcon from '../../assets/img/layout/searchIcon.png'; // 돋보기 이미지 추가
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f8f9fa;
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

const SearchInput = styled.input`
  padding: 5px 10px;
  width: 50%;
  height: 32px;
  flex-grow: 1; /* 나머지 공간을 모두 채우도록 설정 */
  margin-left: 20%;
  background-color: #e0e0e0;
  border: none;
  border-radius: 20px 0 0 20px;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const SearchButton = styled.button`
  background-color: #e0e0e0;
  width: 5%;
  height: 42px;
  padding: 5px 10px;
  margin-right: 20%;
  flex-grow: 0; /* 검색 버튼이 고정 크기를 가지도록 설정 */
  border: none;
  border-radius: 0 20px 20px 0;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-left: 0; /* 검색 버튼과의 간격을 조정 */
    margin-bottom: 10px;
  }
`;

const SearchIcon = styled.img`
  width: 16px;
  height: 16px;
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
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
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
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      //const response = await axios.get(`http://localhost:5000/search?q=${searchQuery}`);
      //setSearchResults(response.data);
      navigate('/search');
    } catch (error) {
      console.error('There was an error fetching the search results!', error);
    }
  };

  const handleHomeClick = () => {
    console.log('Home button clicked');
  };

  return (
    <Navbar>
      <NavbarLeft>
        <HypeLogo className="hypeLogo" src={hypeLogo} alt="Home" onClick={handleHomeClick} />
      </NavbarLeft>
      <NavbarCenter>
        <NavbarForm onSubmit={handleSearch}>
          <SearchInput
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton type="submit">
            <SearchIcon src={searchIcon} alt="Search" />
          </SearchButton>
        </NavbarForm>
      </NavbarCenter>
      <NavbarRight className="navbar-right">
        <NavButton className="nav-button">로그인</NavButton>
        <NavButton className="nav-button">회원가입</NavButton>
        <NavButton className="nav-button">메뉴</NavButton>
      </NavbarRight>
    </Navbar>
  );
};

export default Header;
