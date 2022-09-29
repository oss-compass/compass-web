import React, { memo } from 'react';
import { Center } from '@common/components/Layout';
import useBreakpoint from '@common/hooks/useBreakpoint';
import {
  SvgBlock,
  SvgPositionConfig,
  SvgPositionMobileConfig,
} from './SvgGroup';
import Search from './Search';
import styles from './index.module.scss';

const SvgGroup: React.FC<{ breakpoint: string }> = memo(({ breakpoint }) => {
  return (
    <>
      {SvgPositionConfig.map((item) => {
        return <SvgBlock key={item.id} {...item} />;
      })}
    </>
  );
});
SvgGroup.displayName = 'SvgGroup';

const SectionBanner = () => {
  const breakpoint = useBreakpoint();

  return (
    <section className={styles.bg}>
      <Center className="relative mx-auto h-[800px] md:h-[600px]">
        <SvgGroup breakpoint={breakpoint} />
        <Search />
      </Center>
    </section>
  );
};

export default SectionBanner;
