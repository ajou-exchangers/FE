import Modal from '../../commons/modal/Modal';
import * as S from './Map.styles';

export default function MapUI(props) {
  const { inputRef, searchPlaces } = props;

  return (
    <S.MapContainer>
      <S.AddPlaceButton onClick={() => props.openModal(props.modalData)}>
        +
      </S.AddPlaceButton>
      <Modal />

      <S.SearchInput
        ref={props.inputRef}
        type="text"
        placeholder="Search..."
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            props.searchPlaces();
          }
        }}
      />

      <S.SearchButton onClick={props.searchPlaces}>
      </S.SearchButton>

      <div id="map" style={{ width: '100%', height: '690px' }} ref={props.mapRef}></div>
    </S.MapContainer>
  );
}
