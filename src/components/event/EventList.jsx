import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/scss/common.scss';
import axios from 'axios';
import { faHeart, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

const EventList = ({ events, myInfo, setActiveIndex, likeEvent, likeEventSetter }) => {
  const [likeStatus, setLikeStatus] = useState({}); // 각 이벤트의 즐겨찾기 상태를 저장할 객체

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
      const isFavorite = likeStatus[eventId];
      let response;
      console.log(!isFavorite + eventId);

      if (isFavorite) {
        // 이미 즐겨찾기 되어 있는 경우 삭제 API 호출
        response = await axios.delete('http://localhost:8080/event/deleteFav', {
          data: {
            memberId: '3',
            eventId: eventId,
          },
        });
      } else {
        // 즐겨찾기 추가 API 호출
        response = await axios.post('http://localhost:8080/event/addFav', {
          memberId: '3',
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
              <Link to={`/event/${event.eventId}`} className="event-img-wrap">
                <img src={event.imageUrl} className="event-img" />
              </Link>
              <Link to={`/event/${event.eventId}`} style={{ textDecoration: 'none' }}>
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
                      {event.startDate}~{event.endDate}
                    </p>
                  </li>
                </ul>
              </Link>
              <div>
                <FontAwesomeIcon
                  icon={likeStatus[event.eventId] ? faHeart : faRegularHeart}
                  style={{ color: likeStatus[event.eventId] ? 'red' : 'gray', cursor: 'pointer' }}
                  onClick={(e) => toggleFavorite(event.eventId, e)}
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
