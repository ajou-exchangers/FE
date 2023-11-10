import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

export default function MainPage() {
  // prettier-ignore
  return (
    <div>
      <h1>Main</h1>
      <div>
        <Link to="/login">Login</Link>
      </div>

      <div>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  )
}
