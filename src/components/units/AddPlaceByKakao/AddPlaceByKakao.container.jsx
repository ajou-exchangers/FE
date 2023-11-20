import { useState, useEffect, useRef } from 'react';
import { userLatLong } from '@recoil/recoil';
import { useRecoilValue } from 'recoil';
import AddPlaceByKakaoUI from './AddPlaceByKakao.presenter';
import AddPlaceForm from '../addPlaceForm/AddPlaceForm.container';

export default function AddPlaceByKakao() {
  const mapModalRef = useRef(null);
  const userLatLongValue = useRecoilValue(userLatLong);
  const [map, setMap] = useState(null);
  const [currCategory, setCurrCategory] = useState('');
  const [placeOverlay, setPlaceOverlay] = useState(null); // 커스텀 오버레이를 표시할 맵 객체
  const [ps, setPs] = useState(null);
  const [markers, setMarkers] = useState([]); // 마커를 담을 배열입니다
  const [contentNode, setContentNode] = useState(null); // 커스텀 오버레이의 컨텐츠 노드
  const [placeName, setPlaceName] = useState(''); // 장소명
  const [placeAddress, setPlaceAddress] = useState(''); // 장소 주소
  const [placeLatLng, setPlaceLatLng] = useState({}); // 장소 위도, 경도

  // 카테고리 검색을 요청하는 함수입니다
  const searchPlaces = (map, ps, placeOverlay, removeMarker, currCategory) => {
    if (!currCategory) {
      return;
    }

    // 커스텀 오버레이를 숨깁니다
    placeOverlay.setMap(null);
    removeMarker();

    ps.categorySearch(currCategory, placesSearchCB, { useMapBounds: true });
  };

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
      displayPlaces(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
    } else if (status === kakao.maps.services.Status.ERROR) {
      // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
    }
  }

  // 지도 위에 표시되고 있는 마커를 모두 제거합니다
  const removeMarker = () => {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    setMarkers([]);
  };

  // 지도에 마커를 표출하는 함수입니다
  const displayPlaces = (places) => {
    for (var i = 0; i < places.length; i++) {
      // 마커를 생성하고 지도에 표시합니다
      var marker = addMarker(new kakao.maps.LatLng(places[i].y, places[i].x));

      // 마커와 검색결과 항목을 클릭 했을 때 장소정보를 표출
      ((marker, place) => {
        kakao.maps.event.addListener(marker, 'click', () => {
          displayPlaceInfo(place);
          setPlaceName(place.place_name);
          setPlaceAddress(place.address_name);
          setPlaceLatLng({
            latitude: place.y,
            longitude: place.x,
          });
        });
      })(marker, places[i]);
    }
  };

  // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
  const addMarker = (position, order) => {
    const imageSrc = '/images/mapMarker.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new kakao.maps.Size(36, 36), // 마커 이미지의 크기
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize),
      marker = new kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage,
      });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    setMarkers((prev) => [...prev, marker]); // 배열에 생성된 마커를 추가합니다

    return marker;
  };

  // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
  function displayPlaceInfo(place) {
    // 이름을 누르면 이름을 복사할 수 있도록 한다.
    const content = `
          <div style="padding:5px; background-color: white; border-radius: 5px;
          border: 1px solid #ccc; font-size: 12px; font-family: 'Malgun Gothic', '맑은 고딕', sans-serif;">
              <div style="padding: 5px 0 5px 0; font-weight: bold;">
                  ${place.place_name}
              </div>
              <div title="${place.road_address_name}">
                  ${place.road_address_name}
              </div>
              <div title="${place.address_name}">
                  (지번 : ${place.address_name})
              </div>
              <div>
                  ${place.phone}
              </div> 
          </div>
          <div class="after"></div>
      `;

    contentNode.innerHTML = content;
    placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
    placeOverlay.setMap(map);
  }

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
    setMap(map);

    const imageSrc = '/images/curMarker.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new kakao.maps.Size(36, 36), // 마커 이미지의 크기
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    //핀 생성
    const marker = new window.kakao.maps.Marker({
      position: options.center,
      image: markerImage,
    });

    marker.setMap(map);

    const placeOverlay = new window.kakao.maps.CustomOverlay({
      zIndex: 1,
    });
    setPlaceOverlay(placeOverlay);

    const contentNode = document.createElement('div');
    setContentNode(contentNode);

    // 장소 검색 객체 생성
    const ps = new window.kakao.maps.services.Places(map);
    setPs(ps);
    kakao.maps.event.addListener(map, 'idle', () =>
      searchPlaces(map, ps, placeOverlay, removeMarker, currCategory),
    );

    // 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
    // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다
    addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
    addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);

    // 커스텀 오버레이 컨텐츠를 설정합니다
    placeOverlay.setContent(contentNode);

    // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
    function addEventHandle(target, type, callback) {
      if (target.addEventListener) {
        target.addEventListener(type, callback);
      } else {
        target.attachEvent('on' + type, callback);
      }
    }
  };

  const onClickCategory = (event) => {
    if (event.target.id === currCategory) {
      setCurrCategory('');
    } else {
      setCurrCategory(event.target.id);
    }
  };

  mapModalRef.current = map;

  useEffect(() => {
    window.kakao.maps.load(() => initMap());
  }, [mapModalRef]); // mapRef가 변경될 때마다 useEffect 실행

  useEffect(() => {
    if (currCategory) {
      removeMarker();
      searchPlaces(map, ps, placeOverlay, removeMarker, currCategory);
    }
  }, [currCategory]);

  return (
    <>
      <AddPlaceByKakaoUI
        onClickCategory={onClickCategory}
        currCategory={currCategory}
      />
      <AddPlaceForm
        placeName={placeName}
        placeAddress={placeAddress}
        currCategory={currCategory}
        placeLatLng={placeLatLng}
      />
    </>
  );
}
