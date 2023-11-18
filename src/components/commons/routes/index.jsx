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

export default function RouteList() {
  return (
    <Routes>
      <Route exact path="/" element={<MainPage />} />
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/signup" element={<SignupPage />} />
      <Route path="/board" element={<Board />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/write-post" element={<WritePostPage />} />
      <Route path="/view-post/:id" element={<ViewPostPage />} />
    </Routes>
  );
}
