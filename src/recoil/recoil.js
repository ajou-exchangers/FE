import { atom, selector } from 'recoil';

export const userLatLong = atom({
  key: 'userLatLong',
  default: { latitude: 37.27919, longitude: 127.04373 },
});

// login
export const loginState = atom({
  key: 'loginState',
  default: false,
});

export const userInfo = atom({
  key: 'userInfo',
  default: {
    email: '',
    nickname: '',
  },
});

export const updateUserInfo = selector({
  key: 'updateUserInfo',
  get: ({ get }) => get(userInfo),
  set: ({ set }, newUserInfo) => set(userInfo, newUserInfo),
});


// 전역 모달 상태
export const modalState = atom({
  key: 'modalState',
  default: {
    isModalOpen: false,
    title: '',
    content: '',
  },
});

export const placeListState = atom({
  key: 'placeListState',
  default: [],
});

export const searchedPlaceListState = atom({
  key: 'searchedPlaceListState',
  default: [],
});

export const selectedPlaceState = atom({
  key: 'selectedPlaceState',
  default: null,
});
