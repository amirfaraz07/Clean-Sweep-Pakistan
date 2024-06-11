import React, { useState, useEffect } from 'react';
import image1 from '../images/image1.png'
import image2 from '../images/image2.png'
import image3 from '../images/image3.png'
import image4 from '../images/image4.png'
import leftArrow from '../images/left.png'
import rightArrow from '../images/right.png'

const images = [
  image1,
  image2,
  image3,
  image4
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const index = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const index = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(slideInterval);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-fill transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>

        <img src={leftArrow} alt="left" onClick={prevSlide}
        className="absolute top-1/2 transform -translate-y-1/2 left-4 text-white p-5" />

        <img src={rightArrow} alt="right" onClick={nextSlide}
        className="absolute top-1/2 transform -translate-y-1/2 right-4 text-white p-5" />
    </div>
  );
};

export default Carousel;