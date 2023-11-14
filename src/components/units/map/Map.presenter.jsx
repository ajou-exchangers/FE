import Modal from '../../commons/modal/Modal';
import * as S from './Map.styles';

export default function MapUI(props) {
  return (
    <S.MapContainer>
      <S.AddPlaceButton onClick={() => props.openModal(props.modalData)}>
        +
      </S.AddPlaceButton>
      <Modal />
      <div id="map" style={{ width: '100%', height: '1800px' }}></div>
    </S.MapContainer>
  );
}
