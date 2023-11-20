import React, { useEffect, useState, useRef } from 'react';
import MapUI from './Map.presenter';
import useModal from '@hooks/useModal';
import AddPlaceSelect from '../AddPlaceSelect/AddPlaceSelect.container';
import { useRecoilState } from 'recoil';
import { userLatLong } from '@recoil/recoil';

export default function Map() {
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const { openModal } = useModal();
  const [userLatLng, setUserLatLong] = useRecoilState(userLatLong);

  const modalData = {
    title: 'Add Place',
    content: <AddPlaceSelect />,
  };

  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    setUserLatLong({
      latitude: lat,
      longitude: lon,
    });
  });

  const searchPlaces = () => {
    const keyword = inputRef.current.value.trim();

    const currentCoordinate = new window.kakao.maps.LatLng(
      userLatLng.latitude,
      userLatLng.longitude,
    );

    const options = {
      location: currentCoordinate,
      radius: 500,
      sort: window.kakao.maps.services.SortBy.DISTANCE,
    };

    const ps = new window.kakao.maps.services.Places();

    if (keyword !== '') {
      ps.keywordSearch(keyword, placesSearchCB, options);
    } else {
      alert('Please enter a keyword.');
    }
  };

  const placesSearchCB = (data, status, pagination) => {
    if (status === window.kakao.maps.services.Status.OK) {
      displayPlaces(data);
      // 중심 좌표 이동
      const moveLatLon = new window.kakao.maps.LatLng(data[0].y, data[0].x);
      mapRef.current.panTo(moveLatLon);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert('No result found');
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert('Error occurred');
    }
  };

  // 지도에 마커를 표출하는 함수입니다
  const displayPlaces = (places) => {
    for (let i = 0; i < places.length; i++) {
      // 마커를 생성하고 지도에 표시합니다
      const position = new kakao.maps.LatLng(places[i].y, places[i].x);

      const marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: position,
      });

      marker.setMap(mapRef.current);

      const iwContent =
        '<div style="padding:5px;">' + places[i].place_name + '</div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다,
      const iwRemoveable = true;
      const infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 마커와 검색결과 항목을 클릭 했을 때 장소정보를 표출
      ((marker, place) => {
        kakao.maps.event.addListener(marker, 'click', () => {
          infowindow.open(mapRef.current, marker);
        });
      })(marker, places[i]);
    }
  };

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(37.27919, 127.04373),
        level: 2,
      };
      // 기본 좌표 아주대
      const map = new window.kakao.maps.Map(container, options);
      mapRef.current = map;
    });
  }, [mapRef]); // mapRef가 변경될 때마다 useEffect 실행

  return (
    <MapUI
      openModal={openModal}
      modalData={modalData}
      inputRef={inputRef}
      searchPlaces={searchPlaces}
    />
  );
}
