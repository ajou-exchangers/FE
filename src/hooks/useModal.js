import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '@recoil/recoil';

// 모달 열기, 닫기 로직 분리
export default function useModal() {
  // modalState 아톰 상태값과 set 함수를 가져와서 사용
  const [modalDataState, setModalDataState] = useRecoilState(modalState);

  const closeModal = useCallback(
    () =>
      setModalDataState((prev) => {
        return {
          ...prev,
          isModalOpen: false,
        };
      }),
    [setModalDataState],
  );

  const openModal = useCallback(
    ({ title, content, callback }) =>
      setModalDataState({
        isModalOpen: true,
        title,
        content,
        callback,
      }),
    [setModalDataState],
  );

  return { modalDataState, closeModal, openModal };
}
