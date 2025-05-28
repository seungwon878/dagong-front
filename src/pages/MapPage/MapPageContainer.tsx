import { useState } from 'react';
import MapPagePresentation from './MapPagePresentation';

const dummyNeighborhoods = [
  { name: '범계동', selected: true },
  { name: '상도동', selected: true },
];

const MapPageContainer = () => {
  const [neighborhoods, setNeighborhoods] = useState(dummyNeighborhoods);
  const [radius, setRadius] = useState(2); // 1~3

  const handleRemoveNeighborhood = (name: string) => {
    setNeighborhoods((prev) => prev.filter((n) => n.name !== name));
  };
  const handleRadiusChange = (value: number) => {
    setRadius(value);
  };
  const handleClose = () => {
    window.history.back(); // 뒤로가기(UploadPage로)
  };

  return (
    <MapPagePresentation
      neighborhoods={neighborhoods}
      onRemoveNeighborhood={handleRemoveNeighborhood}
      radius={radius}
      onRadiusChange={handleRadiusChange}
      onClose={handleClose}
    />
  );
};

export default MapPageContainer;
