import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

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

const SignupPage = () => {
  const { handleSubmit, control } = useForm();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImage: null,
    profileImagePreview: null,
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const file = e.target.files[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: file,
        profileImagePreview: URL.createObjectURL(file),
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  return (
    <FormContainer>
      <img
        src="globe-americas-solid.svg"
        width="70"
        height="70"
        alt="Logo"
        className="input-icon"
      />
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>
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
                  onChange={handleInputChange}
                />
              )}
            />
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
                  onChange={handleInputChange}
                />
              )}
            />
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
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  {...field}
                  placeholder="Re-enter Password"
                  onChange={handleInputChange}
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
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  {...field}
                  placeholder="Your Nickname"
                  onChange={handleInputChange}
                />
              )}
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label className="input-file-button" for="input-file">
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
          </FormGroup>
        )}
        <Button type="submit">Create an Account</Button>
      </form>
      <p style={{ fontSize: '0.8em', color: 'gray' }}>
        Already have an account? <LinkStyled to="/login">Login</LinkStyled>
      </p>
    </FormContainer>
  );
};

export default SignupPage;
