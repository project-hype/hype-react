import Banner from '../components/event/Banner';
import EventBanner from '../components/event/EventBanner';
import React, { useEffect, useState } from 'react';
import MainLayout from '../layout/MainLayout';
import DayCalendar from '../components/common/DayCalendar';
import { userState } from '../state/authState';
import { useRecoilValue } from 'recoil';
import '../assets/scss/common.scss';
import Loading from '../components/common/Loading';

function MainPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useRecoilValue(userState);
  const username = user.isLoggedIn && user.userInfo && user.userInfo.name ? user.userInfo.name.substr(1) : '';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return <Loading />;
  } else {
    return (
      <MainLayout>
        <div className="container">
          <article className="main-article" style={{ marginLeft: '150px', marginRight: '150px' }}>
            <div>
              <Banner />
            </div>
            <article className="article-wrap">
              <EventBanner title={'지금 핫한 곳은?🔥'} type={'top'} />
              {user.isLoggedIn ? (
                <EventBanner title={`${username}님의 취향 저격 행사✨🔫`} type={'top'} />
              ) : (
                <EventBanner title={'HYPE Pick 행사 추천✨'} type={'score'} />
              )}
              <DayCalendar />
            </article>
          </article>
        </div>
      </MainLayout>
    );
  }
}

export default MainPage;
