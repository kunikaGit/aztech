import React, { useEffect, useState } from 'react';
import './ImageSlider.scss';
import imageMap from '../../utils/helpers';

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
      {/* <img src={imageMap['banner.png']}/> */}
      <div className={`prism rotate-${activeIndex}`}>
        {images.map((img, index) => (
          <div className="face" key={index} style={{ backgroundImage: `url(${img})` }} />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
