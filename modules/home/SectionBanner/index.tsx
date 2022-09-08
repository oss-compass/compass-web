import React, { useEffect, useRef, useState } from 'react';
import { useDebounceFn } from 'ahooks';
import { FaSearch } from 'react-icons/fa';
import { gsap } from 'gsap';
import { useRouter } from 'next/router';
import { Center } from '@common/components/BaseLayout';
import Search from './Search';

import Svg1 from './assets/01.svg';
import Svg2 from './assets/02.svg';
import Svg3 from './assets/03.svg';
import Svg4 from './assets/04.svg';
import Svg5 from './assets/05.svg';
import Svg6 from './assets/06.svg';

import styles from './index.module.scss';

const anim = (id: string) => {
  const list = [
    {
      target: `#${id} svg path:nth-child(2)`,
      vars: { duration: 0.5, x: -10, y: 5 },
    },
    {
      target: `#${id} svg path:nth-child(3)`,
      vars: { duration: 0.5, x: -20, y: 10 },
    },
    {
      target: `#${id} svg path:nth-child(4)`,
      vars: { duration: 0.5, x: -30, y: 15 },
    },
    {
      target: `#${id} svg path:nth-child(5)`,
      vars: { duration: 0.5, x: -40, y: 20 },
    },
  ];
  list.forEach((item) => {
    gsap.to(item.target, item.vars);
  });
};

const svgPositionList = [];

const SvgBlock = () => {
  return (
    <div className="absolute top-[28px] right-[56px]">
      <div
        id="svg3"
        className="h-[292px] w-[284px]"
        onMouseEnter={(e) => {
          // cancel();
          // run('svg3');
        }}
      >
        <Svg3 />
      </div>
    </div>
  );
};

const SectionBanner = () => {
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
  }, []);

  const { run, cancel } = useDebounceFn(
    (id) => {
      anim(id);
    },
    { wait: 1000, leading: true, trailing: false }
  );

  return (
    <section className={styles.bg}>
      <Center className="relative mx-auto h-[800px]">
        <div className="">
          <div></div>
          <div className="absolute top-0 left-[270px]">
            <div
              id="svg1"
              className="h-[163px] w-[180px]"
              onMouseOver={(e) => {
                cancel();
                run('svg1');
              }}
            >
              <Svg1 />
            </div>
          </div>
          <div className="absolute top-0 left-[385px]">
            <div
              id="svg2"
              className="h-[316px] w-[349px]"
              onMouseEnter={(e) => {
                cancel();
                run('svg2');
              }}
            >
              <Svg2 />
            </div>
          </div>
          <div className="absolute top-[28px] right-[56px]">
            <div
              id="svg3"
              className="h-[292px] w-[284px]"
              onMouseEnter={(e) => {
                cancel();
                run('svg3');
              }}
            >
              <Svg3 />
            </div>
          </div>
          <div className=" absolute bottom-[180px] right-0">
            <div
              id="svg4"
              className="h-[139px] w-[143px]"
              onMouseEnter={(e) => {
                cancel();
                run('svg4');
              }}
            >
              <Svg4 />
            </div>
          </div>
          <div className="absolute bottom-0 right-[177px]">
            <div
              id="svg5"
              className="h-[293px] w-[387px] "
              onMouseEnter={(e) => {
                cancel();
                run('svg5');
              }}
            >
              <Svg5 />
            </div>
          </div>
          <div className="absolute bottom-[230px] right-[122px]">
            <div
              id="svg6"
              className="h-[233px] w-[233px] "
              onMouseEnter={(e) => {
                cancel();
                run('svg6');
              }}
            >
              <Svg6 />
            </div>
          </div>
          <Search />
        </div>
      </Center>
    </section>
  );
};

export default SectionBanner;
