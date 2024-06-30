import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import EventList from '../common/EventList';
import '../../../assets/scss/common.scss';
import { userState } from '../../../state/authState';
import { useRecoilValue } from 'recoil';
import EventAPI from '../../../api/event/eventAPI';

/**
 * 날짜별 이벤트 조회
 * @author 정은지
 * @since 2024.06.18
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.18  	정은지        최초 생성
 * 2024.06.30   정은지        구조 리팩토링
 * </pre>
 */
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
        const memberId = user.isLoggedIn ? user.userInfo.memberId : '';
        console.log('memberId: ' + memberId);
        const response = await EventAPI.eventByDate(selectedDay);
        console.log(response);
        const result = response.data.eventList;
        setData(result);
        console.log(result);
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
