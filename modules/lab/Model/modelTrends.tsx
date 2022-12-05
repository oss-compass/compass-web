import React from 'react';
import {
  useBetaMetricOverviewQuery,
  BetaMetricOverviewQuery,
} from '@graphql/generated';
import client from '@graphql/client';
import transHundredMarkSystem from '@modules/analyze/DataTransform/transHundredMarkSystem';
import { AiFillGithub } from 'react-icons/ai';
import { SiGitee } from 'react-icons/si';
import MiniChart from '@common/components/MiniChart';
import Link from 'next/link';
import Loading from './Loading';
import { getLabDetailLink } from '@common/utils';

type Repo = NonNullable<
  BetaMetricOverviewQuery['betaMetricOverview']['trends']
>[number];

const Project: React.FC<{
  repo: Repo;
}> = ({ repo }) => {
  const echartsData =
    repo?.betaMetricScores?.map((item) =>
      transHundredMarkSystem(item.score || '')
    ) || [];

  return (
    <div className=" w-[14.76rem] border border-[#CFCFCF] px-5 py-4 ">
      <Link href={getLabDetailLink(repo)}>
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

const ModelTrends: React.FC<{
  id: number;
}> = ({ id }) => {
  const { isLoading, data } = useBetaMetricOverviewQuery(client, {
    id: id,
  });
  const { trends } = data?.betaMetricOverview || {};
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="flex w-full flex-wrap content-evenly gap-6 pb-12 pt-6">
        {trends?.map((i) => {
          return <Project repo={i} key={i.path} />;
        })}
      </div>
    </>
  );
};

export default ModelTrends;
