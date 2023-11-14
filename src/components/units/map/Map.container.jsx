import React, { useEffect, useState, useRef } from 'react';
import MapUI from './Map.presenter';
import useModal from '@hooks/useModal';
import AddPlaceSelect from '../AddPlaceSelection/AddPlaceSelect.container';
import { useSetRecoilState } from 'recoil';
import { userLatLong } from '@recoil/recoil';

export default function Map() {
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const { openModal } = useModal();
  const setUserLatLong = useSetRecoilState(userLatLong);

  const modalData = {
    title: 'Add Place',
    content: <AddPlaceSelect />,
    callBack: () => alert('ok'),
  };

  let ps;
  let infowindow;

  const searchPlaces = async () => {
    const keyword = inputRef.current.value.trim();

    try {
      const currentCoordinate = await getCurrentCoordinate();

      console.log(currentCoordinate);
      var options = {
        location: currentCoordinate,
        radius: 10000,
        sort: window.kakao.maps.services.SortBy.DISTANCE,
      };

      if (keyword !== '') {
        ps.keywordSearch(keyword, placesSearchCB, options);
      } else {
        alert('Please enter a keyword.');
      }
    } catch (error) {
      console.error(error);
      alert('Unable to load the current location.');
    }
  };

  const getCurrentCoordinate = async () => {
    return new Promise((res, rej) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          console.log(position);
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          
          setUserLatLong({
            latitude: lat,
            longitude: lon,
          });

          const coordinate = new window.kakao.maps.LatLng(lat, lon);
          res(coordinate);
        });
      } else {
        rej(new Error('Unable to load the current location.'));
      }
    });
  };

  const placesSearchCB = (data, status, pagination) => {
    if (status === window.kakao.maps.services.Status.OK) {
      let bounds = new window.kakao.maps.LatLngBounds();

      for (let i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
      }

      mapRef.current.setBounds(bounds);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert('No result found');
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert('Error occurred');
    }
  };

  const displayMarker = (place) => {
    const marker = new window.kakao.maps.Marker({
      map: mapRef.current,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });

    window.kakao.maps.event.addListener(marker, 'click', function () {
      infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
      infowindow.open(mapRef.current, marker);
    });
  };

  useEffect(() => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.27919, 127.04373),
          level: 2,
        };
        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;

        const input = document.createElement('input');
        container.appendChild(input);
        const searchBtn = document.createElement('button');
        searchBtn.addEventListener('click', () => searchPlaces());
        container.appendChild(searchBtn);

        infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
        ps = new window.kakao.maps.services.Places();

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
      });

  }, [mapRef]); // mapRef가 변경될 때마다 useEffect 실행


  return <MapUI openModal={openModal} modalData={modalData} inputRef={inputRef} searchPlaces={searchPlaces} />;
}
