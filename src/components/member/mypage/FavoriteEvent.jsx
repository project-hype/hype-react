import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

/**
 * 즐겨찾기 이벤트 셀
 * @author 임원정
 * @since 2024.06.21
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.21   임원정        최초 생성
 * 2024.06.22   임원정        디자인 수정
 * </pre>
 */

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
  height: 200px;
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

const FavoriteEvent = ({ events, toggleFavorite }) => {
  return (
    <>
      {events.length > 0 ? (
        <EventGrid>
          {events.map((event) => (
            <EventContainer key={event.eventId}>
              <StyledLink to={`/event/${event.eventId}`}>
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
                    icon={faBookmark}
                    style={{ color: '#ff8c00', cursor: 'pointer' }}
                    onClick={() => toggleFavorite(event.eventId)}
                    size="2x"
                  />
                </InfoRow>
                <StyledLink to={`/event/${event.eventId}`}>
                  <EventTitle>{event.title.length >= 13 ? event.title.substr(0, 13) + '...' : event.title}</EventTitle>
                  <EventDates>
                    {event.startDate} ~ {event.endDate}
                  </EventDates>
                </StyledLink>
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

export default FavoriteEvent;
