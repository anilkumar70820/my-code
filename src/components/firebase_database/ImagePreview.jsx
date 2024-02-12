import React, { useEffect, useState } from 'react';

function ImagePreview({ imageUrl }) {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // Function to fetch image data from URL and set it as src of img tag
    const loadImage = async () => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);
        setImageSrc(objectURL);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };

    // Call loadImage function with the image URL
    loadImage();
  }, [imageUrl]);

  return (
    <img src={imageSrc} alt="Image Preview" />
  );
}

export default ImagePreview;
