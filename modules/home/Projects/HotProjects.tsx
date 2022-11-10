import React, { useMemo, useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { AiOutlineStar } from 'react-icons/ai';
import { OverviewQuery } from '@graphql/generated';
import { numberFormatK } from '@common/utils';
import { gsap } from 'gsap';
import { useInterval, useInViewport } from 'ahooks';
import { getAnalyzeLink } from '@common/utils';
import MiniChart from './MiniChart';
import AngleL from './assets/angle-left.svg';
import AngleR from './assets/angle-right.svg';
import { transMarkingSystem } from '@modules/analyze/DataTransform/transMarkingSystem';

const getLink = (
  path: string | null | undefined,
  backend: string | null | undefined
) => {
  switch (backend) {
    case 'GitHub':
      return `https://github.com/${path}`;
    case 'Gitee':
      return `https://gitee.com/${path}`;
    default:
      return '/';
  }
};

type Repo = NonNullable<OverviewQuery['overview']['trends']>[number];

const Project: React.FC<{
  repo: Repo;
  index: number;
  inViewport: Boolean | undefined;
}> = ({ repo, index, inViewport }) => {
  const ref = useRef(null);
  const echartsData =
    repo.metricActivity?.map((item) =>
      transMarkingSystem(item.activityScore || '')
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
    <div ref={ref} className="w-1/3 border-b border-r px-6 py-6  lg:w-1/2">
      <Link
        href={getAnalyzeLink({
          label: getLink(repo.path, repo.backend),
          level: 'repo',
        })}
      >
        <a className="mb-5 block">
          <h3
             className="mb-2 truncate text-base font-medium hover:underline"
            title={repo.path || ''}
          >
            {repo.path}
          </h3>
          <div className="h-[20px] truncate text-sm text-gray-400">
            {repo.language}
          </div>
        </a>
      </Link>
      <div className="h-6 w-1/3">
        <MiniChart echartsData={echartsData} />
      </div>
      {/* <p className="text flex items-center">
        <AiOutlineStar className="mr-1 text-gray-600" />
        {numberFormatK(Number(repo.stargazersCount))}
      </p> */}
    </div>
  );
};

const HotProjects: React.FC<{
  trends: OverviewQuery['overview']['trends'];
}> = ({ trends = [] }) => {
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
        Trends
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
