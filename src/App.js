import logo from './logo.svg';
import './App.css';
import SearchResults from './components/SearchResults/SearchResults';
// import Main from './components/Main/Main';
import Main from './pages/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminMain from './pages/admin/AdminMainPage';
import axios from 'axios';

const CommonRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/search" element={<SearchResults />}></Route>
        <Route path="/admin" element={<AdminMain />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return (
    <div>
      <CommonRouter />
    </div>
  );
}

export default App;
