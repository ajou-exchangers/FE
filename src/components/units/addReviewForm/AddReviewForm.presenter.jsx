import * as S from './AddReviewForm.styles';
import { Controller } from 'react-hook-form';
import { Space, Rate } from 'antd';

const desc = [
  'Terrible... 😭',
  'Want Better 🤔',
  'So so 😐',
  'Pretty Good ! 😃',
  'Wonderful !! 😍',
];

export default function AddReviewFormUI(props) {
  return (
    <S.Wrapper>
      <Space
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <Rate
          style={{ fontSize: '4rem', padding: '1rem' }}
          tooltips={desc}
          onChange={(value) => props.setRating(value)}
          value={props.rating}
        />
        {props.rating ? (
          <S.RatingDescription>{desc[props.rating - 1]}</S.RatingDescription>
        ) : (
          ''
        )}
      </Space>
      <S.KeywordDescription>
        What did you like about this place?
      </S.KeywordDescription>
      <S.KeywordDescription>
        (You can select multiple keywords)
      </S.KeywordDescription>
      <S.KeywordsWrapper>
        {props.keywords.map((keyword) => {
          return (
            <S.KeywordButton
              key={keyword._id}
              onClick={() => props.handleKeywordClick(keyword._id)}
              active={props.selectedKeywords.includes(keyword._id)}
            >
              {keyword.keyword}
            </S.KeywordButton>
          );
        })}
      </S.KeywordsWrapper>

      <S.FormWrapper onSubmit={props.handleSubmit(props.onSubmit)}>
        <S.ReviewInput
          name="review"
          value={props.review}
          onChange={props.handleReviewChange}
        />

        <div>
          <input type="file" onChange={props.handleImageChange} multiple />

          {props.previewImages.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Selected ${index + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: '300px',
                marginRight: '10px',
              }}
            />
          ))}
        </div>

        <S.SubmitButton onClick={props.onSubmit}>Submit</S.SubmitButton>
      </S.FormWrapper>
    </S.Wrapper>
  );
}
