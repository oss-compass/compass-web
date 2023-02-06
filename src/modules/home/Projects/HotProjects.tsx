import React, { useMemo, useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { OverviewQuery } from '@graphql/generated';
import { gsap } from 'gsap';
import { useInterval, useInViewport } from 'ahooks';
import { getAnalyzeLink, getRepoLink } from '@common/utils';
import MiniChart from './MiniChart';
import AngleL from './assets/angle-left.svg';
import AngleR from './assets/angle-right.svg';
import transHundredMarkSystem from '@modules/analyze/DataTransform/transHundredMarkSystem';
import { AiFillGithub } from 'react-icons/ai';
import { SiGitee } from 'react-icons/si';
import { useTranslation } from 'react-i18next';

type Repo = NonNullable<OverviewQuery['overview']['trends']>[number];

const Project: React.FC<{
  repo: Repo;
  index: number;
  inViewport: Boolean | undefined;
}> = ({ repo, index, inViewport }) => {
  const ref = useRef(null);
  const echartsData =
    repo.metricActivity?.map((item) =>
      transHundredMarkSystem(item.activityScore || '')
    ) || [];
  useEffect(() => {
    inViewport &&
      gsap.to(ref.current, {
        rotateX: 360,
        delay: 0.025 * (index + 1),
        transformStyle: 'preserve-3d',
      });
  }, [inViewport, index]);

  return (
    <div ref={ref} className="w-1/3 border-b border-r px-5 py-4  lg:w-1/2">
      <Link
        href={getAnalyzeLink({
          label: getRepoLink(repo.path, repo.backend),
          level: 'repo',
        })}
      >
        <a className="mb-4 block h-20">
          <h3
            className="mb-1  break-words text-xl font-bold line-clamp-2 hover:underline"
            title={repo.path || ''}
          >
            {repo.name}
          </h3>
          <div className="h-6 truncate text-sm text-gray-400">
            {repo.path?.split('/')[0]}
          </div>
        </a>
      </Link>
      <div className="flex h-6 w-full">
        <div className="mr-auto flex-1">
          {repo.backend ? (
            repo.backend === 'GitHub' ? (
              <AiFillGithub className="inline-block h-5 w-5 text-[#000000]" />
            ) : (
              <SiGitee className="inline-block h-5 w-5 text-[#c71c27]" />
            )
          ) : (
            ''
          )}
        </div>

        <MiniChart echartsData={echartsData} />
      </div>
    </div>
  );
};

const HotProjects: React.FC<{
  trends: OverviewQuery['overview']['trends'];
}> = ({ trends = [] }) => {
  const { t } = useTranslation();
  const total = trends?.length || 0;
  const [index, setIndex] = useState(1);
  const [interval, setIntervalTime] = useState<number | undefined>(20000);
  const ref = useRef(null);
  const [inViewport] = useInViewport(ref);

  const showTrends = useMemo(() => {
    if (!total) return [];
    const start = (index - 1) * 6;
    const end = index * 6;
    return trends?.slice(start, end);
  }, [total, index, trends]);

  useInterval(() => {
    setIndex((pre) => {
      if (pre >= Math.floor(total / 6)) return 1;
      return pre + 1;
    });
  }, interval);

  return (
    <div className="lg:px-4">
      <div className="mb-6 flex justify-between text-2xl font-bold">
        {t('home:trends')}
        <div className="flex justify-between py-2">
          <span
            className="mr-2.5 cursor-pointer"
            onClick={() => {
              setIndex((pre) => {
                if (pre === 1) return Math.floor(total / 6);
                return pre - 1;
              });
              setIntervalTime((pre) => {
                if (pre === 20000) return pre + 1;
                return 20000;
              });
            }}
          >
            <AngleL />
          </span>
          <span
            className="cursor-pointer"
            onClick={() => {
              setIndex((pre) => {
                if (pre >= Math.floor(total / 6)) return 1;
                return pre + 1;
              });
              setIntervalTime((pre) => {
                if (pre === 20000) return pre + 1;
                return 20000;
              });
            }}
          >
            <AngleR />
          </span>
        </div>
      </div>
      <div
        className="flex w-[664px] flex-wrap rounded border-t border-l lg:w-full"
        id="HotProjects"
        ref={ref}
      >
        {showTrends?.map((repo, index) => {
          return (
            <Project
              key={repo.path}
              repo={repo}
              index={index}
              inViewport={inViewport}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HotProjects;
