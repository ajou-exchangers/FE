import React from 'react';
import * as S from './PlaceReview.styles';
import { Rate } from 'antd';
import { getDate } from '@lib/utils';
import Modal from '../../commons/modal/Modal';
import useModal from '@hooks/useModal';
import AddReviewForm from '../addReviewForm/AddReviewForm.container';
import { useRecoilState } from 'recoil';
import { loginState } from '@recoil/recoil';

export default function PlaceReview(props) {
  const { openModal } = useModal();
  const [loginInfo, setLoginInfo] = useRecoilState(loginState);

  const modalData = {
    title: 'Add Review',
    content: (
      <AddReviewForm
        locationId={props.place.location._id}
        locationCategory={props.place.location.category}
      />
    ),
  };

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
            {props.place.location.reviewCount} Reviews
          </S.HeaderTotalReviewCount>
        </S.HeaderTotalReviewWrapper>
      </S.ReviewHeader>
      <S.HeaderReviewButton
        onClick={() => {
          if (!loginInfo) {
            alert('Please login to write a review');
            return;
          }
          openModal(modalData);
        }}
      >
        + Write Review
      </S.HeaderReviewButton>
      <Modal />
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

                  {review &&
                    review.images.map((image, imageIndex) => {
                      return (
                        <S.ReviewCardImageWrapper>
                          <S.ReviewCardImage
                            key={imageIndex}
                            src={image}
                            alt="리뷰 이미지"
                          />
                        </S.ReviewCardImageWrapper>
                      );
                    })}
                </S.ReviewItemBody>
                <S.ReviewKeywordWrapper>
                  {review.keywords.map((keyword, keywordIndex) => {
                    return (
                      <S.ReviewKeywordBox key={keywordIndex}>
                        <S.ReviewKeyword>{keyword.keyword}</S.ReviewKeyword>
                      </S.ReviewKeywordBox>
                    );
                  })}
                </S.ReviewKeywordWrapper>
              </S.ReviewItem>
            );
          })}
      </S.ReviewList>
    </S.Wrapper>
  );
}
