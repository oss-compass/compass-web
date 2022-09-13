import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';
import styles from './index.module.scss';

const PositionList = [{}, {}, {}, {}];

const PopCard = () => {
  return (
    <div
      className={classnames(
        styles.popCardBg,
        'absolute left-60 top-96 h-[141px] w-[304px] rounded p-4'
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
        <div className="flex cursor-pointer items-center text-xs text-gray-400">
          Next <AiOutlineArrowRight className="ml-1" />
        </div>
      </div>
    </div>
  );
};

const SectionExplain = () => (
  <section>
    <div className={classnames(styles.bg, 'h-[900px] w-full')}>
      <div className="relative mx-auto w-[1200px]">
        <h1 className="absolute top-16 text-6xl text-white">
          How Compass working
        </h1>
        <PopCard />
      </div>
    </div>
  </section>
);

export default SectionExplain;
