import React, { memo, useMemo } from 'react';
import { Center } from '@common/components/Layout';
import Search from './Search';
import styles from './index.module.scss';
import NoSsr from '@common/components/NoSsr';
import Image from 'next/image';

const Carousel = () => {
  return (
    <div className="absolute top-[100px] -right-10 overflow-hidden">
      <Image
        width={680}
        height={540}
        src={'/images/home/hero.png'}
        // unoptimized
        alt={''}
      />
    </div>
  );
};
const SectionBanner = () => {
  return (
    <section className={`${styles.bg}`}>
      <Center className="relative z-10 mx-auto h-[620px] md:h-[500px] ">
        <Carousel />
        <Search />
      </Center>
    </section>
  );
};

export default SectionBanner;
