import React, { useEffect, useState, useRef } from 'react';
import MapUI from './Map.presenter';
import useModal from '@hooks/useModal';

export default function Map() {
  const { openModal } = useModal();

  const modalData = {
    title: 'Add Place',
    content: 'Would you like to register a place? If you register, you can leave a review of the location.',
    callBack: () => alert('ok'),
  };

  const [searchKeyword, setSearchKeyword] = useState('');
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const ps = new window.kakao.maps.services.Places();
  const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })

  let map;

  const initMap = () => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.27919, 127.04373),
      level: 2,
    };

    const map = new window.kakao.maps.Map(container, options);
    mapRef.current = map;

    //search bar
    const input = document.createElement('input');
    container.appendChild(input);
    const searchBtn = document.createElement('button');
    searchBtn.addEventListener('click', () => searchPlaces());
    container.appendChild(searchBtn);
  };


  const getCurrentCoordinate = async () => {
    return new Promise((res, rej) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          console.log(position);
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const coordinate = new kakao.maps.LatLng(lat, lon);
          res(coordinate);
        });
      } else {
        rej(new Error("Unable to load current location."));
      }
    });
  };


  const searchPlaces = async () => {
    const keyword = inputRef.current.value.trim();

    try {
      const currentCoordinate = await getCurrentCoordinate();

      console.log(currentCoordinate);
      var options = {
        location: currentCoordinate,
        radius: 10000,
        sort: kakao.maps.services.SortBy.DISTANCE,
      };

      if (keyword !== '') {
        ps.keywordSearch(keyword, placesSearchCB, options);
      } else {
        alert('Please enter a keyword.');
      }
    } catch (error) {
      console.error(error);
      alert('Unable to load current location.');
    }
  };

  const placesSearchCB = (data, status, pagination) => {
    if (status === window.kakao.maps.services.Status.OK) {
      let bounds = new window.kakao.maps.LatLngBounds();

      for (let i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
      }

      mapRef.current.setBounds(bounds); // Use mapRef.current here
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert('No result found');
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert('Error occurred');
    }
  };

  const displayMarker = (place) => {
    // Create a marker and add it to the map
    const marker = new window.kakao.maps.Marker({
      map: mapRef.current,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });

    kakao.maps.event.addListener(marker, 'click', function () {
      infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
      infowindow.open(map, marker);
    });
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAOMAP_APP_KEY}&libraries=services&autoload=false`;
    document.head.appendChild(script);
    window.kakao.maps.load(() => initMap());
  }, [mapRef]);

  return <MapUI openModal={openModal} modalData={modalData} inputRef={inputRef} searchPlaces={searchPlaces} />;
}