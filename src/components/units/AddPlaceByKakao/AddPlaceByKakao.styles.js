import styled from '@emotion/styled';

export const CategoryButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 1rem;
`;

export const CategoryButton = styled.button`
  width: auto;
  height: 2rem;
  border: ${(props) => (props.isSelected ? 'none' : '1px solid #e5e5e5')};
  border-radius: 1rem;
  background-color: ${(props) => (props.isSelected ? '#2b2144' : '#fff')};
  font-size: 1rem;
  font-weight: 700;
  padding: 0 0.75rem;
  color: ${(props) => (props.isSelected ? '#fff' : '#2b2144')};
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: ${(props) => (props.isSelected ? '#2b2144' : '#f5f5f5')};
  }

  &:active {
    background-color: ${(props) => (props.isSelected ? '#2b2144' : '#e5e5e5')};
  }

  &:focus {
    box-shadow: 0 0 0 2px #222;
  }

  &:not(:last-child) {
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 576px) {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 320px) {
    width: 100%;
    margin-bottom: 0.5rem;
  }
`;
