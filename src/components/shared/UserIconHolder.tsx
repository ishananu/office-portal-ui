import React, { useState } from 'react';

interface IconSelectorProps {
  onSelect: (selectedImage: string) => void;
}

const UserIconHolder: React.FC<IconSelectorProps> = ({ onSelect }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const images = Array.from(
    { length: 15 },
    (_, index) => `user_icon_${index + 1}`
  );

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    onSelect(image);
  };

  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      {images.map((image, index) => (
        <div
          key={index}
          className={`relative w-16 h-16 cursor-pointer border-4 ${
            selectedImage === image ? 'border-green-500' : 'border-gray-300'
          } rounded-full hover:border-blue-500`}
          onClick={() => handleImageClick(image)}
        >
          <img
            src={`/assets/${image}.png`}
            alt={`Icon ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default UserIconHolder;
