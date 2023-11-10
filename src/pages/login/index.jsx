import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from '@emotion/styled';

const FormContainer = styled.div`
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
`;

const Input = styled.input`
  border: none;
  border-bottom: 2px solid #000;
  padding: 5px;
  width: 25%;
  outline: none;

  &:focus {
    border-bottom: 2px solid #5932a8;
  }

  &::after {
    content: '';
    display: block;
    height: 1px;
    background: #000;
    width: 45px;
  }

  &::placeholder {
    text-align: left;
    font-family: 'Roboto', sans-serif;
  }
`;

const Button = styled.button`
  font-size: 1em;
  padding: 10px 20px;
  background-color: #391a28;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 0%;
  font-family: 'Roboto', sans-serif;

  &:hover {
    background-color: #665b7d;
  }
`;

const LinkStyled = styled.a`
  color: gray;
  font-size: 0.8em;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default function LoginPage() {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormContainer>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="input_id">
            Email
            <Controller
              name="input_id"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  {...field}
                  placeholder="example@ajou.ac.kr"
                />
              )}
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="input_pw">
            Password
            <Controller
              name="input_pw"
              control={control}
              render={({ field }) => (
                <Input type="password" {...field} placeholder="Password" />
              )}
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Button type="submit">Login</Button>
        </FormGroup>
      </form>
      <p style={{ fontSize: '0.8em', color: 'gray' }}>
        Don't have an account? <LinkStyled href="/signup">Sign up</LinkStyled>
      </p>
    </FormContainer>
  );
}
