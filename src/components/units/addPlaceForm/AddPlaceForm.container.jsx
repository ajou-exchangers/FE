import AddPlaceFormUI from './AddPlaceForm.presenter';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

/** 한글 장소명, 영어 장소명, 간단한 영어 소개, 간판 이미지, 한글 주소, 영어 주소, 키오스크 유무, 주차장 유무, 영어 가능, 화장실 유무 폼 제출 */
export default function AddPlaceForm(props) {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { register, handleSubmit, watch, errors, control } = useForm();

  // POST http://43.200.181.183:8000/locations

  const onSubmit = (data) => {
    const msgBody = {
      koName: props.placeName,
      koAddress: props.placeAddress,
      kioskAvailable: data.hasKiosk,
      parkingAvailable: data.hasParking,
      englishSpeaking: data.englishAvailable,
      wifiAvailable: data.wifiAvailable,
      description: data.placeDescription,
      category: codeToCategory(props.currCategory),
      // image: selectedFile,
      image: 'tempFile',
      latitude: props.placeLatLng.latitude,
      longitude: props.placeLatLng.longitude,
    };
    alert(JSON.stringify(msgBody));

    fetch('http://43.200.181.183:8000/locations', {
      method: 'POST',
      body: JSON.stringify(msgBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
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
