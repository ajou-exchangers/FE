import React, { useState, useEffect } from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  max-width: 800px;
`;

const LeftNavbar = styled.div`
  width: 200px;
  height: 450px;
  background-color: #2b2144;
  color: #fff;
  padding: 20px;
  padding-top: 2.5rem;
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
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.span`
  font-weight: bold;
  color: #333;
  margin-right: 8px;
`;

const Value = styled.span`
  color: #555;
`;

const Button = styled.button`
  color: #000000;
  border: none;
  padding: 15px 10px;
  cursor: pointer;

  background-repeat: no-repeat;
  margin-top: 5px;
  background-position: center;
  background-color: white;
`;

const EditableInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const MyPage = ({ userId }) => {
  const [selectedTab, setSelectedTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const dummyUserData = {
    userId: 'davin',
    email: 'davin@naver.com',
    nickname: 'davini',
    profilePicture: '/public/lock-solid.svg',
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(dummyUserData);
    setEditedUser(dummyUserData);
  }, [userId]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'profile':
        return (
          <div>
            <h2>
              My Profile
              {isEditing ? (
                <>
                  <Button onClick={handleSaveChanges}>Save</Button>
                  <Button onClick={handleCancelEdit}>Cancel</Button>
                </>
              ) : (
                <Button onClick={handleEditProfile}>Edit</Button>
              )}
            </h2>
            {user && (
              <div>
                {isEditing ? (
                  <div>
                    <ProfileImage src={editedUser.profilePicture} alt="Profile" />
                    <EditableInput
                      type="text"
                      name="nickname"
                      value={editedUser.nickname}
                      onChange={handleInputChange}
                    />
                  </div>
                ) : (
                  <div>
                    <ProfileImage src={user.profilePicture} alt="Profile" />
                    <UserInfo>
                      <Label>Email</Label>
                      <Value>{user.email}</Value>
                    </UserInfo>

                    <UserInfo>
                      <Label>Nickname</Label>
                      {isEditing ? (
                        <EditableInput
                          type="text"
                          name="nickname"
                          value={editedUser.nickname}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <Value>{user.nickname}</Value>
                      )}
                    </UserInfo>

                    <UserInfo>
                      <Label>Campus</Label>
                      <Value>Ajou Univ</Value>
                    </UserInfo>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      case 'posts':
        return (
          <div>
            <h2>My Posts</h2>
          </div>
        );
      case 'comments':
        return (
          <div>
            <h2>My Comments</h2>
          </div>
        );
      default:
        return null;
    }
  };


  return (
    <>
      <Global styles={css`
          body {
            font-family: 'Roboto', sans-serif;
          }
        `}
      />
      <Container>
        <LeftNavbar>
          <NavLink href="#" onClick={() => handleTabChange('profile')}>My Profile</NavLink>
          <NavLink href="#" onClick={() => handleTabChange('posts')}>My Posts</NavLink>
          <NavLink href="#" onClick={() => handleTabChange('comments')}>My Comments</NavLink>
        </LeftNavbar>
        <ContentContainer>{renderContent()}</ContentContainer>
      </Container>
    </>
  );
};

export default MyPage;