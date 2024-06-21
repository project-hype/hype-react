import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/scss/common.scss';
import axios from 'axios';
import { faHeart, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none; /* 기본 밑줄 제거 */
  color: inherit; /* 부모의 색상 상속 */
  &:hover,
  &:focus {
    color: inherit; /* hover와 focus 상태에서도 부모의 색상 유지 */
  }
`;

const FavoriteEvent = ({ events, myInfo, setActiveIndex, likeEvent, likeEventSetter, toggleFavorite }) => {
  return (
    <ul>
      {events.length > 0 ? (
        events.map((event, index) => (
          <li key={index}>
            <div>
              <StyledLink to={`/event/${event.eventId}`} className="event-img-wrap">
                <img src={event.imageUrl} className="event-img" />
              </StyledLink>
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
                      {event.startDate}~{event.endDate}
                    </p>
                  </li>
                </ul>
              </StyledLink>
              <div>
                <FontAwesomeIcon
                  icon={event.favorite ? faHeart : faRegularHeart}
                  style={{ color: event.favorite ? 'red' : 'gray', cursor: 'pointer' }}
                  onClick={() => toggleFavorite(event.eventId)}
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
export default FavoriteEvent;
