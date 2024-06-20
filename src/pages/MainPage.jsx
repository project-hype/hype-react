import Banner from '../components/event/Banner';
import EventBanner from '../components/event/EventBanner';
import React from 'react';
import MainLayout from '../layout/MainLayout';
import DayCalendar from '../components/common/DayCalendar';
import '../assets/scss/common.scss';

function MainPage() {
  return (
    <div class="container">
      <MainLayout />
      <article class="main-article" style={{ marginLeft: '150px', marginRight: '150px' }}>
        <div>
          <Banner />
        </div>
        <article class="article-wrap">
          <EventBanner title={'🔥이번 주 핫한 곳은?🔥'} type={'top'} />
          <EventBanner title={'OO님의 취향 저격 행사✨🔫'} type={'top'} />
          <DayCalendar />
        </article>
      </article>
    </div>
  );
}

export default MainPage;
