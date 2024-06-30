import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/scss/common.scss';
import { faEye, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faRegularBookmark } from '@fortawesome/free-regular-svg-icons';
import StarInput from './StarInput';
import { userState } from '../../state/authState';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import StarRatings from 'react-star-ratings';
import Modal from '../common/Modal';
import EventAPI from '../../api/event/eventAPI';

/**
 * 이벤트 상세 조회
 * @author 정은지
 * @since 2024.06.20
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.20  	정은지        최초 생성
 * </pre>
 */
const StarWrapper = styled.div`
  .star-ratings {
    position: relative;
    display: inline-block;

    .star-container {
      position: relative;
      display: inline-block;

      .star {
        clip-path: circle(50% at 50% 50%);
      }
    }
  }
`;
const Base = styled.section`
  display: flex;
  align-items: center;
  gap: 8px;
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
  const [likeStatus, setLikeStatus] = useState(false);
  const [data, setData] = useState({});
  const [content, setContent] = useState(null);
  const [rating, setRating] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const averageScore = data.averageScore ? data.averageScore : 0;
  const memberId = user.isLoggedIn ? user.userInfo.memberId : '';

  const handleClickRating = async (value) => {
    let newRating = value;
    setRating(value);
    let action = 'INSERT';
    if (value === 0) {
      action = 'DELETE';
      newRating = 0;
    } else if (data.myScore) {
      action = 'UPDATE';
      console.log('별점 업데이트');
    } else if (value === rating) {
      action = 'DELETE';
      newRating = 0;
      console.log('별점 삭제 호출 ');
    }
    setRating(newRating);
    await submitScore({ eventId, score: newRating, action });
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await EventAPI.eventDetail(eventId);
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
        setIsModalOpen(true);
        return;
      }
      const isFavorite = likeStatus;
      let response;

      if (isFavorite) {
        // 이미 즐겨찾기 되어 있는 경우 삭제 API 호출
        response = await EventAPI.deleteFavorite(eventId);
        console.log(response);
        setLikeCount((prevCount) => prevCount - 1);
      } else {
        // 즐겨찾기 추가 API 호출
        response = await EventAPI.addFavorite(eventId);
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
        setIsModalOpen(true);
        return;
      }
      const response = await EventAPI.submitRating(eventId, score, action);
      if (action === 'DELETE') {
        setRating(0); // 별점 삭제 시 0으로 설정
      } else {
        setRating(score);
      }
      console.log('별점 작성 성공:', response.data);
    } catch (error) {
      console.error('별점 작성 중 오류 발생:', error);
    }
  };

  const handleConfirm = () => {
    navigate('/login');
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
                  <div className="text-wrapper-3">#{hashtag}</div>
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
            <div className="number">
              <p className="average-score">{averageScore}</p>
            </div>
            <div className="icon">
              <StarRatings
                rating={averageScore}
                starRatedColor="#1e9d8b"
                class="rating"
                starDimension="60px"
                starSpacing="5px"
                svgIconPath="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                svgIconViewBox="0 0 576 512"
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
              </Base>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal message="로그인이 필요합니다." onConfirm={handleConfirm} />}
    </article>
  );
};
export default EventDetail;
