import instance from '..';

const EventAPI = {
  banner: () => {
    return instance.get('/event/list/banner');
  },

  subBanner: (type, memberId) => {
    return instance.get(`/event/list/${type}?memberId=${memberId}`);
  },

  // 날짜별 이벤트
  eventByDate: (selectedDay, memberId) => {
    return instance.get(`/event/list/${selectedDay.format('YYYY-MM-DD')}?memberId=${memberId}`);
  },

  // 이벤트 상세정보
  eventDetail: (eventId, memberId) => {
    return instance.get(`/event/${eventId}?memberId=${memberId}`);
  },

  // 즐겨찾기 추가
  addFavorite: (eventId, memberId) => {
    return instance.post('/event/favorite', { eventId, memberId });
  },

  // 즐겨찾기 제거
  deleteFavorite: (eventId, memberId) => {
    return instance.delete('/event/favorite', { eventId, memberId });
  },

  // 별점 작성
  submitRating: (memberId, eventId, score, action) => {
    return instance.post('/event/score', { memberId, eventId, score, action });
  },
};

export default EventAPI;
