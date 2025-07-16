import React from 'react';
import { useTranslation } from 'next-i18next';
import BaseCard from '@modules/developer/components/DeveloperCard';
import { Topic } from '@modules/developer/components/SideBar/config';
import CardDropDownMenu from '@modules/developer/components/CardDropDownMenu';
import { useContributorApi } from '@modules/developer/hooks/useContributorApi';
import Chart from './Chart';

interface RepoData {
  repo_url: string;
  contribution: number;
}

const RepoChart = () => {
  const { t } = useTranslation();
  const { data, error, isLoading } = useContributorApi<RepoData[]>(
    '/api/v2/contributor_portrait/contributor_repos',
    'contributor_repos'
  );
  return (
    <BaseCard
      title={t('developer:contributor_repos_rank')}
      id="contributor_repos_rank"
      description=""
      className="h-[380px]"
      bodyClass="h-[320px]"
      loading={isLoading}
      isEmpty={!data || data.length === 0}
      headRight={(ref, fullScreen, setFullScreen) => (
        <>
          <CardDropDownMenu
            cardRef={ref}
            fullScreen={fullScreen}
            onFullScreen={(b) => {
              setFullScreen(b);
            }}
          />
        </>
      )}
    >
      {(containerRef) => (
        <div className="flex h-full w-full justify-center">
          <Chart
            containerRef={containerRef as React.RefObject<HTMLDivElement>}
            data={data}
          />
        </div>
      )}
    </BaseCard>
  );
};

export default RepoChart;
