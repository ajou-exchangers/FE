import React, { useEffect, useState, useRef } from 'react';
import MapUI from './Map.presenter';
import useModal from '@hooks/useModal';
import AddPlaceSelect from '../AddPlaceSelection/AddPlaceSelect.container';
import { useSetRecoilState } from 'recoil';
import { userLatLong } from '@recoil/recoil';

export default function Map() {
  const { openModal } = useModal();
  const setUserLatLong = useSetRecoilState(userLatLong);

  const modalData = {
    title: 'Add Place',
    content: <AddPlaceSelect />,
  };

  navigator.geolocation.getCurrentPosition((position) => {
    setUserLatLong({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  });

  const mapRef = useRef(null);

  // 렌더링 후 kakao.load() 후 initMap() 실행
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
  }, [mapRef]); // mapRef가 변경될 때마다 useEffect 실행

  return <MapUI openModal={openModal} modalData={modalData} />;
}
