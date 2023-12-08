import AddPlaceFormUI from './AddPlaceForm.presenter';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useModal from '@hooks/useModal';

/** 한글 장소명, 영어 장소명, 간단한 영어 소개, 간판 이미지, 한글 주소, 영어 주소, 키오스크 유무, 주차장 유무, 영어 가능, 화장실 유무 폼 제출 */
export default function AddPlaceForm(props) {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { openModal, closeModal } = useModal();
  const { register, handleSubmit, watch, errors, control } = useForm();

  // POST http://43.200.181.183:8000/locations

  const onSubmit = async (data) => {
    const msgBody = {
      koName: props.placeName,
      koAddress: props.placeAddress,
      kioskAvailable: data.hasKiosk,
      parkingAvailable: data.hasParking,
      englishSpeaking: data.englishAvailable,
      wifiAvailable: data.wifiAvailable,
      description: data.placeDescription,
      category: codeToCategory(props.currCategory),
      image: selectedFile,
      latitude: props.placeLatLng.latitude,
      longitude: props.placeLatLng.longitude,
    };

    console.log(typeof selectedFile);

    try {
      const response = await fetch(
        'http://15.165.42.212:3000/api/exchangers/v1/locations',
        {
          method: 'POST',
          body: JSON.stringify(msgBody),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        },
      );
      if (!response.ok) {
        throw new Error(response.status);
      }

      const modalData = {
        title: 'Add Place By Kakao API',
        content: 'Succesfully added a place!',
      };
      openModal(modalData);

      const result = await response.json();
      console.log('result', result);
    } catch (error) {
      closeModal();
      alert('Failed to add a place !');
      console.log(error);
    }
  };

  const codeToCategory = (category) => {
    if (category === 'FD6') {
      return 'Restaurant';
    } else if (category === 'CE7') {
      return 'Cafe';
    } else if (category === 'BK9') {
      return 'Bank';
    } else if (category === 'PM9') {
      return 'Pharmacy';
    } else if (category === 'CS2') {
      return 'Convenience store';
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AddPlaceFormUI
      register={register}
      control={control}
      handleSubmit={handleSubmit}
      watch={watch}
      errors={errors}
      onSubmit={onSubmit}
      placeName={props.placeName}
      placeAddress={props.placeAddress}
      placeCategory={codeToCategory(props.currCategory)}
      preview={preview}
      handleFileChange={handleFileChange}
    />
  );
}
