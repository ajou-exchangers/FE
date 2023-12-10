import React, { useEffect, useState, useRef } from 'react';
import MapUI from './Map.presenter';
import useModal from '@hooks/useModal';
import AddPlaceSelect from '../AddPlaceSelect/AddPlaceSelect.container';
import { useRecoilState } from 'recoil';
import {
  userLatLong,
  placeListState,
  searchedPlaceListState,
  selectedPlaceState,
  loginState,
  categoryState,
} from '@recoil/recoil';
import SearchList from './searchList/SearchList.container';

export default function Map() {
  const mapRef = useRef(null);
  const { openModal } = useModal();
  const [userLatLng, setUserLatLong] = useRecoilState(userLatLong);
  const [placeList, setPlaceList] = useRecoilState(placeListState);
  const [searchedPlaceList, setSearchedPlaceList] = useRecoilState(
    searchedPlaceListState,
  );
  const [selectedPlace, setSelectedPlace] = useRecoilState(selectedPlaceState);
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const [loginInfo, setLoginInfo] = useRecoilState(loginState);
  const [category, setCategory] = useRecoilState(categoryState);

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

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(
        'https://exchangers.site/api/exchangers/v1/user/me',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        },
      );
      if (response.ok) {
        setLoginInfo(true);
      }
    } catch {
      console.log(error);
    }
  };

  const fetchPlaces = async () => {
    try {
      const response = await fetch(
        'http://15.165.42.212:3000/api/exchangers/v1/locations',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      const result = await response.json();
      setPlaceList(result);
    } catch {
      console.log(error);
    }
  };

  const removeMarker = () => {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    setMarkers([]);
  };

  const displayPlaces = (places) => {
    removeMarker();

    const imageSrc = '/images/mapMarker.png',
      imageSize = new kakao.maps.Size(36, 36),
      clickable = true,
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    for (let i = 0; i < places.length; i++) {
      const position = new kakao.maps.LatLng(
        places[i].latitude,
        places[i].longitude,
      );

      const marker = new kakao.maps.Marker({
        position: position,
        image: markerImage,
        clickable: clickable,
      });

      marker.setMap(mapRef.current);

      const iwContent =
          '<div style="padding:5px;">' +
          places[i].koName +
          '</div>' +
          '<div style="padding:5px;">' +
          places[i].enName +
          '</div>',
        iwPosition = position,
        iwRemoveable = true;

      const infowindow = new kakao.maps.InfoWindow({
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable,
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.open(mapRef.current, marker);
      });

      setMarkers((prev) => [...prev, marker]);
    }
  };

  const moveToPin = (place) => {
    const moveLatLon = new kakao.maps.LatLng(place.latitude, place.longitude);
    mapRef.current.panTo(moveLatLon);
  };

  const moveToCurrentLocation = () => {
    const imageSrc = '/images/curMarker.png',
      imageSize = new kakao.maps.Size(36, 36),
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    const currPosition = new kakao.maps.LatLng(
      userLatLng.latitude,
      userLatLng.longitude,
    );

    const marker = new kakao.maps.Marker({
      position: currPosition,
      image: markerImage,
    });

    marker.setMap(mapRef.current);
    mapRef.current.panTo(currPosition);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(37.27919, 127.04373),
        level: 2,
      };
      // 기본 좌표 아주대
      const map = new window.kakao.maps.Map(container, options);
      setMap(map);

      mapRef.current = map;
    });
  }, [mapRef]); // mapRef가 변경될 때마다 useEffect 실행

  useEffect(() => {
    fetchPlaces();
  }, []);

  useEffect(() => {
    if (searchedPlaceList) {
      displayPlaces(searchedPlaceList);
    }
  }, [searchedPlaceList, mapRef]);

  useEffect(() => {
    if (selectedPlace) {
      moveToPin(selectedPlace);
    }
  }, [selectedPlace]);

  useEffect(() => {
    if (category !== '') {
      const filteredList = placeList.filter(
        (place) => place.category === category,
      );
      setSearchedPlaceList(filteredList);
      if (filteredList.length > 0) {
        moveToPin(filteredList[0]);
      }
    }
  }, [category]);

  return (
    <>
      <MapUI
        openModal={openModal}
        modalData={modalData}
        mapRef={mapRef}
        moveToCurrentLocation={moveToCurrentLocation}
        loginInfo={loginInfo}
      />
      <SearchList mapRef={mapRef} displayPlaces={displayPlaces} />
    </>
  );
}
