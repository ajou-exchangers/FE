import React, { useEffect, useState, useRef } from 'react';
import MapUI from './Map.presenter';
import useModal from '@hooks/useModal';

export default function Map() {
  const { openModal } = useModal();

  const modalData = {
    title: 'Add Place',
    content:
      '장소등록을 하시겠습니까? 등록하시면 해당 장소에 대한 리뷰를 남기실 수 있습니다.',
    callBack: () => alert('ok'),
  };

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

  return <MapUI openModal={openModal} modalData={modalData} />;
}
