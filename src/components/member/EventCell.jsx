import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { faBookmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faRegularBookmark } from '@fortawesome/free-regular-svg-icons';
import { userState } from '../../state/authState';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover,
  &:focus {
    color: inherit;
  }
`;

const EventContainer = styled.div`
  display: flex;
  width: 600px;
  height: fit-content;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  padding: 0px;
  justify-content: center;
  align-item: center;
`;

const EventImage = styled.img`
  width: 160px;
  height: 160px;
  object-fit: cover;
  border: 1px solid transparent;
  border-radius: 8px;
`;

const EventInfo = styled.div`
  flex-direction: column;
  flex: 1;
  padding: 0px 16px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 48px;
`;

const EventType = styled.div`
  padding: 0px;
  background-color: #fff;
  border-radius: 35px;
  border: 1px solid #e0ded8;
  font-size: 14px;
  margin-right: 16px;
`;

const EventTitle = styled.div`
  font-size: 24px;
  font-family: '해피니스 산스 타이틀';
  margin-bottom: 5px;
`;

const EventDates = styled.div`
  font-size: 14px;
  color: gray;
`;

const BookmarkIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin-left: auto;
  color: ${(props) => (props.active ? '#ff8c00' : 'gray')};
`;

const EventCell = ({ events, toggleFavorite }) => {
  return (
    <ul>
      {events.length > 0 ? (
        events.map((event, index) => (
          <li key={index}>
            <EventContainer>
              <StyledLink to={`/event/${event.eventId}`}>
                <EventImage src={event.imageUrl} />
              </StyledLink>
              <EventInfo>
                <InfoRow>
                  <li>{event.eventTypeName} |</li>
                  <div style={{ marginRight: '10px' }}>
                    <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '5px' }} />
                    {event.branchName}
                  </div>
                  <BookmarkIcon
                    icon={event.favorite ? faBookmark : faRegularBookmark}
                    style={{ color: event.favorite ? '#ff8c00' : 'gray', cursor: 'pointer' }}
                    onClick={() => toggleFavorite(event.eventId)}
                    size="2x"
                  />
                </InfoRow>
                <EventTitle>{event.title}</EventTitle>
                <EventDates>
                  {event.startDate} ~ {event.endDate}
                </EventDates>
              </EventInfo>
            </EventContainer>
          </li>
        ))
      ) : (
        <div>이벤트가 없습니다.</div>
      )}
    </ul>
  );
};

export default EventCell;
