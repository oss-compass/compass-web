import React, { memo, useMemo } from 'react';
import Image from 'next/image';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const CarouselContent = () => {
  return (
    <div className="absolute top-[100px] -right-10 w-[680px] overflow-hidden">
      <Carousel dots autoplaySpeed={15000} autoplay arrows>
        <div className="relative h-[483px] w-[680px]">
          <Image
            width={680}
            height={540}
            src={'/images/home/hero.png'}
            // unoptimized
            alt={''}
          />
        </div>
        {/* <div className="relative h-[483px] w-[680px]">
          <Image
            width={680}
            height={540}
            src={'/images/home/hero.png'}
            // unoptimized
            alt={''}
          />
        </div> */}
      </Carousel>
    </div>
  );
};

export default memo(CarouselContent);
