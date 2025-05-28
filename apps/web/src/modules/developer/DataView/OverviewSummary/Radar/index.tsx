import React from 'react';
import { useTranslation } from 'next-i18next';
import BaseCard from '@modules/developer/components/DeveloperCard';
import { Topic } from '@modules/developer/components/SideBar/config';
import CardDropDownMenu from '@modules/developer/components/CardDropDownMenu';
import { useContributorApi } from '@modules/developer/hooks/useContributorApi';
import Chart from './Chart';

interface ContributionTypeData {
  commit: number;
  pr: number;
  pr_comment: number;
  issue: number;
  issue_comment: number;
  code_review: number;
}

const Radar = () => {
  const { t } = useTranslation();
  const { data, error, isLoading } = useContributorApi<ContributionTypeData>(
    '/api/v2/contributor_portrait/contribution_type',
    'contribution_type'
  );
  return (
    <BaseCard
      title={t('developer:contribution_type')}
      id="contribution_type"
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

export default Radar;
