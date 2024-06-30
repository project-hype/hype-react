import instance from '..';

/**
 * 관리자 페이지 API
 * @author 조영욱
 * @since 2024.06.30
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.30  	조영욱        최초 생성
 * </pre>
 */
const AdminAPI = {
  getEventListPaging: (pageNum) => {
    return instance.get(`/admin/event/list?page=${pageNum}&amount=10`);
  },

  getEventDetail: (eventId) => {
    return instance.get(`/admin/event/detail/${eventId}`);
  },

  getEventList: () => {
    return instance.get('/admin/event/type/list');
  },

  getBranchList: () => {
    return instance.get('/admin/event/branch/list');
  },

  getCategoryList: () => {
    return instance.get('/admin/event/category/list');
  },

  getHashtagList: () => {
    return instance.get('/admin/event/hashtag/list');
  },

  getEventTypeList: () => {
    return instance.get('/admin/event/type/list');
  },

  getEventHashtagList: (eventId) => {
    return instance.get(`/admin/event/event-hashtag/list/${eventId}`);
  },

  createEvent: (formData) => {
    return instance.post('/admin/event', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  modifyEvent: (formData) => {
    return instance.put('/admin/event', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteEvent: (eventId) => {
    return instance.delete(`/admin/event/${eventId}`);
  },

  deleteEventHashtag: (eventId, hashtagId) => {
    return instance.delete(`/admin/event/event-hashtag/${eventId}/${hashtagId}`);
  },

  createEventHashtag: (data) => {
    return instance.post(`/admin/event/event-hashtag`, data);
  },

  modifyHashtag: (data) => {
    return instance.put('/admin/event/hashtag', data);
  },

  createHashtag: (data) => {
    return instance.post('/admin/event/hashtag', data);
  },

  deleteHashtag: (hashtagId) => {
    return instance.delete(`/admin/event/hashtag/${hashtagId}`);
  },

  modifyCategory: (data) => {
    return instance.put('/admin/event/category', data);
  },

  createCategory: (data) => {
    return instance.post('/admin/event/category', data);
  },

  deleteCategory: (categoryId) => {
    return instance.delete(`/admin/event/category/${categoryId}`);
  },

  getBanner: () => {
    return instance.get('/event/list/banner');
  },

  createBanner: (data) => {
    return instance.post('/admin/event/banner', data);
  },

  deleteBanner: (eventId) => {
    return instance.delete(`/admin/event/banner/${eventId}`);
  },

  applyOrderChange: (data) => {
    return instance.put('/admin/event/banner/order', data);
  },

  getEventSummary: () => {
    return instance.get('/admin/event/list/summary');
  },
};

export default AdminAPI;
