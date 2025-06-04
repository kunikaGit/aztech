import React, { useEffect, useState } from 'react';
import './ImageSlider.scss';

const ImageSlider = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slider-container">
      <div className={`prism rotate-${activeIndex}`}>
        {images.map((img, index) => (
          <div className="face" key={index} style={{ backgroundImage: `url(${img})` }} />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
