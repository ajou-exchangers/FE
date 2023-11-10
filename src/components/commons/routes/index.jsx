import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '@pages/main';
import LoginPage from '@pages/login';
import SignupPage from '@pages/signup';
import Boards from '@pages/boards';
import MapPage from '../../../pages/map';

export default function RouteList() {
  return (
    <Routes>
      <Route exact path="/" element={<MainPage />} />
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/signup" element={<SignupPage />} />
      <Route path="/boards" element={<Boards />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/myPage" element={<div>마이페이지</div>} />
    </Routes>
  );
}
