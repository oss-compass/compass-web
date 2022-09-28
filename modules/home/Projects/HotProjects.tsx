import React, { useMemo, useEffect, useState } from 'react';
import Link from 'next/link';
import { AiOutlineStar } from 'react-icons/ai';
import { OverviewQuery } from '@graphql/generated';
import { numberFormatK } from '@common/utils';
import { gsap } from 'gsap';

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
    vars: { rotateX: 360, delay: 0 },
  },
  {
    target: `#HotProjects div:nth-child(2)`,
    vars: { rotateX: 360, delay: 0.05 },
  },
  {
    target: `#HotProjects div:nth-child(3)`,
    vars: { rotateX: 360, delay: 0.1 },
  },
  {
    target: `#HotProjects div:nth-child(4)`,
    vars: { rotateX: 360, delay: 0.15 },
  },
  {
    target: `#HotProjects div:nth-child(5)`,
    vars: { rotateX: 360, delay: 0.2 },
  },
  {
    target: `#HotProjects div:nth-child(6)`,
    vars: { rotateX: 360, delay: 0.25 },
  },
];

const HotProjects: React.FC<{
  trends: OverviewQuery['overview']['trends'];
}> = ({ trends = [] }) => {
  const [] = useState(1);

  const showTrends = useMemo(() => {
    return trends?.slice(0, 6);
  }, [trends]);

  useEffect(() => {
    const t = setTimeout(() => {
      list.forEach((item) => {
        gsap.to(item.target, item.vars);
      });
    }, 3000);
    return () => {
      clearTimeout(t);
    };
  }, []);

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
              className="h-1/2 w-1/3 border-b border-r px-6 py-6  lg:w-1/2"
              key={repo.path}
            >
              <Link
                href={`/analyze?repo=${encodeURIComponent(
                  getLink(repo.path, repo.backend)
                )}`}
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
