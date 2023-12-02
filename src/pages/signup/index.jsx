import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const LinkStyled = styled(Link)`
  color: gray;
  font-size: 0.8em;
`;

const CheckAvailabilityButton = styled(Button)`
  font-size: 0.6em;
  padding: 8px 16px;
`;

const ResultMessage = styled.p`
  font-size: 0.8em;
  color: ${({ success }) => (success ? 'green' : 'red')};
  margin-top: 4px;
`;


const SignupPage = () => {
  const { handleSubmit, control, watch, setError, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
    },
  });

  const [isPasswordValid, setPasswordValid] = useState(true);
  const navigate = useNavigate();

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    const isValid = newPassword.length >= 6 && /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    setPasswordValid(isValid);
  };

  const validateEmail = (email) => {
    const isValid = email.endsWith('@ajou.ac.kr');
    if (!isValid) {
      setError('email', { type: 'manual', message: 'Email must end with @ajou.ac.kr' });
    }
    return isValid;
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
      if (!isPasswordValid || !validateEmail(data.email)) {
        console.error('Invalid input. Please check the form fields.');
        return;
      }
      const response = await axios.get(`http://15.165.42.212:3000/api/exchangers/v1/auth/${data.nickname}`);
      const isNicknameAvailable = response.data.available;

      if (!isNicknameAvailable) {
        console.error('Nickname is not available. Please choose a different one.');
        return;
      }

      const signupResponse = await axios.post('http://15.165.42.212:3000/api/exchangers/v1/auth/signup', {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        nickname: data.nickname,
      });
      alert('Signup successful!');
      navigate('/');
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };


  const [nicknameAvailability, setNicknameAvailability] = useState(null);

  const handleNicknameAvailabilityCheck = async () => {
    const nickname = watch('nickname');

    try {
      const response = await axios.get(`http://example.com/check-nickname?nickname=${nickname}`);
      const isAvailable = response.data.available;
      setNicknameAvailability(isAvailable);
    } catch (error) {
      console.error('Error checking nickname availability:', error.message);
    }
  };


  return (
    <FormContainer>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label className="input-file-button" htmlFor="input-file">
            <img
              src="envelope-regular.svg"
              width="20"
              height="20"
              alt="Email Icon"
              className="input-icon"
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  type="email"
                  {...field}
                  placeholder="example@ajou.ac.kr"
                  onBlur={(e) => validateEmail(e.target.value)}
                />
              )}
            />
            {errors.email && (
              <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.email.message}</p>
            )}
          </Label>
        </FormGroup>
        <FormGroup>
          <Label>
            <img
              src="lock-solid.svg"
              width="20"
              height="20"
              alt="locked Icon"
              className="input-icon"
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  {...field}
                  placeholder="Password at least 6 characters"
                  onChange={(e) => {
                    field.onChange(e);
                    handlePasswordChange(e);
                  }}
                />
              )}
            />
          </Label>
          {!isPasswordValid && (
            <p style={{ color: 'red', fontSize: '0.8em' }}>
              Password must be at least 6 characters long and contain at least one special character.
            </p>
          )}
        </FormGroup>
        <FormGroup>
          <Label>
            <img
              src="lock-solid.svg"
              width="20"
              height="20"
              alt="locked Icon"
              className="input-icon"
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  {...field}
                  placeholder="Re-enter Password"
                />
              )}
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label>
            <img
              src="user-regular.svg"
              width="20"
              height="20"
              alt="user Icon"
              className="input-icon"
            />
            <Controller
              name="nickname"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  {...field}
                  placeholder="Your Nickname"
                />
              )}
            />
          </Label>
          <CheckAvailabilityButton type="button" onClick={handleNicknameAvailabilityCheck}>
            Check Nickname Availability
          </CheckAvailabilityButton>

          {nicknameAvailability !== null && (
            <ResultMessage success={nicknameAvailability}>
              {nicknameAvailability ? 'Nickname is available!' : 'Nickname is already taken!'}
            </ResultMessage>
          )}
        </FormGroup>
        <Button type="submit">Create an Account</Button>
      </form>
      <p style={{ fontSize: '0.8em', color: 'gray' }}>
        Already have an account? <LinkStyled to="/login">Login</LinkStyled>
      </p>
    </FormContainer>
  );
};

export default SignupPage;


{/* <FormGroup>
          <Label className="input-file-button" htmlFor="input-file">
            <img
              src="image-regular.svg"
              width="20"
              height="20"
              alt="user Icon"
              className="input-icon"
            />
            <Controller
              name="profileImage"
              control={control}
              render={({ field }) => (
                <Input
                  type="file"
                  {...field}
                  accept="image/*"
                  onChange={handleInputChange}
                />
              )}
            />
          </Label>
          <input type="file" id="input-file" style={{ display: 'none' }} />
        </FormGroup>
        {formData.profileImagePreview && (
          <FormGroup>
            <img
              src={formData.profileImagePreview}
              alt="Profile Preview"
              width="250"
              height="250"
            />
          </FormGroup> */}