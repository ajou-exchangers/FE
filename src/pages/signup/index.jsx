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
  const [formData, setFormData] = useState({ profileImage: null, profileImagePreview: null, });

  const handleInputChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFormData({
        ...formData,
        profileImage: file,
        profileImagePreview: URL.createObjectURL(file),
      });
    }
  };

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    const isValid = newPassword.length >= 6 && /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    setPasswordValid(isValid);
  };

  const validateConfirmPassword = (value) => {
    const passwordValue = watch('password');

    return value === passwordValue || 'Passwords do not match!';
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
        alert('Invalid input. Please check the form fields.');
        return;
      }

      if (errors.confirmPassword) {
        alert('Passwords do not match. Please re-enter the passwords.');
        return;
      }

      if (nicknameAvailability !== true) {
        alert('Nickname is not available. Please choose a different nickname.');
        return;
      }
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('confirmPassword', data.confirmPassword);
      formData.append('nickname', data.nickname);
      formData.append('profileImage', data.profileImage);

      const signupResponse = await axios.post('https://exchangers.site/api/exchangers/v1/auth/signup', formData);
      alert('Signup successful! To log in, please check the authentication mail in your mailbox!');
      navigate('/');
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };
  const [nicknameAvailability, setNicknameAvailability] = useState(null);

  const handleNicknameAvailabilityCheck = async () => {
    const nickname = watch('nickname');
    setNicknameAvailability(null);

    try {
      console.log(nickname);
      const response = await axios.get(`https://exchangers.site/api/exchangers/v1/auth/check-nickname/${nickname}`);
      console.log(nickname);

      if (response.status === 200) {
        setNicknameAvailability(true);
        setError('nickname', {});
      } else {
        setNicknameAvailability(false);
        setError('nickname', { type: 'manual', message: 'Nickname is not available.' });
      }
    } catch (error) {
      console.error('Error response:', error.response.status, error.response.data);

      setNicknameAvailability(false);
    }
  };

  return (
    <FormContainer>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label className="input-file-button" htmlFor="input-file">
            <img src="envelope-regular.svg"
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
            <img src="lock-solid.svg"
              width="20"
              height="20"
              alt="locked Icon"
              className="input-icon"
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input type="password"
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
            <img src="lock-solid.svg" width="20" height="20" alt="locked Icon" className="input-icon" />
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
              rules={{ validate: validateConfirmPassword }}
            />
          </Label>
          {errors.confirmPassword && (
            <ResultMessage success={false}>
              {errors.confirmPassword.message}
            </ResultMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Label>
            <img src="user-regular.svg"
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
              {nicknameAvailability
                ? 'Nice Nickname :)'
                : `Already existing nickname :(`}
            </ResultMessage>
          )}
        </FormGroup>

        <FormGroup>
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
            <img src={formData.profileImagePreview}
              alt="Profile Preview"
              width="250"
              height="250"
            />
          </FormGroup>
        )}

        <Button type="submit">Create an Account</Button>
      </form>
      <p style={{ fontSize: '0.8em', color: 'gray' }}> Already have an account? <LinkStyled to="/login">Login</LinkStyled> </p>
    </FormContainer>
  );
};

export default SignupPage;