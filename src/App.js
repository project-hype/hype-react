import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import SearchResults from './components/SearchResults/SearchResults';
import Main from './components/Main/Main';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/', element: <Main /> },
  { path: '/search', element: <SearchResults /> },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
