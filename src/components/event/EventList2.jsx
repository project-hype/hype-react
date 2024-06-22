import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { faBookmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faRegularBookmark } from '@fortawesome/free-regular-svg-icons';
import { userState } from '../../state/authState';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Modal from '../common/Modal';

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
  width: 500px;
  height: 200px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  padding: 0px 16px;
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
  column-gap: 40px;
`;

const EventList2 = ({ events, likeEvent }) => {
  const [likeStatus, setLikeStatus] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  useEffect(() => {
    const initialLikeStatus = {};
    events.forEach((event) => {
      initialLikeStatus[event.eventId] = event.favorite;
    });
    setLikeStatus(initialLikeStatus);
  }, [events]);

  const toggleFavorite = async (eventId) => {
    try {
      if (!user.isLoggedIn) {
        setIsModalOpen(true);
        return;
      }

      const isFavorite = likeStatus[eventId];
      let response;

      if (isFavorite) {
        response = await axios.delete('http://localhost:8080/event/deleteFav', {
          data: {
            memberId: user.userInfo.memberId,
            eventId: eventId,
          },
        });
      } else {
        response = await axios.post('http://localhost:8080/event/addFav', {
          memberId: user.userInfo.memberId,
          eventId: eventId,
        });
      }

      setLikeStatus((prevStatus) => ({
        ...prevStatus,
        [eventId]: !isFavorite,
      }));

      console.log('Toggled favorite:', response.data);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };
  const handleConfirm = () => {
    navigate('/login');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
                    icon={likeStatus[event.eventId] ? faBookmark : faRegularBookmark}
                    active={likeStatus[event.eventId]}
                    onClick={() => toggleFavorite(event.eventId)}
                    size="2x"
                  />
                </InfoRow>
                <StyledLink to={`/event/${event.eventId}`}>
                  <EventTitle>{event.title.length >= 15 ? event.title.substr(0, 14) + '...' : event.title}</EventTitle>
                  <EventDates>
                    {event.startDate} ~ {event.endDate}
                  </EventDates>
                </StyledLink>
              </EventInfo>
            </EventContainer>
          ))}
        </EventGrid>
      ) : (
        <EmptyContent />
      )}
      {isModalOpen && <Modal message="로그인이 필요합니다." onConfirm={handleConfirm} />}
    </>
  );
};

export default EventList2;
