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
  width: 480px;
  height: fit-content;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  justify-content: center;
  align-item: center;
  padding: 16px;
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
  padding-left: 16px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 64px;
`;

const EventType = styled.div`
  padding: 0px;
  background-color: #fff;
  border-radius: 35px;
  border: 1px solid #e0ded8;
  font-size: 16px;
  margin-right: 16px;
`;

const EventTitle = styled.div`
  font-size: 24px;
  font-family: '해피니스 산스 타이틀';
  margin-bottom: 16px;
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

const EmptyContent = styled.div`
  display: flex;
  height: 40vh;
  align-items: center;
  font-size: 16px;
  color: gray;
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 40px;
  column-gap: 56px;
`;

const EventCell = ({ events, toggleFavorite }) => {
  return (
    <>
      {events.length > 0 ? (
        <EventGrid>
          {events.map((event) => (
            <EventContainer key={event.eventId}>
              <StyledLink to={`/event/${event}.eventId}`}>
                <EventImage src={event.imageUrl} />
              </StyledLink>
              <EventInfo>
                <InfoRow>
                  <div>{event.eventTypeName} |</div>
                  <div>
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
          ))}
        </EventGrid>
      ) : (
        <EmptyContent>
          <p>즐겨찾기한 이벤트가 없습니다.</p>
        </EmptyContent>
      )}
    </>
  );
};

export default EventCell;
