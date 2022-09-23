import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { AiOutlineStar } from 'react-icons/ai';
import { OverviewQuery } from '@graphql/generated';
import { numberFormatK } from '@common/utils';

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

const HotProjects: React.FC<{
  trends: OverviewQuery['overview']['trends'];
}> = ({ trends = [] }) => {
  const [] = useState(1);

  const showTrends = useMemo(() => {
    return trends?.slice(0, 6);
  }, [trends]);

  return (
    <div>
      <div className="mb-6 text-2xl font-bold">Hot Projects</div>
      <div className="flex h-[300px] w-[664px] flex-wrap rounded border-t border-l ">
        {showTrends?.map((repo) => {
          return (
            <div
              className="h-1/2 w-1/3 border-b border-r px-6 pt-6"
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
