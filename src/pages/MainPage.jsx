import Banner from '../components/common/Banner';
import EventBanner from '../components/common/EventBanner';
import React from 'react';
import MainLayout from '../layout/MainLayout';
import DayCalendar from '../components/common/DayCalendar';

function MainPage() {
  return (
    <div>
      <MainLayout />
      <div>
        <Banner />
      </div>
      <article>
        <EventBanner title={'🔥이번 주 핫한 곳은?🔥'} />
        <EventBanner title={'OO님의 취향 저격 행사✨🔫'} />
        <DayCalendar />
      </article>
    </div>
  );
}

export default MainPage;
