import instance from '..';

/**
 * 이벤트 도메인 API
 * @author 정은지
 * @since 2024.06.30
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.30   정은지        최초 생성
 * </pre>
 */
const EventAPI = {
  // 배너 조회
  banner: () => {
    return instance.get('/event/list/banner');
  },

  // 서브 배너 조회
  subBanner: (type) => {
    return instance.get(`/event/list/${type}`);
  },

  // 날짜별 이벤트 조회
  eventByDate: (selectedDay) => {
    return instance.get(`/event/list/${selectedDay.format('YYYY-MM-DD')}`);
  },

  // 이벤트 상세 조회
  eventDetail: (eventId) => {
    return instance.get(`/event/${eventId}`);
  },

  // 즐겨찾기 추가
  addFavorite: (eventId) => {
    return instance.post('/event/favorite', { eventId });
  },

  //즐겨찾기 제거
  deleteFavorite: (eventId) => {
    return instance.delete(`/event/favorite/${eventId}`);
  },

  // 별점 작성
  submitRating: (eventId, score, action) => {
    return instance.post('/event/score', { eventId, score, action });
  },
};

export default EventAPI;
