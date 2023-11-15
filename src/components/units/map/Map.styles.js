import styled from '@emotion/styled';

export const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

export const AddPlaceButton = styled.button`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #2b2144;
  color: #fff;
  font-size: 2.5rem;
  font-weight: 400;
  box-shadow: 0 0.2rem 0.4rem 0 #00000080;
  cursor: pointer;
  border: none;
  outline: none;
  z-index: 111;
`;

export const SearchWrapper = styled.div`
  position: absolute;
  top: 5rem;
  left: 2rem;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 450px;
  height: 60px;
  border: 1px solid #e5e5e5;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: 1px 1px 10px 3px rgba(0, 0, 0, 0.1);
  padding: 0 1rem;

  @media (max-width: 768px) {
    width: 300px;
  }
`;

export const SearchInput = styled.input`
  width: 80%;
  height: 80%;
  border: none;
  outline: none;
  font-size: 1.2rem;
  font-weight: 400;
`;

export const SearchButton = styled.button`
  background: url('magnifying-glass-solid.svg') no-repeat;
  width: 25px;
  height: 25px;
  border: none;
  back &:hover {
    cursor: pointer;
  }
`;
