import instance from '..';

/**
 * 회원 도메인 API
 * @author 임원정
 * @since 2024.06.30
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.30   임원정        최초 생성
 * </pre>
 */

const MemberAPI = {
  checkID: (loginId) => {
    return instance.get(`/member/checkLoginId/${loginId}`);
  },

  join: (form) => {
    return instance.post(`/member/join`, form);
  },

  login: (loginId, password) => {
    return instance.post(`/member/login`, { loginId, password });
  },

  logout: () => {
    return instance.post(`/member/logout`);
  },

  update: (form) => {
    return instance.put(`/member/update`, form);
  },

  delete: () => {
    return instance.delete(`/member/delete/`);
  },

  favorites: () => {
    return instance.get(`/member/favorites`);
  },
};

export default MemberAPI;
