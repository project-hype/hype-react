import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/scss/common.scss';
import axios from 'axios';
import { faEye, faStar, faLocationDot, faHeart as faSolidHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart, faBookmark as faRegularBookmark } from '@fortawesome/free-regular-svg-icons';
import StarInput from './StarInput';
import { userState } from '../../state/authState';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import StarRatings from 'react-star-ratings';
import EventBanner from './EventBanner';

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

const EventDetail = ({}) => {
  const { eventId } = useParams();
  const [likeStatus, setLikeStatus] = useState(false); // 즐겨찾기 상태를 저장할 객체
  const [data, setData] = useState({});
  const [rating, setRating] = useState(0);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const averageScore = data.averageScore ? data.averageScore : 0;

  const handleClickRating = async (value) => {
    setRating(value);
    await submitScore({ eventId, score: value });
    fetchData();
  };

  const fetchData = async () => {
    try {
      const memberId = user.isLoggedIn ? user.userInfo.memberId : '';

      const response = await axios.get(`http://localhost:8080/event/${eventId}?memberId=${memberId}`);
      const result = response.data.event;
      setLikeStatus(result[0].favorite); // Initialize favorite status
      setData(result[0]);
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
        fetchData();
      } else {
        // 즐겨찾기 추가 API 호출
        response = await axios.post('http://localhost:8080/event/addFav', {
          memberId: user.userInfo.memberId,
          eventId: eventId,
        });
        fetchData();
      }

      // 즐겨찾기 상태 업데이트
      setLikeStatus(!isFavorite);

      console.log('Toggled favorite:', response.data);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const submitScore = async ({ eventId, score }) => {
    try {
      if (!user.isLoggedIn) {
        navigate('/login');
        return;
      }
      const response = await axios.post('http://localhost:8080/event/starScore', {
        memberId: user.userInfo.memberId,
        eventId: eventId,
        score: score,
      });
      console.log('별점 작성 성공:', response.data);
      // 필요 시 여기서 추가적인 처리 (예: 별점 작성 후 데이터를 다시 불러오기)
    } catch (error) {
      console.error('별점 작성 중 오류 발생:', error);
    }
  };

  const likeEvents = async ({ eventId }) => {
    try {
      const response = await axios.get(`http://localhost:8080/event/list/like/${eventId}`);
      console.log('유사한 이벤트들:', response.data);
      // 필요 시 여기서 추가적인 처리 (예: 별점 작성 후 데이터를 다시 불러오기)
    } catch (error) {
      console.error('이벤트 불러오기 실패:', error);
    }
  };

  return (
    <article className="article-wrap">
      <div className="StyledArticle">
        <div className="title">
          <div className="StyledImage">
            <div className="container">
              <img className="rectangle" alt="image" src={data.imageUrl} />
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
            <div className="view">
              <FontAwesomeIcon icon={faEye} />
              <div className="text-wrapper-2">{data.viewCount}</div>
            </div>
            <div className="score">
              <FontAwesomeIcon icon={faStar} />
              <div className="text-wrapper-2">{data.favoriteCount}</div>
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
                {data.eventTypeName} / {data.categoryName}
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
            <p className="text-wrapper-10">{data.content}</p>
          </div>
        </div>
        <div className="review">
          <div className="container">
            <div className="review-statistics">
              <div className="text-wrapper">총 {data.scores ? data.scores.length : 0}명이 별점을 달았습니다.</div>
              {/* <div className="overlap-group">
                {data.averageScore ? data.averageScore : 0}
                <StarRatings rating={data.averageScore} starRatedColor="#1e9d8b" name="rating" />
              </div> */}
              {/* <div className="overlap">
              <div className="rectangle" />
            </div>
            <div className="overlap-2">
              <div className="rectangle-2" />
              <img className="img" alt="Mask group" src="mask-group.png" />
              <img className="mask-group-2" alt="Mask group" src="mask-group-2.png" />
            </div>
            <div className="rectangle-3" />
            <div className="rectangle-4" />
            <img className="stars" alt="Stars" src="stars.png" /> */}
              <div className="text-wrapper-11">
                <p>
                  {averageScore}
                  <StarRatings rating={averageScore} starRatedColor="#1e9d8b" name="rating" />
                </p>
              </div>
            </div>
            <div className="review-detail">
              <div className="container-2">
                <div className="horizontal-border">
                  <div className="container-4">
                    <div className="div-wrapper">
                      <div className="text-wrapper-13">클릭해서 별점을 매겨주세요!</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Base>
              <RatingField>
                <StarInput onClickRating={handleClickRating} value={5} isHalf={false} />
                <StarInput onClickRating={handleClickRating} value={4.5} isHalf={true} />
                <StarInput onClickRating={handleClickRating} value={4} isHalf={false} />
                <StarInput onClickRating={handleClickRating} value={3.5} isHalf={true} />
                <StarInput onClickRating={handleClickRating} value={3} isHalf={false} />
                <StarInput onClickRating={handleClickRating} value={2.5} isHalf={true} />
                <StarInput onClickRating={handleClickRating} value={2} isHalf={false} />
                <StarInput onClickRating={handleClickRating} value={1.5} isHalf={true} />
                <StarInput onClickRating={handleClickRating} value={1} isHalf={false} />
                <StarInput onClickRating={handleClickRating} value={0.5} isHalf={true} />
              </RatingField>
              <RatingValue>{rating}</RatingValue>
            </Base>
          </div>
        </div>
        <div></div>
      </div>
      <EventBanner type={`like/${eventId}`} />
    </article>
  );
};
export default EventDetail;
