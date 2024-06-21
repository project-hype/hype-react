import Banner from '../components/event/Banner';
import EventBanner from '../components/event/EventBanner';
import React, { useEffect, useState } from 'react';
import MainLayout from '../layout/MainLayout';
import DayCalendar from '../components/common/DayCalendar';
import { userState } from '../state/authState';
import { useRecoilValue } from 'recoil';
import '../assets/scss/common.scss';
import { PageTitle } from '../components/member/MemberStyledComponents';

function MainPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useRecoilValue(userState);
  const userName = user?.isLoggedIn ? user.userInfo.name.substr(1) : '';

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <MainLayout>
      <div class="container">
        <article class="main-article" style={{ marginLeft: '150px', marginRight: '150px' }}>
          <div>
            <Banner />
          </div>
          <article class="article-wrap">
            <EventBanner title={'이번 주 핫한 곳은?🔥'} type={'top'} />
            {user.isLoggedIn ? (
              <EventBanner title={`${userName}님의 취향 저격 행사✨🔫`} type={'top'} />
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

export default MainPage;
