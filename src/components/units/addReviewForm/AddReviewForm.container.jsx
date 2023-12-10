import AddReviewFormUI from './AddReviewForm.presenter';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useModal from '@hooks/useModal';

export default function AddReviewForm(props) {
  const { register, handleSubmit, watch, errors, control } = useForm();
  const { openModal, closeModal } = useModal();

  const [keywords, setKeywords] = useState([]);

  const [rating, setRating] = useState(0);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [review, setReview] = useState('');

  const [previewImages, setPreviewImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files);

    setSelectedImages((prevImages) => [...prevImages, ...newImages]);

    const newImageUrls = newImages.map((file) => URL.createObjectURL(file));
    setPreviewImages((prevImages) => [...prevImages, ...newImageUrls]);
  };

  const onSubmit = async () => {
    if (!rating) {
      alert('Please select a rating!');
      return;
    }

    const formData = new FormData();

    formData.enctype = 'multipart/form-data';

    selectedImages.forEach((image) => {
      formData.append('images', image);
    });
    formData.append('rating', rating);
    formData.append('keywords', JSON.stringify(selectedKeywords));
    formData.append('review', review);

    console.log('locationId', props.locationId);
    console.log('rating', rating);
    console.log('keywords', JSON.stringify(selectedKeywords));
    console.log('review', review);
    console.log('images', selectedImages);

    try {
      const response = await fetch(
        `https://exchangers.site/api/exchangers/v1/reviews/${props.locationId}`,
        {
          method: 'POST',
          body: formData,
          credentials: 'include',
        },
      );
      if (!response.ok) {
        throw new Error(response.status);
      }

      const result = await response.json();

      const modalData = {
        title: 'Add Review',
        content: 'Successfully added a review!',
      };
      openModal(modalData);

      console.log('result', result);
    } catch (error) {
      closeModal();
      alert('Failed to add a review !');
      console.log(error);
    }
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   // console.log(selectedFile);
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setSelectedFile(file);
  //       setPreview(reader.result);
  //       // console.log(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const fetchKeywords = async () => {
    try {
      const response = await fetch(
        `https://exchangers.site/api/exchangers/v1/keywords/${props.locationCategory}`,
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
      setKeywords(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeywordClick = (keyword) => {
    setSelectedKeywords((prevKeywords) => {
      if (prevKeywords.includes(keyword)) {
        return prevKeywords.filter((k) => k !== keyword);
      } else {
        return [...prevKeywords, keyword];
      }
    });
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  useEffect(() => {
    fetchKeywords();
  }, []);

  return (
    <AddReviewFormUI
      register={register}
      control={control}
      handleSubmit={handleSubmit}
      watch={watch}
      errors={errors}
      onSubmit={onSubmit}
      rating={rating}
      setRating={setRating}
      keywords={keywords}
      handleKeywordClick={handleKeywordClick}
      selectedKeywords={selectedKeywords}
      review={review}
      handleReviewChange={handleReviewChange}
      previewImages={previewImages}
      selectedImages={selectedImages}
      handleImageChange={handleImageChange}
    />
  );
}
