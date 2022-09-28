import React from 'react';
import { Center } from '@common/components/Layout';
import { SvgBlock, SvgPositionConfig } from './SvgGroup';
import Search from './Search';

import styles from './index.module.scss';

const SectionBanner = () => {
  return (
    <section className={styles.bg}>
      <Center className="relative mx-auto h-[800px] md:h-[600px]">
        {SvgPositionConfig.map((item) => {
          return <SvgBlock key={item.id} {...item} />;
        })}
        <Search />
      </Center>
    </section>
  );
};

export default SectionBanner;
