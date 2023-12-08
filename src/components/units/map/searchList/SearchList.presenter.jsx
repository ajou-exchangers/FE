import * as S from './SearchList.styles';

export default function SearchListUI(props) {
  return (
    <S.SideWrapper>
      <S.SearchListWrapper>
        <S.SearchWrapper hasInputValue={props.hasInputValue}>
          <S.SearchInput
            placeholder="Search"
            value={props.inputValue}
            onChange={props.changeInputValue}
            onKeyUp={props.handleDropdownKey}
          ></S.SearchInput>
          <S.SearchButton onClick={props.clickSearchButton}></S.SearchButton>
        </S.SearchWrapper>
        {props.hasInputValue && (
          <S.DropdownBox>
            {props.dropdownList.length === 0 && (
              <S.DropdownItem>검색 결과가 없습니다.</S.DropdownItem>
            )}
            {props.dropdownList.map((dropdownItem, dropdownIndex) => {
              return (
                <S.DropdownItem
                  key={dropdownIndex}
                  onClick={() => props.clickDropdownItem(dropdownItem)}
                  onMouseOver={() => props.setDropdownListIndex(dropdownIndex)}
                  className={
                    props.dropdownListIndex === dropdownIndex
                      ? 'dropdownItemActive'
                      : ''
                  }
                >
                  {dropdownItem.enName} (ko: {dropdownItem.koName})
                </S.DropdownItem>
              );
            })}
          </S.DropdownBox>
        )}
        {props.searchedPlaceList && (
          <S.SearchList>
            {props.searchedPlaceList.map((searchedPlace, searchedIndex) => {
              return (
                <S.SearchItem
                  key={searchedIndex}
                  onClick={() => props.clickSearchedPlace(searchedPlace)}
                >
                  <S.SearchItemImg
                    src={searchedPlace.image}
                    alt={searchedPlace.enName}
                  />
                  <S.SearchItemTitle>{searchedPlace.enName}</S.SearchItemTitle>
                  <S.SearchItemAddress>
                    {searchedPlace.enAddress}
                  </S.SearchItemAddress>
                  <S.SearchItemComment>
                    {searchedPlace.description}
                  </S.SearchItemComment>
                </S.SearchItem>
              );
            })}
          </S.SearchList>
        )}
      </S.SearchListWrapper>
      <S.SearchDetailWrapper>
        {props.selectedPlace && (
          <S.SearchDetailContainer>
            <S.SearchDetailHeader>
              <S.SearchDetailTitle>
                {props.selectedPlace.enName}
              </S.SearchDetailTitle>
              <S.SearchDetailCloseButton
                onClick={() => props.setSelectedPlace(null)}
              >
                닫기
              </S.SearchDetailCloseButton>
            </S.SearchDetailHeader>
            <S.SearchDetailBody>
              <S.SearchDetailImg
                src={props.selectedPlace.image}
                alt={props.selectedPlace.enName}
              />
              <S.SearchDetailContent>
                {props.selectedPlace.description}
              </S.SearchDetailContent>
            </S.SearchDetailBody>
          </S.SearchDetailContainer>
        )}
      </S.SearchDetailWrapper>
    </S.SideWrapper>
  );
}
