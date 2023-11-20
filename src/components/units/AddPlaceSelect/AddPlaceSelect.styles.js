import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

// 버튼에 부드러운 애니메이션 효과를 추가합니다.
const hoverAnimation = keyframes`
  0% {background-color: #6d5c98; color: #fff; border: none;}
  100% {background-color: #fff; color: #6d5c98; border: 2px solid #6d5c98;}
`;

export const ButtonWrapper = styled.div`
  width: 22rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  border-radius: 15px;
  padding: 15px;
`;

export const SelectButton = styled.button`
  width: 20rem;
  height: 6rem;
  border-radius: 12px;
  background-color: ${({ selected }) => (selected ? '#fff' : '#6d5c98')};
  color: ${({ selected }) => (selected ? '#6d5c98' : '#fff')};
  border: ${({ selected }) => (selected ? '2px solid #6d5c98' : 'none')};
  font-size: 1.3rem;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  margin-bottom: 25px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.37);

  :hover {
    animation: ${hoverAnimation} 0.3s forwards;
  }
`;

export const SmallDescription = styled.span`
  font-size: 0.9rem;
  color: gray;
  margin-bottom: 25px;
`;
