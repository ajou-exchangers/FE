import React from 'react';

function Login() {
  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position.coords.latitude, position.coords.longitude);
  });
  return <div>하이</div>;
}

export default Login;
