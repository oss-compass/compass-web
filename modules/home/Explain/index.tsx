import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useCounter } from 'react-use';
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
const SectionExplain = () => {
  const { t } = useTranslation();
  const [value, { inc, reset, set }] = useCounter(0, plantList.length, 0);
  return (
    <section>
      <div
        className={classnames(
          styles.bg,
          'relative h-[900px] w-full overflow-hidden'
        )}
      >
        <div className="mx-auto w-[1200px] lg:w-full">
          <h1 className="absolute top-16 text-6xl text-white md:px-2 md:text-3xl">
            {t('home:how_compass_working')}
          </h1>
        </div>
        <div className="relative top-1/2 left-1/2">
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
    </section>
  );
};

export default SectionExplain;
