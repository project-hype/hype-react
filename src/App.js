import logo from './logo.svg';
import './App.css';
import SearchResults from './components/SearchResults/SearchResults';
// import Main from './components/Main/Main';
import Main from './pages/MainPage';
import LogIn from './pages/member/LogInPage';
import Join from './pages/member/JoinPage';
import MyPage from './pages/member/MyPage';
import AdminMain from './pages/admin/AdminMainPage';
import LogInForm from './components/member/LogInForm';
import Detail from './pages/event/DetailPage';
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { checkAdmin } from './auth';
import { RecoilRoot } from 'recoil';

const router = createBrowserRouter([
  { path: '/', element: <Main /> },

  { path: '/search', element: <SearchResults /> },
  { path: '/login', element: <LogIn /> },
  { path: '/join', element: <Join /> },
  { path: '/mypage', element: <MyPage /> },
  { path: '/admin', element: <AdminMain /> },
  { path: '/event/:eventId', element: <Detail /> },
]);

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
