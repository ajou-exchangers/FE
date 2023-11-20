import * as S from './AddPlaceSelect.styles';

export default function AddPlaceSelectUI(props) {
  return (
    <S.ButtonWrapper>
      <S.SelectButton onClick={() => props.onClickButton(1)}>
        Add Place By Kakao API
      </S.SelectButton>
      <S.SelectButton onClick={() => props.onClickButton(2)}>
        Add Place By Yourself
      </S.SelectButton>
      <S.SmallDescription>
        If you can't search your place on KakaoMap
      </S.SmallDescription>
    </S.ButtonWrapper>
  );
}
