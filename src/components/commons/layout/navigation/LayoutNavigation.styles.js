import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
  }
`;

export const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 3rem;
  background-color: #2b2144;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  box-shadow: inset 0 -0.1rem 0 0 #000;
`;

export const NavigationLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const NavigationTitle = styled.span`
  margin-left: 0.5rem;
  font-size: 1.2rem;
`;

export const NavigationList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const NavigationItem = styled.li`
  margin-right: 1rem;
  color: #fff;

  &:last-of-type {
    margin-right: 0;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const NavigationLink = styled(Link)`
  color: #fff;
  text-decoration: none;

  // 마우스 올렸을 때 색상 변경
  &:hover {
    color: #fff;
    text-decoration: none;
    font-weight: 600;
  }
`;
