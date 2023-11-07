import styled from '@emotion/styled';

export const MapContainer = styled.div`
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
