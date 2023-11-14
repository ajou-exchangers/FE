import * as S from './AddPlaceByCurrent.styles';

export default function AddPlaceByCurrentUI(props) {
  return (
    <div className="map_wrap">
      <div
        id="mapModal"
        style={{
          width: '600px',
          height: '450px',
          position: 'relative',
          overflow: 'hidden',
        }}
      ></div>
      <S.CategoryButtonWrapper>
        <S.CategoryButton
          id="FD6"
          onClick={props.onClickCategory}
          isSelected={props.currCategory === 'FD6'}
        >
          Restaurant
        </S.CategoryButton>
        <S.CategoryButton
          id="CE7"
          onClick={props.onClickCategory}
          isSelected={props.currCategory === 'CE7'}
        >
          Cafe
        </S.CategoryButton>
        <S.CategoryButton
          id="BK9"
          onClick={props.onClickCategory}
          isSelected={props.currCategory === 'BK9'}
        >
          Bank
        </S.CategoryButton>
        <S.CategoryButton
          id="PM9"
          onClick={props.onClickCategory}
          isSelected={props.currCategory === 'PM9'}
        >
          Pharmacy
        </S.CategoryButton>
        <S.CategoryButton
          id="CS2"
          onClick={props.onClickCategory}
          isSelected={props.currCategory === 'CS2'}
        >
          Convenience store
        </S.CategoryButton>
      </S.CategoryButtonWrapper>
    </div>
  );
}
