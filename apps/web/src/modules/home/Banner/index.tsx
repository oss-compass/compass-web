import React, { memo, useMemo } from 'react';
import { Center } from '@common/components/Layout';
import Search from './Search';
import Carousel from './Carousel';
import styles from './index.module.scss';

const SectionBanner = () => {
  return (
    <section className={`${styles.bg}`}>
      <Center className="relative z-10 mx-auto flex h-[620px] md:h-[500px]">
        <Carousel />
        <Search />
      </Center>
    </section>
  );
};

export default SectionBanner;
