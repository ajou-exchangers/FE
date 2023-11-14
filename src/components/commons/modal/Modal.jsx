import * as S from './Modal.styles';
import useModal from '@hooks/useModal';
import { useState } from 'react';

export default function Modal() {
  const [isMouseDownInside, setIsMouseDownInside] = useState(false); // 마우스가 모달 안에 있는지 여부
  const { modalDataState, closeModal } = useModal();

  // 이벤트 버블링을 막기 위한 함수
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleMouseDown = () => {
    setIsMouseDownInside(true);
  };

  const handleMouseUp = (e) => {
    if (!isMouseDownInside && e.target === e.currentTarget) {
      closeModal();
    }
    setIsMouseDownInside(false);
  };

  return (
    <>
      {modalDataState.isModalOpen && (
        <S.ModalDimmer onMouseUp={handleMouseUp}>
          <S.ModalBody onClick={stopPropagation} onMouseDown={handleMouseDown}>
            <S.ModalTitle>{modalDataState.title}</S.ModalTitle>
            <S.ModalContents>{modalDataState.content}</S.ModalContents>
          </S.ModalBody>
        </S.ModalDimmer>
      )}
    </>
  );
}
