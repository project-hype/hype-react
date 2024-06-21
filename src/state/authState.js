// authState.js (Recoil 상태 관리 모듈)
import { atom, useRecoilState } from 'recoil';
import axios from 'axios';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const userState = atom({
  key: 'userState',
  default: {
    isLoggedIn: false,
    userInfo: null,
    isAdmin: false,
  },
  effects_UNSTABLE: [persistAtom],
});
