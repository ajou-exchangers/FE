import styled from '@emotion/styled';

export const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

// 카카오맵 컨테이너
export const Map = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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
  z-index: 10;
`;

export const SearchInput = styled.input`
  position: absolute;
  border: none;
  top: 10px;
  left: 20px;
  z-index: 11;
  padding: 5px;
  width: 350px;
  height: 35px;
  border-radius:20px;
  box-shadow: 1px 1px 1px 1px gray;
`;

export const SearchButton = styled.button`
  background: url( "magnifying-glass-solid.svg" ) no-repeat;
  width: 25px;
  height: 25px;
  border: none;
  position: absolute;
  top: 21px;
  left: 337px;
  z-index: 11;
  padding: 5px;
  cursor:pointer
`;
