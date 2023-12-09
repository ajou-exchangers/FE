import Modal from '../../commons/modal/Modal';
import * as S from './Map.styles';

export default function MapUI(props) {
  return (
    <S.MapContainer>
      <div
        id="map"
        style={{ width: '100%', height: '100%', zIndex: '0' }}
        ref={props.mapRef}
      ></div>
      <S.AddPlaceButton onClick={() => props.openModal(props.modalData)}>
        +
      </S.AddPlaceButton>

      <Modal />
    </S.MapContainer>
  );
}
