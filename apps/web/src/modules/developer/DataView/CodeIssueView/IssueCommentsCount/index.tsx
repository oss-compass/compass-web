import React from 'react';
import { useTranslation } from 'next-i18next';
import BaseCard from '@modules/developer/components/DeveloperCard';
import { Topic } from '@modules/developer/components/SideBar/config';
import CardDropDownMenu from '@modules/developer/components/CardDropDownMenu';
import { useContributorApi } from '@modules/developer/hooks/useContributorApi';
import Chart from './Chart';

interface CommitFrequencyData {
  date: string;
  value: number;
}

const LineChart = () => {
  const { t } = useTranslation();
  const { data, error, isLoading } = useContributorApi<CommitFrequencyData[]>(
    '/api/v2/contributor_portrait/monthly_issue_comments',
    'monthly_issue_comments'
  );
  return (
    <BaseCard
      title={t('developer:issue_comments_count')}
      id="issue_comments_count"
      description=""
      className="h-[380px]"
      bodyClass="h-[320px]"
      loading={isLoading}
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
          <Chart containerRef={containerRef} data={data} />
        </div>
      )}
    </BaseCard>
  );
};

export default LineChart;
