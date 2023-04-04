import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import BaseCard from '@common/components/BaseCard';
import CommunityDropDownMenu from './CommunityDropDownMenu';
import { useCommunityReposQuery } from '@graphql/generated';
import client from '@graphql/client';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import MiniChart from '@common/components/EChartX/MiniChart';
import {
  getAnalyzeLink,
  getFirstPathSegment,
  getRepoLink,
  toFixed,
} from '@common/utils';
import Pagination from '@common/components/Pagination';

const RepoItem: React.FC<{
  name: string;
  path: string;
  backend: string;
  type: string;
  metricActivity: any[];
}> = ({ name, path, backend, type, metricActivity }) => {
  const { t } = useTranslation();
  const data = Array.isArray(metricActivity)
    ? metricActivity.map((i) => toFixed(i['activityScore'], 3))
    : [];

  return (
    <div className="rounded border border-gray-300 px-4 py-3">
      <Link
        href={getAnalyzeLink({
          label: getRepoLink(path, backend),
          level: 'repo',
        })}
      >
        <a className="hover:underline">
          <h4 className="text-sm font-bold line-clamp-2">{name}</h4>
        </a>
      </Link>
      <p className="text-xs text-gray-400">{getFirstPathSegment(path)}</p>
      <div className="flex justify-between pt-3">
        {type === 'governance' ? (
          <div className="mt-1 h-6 rounded bg-[#E3FDFF] px-2 text-xs leading-6 text-[#5EAEB4] line-clamp-1">
            {t('analyze:repos_type:governance_repository')}
          </div>
        ) : (
          <div className="mt-1 h-6 rounded bg-[#F1F5FF] px-2 text-xs leading-6 text-[#6E89CD] line-clamp-1">
            {t('analyze:repos_type:software_artifact_repository')}
          </div>
        )}
        <MiniChart data={data} />
      </div>
    </div>
  );
};

const PRE_PAGE = 9;

const CommunityRepos = () => {
  const [page, setPage] = useState(1);
  const { compareItems } = useCompareItems();
  const { t } = useTranslation();
  const [firstItem] = compareItems;
  const [type, setType] = useState('all');

  const { data, isLoading } = useCommunityReposQuery(
    client,
    {
      label: firstItem?.label,
      page: page,
      per: PRE_PAGE,
      type: type === 'all' ? '' : type,
    },
    { enabled: Boolean(firstItem?.label) }
  );

  const trends = data?.communityOverview?.trends || [];
  const count = data?.communityOverview?.projectsCount || 0;
  const totalPage = Math.ceil(count / PRE_PAGE);

  return (
    <div className="mb-10">
      <BaseCard
        loading={isLoading}
        id={''}
        title={`${t('analyze:repositories', { count })} `}
        description=""
        bodyClass="h-auto"
        headRight={() => (
          <CommunityDropDownMenu
            type={type}
            onTypeChange={(b: string) => {
              setType(b);
              setPage(1);
            }}
          />
        )}
      >
        <div className="grid grid-cols-3 gap-4">
          {trends.map((repo) => {
            return (
              <RepoItem
                key={repo.path}
                type={repo.type!}
                name={repo.name!}
                path={repo.path!}
                backend={repo.backend!}
                metricActivity={repo.metricActivity!}
              />
            );
          })}
        </div>
        {totalPage > 1 && (
          <div className="pt-6">
            <Pagination
              page={page}
              pageTotal={totalPage}
              onChange={(p) => {
                setPage(p);
              }}
            />
          </div>
        )}
      </BaseCard>
    </div>
  );
};

export default CommunityRepos;
