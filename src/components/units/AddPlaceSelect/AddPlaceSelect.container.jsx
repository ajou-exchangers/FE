import AddPlaceByKakao from '../AddPlaceByKakao/AddPlaceByKakao.container';
import AddPlaceSelectUI from './AddPlaceSelect.presenter';
import AddPlaceByLatLng from '../AddPlaceByLatLng/AddPlaceByLatLng.container';
import useModal from '@hooks/useModal';

export default function AddPlaceSelect() {
  const { openModal } = useModal();

  const onClickButton = (index) => {
    if (index == 1) {
      const modalData = {
        title: 'Add Place By Kakao API',
        content: <AddPlaceByKakao />,
      };
      openModal(modalData);
    } else if (index == 2) {
      const modalData = {
        title: 'Add Place By Yourself',
        content: <AddPlaceByLatLng />,
      };
      openModal(modalData);
    }
  };

  return <AddPlaceSelectUI onClickButton={onClickButton} />;
}
