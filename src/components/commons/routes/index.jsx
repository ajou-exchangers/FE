import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '@pages/main';
import LoginPage from '@pages/login';
import SignupPage from '@pages/signup';
import Board from '@pages/board';
import MapPage from '../../../pages/map';
import MyPage from '@pages/mypage';
import WritePostPage from '@pages/board/WritePost.jsx';
import ViewPostPage from '@pages/board/ViewPost.jsx';
import FixPostPage from '@pages/board/FixPost.jsx';

const RouteList = ({ isLoggedIn, setLoggedIn }) => {
  return (
    <Routes>
      <Route exact path="/" element={<MainPage />} />
      <Route
        exact
        path="/login"
        element={<LoginPage isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />}
      />
      <Route exact path="/signup" element={<SignupPage />} />
      <Route path="/board" element={<Board />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/write-post" element={<WritePostPage />} />
      <Route path="/board/:id" element={<ViewPostPage />} />
      <Route path="/fix-post/:id" element={<FixPostPage />} />
    </Routes>
  );
};

export default RouteList;