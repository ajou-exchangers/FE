import { atom, selector } from 'recoil';

export const userLatLong = atom({
  key: 'userLatLong',
  default: { latitude: 37.27919, longitude: 127.04373 },
});

export const isAddPlaceModalOpen = atom({
  key: 'isAddPlaceModalOpen',
  default: false,
});

// login
export const loginState = atom({
  key: 'loginState',
  default: false,
});

export const isLoginModalOpen = atom({
  key: 'isLoginModalOpen',
  default: false,
});

export const userInfo = atom({
  key: 'userInfo',
  default: {
    email: '',
    createdAt: '',
    nickname: '',
    updatedAt: '',
    profileImage: '',
  },
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
