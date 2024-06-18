import logo from './logo.svg';
import './App.css';
import SearchResults from './components/SearchResults/SearchResults';
// import Main from './components/Main/Main';
import Main from './pages/MainPage';
import LogIn from './pages/member/LogInPage';
import Join from './pages/member/JoinPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminMain from './pages/admin/AdminMainPage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CommonRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/search" element={<SearchResults />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/admin" element={<AdminMain />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  useEffect(() => {
    // 서버에서 렌더링된 HTML 문서에서 CSRF 토큰을 가져오는 로직
    const csrfTokenMeta = document.querySelector("meta[name='_csrf']");

    // CSRF 토큰이 존재하는지 확인 후 요청 헤더에 추가
    if (csrfTokenMeta) {
      const csrfToken = csrfTokenMeta.content;
      axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
    }
  }, []);

  return (
    <div>
      <CommonRouter />
    </div>
  );
}

export default App;
