import React, { useState, useEffect } from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  max-width: 800px;
`;

const LeftNavbar = styled.div`
  width: 200px;
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
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 30px;
  cursor: pointer;
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

const NicknameButton = styled.button`
  color: #ffffff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  background-color: #2b2144;
  margin-top: 10px;
  transition: background-color 0.3s ease;
`;

const NicknameInput = styled.input`
  border-radius: 4px;
  margin-top: 10px;
  padding: 8px;
  border-radius: 8px;
  background-color: #e3d5f0;
  width: 500px;
`;

const FileInput = styled.input`
`;

const MyPage = ({ userId }) => {
  const [selectedTab, setSelectedTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const dummyUserData = {
    userId: 'davin',
    email: 'davin@naver.com',
    nickname: 'davini',
    profilePicture: '/lock-solid.svg',
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
    // 서버 업로드 코드 추가해야함
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // 서버 업로드 코드 추가해야함
    setEditedUser((prev) => ({ ...prev, profilePicture: URL.createObjectURL(file) }));
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'profile':
        return (
          <div>
            {user && (
              <div>
                {isEditing ? (
                  <div>
                    <UserInfoContainer>
                      <ProfileImage
                        src={editedUser.profilePicture}
                        alt="Profile"
                        onClick={() => document.getElementById('fileInput').click()}
                      />
                      <br></br>
                      <FileInput
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                      />
                    </UserInfoContainer>
                    <Label>Nickname</Label> <br></br>
                    <NicknameInput
                      type="text"
                      name="nickname"
                      value={editedUser.nickname}
                      onChange={handleInputChange}
                    />
                    <br></br>
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                    <Button onClick={handleCancelEdit}>Cancel</Button>
                  </div>
                ) : (
                  <div>
                    <h2>My Profile</h2>
                    <UserInfoContainer>
                      <ProfileImage src={user.profilePicture} alt="Profile" />
                    </UserInfoContainer>
                    <UserInfo>
                      <Label>Email</Label><br></br>
                      <Value>{user.email}</Value>
                    </UserInfo>
                    <UserInfo>
                      <Label>Nickname</Label><br></br>
                      <Value>{user.nickname}</Value>
                    </UserInfo>
                    <UserInfo>
                      <Label>Campus</Label><br></br>
                      <Value>Ajou Univ</Value>
                    </UserInfo>
                    <NicknameButton onClick={handleEditProfile}>
                      Change Nickname
                    </NicknameButton>
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
          <Button type="logout">LOGOUT</Button>
        </LeftNavbar>
        <ContentContainer>{renderContent()}</ContentContainer>
      </Container>
    </>
  );
};

export default MyPage;