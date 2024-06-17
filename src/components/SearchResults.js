import React from 'react';
import './SearchResults.css'; // 스타일을 위한 CSS 파일 추가

const SearchResults = ({ results }) => {
  return (
    <div className="search-results">
      {results.map((result, index) => (
        <div key={index} className="search-result-item">
          <p>{result.title}</p>
          <p>{result.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
