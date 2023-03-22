import React from 'react';
import { useTrendingQuery } from '@graphql/generated';
import client from '@graphql/client';

const Repos = () => {
  const { data } = useTrendingQuery(client, { level: 'repo' });
  console.log(data);
  const trending = data?.trending || [];

  return (
    <div>
      <div className="mb-6 text-2xl font-bold">Weekly Activity Board</div>
      <div className="rounded border px-6 py-1 shadow">
        {trending.map((item) => {
          return (
            <div
              key={item.label}
              className="flex justify-between border-b py-3"
            >
              <div>
                <div>{item.label}</div>
                <div></div>
              </div>
              <div>
                <div>{item.activityScore?.toFixed(2)}</div>
                <div>Activity Count</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Repos;
