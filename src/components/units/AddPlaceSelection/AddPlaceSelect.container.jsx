import AddPlaceByCurrent from '../AddPlaceByCurrent/AddPlaceByCurrent.container';
import AddPlaceSelectUI from './AddPlaceSelect.presenter';
import useModal from '@hooks/useModal';

export default function AddPlaceSelect() {
  const { openModal } = useModal();

  const onClickButton = (index) => {
    if (index == 1) {
      const modalData = {
        title: 'Add Place By Current Location',
        content: <AddPlaceByCurrent />,
      };
      openModal(modalData);
    } else if (index == 2) {
      const modalData = {
        title: 'Add Place By Pin',
        // content: <AddPlaceByPin />,
      };
      openModal(modalData);
    } else if (index == 3) {
      const modalData = {
        title: 'Add Place Near Campus',
        // content: <AddPlaceNearCampus />,
      };
      openModal(modalData);
    }
  };

  return <AddPlaceSelectUI onClickButton={onClickButton} />;
}
