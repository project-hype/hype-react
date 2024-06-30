import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import EventList from '../event/EventList';
import EventList2 from './EventList2';
import axios from 'axios';
import '../../assets/scss/common.scss';
import { userState } from '../../state/authState';
import { useRecoilValue } from 'recoil';

const MoreButton = styled(Link)`
  text-decoration: none !important;
  color: inherit;
  &:hover,
  &:focus {
    color: #ff8c00 !important;
  }
`;

const P = styled.p`
  font-size: 16px;
  line-height: 1;
  font-weight: 600;
  color: #fff;
  margin: 0;
`;

const Title = styled.div`
  font-size: 32px;
  font-family: '해피니스 산스 타이틀';
  font-weight 700;
  text-align: center;
  margin-top: 16px;
  margin-bottom: 32px;
`;

// const MoreView = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-end;
//   padding: 15px 20px 10px;
// }`;

function DayCalendar() {
  const today = dayjs();
  const [baseDayjs, setBaseDayjs] = useState(getInitialDays(today));
  const [selectedDay, setSelectedDay] = useState(today);
  const [data, setData] = useState([]);
  const user = useRecoilValue(userState);

  const getStoresByDate = (date) => {
    setSelectedDay(dayjs(date));
  };

  useEffect(() => {
    let fetchData = async () => {
      try {
        let memberId = '';
        if (user.isLoggedIn) {
          memberId = user.userInfo.memberId;
        }
        const response = await axios.get(
          `http://localhost:8080/event/list/${selectedDay.format('YYYY-MM-DD')}?memberId=${memberId}`,
        );
        const result = response.data.eventList;
        setData(result);
        // console.log(result);
      } catch (error) {
        // console.log(error);
      }
    };

    fetchData();
  }, [selectedDay]);

  return (
    <>
      <div className="calendar-list">
        <Title>날짜별 행사 📅</Title>
        <ul>
          {baseDayjs.map((day, index) => (
            <li key={index} onClick={() => getStoresByDate(day)}>
              <div className={selectedDay.isSame(dayjs(day), 'day') ? 'calendar-list-box-select' : ''}>
                <span className={selectedDay.isSame(dayjs(day), 'day') ? 'calendar-list-box-select' : ''}>
                  {today.isSame(dayjs(day), 'day') ? 'TODAY' : dayjs(day).format('ddd')}
                </span>
                <P>{dayjs(day).date()}</P>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div class="calendar-popup-list">
        <div class="moreview">
          <MoreButton to={'/search/'}>전체보기</MoreButton>
        </div>

        <EventList2 events={data} />
      </div>
    </>
  );
}

export default DayCalendar;

const getInitialDays = (today) => {
  const endDay = today.add(14, 'day');
  return getDatesStartToLast(today, endDay);
};

const getDatesStartToLast = (startDate, lastDate) => {
  const result = [];
  let currentDate = startDate;

  while (currentDate.isBefore(lastDate)) {
    result.push(currentDate);
    currentDate = currentDate.add(1, 'day');
  }

  return result;
};
