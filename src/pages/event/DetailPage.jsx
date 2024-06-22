import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';
import EventDetail from '../../components/event/EventDetail';
import '../../assets/scss/common.scss';
import Loading from '../../components/common/Loading';
import EventBanner from '../../components/event/EventBanner';

function DetailPage() {
  const { eventId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);
  if (!isLoaded) {
    return <Loading />;
  } else {
    return (
      <div class="container">
        <MainLayout>
          <article class="main-article" style={{ marginLeft: '250px', marginRight: '250px' }}>
            <EventDetail eventId={eventId} />
            <EventBanner title={'비슷한 행사도 있어요 👀✨'} type={`like/${eventId}`} slideCount={'3.2'} />
          </article>
        </MainLayout>
      </div>
    );
  }
}

export default DetailPage;
