import * as S from './SearchList.styles';
import { Rate } from 'antd';
import PlaceReview from '../../placeReview/PlaceReview';

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

                  <Rate disabled defaultValue={searchedPlace.reviewAverage} />
                  <p>{searchedPlace.reviewCount}</p>
                </S.SearchItem>
              );
            })}
          </S.SearchList>
        )}
      </S.SearchListWrapper>
      <S.SearchDetailWrapper>
        {props.selectedPlace && (
          <S.SearchDetailContainer>
            <S.SearchDetailImg
              src={props.selectedPlace.image}
              alt={props.selectedPlace.enName}
            />
            <S.SearchDetailCloseButton
              onClick={() => props.setSelectedPlace(null)}
            >
              +
            </S.SearchDetailCloseButton>
            <S.SearchDetailHeader>
              <S.SearchDetailKoreanName>
                {props.selectedPlace.koName}
              </S.SearchDetailKoreanName>
              <S.SearchDetailEnglishName>
                {props.selectedPlace.enName}
              </S.SearchDetailEnglishName>
              <S.SearchDetailCategory>
                {props.selectedPlace.category}
              </S.SearchDetailCategory>
            </S.SearchDetailHeader>
            <S.SearchDetailNav>
              <S.SearchDetailNavButton
                onClick={() => props.setSelectedButton('Info')}
                active={props.selectedButton === 'Info'}
              >
                Info
              </S.SearchDetailNavButton>
              <S.SearchDetailNavButton
                onClick={() => props.setSelectedButton('Review')}
                active={props.selectedButton === 'Review'}
              >
                Review
              </S.SearchDetailNavButton>
            </S.SearchDetailNav>
            <S.SearchDetailBody>
              {props.selectedButton === 'Info' ? (
                <S.SearchDetailInfo>
                  <S.SearchDetailInfoAddress>
                    {props.selectedPlace.enAddress}
                  </S.SearchDetailInfoAddress>
                  <S.SearchDetailInfoDescription>
                    {props.selectedPlace.description}
                  </S.SearchDetailInfoDescription>
                </S.SearchDetailInfo>
              ) : (
                <PlaceReview place={props.placeDetail} />
                // <S.SearchDetailReview>
                //   <S.SearchDetailReviewButton>+</S.SearchDetailReviewButton>
                //   <S.SearchDetailReviewList>
                //     {props.placeDetail.reviews.length > 0 &&
                //       props.placeDetail.reviews.map((review, reviewIndex) => {
                //         return (
                //           <S.SearchDetailReviewItem key={reviewIndex}>
                //             <S.SearchDetailReviewItemHeader>
                //               <S.SearchDetailReviewItemProfileImg
                //                 src={review.user.profile}
                //                 alt={review.user.name}
                //               />
                //               <S.SearchDetailReviewItemNickname>
                //                 {review.user.nickname}
                //               </S.SearchDetailReviewItemNickname>
                //               <S.SearchDetailReviewItemCreatedAt>
                //                 {review.createdAt}
                //               </S.SearchDetailReviewItemCreatedAt>
                //             </S.SearchDetailReviewItemHeader>
                //             <S.SearchDetailReviewItemBody>
                //               <S.SearchDetailReviewItemBodyText>
                //                 {review.review}
                //               </S.SearchDetailReviewItemBodyText>
                //             </S.SearchDetailReviewItemBody>
                //           </S.SearchDetailReviewItem>
                //         );
                //       })}
                //   </S.SearchDetailReviewList>
                // </S.SearchDetailReview>
              )}
            </S.SearchDetailBody>
          </S.SearchDetailContainer>
        )}
      </S.SearchDetailWrapper>
    </S.SideWrapper>
  );
}
