import * as S from './Map.styles';

export default function MapUI() {
  return (
    <S.MapContainer>
      <S.AddPlaceButton>+</S.AddPlaceButton>
      <div id="map" style={{ width: '100%', height: '1000px' }}></div>
    </S.MapContainer>
  );
}
