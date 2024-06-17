import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import SearchResults from './components/SearchResults/SearchResults';

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* 다른 컴포넌트나 내용들 */}
      <SearchResults />
    </div>
  );
}

export default App;
