import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/scss/common.scss';
import axios from 'axios';
import { faStar, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import { userState } from '../../state/authState';
import { useRecoilValue } from 'recoil';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  width: 100%;
  text-decoration: none; /* 기본 밑줄 제거 */
  color: inherit; /* 부모의 색상 상속 */
  &:hover,
  &:focus {
    color: inherit; /* hover와 focus 상태에서도 부모의 색상 유지 */
  }
`;

const EventTitle = styled.div`
  font-size: 24px;
  font-family: '해피니스 산스 타이틀';
`;

const EventList = ({ events, setActiveIndex, likeEvent, likeEventSetter }) => {
  const [likeStatus, setLikeStatus] = useState({}); // 즐겨찾기 상태를 저장할 객체
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  useEffect(() => {
    // 초기 즐겨찾기 상태 설정
    const status = {};
    events.forEach((event) => {
      status[event.eventId] = event.favorite; // 이벤트의 즐겨찾기 상태를 설정
    });
    setLikeStatus(status);
  }, [events]);

  const toggleFavorite = async (eventId) => {
    try {
      if (!user.isLoggedIn) {
        navigate('/login');
        return;
      }
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

  return (
    <ul>
      {events.length > 0 ? (
        events.map((event, index) => (
          <li key={index}>
            <div>
              <div>
                <StyledLink to={`/event/${event.eventId}`} className="event-img-wrap">
                  <img src={event.imageUrl} className="event-img" />
                </StyledLink>
              </div>
              <div className="event-details">
                <StyledLink to={`/event/${event.eventId}`} style={{ textDecoration: 'none' }}>
                  <ul>
                    <li className="event-name">
                      <p>{event.title}</p>
                    </li>
                    <li className="event-branch">
                      <FontAwesomeIcon icon={faLocationDot} /> {event.branchName}
                    </li>
                    <li className="event-type">{event.eventTypeName}</li>
                    <li>
                      <p className="event-date">
                        {event.startDate} ~ {event.endDate}
                      </p>
                    </li>
                  </ul>
                </StyledLink>
              </div>
              <div className="event-favorite">
                <FontAwesomeIcon
                  className="favorite-icon"
                  icon={likeStatus[event.eventId] ? faStar : faRegularStar}
                  style={{ color: likeStatus[event.eventId] ? '#ff8c00' : 'gray', cursor: 'pointer' }}
                  onClick={(e) => toggleFavorite(event.eventId, e)}
                  size="2x"
                />
              </div>
            </div>
          </li>
        ))
      ) : (
        <div className="calendar-popup-list-blank"></div> // stores가 없거나 길이가 0일 때 빈 화면을 렌더링
      )}
    </ul>
  );
};
export default EventList;
