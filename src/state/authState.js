// authState.js (Recoil 상태 관리 모듈)
import { atom, useRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

/**
 * Recoil 상태 관리 모듈
 * @author 임원정
 * @since 2024.06.20
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.20  	임원정        최초 생성
 * 2024.06.21  	임원정        새로고침 오류 수정
 * </pre>
 */

export const userState = atom({
  key: 'userState',
  default: {
    isLoggedIn: false,
    userInfo: null,
    isAdmin: false,
  },
  effects_UNSTABLE: [persistAtom],
});
