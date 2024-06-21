import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/scss/common.scss';
import axios from 'axios';
import { faEye, faStar, faLocationDot, faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import StarInput from './StarInput';
import { userState } from '../../state/authState';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';

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
const FavoriteIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: ${({ isFavorite }) => (isFavorite ? 'red' : 'lightgray')};
  transition: color 0.2s;

  &:hover {
    color: ${({ isFavorite }) => (isFavorite ? 'darkred' : 'gray')};
  }
`;
const EventDetail = ({}) => {
  const { eventId } = useParams();
  const [likeStatus, setLikeStatus] = useState({}); // 즐겨찾기 상태를 저장할 객체
  const [data, setData] = useState({});
  const [rating, setRating] = useState(0);
  const user = useRecoilValue(userState);

  const handleClickRating = async (value) => {
    setRating(value);
    console.log(value);
    await submitScore({ eventId, score: value });
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/event/${eventId}?memberId=1`);
      const result = response.data.event;
      setLikeStatus(result[0].isFavorite); // Initialize favorite status

      setData(result[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleFavorite = async (eventId) => {
    try {
      const isFavorite = likeStatus[eventId];
      let response;
      console.log(!isFavorite + eventId);

      if (isFavorite) {
        // 이미 즐겨찾기 되어 있는 경우 삭제 API 호출
        response = await axios.delete('http://localhost:8080/event/deleteFav', {
          data: {
            memberId: user.userInfo.memberId,
            eventId: eventId,
          },
        });
      } else {
        // 즐겨찾기 추가 API 호출
        response = await axios.post('http://localhost:8080/event/addFav', {
          memberId: user.userInfo.memberId,
          eventId: eventId,
        });
      }

      // 즐겨찾기 상태 업데이트
      setLikeStatus({
        ...likeStatus,
        [eventId]: !isFavorite, // 해당 이벤트의 즐겨찾기 상태 반전
      });

      console.log('Toggled favorite:', response.data);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const submitScore = async ({ eventId, score }) => {
    try {
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

  return (
    <article className="article-wrap">
      <div class="StyledArticle">
        <div class="title">
          <div clsas="StyledImage">
            <div class="container">
              <img class="rectangle" alt="Rectangle" src={data.imageUrl} />
            </div>
          </div>
          <div class="text-wrapper">{data.title}</div>
          <FavoriteIcon
            icon={likeStatus ? faSolidHeart : faRegularHeart}
            isFavorite={likeStatus}
            onClick={toggleFavorite}
          />

          <div class="count">
            <div class="view">
              <FontAwesomeIcon icon={faEye} />
              <div class="text-wrapper-2">{data.viewCount}</div>
            </div>
            <div class="score">
              <FontAwesomeIcon icon={faStar} />
              <div class="text-wrapper-2">{data.favoriteCount}</div>
            </div>
          </div>
        </div>
        <div class="detail">
          <div class="hashtag">
            {data.hashtags &&
              data.hashtags.map((hashtag, index) => (
                <div class="item" key={index}>
                  <div class="text-wrapper-3">{hashtag}</div>
                </div>
              ))}
          </div>
          <div class="period-location">
            <div class="period">
              <div class="text-wrapper-6">기간</div>
              <div class="text-wrapper-7">
                {data.startDate} ~ {data.endDate}
              </div>
            </div>
            <div class="location">
              <div class="text-wrapper-6">장소</div>
              <div class="text-wrapper-8">
                {data.cityName} {data.address} {data.branchName} {data.detail_address}
              </div>
            </div>
          </div>
          <div class="description">
            <p class="p">행사 안내</p>
            <p class="text-wrapper-10">{data.content}</p>

            <div class="frame">
              <p class="text-wrapper-10">{data.content}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="review">
        <div className="container">
          <div className="review-statistics">
            <div className="text-wrapper">총 {data.scores ? data.scores.length : 0}명이 별점을 달았습니다.</div>
            <div className="overlap-group">
              <p>여기에 별점 보여주기</p>
              <img className="mask-group" alt="Mask group" src="image.png" />
            </div>
            <div className="overlap">
              <div className="rectangle" />
            </div>
            <div className="overlap-2">
              <div className="rectangle-2" />
              <img className="img" alt="Mask group" src="mask-group.png" />
              <img className="mask-group-2" alt="Mask group" src="mask-group-2.png" />
            </div>
            <div className="rectangle-3" />
            <div className="rectangle-4" />
            <img className="stars" alt="Stars" src="stars.png" />
            <div className="text-wrapper-11">{data.averageScore ? data.averageScore : 0}</div>
          </div>
          <div className="review-detail">
            <div className="container-2">
              <div className="container-3"></div>
              <div className="horizontal-border">
                <div className="container-4">
                  <div className="div-wrapper">
                    <div className="text-wrapper-13">클릭해서 별점을 매겨주세요!</div>
                  </div>
                  <Base>
                    <Name>별점</Name>
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
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
export default EventDetail;
