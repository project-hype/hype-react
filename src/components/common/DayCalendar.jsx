import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import EventList from '../event/EventList';
import axios from 'axios';
import '../../assets/scss/common.scss';
import { userState } from '../../state/authState';
import { useRecoilValue } from 'recoil';

const CalendarList = styled.div`
  width: 100%;
  height: auto;
  padding: 0 20px;
  margin-top: 40px;
  overflow: hidden;
  padding-bottom: 40px;
  border-bottom: 1px solid lightgray;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  column-gap: 2.5%;
  align-items: center;
  justify-content: flex-start;
  overflow-x: scroll;
  overflow: hidden;
`;

const Li = styled.li`
  list-style: none;
`;

const CalendarListBox = styled.div`
  font-size: 13px;
  border-radius: 50%;
  background: #e0ded8;
  cursor: pointer;
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &.calendar-list-box-select {
    background: #1e9d8b;
  }
`;

const Span = styled.span`
  display: none;

  &.calendar-list-box-select {
    font-weight: 600;
    color: #fff;
    display: block;
    font-size: 10px;
  }
`;

const P = styled.p`
  font-size: 16px;
  line-height: 1;
  font-weight: 600;
  color: #fff;
  margin: 0;
`;

const MoreView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 15px 20px 10px;
}`;

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
      <div class="calendar-list">
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
          <Link to={'/event'}>전체보기</Link>
        </div>
        <EventList events={data} />
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
