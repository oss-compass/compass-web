import Image from 'next/image';
import React from 'react';

const SectionBanner = () => (
  <section className="relative mx-auto h-[800px] w-[1200px]">
    <div className="">
      <div></div>
      <div className="absolute top-0 left-[270px]">
        <Image width="180" height="163" src="/images/home/img-1.png" alt="" />
      </div>
      <div className="absolute top-0 left-[385px]">
        <Image width="349" height="316" src="/images/home/img-2.png" alt="" />
      </div>
      <div className="absolute top-[28px] right-[56px]">
        <Image width="284" height="292" src="/images/home/img-3.png" alt="" />
      </div>
      <div className="absolute bottom-0 right-[177px]">
        <Image width="387" height="293" src="/images/home/img-4.png" alt="" />
      </div>
    </div>
    <div className="absolute bottom-16 w-[500px] bg-white">
      <h1 className="mb-4 text-7xl">
        Know more
        <br />
        your projects
        <br />
        way forward
      </h1>
      <p className="mb-8 break-words text-lg">
        We help open source projects gain insight into its trends, and getting
        more value of it.
      </p>
      <div className="border border-black">
        <input
          type="text"
          className="h-[70px]  w-full  pl-4 text-xl outline-0"
          placeholder="Type the name to insight into your project"
        />
      </div>
    </div>
  </section>
);

export default SectionBanner;
