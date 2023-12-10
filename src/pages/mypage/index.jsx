import React, { useState, useEffect } from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfo, updateUserInfo, loginState } from '../../recoil/recoil';

const Container = styled.div`
  display: flex;
  margin-top: 100px;
  max-width: 800px;
`;

const LeftNavbar = styled.div`
  width: 200px;
  min-width: 200px;
  height: 700px;
  background-color: #2b2144;
  color: #fff;
  padding: 20px;
  padding-top: 5rem;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  padding-top: 2.5rem;
`;

const NavLink = styled.a`
  display: block;
  color: #fff;
  text-decoration: none;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
  &:hover {
    background-color: #483d69;
  }
`;

const ProfileImage = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: fill;
`;

const UserInfo = styled.div`
  margin-bottom: 20px;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Label = styled.span`
  font-weight: bold;
  color: #333;
  margin-right: 8px;
`;

const Value = styled.span`
  color: #555;
  padding: 8px;
  border-radius: 8px;
  background-color: #e3d5f0;
  display: inline-block;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 500px;
`;

const Button = styled.button`
  color: #000000;
  border: none;
  padding: 15px 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 15px;
  margin-left: 30px;
  background-color: white;
`;

const PostTitle = styled.span`
  color: #555;
  border-radius: 8px;
  background-color: #e3d5f0;
  display: inline-block;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 500px;

  &:hover {
    background-color: #e3d5ff;
  }
`;

const CommentTitle = styled.span`
  color: #555;
  border-radius: 8px;
  background-color: #e3d5f0;
  display: inline-block;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 500px;

  &:hover {
    background-color: #e3d5ff;
  }
`;

const MyPage = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [selectedTab, setSelectedTab] = useState('profile');
  // const [isEditing, setIsEditing] = useState(false);
  // const [editedUser, setEditedUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(updateUserInfo);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        'https://exchangers.site/api/exchangers/v1/user/me',
      );

      if (response.status === 200) {
        const userData = response.data;
        setUser(userData);
        setUserInfo(userData);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      navigate('/login');
    }
  };

  const fetchUserPosts = async () => {
    try {
      if (user && user.nickname) {
        const response = await axios.get(
          `https://exchangers.site/api/exchangers/v1/user/posts`,
        );
        const userPosts = response.data.posts;
        setPosts(userPosts);
      }
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  const fetchUserComments = async () => {
    try {
      if (user && user.nickname) {
        const response = await axios.get(
          `https://exchangers.site/api/exchangers/v1/user/comments`,
        );
        const userComments = response.data.comments;
        setComments(userComments);
      }
    } catch (error) {
      console.error('Error fetching user comments:', error);
    }
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (tab === 'posts') {
      fetchUserPosts();
    } else if (tab === 'comments') {
      fetchUserComments();
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        'https://exchangers.site/api/exchangers/v1/auth/signout',
      );
      alert('Logout successful!');
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Logout failed', error.message);
    }
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'profile':
        return (
          <div>
            {user && (
              <div>
                <div>
                  <h2>My Profile</h2>
                  <UserInfoContainer>
                    {user.profile ? (
                      <ProfileImage src={user.profile} alt="Profile" />
                    ) : (
                      <ProfileImage
                        src="user-regular.svg"
                        alt="Default Profile"
                      />
                    )}
                  </UserInfoContainer>

                  <UserInfo>
                    <Label>Email</Label> <br />
                    <Value>{user.email}</Value>
                  </UserInfo>
                  <UserInfo>
                    <Label>Nickname</Label> <br />
                    <Value>{user.nickname}</Value>
                  </UserInfo>
                  <UserInfo>
                    <Label>Campus</Label> <br />
                    <Value>Ajou Univ</Value>
                  </UserInfo>
                </div>
              </div>
            )}
          </div>
        );

      case 'posts':
        return (
          <div>
            <h2>My Posts</h2>
            {posts.map((post, index) => (
              <PostTitle>
                <div key={post.id}>
                  <value>
                    {index + 1}.{' '}
                    <Link to={`/board/${post._id}`}>{post.title}</Link>{' '}
                  </value>
                </div>
              </PostTitle>
            ))}
          </div>
        );

      case 'comments':
        return (
          <div>
            <h2>My Comments</h2>
            {comments.map((comment, index) => (
              <CommentTitle key={comment.id}>
                {' '}
                <value>
                  {index + 1}. {comment.content}
                </value>
              </CommentTitle>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Global
        styles={css`
          body {
            font-family: 'Roboto', sans-serif;
          }
        `}
      />
      <Container>
        <LeftNavbar>
          <NavLink href="#" onClick={() => handleTabChange('profile')}>
            My Profile
          </NavLink>
          <NavLink href="#" onClick={() => handleTabChange('posts')}>
            My Posts
          </NavLink>
          <NavLink href="#" onClick={() => handleTabChange('comments')}>
            My Comments
          </NavLink>

          <Button onClick={handleLogout}>LOGOUT</Button>
        </LeftNavbar>
        <ContentContainer>{renderContent()}</ContentContainer>
      </Container>
    </>
  );
};

export default MyPage;
