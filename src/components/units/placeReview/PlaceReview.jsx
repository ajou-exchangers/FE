import React from 'react';
import * as S from './PlaceReview.styles';
import { Rate } from 'antd';
import { getDate } from '@lib/utils';

export default function PlaceReview(props) {
  return (
    <S.Wrapper>
      <S.ReviewHeader>
        <S.HeaderTotalReviewWrapper>
          <S.HeaderTotalReviewRateWrapper></S.HeaderTotalReviewRateWrapper>
          <S.HeaderTotalReviewScore>
            {props.place.location.reviewAverage}
          </S.HeaderTotalReviewScore>
          <Rate
            disabled
            allowHalf
            style={{ fontSize: '1rem' }}
            defaultValue={0}
            value={Math.round(props.place.location.reviewAverage)}
          />
          <S.HeaderTotalReviewCount>
            리뷰 {props.place.location.reviewCount}개
          </S.HeaderTotalReviewCount>
        </S.HeaderTotalReviewWrapper>
      </S.ReviewHeader>
      <S.HeaderReviewButton>리뷰 추가</S.HeaderReviewButton>
      <S.ReviewList>
        {props.place.reviews.length > 0 &&
          props.place.reviews.map((review, reviewIndex) => {
            return (
              <S.ReviewItem key={reviewIndex}>
                <S.ReviewItemHeader>
                  <S.ReviewUserImage src={review.user.profile} />
                  <S.ReviewUserWrapper>
                    <S.ReviewUserNickname>
                      {review.user.nickname}
                    </S.ReviewUserNickname>
                    <S.ReviewUserDate>
                      {getDate(review.createdAt)}
                    </S.ReviewUserDate>
                  </S.ReviewUserWrapper>
                </S.ReviewItemHeader>
                <S.ReviewItemBody>
                  <S.ReviewItemRateWrapper>
                    <Rate
                      disabled
                      allowHalf
                      style={{ fontSize: '1rem' }}
                      defaultValue={0}
                      value={Math.round(review.rating)}
                    />
                  </S.ReviewItemRateWrapper>
                  <S.ReviewItemBodyComment>
                    {review.review}
                  </S.ReviewItemBodyComment>
                  <S.ReviewCardImageWrapper>
                    {review.images.map((image, imageIndex) => {
                      return (
                        <S.ReviewCardImage
                          key={imageIndex}
                          src={image}
                          alt="리뷰 이미지"
                        />
                      );
                    })}
                  </S.ReviewCardImageWrapper>
                </S.ReviewItemBody>
                <S.ReviewItemFooter>
                  <S.ReviewKeywordWrapper>
                    {review.keywords.map((keyword, keywordIndex) => {
                      return (
                        <S.ReviewKeywordBox key={keywordIndex}>
                          <S.ReviewKeyword>{keyword.keyword}</S.ReviewKeyword>
                        </S.ReviewKeywordBox>
                      );
                    })}
                  </S.ReviewKeywordWrapper>
                </S.ReviewItemFooter>
              </S.ReviewItem>
            );
          })}
      </S.ReviewList>
    </S.Wrapper>
  );
}
