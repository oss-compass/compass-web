import React, { memo, useState, useRef } from 'react';
import Image from 'next/image';
import { Carousel } from 'antd';

const CarouselContent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    '/images/home/hero.png',
    '/images/academe/case/compass-insight.png',
    '/images/home/hero.png',
    '/images/academe/case/compass-insight.png',
    '/images/home/hero.png',
  ];
  const carouselRef = useRef(null);
  const handleThumbnailClick = (index) => {
    setCurrentSlide(index);
    if (carouselRef.current) {
      carouselRef.current.goTo(index); // 切换到指定的轮播图
    }
  };

  return (
    <div className="absolute top-[100px] -right-10 w-[680px] overflow-hidden">
      <Carousel
        dots={false}
        ref={carouselRef}
        autoplaySpeed={15000}
        autoplay
        dotPosition="right"
        beforeChange={(from, to) => setCurrentSlide(to)}
      >
        {images.map((src, index) => (
          <div key={index} className="relative h-[483px] w-[600px]">
            <Image width={580} height={540} src={src} alt={''} />
          </div>
        ))}
      </Carousel>
      <div className="absolute right-0 top-0 ml-4 flex flex-col justify-center">
        {images.map((src, index) => (
          <button
            key={index}
            className={`relative mb-2 h-[70px] w-[90px] cursor-pointer overflow-hidden transition-transform duration-200 ${
              currentSlide === index ? 'scale-110' : ''
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <Image
              width={90}
              height={80}
              src={src}
              alt={''}
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default memo(CarouselContent);
