import React from 'react';

export default function LoginPage() {
  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position.coords.latitude, position.coords.longitude);
  });
  return <div>하이</div>;
}
