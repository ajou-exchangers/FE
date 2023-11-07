import React, { useEffect, useState, useRef } from 'react';
import MapUI from './Map.presenter';

export default function Map() {
  const mapRef = useRef(null);

  const initMap = () => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.27919, 127.04373),
      level: 2,
    };

    const map = new window.kakao.maps.Map(container, options);
    mapRef.current = map;
  };

  useEffect(() => {
    window.kakao.maps.load(() => initMap());
  }, [mapRef]);

  return <MapUI />;
}
