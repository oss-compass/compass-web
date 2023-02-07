import React from 'react';
import ProductivityIcon from '../assets/Productivity.svg';
import RobustnessIcon from '../assets/Robustness.svg';
import { useTranslation } from 'next-i18next';

const ModeTitle: React.FC<{
  dimensionality?: string | null;
  desc?: string | null;
  extra?: string | null;
  metric?: string | null;
}> = ({ dimensionality, desc, extra, metric }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className=" flex items-center">
        <span className="mr-2 flex-shrink-0">
          {dimensionality === 'Productivity' ? (
            <ProductivityIcon />
          ) : (
            <RobustnessIcon />
          )}
        </span>
        <h3 className="text-sm text-[#000000]">{dimensionality}</h3>
      </div>
      <div className="mt-2 text-3xl">{metric}</div>
      <div className="mt-2 flex w-full justify-between">
        <div className="max-w-5xl text-sm text-[#585858] line-clamp-2">
          {desc}
        </div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={extra || ''}
          className="h-8 w-28 flex-none border border-gray-500 text-center text-sm font-semibold leading-8"
        >
          <img
            className="mr-2 inline-block align-text-top "
            src="/images/lab/logo-slack.png"
            alt=""
          />
          {t('lab:discuss')}
        </a>
      </div>
    </>
  );
};

export default ModeTitle;
