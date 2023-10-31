import React from 'react';
import { useState } from 'react';

function Map() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  navigator.geolocation.getCurrentPosition(function (position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  });

  return (
    <div>
      <div>위도: {latitude}</div>
      <div>경도: {longitude}</div>
    </div>
  );
}

export default Map;
