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
      <S.AddPlaceButton
        onClick={() => {
          if (!props.loginInfo) {
            alert('Please login to add a place');
            return;
          }
          props.openModal(props.modalData);
        }}
      >
        +
      </S.AddPlaceButton>
      <S.CurrentLocationButton onClick={props.moveToCurrentLocation}>
        <S.CurrentLocationImg
          src="/images/location.png"
          alt="current location"
        />
      </S.CurrentLocationButton>

      <Modal />
    </S.MapContainer>
  );
}
