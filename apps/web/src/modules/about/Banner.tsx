import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { MdArrowForwardIos } from 'react-icons/md';
import Bg from './assets/bg-about.png';
import CompassLogo from './assets/compass-ami.svg';

const Banner = () => {
  const { t } = useTranslation();
  return (
    <div className="relative bg-black text-white/90 ">
      <div className="absolute left-0 right-0 top-0 bottom-0">
        <Image priority src={Bg} alt="" fill sizes="100vw" />
      </div>
      <div className="relative mx-auto h-[700px] w-[1000px] pt-[145px] md:w-full md:px-4">
        <div className="mb-6 h-10 w-10">
          <CompassLogo />
        </div>
        <h1 className="mb-10 text-6xl">
          {t('about:welcome_to_the_oss_compass_community')}
        </h1>
        <h2 className="text-2xl">
          {t('about:we_provide_a_public_saas_platform_oss_compass_for')}
        </h2>
        <div className="absolute bottom-7 left-1/2 text-2xl">
          <MdArrowForwardIos className="rotate-90 text-black" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
