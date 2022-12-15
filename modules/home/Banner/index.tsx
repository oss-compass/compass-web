import React, { memo, useMemo } from 'react';
import { Center } from '@common/components/Layout';
import useBreakpoint from '@common/hooks/useBreakpoint';
import NoSsr from '@common/components/NoSsr';
import {
  SvgBlock,
  SvgPositionConfig,
  SvgPositionMobileConfig,
} from './SvgGroup';
import Search from './Search';
import styles from './index.module.scss';

const SvgGroup: React.FC<{ breakpoint: string }> = memo(({ breakpoint }) => {
  const svgConfig = useMemo(() => {
    if (breakpoint === 'sm') return SvgPositionMobileConfig;
    return SvgPositionConfig;
  }, [breakpoint]);

  return (
    <>
      {svgConfig.map((item) => {
        return <SvgBlock key={item.id} {...item} />;
      })}
    </>
  );
});
SvgGroup.displayName = 'SvgGroup';

const SectionBanner = () => {
  const breakpoint = useBreakpoint();

  return (
    <section className={`${styles.bg}`}>
      <Center className="relative z-10 mx-auto h-[620px] md:h-[500px]">
        <NoSsr>
          <SvgGroup breakpoint={breakpoint} />
        </NoSsr>
        <Search />
      </Center>
    </section>
  );
};

export default SectionBanner;
