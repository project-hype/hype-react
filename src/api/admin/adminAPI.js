import instance from '..';

const AdminAPI = {
  getEventList: (pageNum) => {
    return instance.get(`/admin/event/list?page=${pageNum}&amount=10`);
  },
};

export default AdminAPI;
