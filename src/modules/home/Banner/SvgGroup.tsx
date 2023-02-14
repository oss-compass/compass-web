import React, { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { useDebounceFn } from 'ahooks';

import Svg1 from './assets/01.svg';
import Svg2 from './assets/02.svg';
import Svg3 from './assets/03.svg';
import Svg4 from './assets/04.svg';
import Svg5 from './assets/05.svg';
// import Svg6 from './assets/06.svg';
import Svg6 from './assets/07.svg';
// import Svg8 from './assets/08.svg';

export const SvgPositionConfig = [
  {
    id: 1,
    top: 38,
    right: 213,
    width: 143,
    height: 129,
    el: <Svg1 />,
    animate: true,
  },
  {
    id: 2,
    top: 89,
    right: 311,
    width: 277,
    height: 250,
    el: <Svg2 />,
    animate: true,
  },
  {
    id: 3,
    top: 107,
    right: 1,
    width: 226,
    height: 232,
    el: <Svg3 />,
    animate: true,
  },
  {
    id: 4,
    top: 383,
    right: 11,
    width: 143,
    height: 129,
    el: <Svg4 />,
    animate: true,
  },
  // {
  //   id: 5,
  //   top: 230,
  //   right: 417,
  //   width: 139,
  //   height: 143,
  //   el: <Svg4 />,
  //   animate: true,
  // },
  {
    id: 5,
    top: 331,
    right: 241,
    width: 307,
    height: 233,
    el: <Svg5 />,
    animate: true,
  },
  // {
  //   id: 7,
  //   top: 615,
  //   right: 47,
  //   width: 139,
  //   height: 143,
  //   el: <Svg6 />,
  //   animate: true,
  // },
  {
    id: 6,
    top: 295,
    right: 200,
    width: 139,
    height: 143,
    el: <Svg6 />,
    animate: false,
  },
];

export const SvgPositionMobileConfig = [
  {
    id: 1,
    top: 10,
    right: 360,
    width: 78,
    height: 70,
    el: <Svg1 />,
    animate: true,
  },
  {
    id: 2,
    top: 10,
    right: 211,
    width: 151,
    height: 136,
    el: <Svg2 />,
    animate: true,
  },
  {
    id: 3,
    top: 10,
    right: 50,
    width: 122,
    height: 126,
    el: <Svg3 />,
    animate: true,
  },
  {
    id: 4,
    top: 150,
    right: 20,
    width: 100,
    height: 100,
    el: <Svg4 />,
    animate: true,
  },
  // {
  //   id: 5,
  //   top: 230,
  //   right: 417,
  //   width: 139,
  //   height: 143,
  //   el: <Svg4 />,
  //   animate: true,
  // },
  {
    id: 5,
    bottom: 20,
    right: 50,
    width: 167,
    height: 126,
    el: <Svg5 />,
    animate: true,
  },
  // {
  //   id: 7,
  //   top: 205,
  //   right: 47,
  //   width: 139,
  //   height: 143,
  //   el: <Svg6 />,
  //   animate: true,
  // },
  {
    id: 6,
    top: 200,
    right: 140,
    width: 139,
    height: 143,
    el: <Svg6 />,
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
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  width: number;
  height: number;
  el: React.ReactElement;
  animate: boolean;
}> = ({ id, top, bottom, left, right, width, height, el, animate }) => {
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

  const styles = useMemo(() => {
    const styles: React.CSSProperties = {};
    if (top) styles.top = `${top}px`;
    if (bottom) styles.bottom = `${bottom}px`;
    if (left) styles.left = `${left}px`;
    if (right) styles.right = `${right}px`;
    return styles;
  }, [top, right, left, bottom]);

  return (
    <div className={`absolute`} style={styles}>
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
