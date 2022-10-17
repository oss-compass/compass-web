import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { useCounter } from 'react-use';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Planet01 from './assets/planet-01.svg';
import Planet02 from './assets/planet-02.svg';
import Planet03 from './assets/planet-03.svg';

import styles from './index.module.scss';

const PopCard: React.FC<{
  className?: string;
  onNext: () => void;
}> = ({ className, onNext }) => {
  return (
    <div
      className={classnames(
        styles.popCardBg,
        'absolute h-[141px] w-[304px] rounded p-4 opacity-0 transition-all',
        className
      )}
    >
      <h2 className="text-white">Commit frequency</h2>
      <p className="mb-4 text-xs text-gray-400">
        The growth in the aggregated count of unique contributors analyzed
        during the selected time period.
      </p>
      <div className="flex justify-between">
        <Link href="/">
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

const MaskPlanet: React.FC<{ className?: string; enable: boolean }> = ({
  enable,
  className,
}) => {
  return (
    <div
      className={classnames(
        'absolute rounded-full bg-black opacity-50 transition-all duration-150',
        className,
        { '!opacity-0': enable }
      )}
    ></div>
  );
};

const SectionExplain = () => {
  const [value, { inc, reset }] = useCounter(1, 3, 1);

  return (
    <section>
      <div className={classnames(styles.bg, 'h-[900px] w-full')}>
        <div className="relative mx-auto w-[1200px] lg:w-full">
          <h1 className="absolute top-16 text-6xl text-white md:px-2 md:text-3xl">
            How Compass working
          </h1>

          <div className="absolute top-[400px] left-[160px] cursor-pointer md:hidden">
            <Planet01 />
            <MaskPlanet
              enable={value === 1}
              className="top-[8px] left-[8px] h-[57px] w-[57px]"
            />
            <PopCard
              className={classnames('left-[45px] top-[45px]', {
                '!opacity-100': value === 1,
                // '!left-10': value === 1,
              })}
              onNext={() => {
                inc();
              }}
            />
          </div>

          <div className="absolute top-[200px] right-[160px] cursor-pointer md:hidden">
            <Planet02 />
            <MaskPlanet
              enable={value === 2}
              className="top-[10px] left-[10px] h-[48px] w-[48px]"
            />
            <PopCard
              className={classnames('right-[45px] top-[45px]', {
                '!opacity-100': value === 2,
                // '!right-10': value === 2,
              })}
              onNext={() => {
                inc();
              }}
            />
          </div>

          <div className="absolute top-[500px] right-[180px] cursor-pointer md:hidden">
            <Planet03 />
            <MaskPlanet
              enable={value === 3}
              className="top-[6px] left-[5px] h-[51px] w-[51px]"
            />
            <PopCard
              className={classnames('right-[45px] top-[45px]', {
                '!opacity-100': value === 3,
                // '!top-10': value === 3,
              })}
              onNext={() => {
                reset();
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionExplain;
