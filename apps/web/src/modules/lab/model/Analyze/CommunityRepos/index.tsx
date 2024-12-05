import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import BaseCard from '@common/components/BaseCard';
import CommunityDropDownMenu from './CommunityDropDownMenu';
import { useCommunityReposQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import useVerifiedItems from '../hooks/useVerifiedItems';
import MiniChart from '@common/components/EChartX/MiniChart';
import {
  getShortAnalyzeLink,
  getFirstPathSegment,
  toFixed,
} from '@common/utils';
import Pagination from '@common/components/Antd/Pagination';

const RepoItem: React.FC<{
  name: string;
  path: string;
  backend: string;
  shortCode: string;
  type: string;
  metricActivity: any[];
}> = ({ name, path, shortCode, backend, type, metricActivity }) => {
  const { t } = useTranslation();
  const data = Array.isArray(metricActivity)
    ? metricActivity.map((i) => toFixed(i['activityScore'], 3))
    : [];

  return (
    <div className="rounded border border-gray-300 px-4 py-3">
      <Link href={getShortAnalyzeLink(shortCode)} className="hover:underline">
        <h4 className="line-clamp-2 text-sm font-bold">{name}</h4>
      </Link>
      <p className="text-xs text-gray-400">{getFirstPathSegment(path)}</p>
      <div className="flex justify-between pt-3">
        {type === 'governance' ? (
          <div className="line-clamp-1 mt-1 h-6 rounded bg-[#E3FDFF] px-2 text-xs leading-6 text-[#5EAEB4]">
            {t('analyze:repos_type:governance_repository')}
          </div>
        ) : (
          <div className="line-clamp-1 mt-1 h-6 rounded bg-[#F1F5FF] px-2 text-xs leading-6 text-[#6E89CD]">
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
  const { compareItems } = useVerifiedItems();
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
        <div className="grid grid-cols-3 gap-4 lg:grid-cols-2">
          {trends.map((repo) => {
            return (
              <RepoItem
                key={repo.path}
                type={repo.type!}
                name={repo.name!}
                shortCode={repo.shortCode!}
                path={repo.path!}
                backend={repo.backend!}
                metricActivity={repo.metricActivity!}
              />
            );
          })}
        </div>
        {totalPage > 1 && (
          <div className="flex justify-center pt-6">
            <Pagination
              current={page}
              total={count}
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
