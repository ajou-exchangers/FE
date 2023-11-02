import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '@pages/main';
import Login from '@pages/login';
import Boards from '@pages/boards';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/boards" element={<Boards />} />
      </Routes>
    </BrowserRouter>
  );
}
