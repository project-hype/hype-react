import React from 'react';
import './SearchResults.css'; // 스타일을 위한 CSS 파일 추가
import likeImg from './like.png';
import unlikeImg from './unlike.png';
import eventImg from './eventImg.jpeg';

const SearchResults = ({ results }) => {
  // 결과 예시 데이터 배열 생성
  const resultExamples = [];
  const numExamples = 20; // 예시 데이터의 개수

  // 포문을 통해 결과 예시 데이터 생성
  for (let i = 1; i <= numExamples; i++) {
    resultExamples.push({
      id: i,
      image: eventImg,
      title: `Example Result ${i}`,
      location: `Location ${i}`,
      summary: `This is a summary of Example Result ${i}.
      Click to See a EventInfo ${i}`,
      liked: i % 2 === 0, // 좋아요 여부를 짝수 결과에만 true로 설정
    });
  }

  return (
    <div className="search-results">
      {resultExamples.map((result) => (
        <div className="search-result-item" key={result.id}>
          <img className="result-image" src={result.image} alt={result.title} />

          <div className="result-details">
            <div className="result-top">
              <h3 className="result-title">{result.title}</h3>
              {result.liked ? (
                <img className="like-image" src={likeImg} alt="Liked" />
              ) : (
                <img className="like-image" src={unlikeImg} alt="Not Liked" />
              )}
            </div>

            <p className="result-location">{result.location}</p>
            <p className="result-summary">{result.summary}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
