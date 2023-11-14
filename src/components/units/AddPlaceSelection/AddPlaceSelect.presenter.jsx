import * as S from './AddPlaceSelect.styles';
import Modal from '../../commons/modal/Modal';

export default function AddPlaceSelectUI(props) {
  return (
    <S.ButtonWrapper>
      <S.SelectButton onClick={() => props.onClickButton(1)}>
        Use current location
      </S.SelectButton>
      <S.SelectButton onClick={() => props.onClickButton(2)}>
        Use pin on the map
      </S.SelectButton>
      <S.SelectButton onClick={() => props.onClickButton(3)}>
        Place near campus
      </S.SelectButton>
    </S.ButtonWrapper>
  );
}
