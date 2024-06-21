import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/scss/common.scss';
import { useRecoilValue } from 'recoil';
import { userState } from '../../state/authState';
import styled from 'styled-components';
import FavoriteEvent from './FavoriteEvent';

const EventWrapArticle = styled.article`
  height: 100vh; // 전체 화면 높이
  margin-left: 150px;
  margin-right: 150px;
`;

const FavoriteEventList = () => {
  const user = useRecoilValue(userState);
  const [data, setData] = useState([]);
  const [favoriteEvents, setFavoriteEvents] = useState([]);

  useEffect(() => {
    const fetchFavoriteEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/member/favorites/${user.userInfo.memberId}`, {
          withCredentials: true,
        });
        const result = response.data.eventList;
        setData(result);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    if (user.userInfo.memberId) {
      fetchFavoriteEvents();
    }
  }, [user.userInfo.memberId]);

  const toggleFavorite = async (eventId) => {
    try {
      const isFavorite = data.some((event) => event.eventId === eventId && event.favorite);
      let response;

      if (isFavorite) {
        response = await axios.delete('http://localhost:8080/event/deleteFav', {
          data: {
            memberId: user.userInfo.memberId,
            eventId: eventId,
          },
          withCredentials: true,
        });
        // Remove event from list if successfully deleted
        if (response.status === 200) {
          setData(data.filter((event) => event.eventId !== eventId));
        }
      } else {
        response = await axios.post(
          'http://localhost:8080/event/addFav',
          {
            memberId: user.userInfo.memberId,
            eventId: eventId,
          },
          {
            withCredentials: true,
          },
        );
        // Fetch the updated favorite list after adding a new favorite
        if (response.status === 200) {
          const response = await axios.get(`http://localhost:8080/member/favorites/${user.userInfo.memberId}`, {
            withCredentials: true,
          });
          const result = response.data.eventList;
          setData(result);
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <EventWrapArticle>
      <article>
        <div className="calendar-popup-list">
          <FavoriteEvent events={data} toggleFavorite={toggleFavorite} />
        </div>
      </article>
    </EventWrapArticle>
  );
};

export default FavoriteEventList;
