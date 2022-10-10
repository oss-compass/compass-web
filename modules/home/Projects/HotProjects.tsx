import React, { useMemo, useEffect, useState } from 'react';
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

const list: { target: string; vars: gsap.TweenVars }[] = [
  {
    target: `#HotProjects div:nth-child(1)`,
    vars: { rotateX: 360, delay: 0, transformStyle: 'preserve-3d' },
  },
  {
    target: `#HotProjects div:nth-child(2)`,
    vars: { rotateX: 360, delay: 0.025, transformStyle: 'preserve-3d' },
  },
  {
    target: `#HotProjects div:nth-child(3)`,
    vars: { rotateX: 360, delay: 0.05, transformStyle: 'preserve-3d' },
  },
  {
    target: `#HotProjects div:nth-child(4)`,
    vars: { rotateX: 360, delay: 0.075, transformStyle: 'preserve-3d' },
  },
  {
    target: `#HotProjects div:nth-child(5)`,
    vars: { rotateX: 360, delay: 0.1, transformStyle: 'preserve-3d' },
  },
  {
    target: `#HotProjects div:nth-child(6)`,
    vars: { rotateX: 360, delay: 0.125, transformStyle: 'preserve-3d' },
  },
];

const HotProjects: React.FC<{
  trends: OverviewQuery['overview']['trends'];
}> = ({ trends = [] }) => {
  const [index, setIndex] = useState(1);

  const showTrends = useMemo(() => {
    if (!trends?.length) return [];
    const start = (index - 1) * 6;
    const end = index * 6;
    return trends?.slice(start, end);
  }, [trends, index]);

  useInterval(() => {
    setIndex((pre) => {
      if (pre >= 4) return 1;
      return pre + 1;
    });
  }, 3000);

  useEffect(() => {
    list.forEach((item) => {
      gsap.to(item.target, item.vars);
    });
  }, [index]);

  return (
    <div className="lg:px-4">
      <div className="mb-6 text-2xl font-bold">Hot Projects</div>
      <div
        className="flex w-[664px] flex-wrap rounded border-t border-l lg:w-full"
        id="HotProjects"
      >
        {showTrends?.map((repo) => {
          return (
            <div
              className="w-1/3 border-b border-r px-6 py-6  lg:w-1/2"
              key={repo.path}
            >
              <Link
                href={getAnalyzeLink({
                  label: getLink(repo.path, repo.backend),
                  level: 'repo',
                })}
              >
                <a className="mb-5 block">
                  <h3 className="mb-2 text-xl line-clamp-1 hover:underline">
                    {repo.name}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-1">
                    {repo.language}
                  </p>
                </a>
              </Link>
              <p className="text flex items-center">
                <AiOutlineStar className="mr-1 text-gray-600" />
                {numberFormatK(Number(repo.stargazersCount))}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HotProjects;
