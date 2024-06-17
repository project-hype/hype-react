import React, { useState } from 'react';
import axios from 'axios';
import SearchResults from './SearchResults';
import './NavBar.css';
import hypeLogo from './hypeLogo.png';
import searchIcon from './searchIcon.png'; // 돋보기 이미지 추가

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/search?q=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('There was an error fetching the search results!', error);
    }
  };

  const handleHomeClick = () => {
    console.log('Home button clicked');
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <img className="hypeLogo" src={hypeLogo} alt="Home" onClick={handleHomeClick} />
      </div>
      <div className="navbar-center">
        <form onSubmit={handleSearch} className="navbar-form">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input" // 검색란에 대한 클래스 추가
          />
          <button type="submit" className="search-button">
            <img src={searchIcon} alt="Search" className="search-icon" />
          </button>
        </form>
      </div>
      <div className="navbar-right">
        <button className="nav-button">로그인</button>
        <button className="nav-button">회원가입</button>
        <button className="nav-button">메뉴</button>
      </div>
      <SearchResults results={searchResults} />
    </header>
  );
};

export default NavBar;
