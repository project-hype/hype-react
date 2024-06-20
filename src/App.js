import logo from './logo.svg';
import './App.css';
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
import SearchPage from './pages/event/SearchPage';

// const CommonRouter = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Main />}></Route>
//         <Route path="/search" element={<SearchResults />}></Route>
//         <Route path="/login" element={<LogIn />}></Route>
//         <Route path="/join" element={<Join />}></Route>
//         <Route path="/admin" element={<AdminMain />} loader={checkAdmin}></Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

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
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
