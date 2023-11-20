import styled from '@emotion/styled';

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #cbcbcb;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

export const InputLabel = styled.label`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  border: 1px solid #cbcbcb;
  border-radius: 20px;
  padding: 0 0.8rem;
  outline: none;
  font-size: 1rem;

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

export const Preview = styled.img`
  width: 20rem;
  height: auto;
  margin-top: 1rem;
`;

export const OptionWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 1rem;
`;

export const OptionLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 3rem;
  border: 1px solid #cbcbcb;
  border-radius: 25px;
  padding: 0 0.5rem;
  outline: none;

  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`;

export const OptionInput = styled.input`
  display: none;

  &:checked + ${OptionLabel} {
    background-color: #2b2144;
    color: #fff;
  }
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
