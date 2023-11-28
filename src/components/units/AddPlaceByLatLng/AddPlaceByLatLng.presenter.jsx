import { userLatLong } from '@recoil/recoil';
import { useRecoilValue } from 'recoil';

export default function AddPlaceByLatLngUI() {
  return (
    <div>
      <div
        id="mapModal"
        style={{
          width: '600px',
          height: '400px',
          position: 'relative',
          overflow: 'hidden',
        }}
      ></div>
    </div>
  );
}
