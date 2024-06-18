import dayjs, { Dayjs } from 'dayjs';
import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function DayCalandar() {
  const CalendarList = styled.div`
    width: 100%;
    height: auto;
    padding: 0 20px;
    margin-top: 40px;
    overflow: hidden;
    padding-bottom: 40px;
    border-bottom: 1px solid #212121;
  `;

  const Ul = styled.ul`
    display: flex;
    flex-direction: row;
    column-gap: 2.5%;
    align-items: center;
    justify-content: flex-start;
    overflow-x: scroll;
  `;

  const Li = styled.li`
    list-style: none;
  `;

  const CalendarListBox = styled.div`
    border-radius: 50%;
    background: #e0ded8;
    cursor: pointer;

    ${({ isSelected }) =>
      isSelected &&
      `
    width: 60px;
    height: 60px;
    background: #1e9d8b;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    `}
  `;

  const [baseDayjs, setDayjs] = useState([dayjs()]);
  const [selectedDay, setSelectedDay] = useState(dayjs());
  // const [likeStore, setLikeStore] = useState([]);
  // const [activeIndex, setActiveIndex] = useState(null);
  const today = dayjs();

  useEffect(() => {
    const endDay = today.add(14, 'day');
    const nextResult = getDatesStartToLast(selectedDay, endDay, 'next');
    setDayjs(nextResult);
    // dispatch(fetchListByDate(today.format('YYYY-MM-DD'), myInfo ? myInfo.userId : null));
  }, []);

  return (
    <>
      <CalendarList>
        <Ul>
          {!!baseDayjs &&
            baseDayjs.map((day, index) => (
              //   <li className="" key={index} onClick={() => getStoresBydate(day)}>
              <Li>
                <CalendarListBox isSelected={selectedDay.format('YYYY-MM-DD') === dayjs(day).format('YYYY-MM-DD')}>
                  <span>
                    {today.format('YYYY-MM-DD') === dayjs(day).format('YYYY-MM-DD')
                      ? 'TODAY'
                      : dayjs(day).format('ddd')}
                  </span>
                  <p>{dayjs(day).date()}</p>
                </CalendarListBox>
              </Li>
            ))}
        </Ul>
      </CalendarList>
    </>
  );
}
export default DayCalandar;

const getDatesStartToLast = (startDate, lastDate, buttonType) => {
  const result = [];
  let flag = false;
  // TODO 조건이 너무 지저분함. 바꿔야한다.
  for (let i = 1; i < lastDate.diff(startDate, 'days') + 1; i++) {
    if (
      startDate.add(i, 'day').format('YYYY-MM-DD') === dayjs().add(1, 'day').format('YYYY-MM-DD') ||
      (buttonType === 'next' && flag === false)
    ) {
      result.push(startDate);
      flag = true;
    } else {
      result.push(startDate.add(i - 1, 'day').format('YYYY-MM-DD'));
    }
  }
  return result;
};
