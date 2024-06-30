import React, { useEffect, useState } from 'react';
import '../../assets/scss/common.scss';
import { useRecoilValue } from 'recoil';
import { userState } from '../../state/authState';
import styled from 'styled-components';
import EventCell from './EventCell';
import EventAPI from '../../api/event/eventAPI';
import MemberAPI from '../../api/member/memberAPI';

const EventWrapArticle = styled.article`
  height: 100%;
  min-height: 50vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 48px;
  margin-bottom: 80px;
`;

const FavoriteEventList = () => {
  const user = useRecoilValue(userState);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchFavoriteEvents = async () => {
      try {
        const response = await MemberAPI.favorites();
        setData(response.data.eventList);
      } catch (error) {
        console.error(error);
      }
    };

    if (user.userInfo.memberId) {
      fetchFavoriteEvents();
    }
  }, [user.userInfo.memberId]);

  const [likeStatus, setLikeStatus] = useState({});

  useEffect(() => {
    const initialLikeStatus = {};
    data.forEach((event) => {
      initialLikeStatus[event.eventId] = true;
    });
    setLikeStatus(initialLikeStatus);
  }, [data]);

  const toggleFavorite = async (eventId) => {
    try {
      const isFavorite = likeStatus[eventId];
      let response;

      if (isFavorite) {
        response = await EventAPI.deleteFavorite(eventId);
        if (response.status === 200) {
          setData(data.filter((event) => event.eventId !== eventId));
        }
      } else {
        response = await EventAPI.addFavorite(eventId);
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

  return (
    <EventWrapArticle>
      <EventCell events={data} toggleFavorite={toggleFavorite} />
    </EventWrapArticle>
  );
};

export default FavoriteEventList;
