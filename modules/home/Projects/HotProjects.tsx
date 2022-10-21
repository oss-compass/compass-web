import React, { useMemo, useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { AiOutlineStar } from 'react-icons/ai';
import { OverviewQuery } from '@graphql/generated';
import { numberFormatK } from '@common/utils';
import { gsap } from 'gsap';
import { useInterval } from 'ahooks';
import { getAnalyzeLink } from '@common/utils';

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

const Project: React.FC<{ repo: Repo; index: number }> = ({ repo, index }) => {
  const ref = useRef(null);

  useEffect(() => {
    gsap.to(ref.current, {
      rotateX: 360,
      delay: 0.025 * (index + 1),
      transformStyle: 'preserve-3d',
    });
  }, [index]);

  return (
    <div ref={ref} className="w-1/3 border-b border-r px-6 py-6  lg:w-1/2">
      <Link
        href={getAnalyzeLink({
          label: getLink(repo.path, repo.backend),
          level: 'repo',
        })}
      >
        <a className="mb-5 block">
          <h3 className="mb-2 text-xl font-medium line-clamp-1 hover:underline">
            {repo.name}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-1">{repo.language}</p>
        </a>
      </Link>
      <p className="text flex items-center">
        <AiOutlineStar className="mr-1 text-gray-600" />
        {numberFormatK(Number(repo.stargazersCount))}
      </p>
    </div>
  );
};

const HotProjects: React.FC<{
  trends: OverviewQuery['overview']['trends'];
}> = ({ trends = [] }) => {
  const total = trends?.length || 0;
  const [index, setIndex] = useState(1);

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
  }, 6000);

  return (
    <div className="lg:px-4">
      <div className="mb-6 text-2xl font-bold">Hot Projects</div>
      <div
        className="flex w-[664px] flex-wrap rounded border-t border-l lg:w-full"
        id="HotProjects"
      >
        {showTrends?.map((repo, index) => {
          return <Project key={repo.path} repo={repo} index={index} />;
        })}
      </div>
    </div>
  );
};

export default HotProjects;
