import * as S from './Modal.styles';
import useModal from '@hooks/useModal';

export default function Modal() {
  const { modalDataState, closeModal } = useModal();

  return (
    <>
      {modalDataState.isModalOpen && (
        <S.ModalDimmer>
          <S.ModalBody>
            <S.ModalTitle>{modalDataState.title}</S.ModalTitle>
            <S.ModalContents>{modalDataState.content}</S.ModalContents>
            <S.ModalFooter>
              <S.ModalButtonWithBorder onClick={closeModal}>
                Cancel
              </S.ModalButtonWithBorder>
              <S.ModalButton onClick={modalDataState.callBack}>
                Ok
              </S.ModalButton>
            </S.ModalFooter>
          </S.ModalBody>
        </S.ModalDimmer>
      )}
    </>
  );
}
