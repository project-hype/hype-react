import React from 'react';
import MainLayout from '../../layout/MainLayout';
import EventDetail from '../../components/event/EventDetail';
import '../../assets/scss/common.scss';

function DetailPage() {
  return (
    <div class="container">
      <MainLayout>
        <article class="main-article" style={{ marginLeft: '150px', marginRight: '150px' }}>
          <EventDetail />
        </article>
      </MainLayout>
    </div>
  );
}

export default DetailPage;
