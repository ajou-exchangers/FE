import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Global, css } from '@emotion/react';
import axios from 'axios';

const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('https://exchangers.site/api/exchangers/v1/user/me');
        setIsLoggedIn(response.status === 200);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <>
      <Global styles={globalStyles} />
      <div style={styles.pageContainer}>
        <div style={styles.container}>
          <h1 style={styles.heading}>Welcome to Exchangers!</h1>
          {!isLoggedIn && (
            <Link to="/map" style={styles.link}>Try without Login</Link>
          )}
        </div>

        {!isLoggedIn && (
          <div style={styles.sidebar}>
            {/* Rightbar 내용 */}
            <img src="./globe-americas-solid.svg" style={styles.icon} />

            <div style={styles.linkContainer}>
              <Link to="/login" style={styles.link}>Login</Link>
            </div>

            <div style={styles.linkContainer}>
              <Link to="/signup" style={styles.link}>Signup</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const globalStyles = css`
  body {
    font-family: sans-serif;
    margin: 0;
    padding: 0;
  }
`;

const styles = {
  pageContainer: {
    display: 'flex',
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundImage: 'url("./landing.svg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '85vh',
  },
  heading: {
    fontSize: '54px',
    marginBottom: '20px',
    color: 'white',
  },
  linkContainer: {
    margin: '5px 0',
  },
  link: {
    color: 'black',
    textDecoration: 'none',
    fontSize: '18px',
    margin: '15px',
  },
  sidebar: {
    flex: 0.1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '60px',
    height: '60px',
    marginBottom: '17px',
  },
};

export default MainPage;