import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/scss/common.scss';
import axios from 'axios';
import { faEye, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faRegularBookmark } from '@fortawesome/free-regular-svg-icons';
import StarInput from './StarInput';
import { userState } from '../../state/authState';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import StarRatings from 'react-star-ratings';
import styledc from 'styled-components';

const Base = styled.section`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Name = styled.span`
  font-size: 1.4rem;
  line-height: 100%;
`;

const RatingValue = styled.span`
  font-size: 1.2rem;
  line-height: 100%;
`;

const RatingField = styled.fieldset`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  border: none;
  transform: translateY(2px);

  input:checked ~ label,
  labeL:hover,
  labeL:hover ~ label {
    transition: 0.2s;
    color: orange;
  }
`;

const EventDetail = ({ eventId }) => {
  const [likeStatus, setLikeStatus] = useState(false); // 즐겨찾기 상태를 저장할 객체
  const [data, setData] = useState({});
  const [content, setContent] = useState(null);
  const [rating, setRating] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const averageScore = data.averageScore ? data.averageScore : 0;

  const handleClickRating = async (value) => {
    setRating(value);
    let action = 'INSERT';
    if (value === 0) {
      action = 'DELETE';
    } else if (data.myScore) {
      action = 'UPDATE';
    }
    await submitScore({ eventId, score: value, action });
    fetchData();
  };

  const fetchData = async () => {
    try {
      const memberId = user.isLoggedIn ? user.userInfo.memberId : '';
      const response = await axios.get(`http://localhost:8080/event/${eventId}?memberId=${memberId}`);
      const result = response.data.event;
      setContent(result[0].content.replace(/\\r\\n|\\n|\\r/gm, '<br />'));
      setLikeStatus(result[0].favorite);
      setLikeCount(result[0].favoriteCount);
      setData(result[0]);
      setRating(result[0].myScore ? result[0].myScore : 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleHashtagClick = (hashtag) => {
    navigate(`/search?keyword=${hashtag}`);
  };

  const toggleFavorite = async () => {
    try {
      if (!user.isLoggedIn) {
        navigate('/login');
        return;
      }
      const isFavorite = likeStatus;
      let response;
      console.log(!isFavorite);

      if (isFavorite) {
        // 이미 즐겨찾기 되어 있는 경우 삭제 API 호출
        response = await axios.delete('http://localhost:8080/event/deleteFav', {
          data: {
            memberId: user.userInfo.memberId,
            eventId: eventId,
          },
        });

        setLikeCount((prevCount) => prevCount - 1);
      } else {
        // 즐겨찾기 추가 API 호출
        response = await axios.post('http://localhost:8080/event/addFav', {
          memberId: user.userInfo.memberId,
          eventId: eventId,
        });
        setLikeCount((prevCount) => prevCount + 1);
      }

      // 즐겨찾기 상태 업데이트
      setLikeStatus(!isFavorite);

      console.log('Toggled favorite:', response.data);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const submitScore = async ({ eventId, score, action }) => {
    try {
      if (!user.isLoggedIn) {
        navigate('/login');
        return;
      }
      const response = await axios.post('http://localhost:8080/event/score', {
        memberId: user.userInfo.memberId,
        eventId: eventId,
        score: score,
        action: action,
      });
      console.log('별점 작성 성공:', response.data);
    } catch (error) {
      console.error('별점 작성 중 오류 발생:', error);
    }
  };

  return (
    <article className="article-wrap">
      <div className="StyledArticle">
        <div className="title">
          <div className="StyledImage">
            <div className="container">
              <img className="rectangle" src={data.imageUrl} />
            </div>
          </div>
          <div className="text-wrapper">
            {data.title}
            <FontAwesomeIcon
              className="favorite"
              icon={likeStatus ? faBookmark : faRegularBookmark}
              style={{ color: likeStatus ? '#ff8c00' : 'gray', cursor: 'pointer', float: 'right' }}
              onClick={toggleFavorite}
              size="2x"
            />
          </div>
          <div className="count">
            <div className="view-count">
              <FontAwesomeIcon icon={faEye} />
              <div className="text-wrapper-2">{data.viewCount}</div>
            </div>
            <div className="favorite-count">
              <FontAwesomeIcon icon={faBookmark} />
              <div className="text-wrapper-2">{likeCount}</div>
            </div>
          </div>
        </div>

        <div className="detail">
          <div className="hashtag">
            {data.hashtags &&
              data.hashtags.map((hashtag, index) => (
                <div className="item" key={index} onClick={() => handleHashtagClick(hashtag)}>
                  <div className="text-wrapper-3">{hashtag}</div>
                </div>
              ))}
          </div>
          <div className="period-location">
            <div className="period">
              <div className="text-wrapper-6">분류</div>
              <div className="text-wrapper-7">
                {data.eventTypeName} | {data.categoryName}
              </div>
            </div>
            <div className="period">
              <div className="text-wrapper-6">기간</div>
              <div className="text-wrapper-7">
                {data.startDate} ~ {data.endDate}
              </div>
            </div>
            <div className="location">
              <div className="text-wrapper-6">장소</div>
              <div className="text-wrapper-8">
                {data.cityName} {data.address} {data.branchName} {data.detail_address}
              </div>
            </div>
          </div>
          <div className="description">
            <p className="p">행사 안내</p>
            <p className="text-wrapper-10" style={{ whiteSpace: 'pre-wrap' }}>
              {content}
            </p>
          </div>
        </div>
        <div className="score">
          <div className="total-score">
            <div style={{ height: '40%' }}>
              <p className="average-score">{averageScore}</p>
            </div>
            <div>
              <StarRatings
                rating={averageScore}
                starRatedColor="#1e9d8b"
                class="rating"
                starDimension="40px"
                starSpacing="5px"
              />
              <p className="total-count">총 {data.scores ? data.scores.length : 0}명이 별점을 달았습니다.</p>
            </div>
          </div>
          <div className="my-score">
            <p>클릭해서 별점을 달아주세요!</p>
            <div>
              <Base>
                <RatingField>
                  <StarInput onClickRating={handleClickRating} value={5} isHalf={false} selectedRating={rating} />
                  <StarInput onClickRating={handleClickRating} value={4.5} isHalf={true} selectedRating={rating} />
                  <StarInput onClickRating={handleClickRating} value={4} isHalf={false} selectedRating={rating} />
                  <StarInput onClickRating={handleClickRating} value={3.5} isHalf={true} selectedRating={rating} />
                  <StarInput onClickRating={handleClickRating} value={3} isHalf={false} selectedRating={rating} />
                  <StarInput onClickRating={handleClickRating} value={2.5} isHalf={true} selectedRating={rating} />
                  <StarInput onClickRating={handleClickRating} value={2} isHalf={false} selectedRating={rating} />
                  <StarInput onClickRating={handleClickRating} value={1.5} isHalf={true} selectedRating={rating} />
                  <StarInput onClickRating={handleClickRating} value={1} isHalf={false} selectedRating={rating} />
                  <StarInput onClickRating={handleClickRating} value={0.5} isHalf={true} selectedRating={rating} />
                </RatingField>
                {/* <RatingValue>{rating}</RatingValue> */}
              </Base>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
export default EventDetail;
