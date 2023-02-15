import React from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import Image from 'next/image';
import Bg from './assets/bg-about.png';
import CompassLogo from './assets/compass.svg';

const Banner = () => {
  return (
    <div className="relative bg-black text-white/90 ">
      <div className="absolute left-0 right-0 top-0 bottom-0">
        <Image src={Bg} alt="" layout="fill" />
      </div>
      <div className="relative mx-auto h-[700px] w-[1000px] pt-[145px] md:w-full md:px-4">
        <div className="mb-6 h-10 w-10">
          <CompassLogo />
        </div>
        <h1 className="mb-10 text-6xl">
          Empowering generations of open source innovators.
        </h1>
        <h2 className="text-2xl">
          We help open source projects gain insight into its trends, and getting
          more value of it.
        </h2>
        <div className="absolute bottom-7 left-1/2 text-2xl">
          <MdArrowForwardIos className="rotate-90 text-black" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
