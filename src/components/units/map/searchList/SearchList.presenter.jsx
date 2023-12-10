import * as S from './SearchList.styles';
import { Rate } from 'antd';
import React, { useRef } from 'react';
import PlaceReview from '../../placeReview/PlaceReview';

export default function SearchListUI(props) {
  const addressRef = useRef(null);
  const handleCopyAddress = () => {
    addressRef.current.select();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  };

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
        {props.searchedPlaceList.length > 0 && (
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
                  <S.SearchItemContent>
                    <S.SearchItemTitle>
                      {searchedPlace.koName}
                    </S.SearchItemTitle>
                    <S.SearchItemTitle>
                      {searchedPlace.enName}
                    </S.SearchItemTitle>
                    <S.SearchItemAddress>
                      {searchedPlace.enAddress}
                    </S.SearchItemAddress>
                    <S.SearchItemComment>
                      {`"${searchedPlace.description}"`}
                    </S.SearchItemComment>
                    <S.SearchItemReview>
                      <Rate
                        disabled
                        style={{ fontSize: '1rem' }}
                        defaultValue={searchedPlace.reviewAverage}
                      />
                      <S.SearchItemReviewText>
                        {searchedPlace.reviewAverage}
                      </S.SearchItemReviewText>
                      <S.SearchItemReviewText>
                        {`(${searchedPlace.reviewCount} Reviews)`}
                      </S.SearchItemReviewText>
                    </S.SearchItemReview>
                  </S.SearchItemContent>
                </S.SearchItem>
              );
            })}
          </S.SearchList>
        )}
      </S.SearchListWrapper>
      {props.selectedPlace && (
        <S.SearchDetailWrapper>
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
            </S.SearchDetailHeader>
            <S.SearchDetailBody>
              {props.selectedButton === 'Info' ? (
                <S.SearchDetailInfo>
                  <S.SearchDetailInfoDescriptionContainer>
                    <S.SearchDetailInfoDescription>
                      {`"${props.selectedPlace.description}"`}
                    </S.SearchDetailInfoDescription>
                  </S.SearchDetailInfoDescriptionContainer>

                  <S.SearchDetailInfoAddressContainer>
                    <S.LocationIcon
                      src="location-dot-solid.svg"
                      alt="Location icon"
                    />
                    <S.SearchDetailInfoAddressWrapper>
                      <S.SearchDetailInfoAddress>
                        <textarea
                          ref={addressRef}
                          value={props.selectedPlace.koAddress}
                          readOnly
                          style={{ position: 'absolute', left: '-9999px' }}
                        />
                        {props.selectedPlace.koAddress}
                      </S.SearchDetailInfoAddress>
                      <S.SearchDetailInfoAddress>
                        {props.selectedPlace.enAddress}
                      </S.SearchDetailInfoAddress>
                    </S.SearchDetailInfoAddressWrapper>
                    <S.Icon
                      src="/copy-solid.svg"
                      alt="Copy Address"
                      width="15"
                      height="15"
                      style={{ cursor: 'pointer' }}
                      onClick={handleCopyAddress}
                    />
                  </S.SearchDetailInfoAddressContainer>
                  <S.AdditionalInfoWrapper>
                    {props.selectedPlace.wifiAvailable && (
                      <S.AdditionalInfo>
                        <S.Icon
                          src="/wifi-solid.svg"
                          alt="Wifi available"
                          width="15"
                          height="15"
                        />
                        <S.AdditionalInfoDescription>
                          Wifi Available
                        </S.AdditionalInfoDescription>
                      </S.AdditionalInfo>
                    )}

                    {props.selectedPlace.parkingAvailable && (
                      <S.AdditionalInfo>
                        <S.Icon
                          src="/square-parking-solid.svg"
                          alt="Parking available"
                          width="15"
                          height="15"
                        />
                        <S.AdditionalInfoDescription>
                          Parking Available
                        </S.AdditionalInfoDescription>
                      </S.AdditionalInfo>
                    )}

                    {props.selectedPlace.englishSpeaking && (
                      <S.AdditionalInfo>
                        <S.Icon
                          src="/e-solid.svg"
                          alt="English speaking"
                          width="15"
                          height="15"
                        />
                        <S.AdditionalInfoDescription>
                          English Speaking
                        </S.AdditionalInfoDescription>
                      </S.AdditionalInfo>
                    )}

                    {props.selectedPlace.kioskAvailable && (
                      <S.AdditionalInfo>
                        <S.Icon
                          src="/k-solid.svg"
                          alt="Kiosk available"
                          width="15"
                          height="15"
                        />
                        <S.AdditionalInfoDescription>
                          Kiosk Available
                        </S.AdditionalInfoDescription>
                      </S.AdditionalInfo>
                    )}
                  </S.AdditionalInfoWrapper>
                </S.SearchDetailInfo>
              ) : (
                <PlaceReview place={props.placeDetail} />
              )}
            </S.SearchDetailBody>
          </S.SearchDetailContainer>
        </S.SearchDetailWrapper>
      )}
    </S.SideWrapper>
  );
}
