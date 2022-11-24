import React, { PropsWithChildren, useEffect, useState } from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { useCounter, useWindowSize } from 'react-use';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { plantList, PopContent } from './plantConfig';

import styles from './index.module.scss';

const PopCard: React.FC<{
  className?: string;
  popContent: PopContent;
  onNext: () => void;
}> = ({ className, popContent, onNext }) => {
  return (
    <div
      className={classnames(
        styles.popCardBg,
        'absolute h-[141px] w-[304px] rounded p-4 transition-all',
        className
      )}
    >
      <h2 className="text-white">{popContent.title}</h2>
      <p className="mb-4 max-h-[60px] break-words text-xs text-gray-400 line-clamp-4">
        {popContent.content}
      </p>
      <div className="flex justify-between">
        <Link href={popContent.hash}>
          <a className="cursor-pointer text-xs text-[#3A5BEF]">Know more</a>
        </Link>
        <div
          className="flex cursor-pointer items-center text-xs text-gray-400"
          onClick={() => {
            onNext();
          }}
        >
          Next <AiOutlineArrowRight className="ml-1" />
        </div>
      </div>
    </div>
  );
};

const Plant: React.FC<
  PropsWithChildren<{
    prop: { top: number; left: number; size: number; color: string };
    className: string;
    onMouseHover: () => void;
  }>
> = ({ children, prop, className, onMouseHover }) => {
  return (
    <div
      style={{
        top: prop.top + 'px',
        left: prop.left + 'px',
        width: prop.size + 'px',
        height: prop.size + 'px',
      }}
      className={classnames(
        styles.box,
        styles[prop.color],
        'absolute md:hidden',
        className
      )}
    >
      <div
        className={styles.boxHover}
        onMouseEnter={() => {
          onMouseHover();
        }}
      ></div>
      {children}
    </div>
  );
};
const getRandomArbitrary = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
/* eslint-disable react/display-name */
const Estrela: React.FC = React.memo(() => {
  const [width, setWidth] = useState(900);
  useEffect(() => {
    const box = document.getElementById('sectionexplain');
    const offsetWidth = box?.offsetWidth;
    setWidth(offsetWidth || 900);
  }, []);
  return (
    <span
      style={{
        animationDelay: '0.' + getRandomArbitrary(0, 9) + 's',
        left: getRandomArbitrary(50, width) + 'px',
        top: getRandomArbitrary(50, 900) + 'px',
      }}
      className={classnames(
        styles['estrela'],
        styles[`estrelaStyle${getRandomArbitrary(1, 5)}`],
        styles[`estrelaOpacity${getRandomArbitrary(1, 4)}`],
        styles[`estrelaTam${getRandomArbitrary(1, 4)}`]
      )}
    ></span>
  );
});
const SectionExplain = () => {
  const [value, { inc, reset, set }] = useCounter(
    plantList.length,
    plantList.length,
    0
  );
  return (
    <section>
      <div
        id="sectionexplain"
        className={classnames(
          styles.bg,
          'relative h-[900px] w-full overflow-hidden'
        )}
      >
        <div className={classnames('h-full w-full')}>
          <div className={classnames(styles.constelacao)}>
            {Array.from({ length: 250 }, (v, k) => k).map((i) => (
              <Estrela key={i} />
            ))}
          </div>
          <div
            className={classnames(styles.plantBg, 'h-full w-full')}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                set(plantList.length);
              }
            }}
          >
            <div className="absolute top-1/2 left-1/2">
              <a
                href="/docs/category/productivity"
                className={classnames(styles.title1)}
              ></a>
              <a
                href="/docs/category/robustness"
                className={classnames(styles.title2)}
              ></a>
              <a
                href="/docs/category/niche-creation"
                className={classnames(styles.title3)}
              ></a>
              {plantList.map(({ popContent, ...item }, i) => {
                return (
                  <Plant
                    key={i}
                    prop={item}
                    onMouseHover={() => {
                      set(i);
                    }}
                    className={classnames({ '!opacity-100': value == i })}
                  >
                    <PopCard
                      className={classnames('left-[25px]', {
                        invisible: value !== i,
                        '-top-[145px]': item.bottom,
                        '-left-[245px]': item.right,
                      })}
                      popContent={popContent}
                      onNext={() => {
                        i === plantList.length - 1 ? reset() : inc();
                      }}
                    />
                  </Plant>
                );
              })}
            </div>
          </div>
        </div>
        <div
          className={classnames(
            styles.working,
            'text-white md:px-2 md:text-3xl'
          )}
        >
          How Compass working
        </div>
      </div>
    </section>
  );
};

export default SectionExplain;
