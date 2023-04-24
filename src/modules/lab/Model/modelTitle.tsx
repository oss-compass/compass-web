import React from 'react';
import ProductivityIcon from '../assets/Productivity.svg';
import RobustnessIcon from '../assets/Robustness.svg';
import { useTranslation } from 'next-i18next';
import LinkX from '@common/components/LinkX';

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
          <RobustnessIcon />
        </span>
        <h3 className="text-sm text-[#000000]">Robustness</h3>
      </div>
      <div className="mt-2 text-3xl">Starter Project Health Metrics Model</div>
      <div className="mt-2 flex w-full justify-between">
        <div className="max-w-5xl text-sm text-[#585858] line-clamp-2">
          This metrics model is designed to help people get started with four
          key project health metrics that they can expand on and customize to
          meet their unique needs later.
          <a
            className="ml-1 text-primary hover:underline"
            data-html2canvas-ignore="true"
            href={
              'https://chaoss.community/kb/metrics-model-starter-project-health/'
            }
          >
            {t('common:know_more')}
          </a>
        </div>
        <div className="flex flex-none text-center text-sm font-semibold leading-8">
          <a
            className="h-8 w-[108px] border border-gray-500 "
            target="_blank"
            rel="noopener noreferrer"
            href={'https://chaoss.discourse.group/c/metrics/8' || ''}
          >
            <img
              className="mr-2 inline-block align-text-top "
              src="/images/lab/logo-discord.png"
              alt=""
            />
            CHAOSS
          </a>
          <a
            className="ml-2 h-8 w-[108px] border border-gray-500 "
            target="_blank"
            rel="noopener noreferrer"
            href={extra || ''}
          >
            <img
              className="mr-2 inline-block align-text-top "
              src="/images/lab/logo-slack.png"
              alt=""
            />
            {t('lab:discuss')}
          </a>
        </div>
      </div>
    </>
  );
};

export default ModeTitle;
