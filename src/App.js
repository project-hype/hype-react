import './App.css';
import Main from './pages/MainPage';
import LogIn from './pages/member/LogInPage';
import Join from './pages/member/JoinPage';
import MyPage from './pages/member/MyPage';
import AdminMain from './pages/admin/AdminMainPage';
import Detail from './pages/event/DetailPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import { RecoilRoot } from 'recoil';
import SearchPage from './pages/event/SearchPage';

const router = createBrowserRouter([
  { path: '/', element: <Main /> },

  { path: '/search', element: <SearchPage /> },
  { path: '/login', element: <LogIn /> },
  { path: '/join', element: <Join /> },
  { path: '/mypage', element: <MyPage /> },
  { path: '/admin', element: <AdminMain /> },
  { path: '/event/:eventId', element: <Detail /> },
]);

function App() {
  /* axios 기본 설정 */
  axios.defaults.withCredentials = true;
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
