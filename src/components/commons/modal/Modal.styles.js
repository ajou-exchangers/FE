import styled from '@emotion/styled';

export const ModalDimmer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  align-items: center;
  z-index: 100;
`;
export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  max-height: 600px;
  min-width: 300px;
  min-height: 100px;
  background-color: #ffffff;
  border: 1px solid #cbcbcb;
  box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  z-index: 101;
`;
export const ModalTitle = styled.div`
  padding: 1rem;
  font-weight: bold;
  font-size: large;
  border-bottom: 1px solid #cbcbcb;
`;

export const ModalContents = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #cbcbcb;
`;
export const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
`;
export const ModalButton = styled.button`
  background: none;
  border: none;
  width: 100%;
  height: 52px;
  font-weight: bold;
  :hover {
    opacity: 50%;
    transition: 0.5s;
    cursor: pointer;
  }
`;

export const ModalButtonWithBorder = styled(ModalButton)`
  border-right: 1px solid #cbcbcb;
`;
