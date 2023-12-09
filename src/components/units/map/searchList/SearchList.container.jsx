import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  placeListState,
  searchedPlaceListState,
  selectedPlaceState,
} from '@recoil/recoil';
import SearchListUI from './SearchList.presenter';

export default function SearchList(props) {
  const [inputValue, setInputValue] = useState('');
  const [hasInputValue, setHasInputValue] = useState(false);
  const [dropdownList, setDropdownList] = useState([]);
  const [dropdownListIndex, setDropdownListIndex] = useState(-1);

  const [placeList, setPlaceList] = useRecoilState(placeListState);
  const [searchedPlaceList, setSearchedPlaceList] = useRecoilState(
    searchedPlaceListState,
  );
  const [selectedPlace, setSelectedPlace] = useRecoilState(selectedPlaceState);
  const [selectedButton, setSelectedButton] = useState('Info');
  const [placeDetail, setPlaceDetail] = useState(null);

  const fetchDetailPlace = async (place) => {
    try {
      const response = await fetch(
        `https://exchangers.site/api/exchangers/v1/locations/${place._id}`,
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
      console.log(result);
      setPlaceDetail(result);
    } catch {
      console.log(error);
    }
  };

  const showDropdownList = () => {
    if (inputValue === '') {
      setHasInputValue(false);
      setDropdownList([]);
    } else {
      const chosenList = placeList.filter(
        (place) =>
          place.koName.includes(inputValue) ||
          place.enName.includes(inputValue),
      );
      setDropdownList(chosenList);
    }
  };

  const changeInputValue = (e) => {
    setInputValue(e.target.value);
    setHasInputValue(true);
  };

  const clickDropdownItem = (place) => {
    setInputValue(`${place.enName} (ko: ${place.koName})`);
    setSelectedPlace(place);
    setHasInputValue(false);
  };

  const handleDropdownKey = (e) => {
    e.preventDefault();
    if (hasInputValue) {
      if (
        e.key === 'ArrowDown' &&
        dropdownListIndex < dropdownList.length - 1
      ) {
        setDropdownListIndex(dropdownListIndex + 1);
      }
      if (e.key === 'ArrowUp' && dropdownListIndex >= 0) {
        setDropdownListIndex(dropdownListIndex - 1);
      }

      if (e.key === 'Enter') {
        if (dropdownListIndex >= 0) {
          // 바로 장소 상세보기
          clickDropdownItem(placeList[dropdownListIndex]);
          clickSearchButton();
          setDropdownListIndex(-1);
        } else {
          clickSearchButton();
          setDropdownListIndex(-1);
        }
      }
    }
  };

  const clickSearchButton = () => {
    if (hasInputValue) {
      const filteredPlaces = placeList.filter(
        (place) =>
          place.koName.includes(inputValue) ||
          place.enName.includes(inputValue),
      );
      setSearchedPlaceList(filteredPlaces);
      setHasInputValue(false);
    }
  };

  const clickSearchedPlace = (place) => {
    setInputValue(`${place.enName} (${place.koName})`);
    setSelectedPlace(place);
    fetchDetailPlace(place);
  };

  useEffect(() => {
    showDropdownList();
  }, [inputValue]);

  return (
    <SearchListUI
      inputValue={inputValue}
      hasInputValue={hasInputValue}
      changeInputValue={changeInputValue}
      handleDropdownKey={handleDropdownKey}
      dropdownList={dropdownList}
      dropdownListIndex={dropdownListIndex}
      setDropdownListIndex={setDropdownListIndex}
      clickDropdownItem={clickDropdownItem}
      clickSearchButton={clickSearchButton}
      searchedPlaceList={searchedPlaceList}
      clickSearchedPlace={clickSearchedPlace}
      selectedPlace={selectedPlace}
      setSelectedPlace={setSelectedPlace}
      selectedButton={selectedButton}
      setSelectedButton={setSelectedButton}
      placeDetail={placeDetail}
    />
  );
}
