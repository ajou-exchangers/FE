import AddPlaceByLatLngUI from './AddPlaceByLatLng.presenter';
import { userLatLong } from '@recoil/recoil';
import { useRecoilValue } from 'recoil';
import { useEffect, useRef, useState } from 'react';

export default function AddPlaceByLatLng() {
  const mapModalRef = useRef(null);
  const userLatLongValue = useRecoilValue(userLatLong);
  const [latlng, setLatlng] = useState(null);

  // 렌더링 후 kakao.load() 후 initMap() 실행
  const initMap = async () => {
    const container = document.getElementById('mapModal');
    const options = {
      center: new window.kakao.maps.LatLng(
        userLatLongValue.latitude,
        userLatLongValue.longitude,
      ),
      level: 2,
    };

    const map = new window.kakao.maps.Map(container, options);

    const imageSrc = '/images/curMarker.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new kakao.maps.Size(36, 36), // 마커 이미지의 크기
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    //핀 생성
    const marker = new window.kakao.maps.Marker({
      position: options.center,
      image: markerImage,
    });

    marker.setMap(map);

    window.kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
      const latlng = mouseEvent.latLng;
      marker.setPosition(latlng);

      setLatlng(latlng);
    });
  };

  mapModalRef.current = map;

  useEffect(() => {
    window.kakao.maps.load(() => initMap());
  }, [mapModalRef]); // mapRef가 변경될 때마다 useEffect 실행

  return <AddPlaceByLatLngUI latLng={latlng} />;
}
