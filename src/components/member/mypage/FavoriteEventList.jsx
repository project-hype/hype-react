import React, { useEffect, useState } from 'react';
import '../../../assets/scss/common.scss';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../state/authState';
import styled from 'styled-components';
import FavoriteEvent from './FavoriteEvent';
import EventAPI from '../../../api/event/eventAPI';
import MemberAPI from '../../../api/member/memberAPI';

/**
 * 마이페이지 - 즐겨찾기 이벤트 리스트
 * @author 임원정
 * @since 2024.06.21
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.21   임원정        최초 생성
 * 2024.06.30   임원정        코드 리팩토링 (API 적용)
 * </pre>
 */

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
      <FavoriteEvent events={data} toggleFavorite={toggleFavorite} />
    </EventWrapArticle>
  );
};

export default FavoriteEventList;
