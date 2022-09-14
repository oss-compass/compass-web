import React, { useMemo, useState } from 'react';
import { OverviewQuery } from '@graphql/generated';

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
            <div className="h-1/2 w-1/3 border-b border-r p-6" key={repo.path}>
              <h3 className="mb-5 text-sm text-gray-400">{repo.name}</h3>
              <p className="text-xl">{repo.stargazersCount}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HotProjects;
