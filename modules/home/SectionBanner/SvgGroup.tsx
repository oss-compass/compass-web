import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useDebounceFn } from 'ahooks';

import Svg1 from '@modules/home/SectionBanner/assets/01.svg';
import Svg2 from '@modules/home/SectionBanner/assets/02.svg';
import Svg3 from '@modules/home/SectionBanner/assets/03.svg';
import Svg4 from '@modules/home/SectionBanner/assets/04.svg';
import Svg5 from '@modules/home/SectionBanner/assets/05.svg';
import Svg6 from '@modules/home/SectionBanner/assets/06.svg';
import Svg7 from '@modules/home/SectionBanner/assets/07.svg';
import Svg8 from '@modules/home/SectionBanner/assets/08.svg';

export const SvgPositionConfig = [
  {
    id: 1,
    top: 0,
    right: 768,
    width: 163,
    height: 180,
    el: <Svg1 />,
    animate: true,
  },
  {
    id: 2,
    top: 10,
    right: 472,
    width: 308,
    height: 291,
    el: <Svg2 />,
    animate: true,
  },
  {
    id: 3,
    top: 28,
    right: 56,
    width: 284,
    height: 292,
    el: <Svg3 />,
    animate: true,
  },
  {
    id: 4,
    top: 172,
    right: 28,
    width: 139,
    height: 143,
    el: <Svg4 />,
    animate: true,
  },
  {
    id: 5,
    top: 230,
    right: 417,
    width: 139,
    height: 143,
    el: <Svg4 />,
    animate: true,
  },
  {
    id: 6,
    top: 451,
    right: 177,
    width: 387,
    height: 293,
    el: <Svg5 />,
    animate: true,
  },
  {
    id: 7,
    top: 615,
    right: 47,
    width: 139,
    height: 143,
    el: <Svg6 />,
    animate: true,
  },
  {
    id: 8,
    top: 300,
    right: 290,
    width: 139,
    height: 143,
    el: <Svg7 />,
    animate: false,
  },
  {
    id: 9,
    top: 313,
    right: 18,
    width: 139,
    height: 143,
    el: <Svg8 />,
    animate: false,
  },
];

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

export const SvgBlock: React.FC<{
  id: number;
  top: number;
  right: number;
  width: number;
  height: number;
  el: React.ReactElement;
  animate: boolean;
}> = ({ id, top, right, width, height, el, animate }) => {
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
    <div
      className={`absolute`}
      style={{ top: `${top}px`, right: `${right}px` }}
    >
      <div
        id={`svg${id}`}
        style={{ width: `${width}px`, height: `${height}px` }}
        onMouseEnter={(e) => {
          if (animate) {
            cancel();
            run(`svg${id}`);
          }
        }}
      >
        {el}
      </div>
    </div>
  );
};
