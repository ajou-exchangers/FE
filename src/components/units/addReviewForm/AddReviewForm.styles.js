import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
`;

export const RatingDescription = styled.span`
  font-size: 2rem;
  font-weight: 500;
  margin-right: 1rem;
`;

export const KeywordDescription = styled.span`
  font-size: 1rem;
  font-weight: 400;
`;

export const KeywordsWrapper = styled.div`
  width: 100%;
  display: inline;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

export const KeywordButton = styled.button`
  display: inline-block;
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.active ? '#2b2144' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  border: ${(props) =>
    props.active ? '1px solid #2b2144' : '1px solid #f5f5f5'};
  border-radius: 1rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  font-size: 1rem;

  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

export const FormWrapper = styled.div``;

export const ReviewInput = styled.textarea`
  width: 30rem;
  padding: 1rem;
  margin-top: 2rem;
  height: 10rem;
  border: 1px solid #cbcbcb;
  border-radius: 10px;
  padding: 0.5rem;
  outline: none;
  font-size: 1rem;
  resize: none;
  margin-bottom: 1rem;

  &:focus {
    border: 1.5px solid #2b2144;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileLabel = styled.label`
  width: 10rem;
  height: 2rem;
  border: 1px solid #cbcbcb;
  border-radius: 5px;
  padding: 0 0.5rem;
  outline: none;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #f5f5f5;
  }
`;

// export const PreviewWrapper = styled.div`
//   width: 10rem;
//   height: 10rem;
//   border: 1px solid #cbcbcb;
//   border-radius: 5px;
//   padding: 0.5rem;
//   outline: none;
//   font-size: 1rem;
//   resize: none;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// export const PreviewDeleteButton = styled.button`
//   position: absolute;
//   top: 0;
//   right: 0;
//   width: 2rem;
//   height: 2rem;
//   border: none;
//   border-radius: 50%;
//   background-color: #2b2144;
//   color: #fff;
//   cursor: pointer;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 1rem;
// `;

export const Preview = styled.img`
  width: 20rem;
  height: auto;
  margin-top: 1rem;
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 3%;
  padding: 1rem;
  margin-top: 2rem;
  border: none;
  border-radius: 25px;
  background-color: #2b2144;
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #3d2c5a;
  }

  &:active {
    background-color: #2b2144;
  }
`;
