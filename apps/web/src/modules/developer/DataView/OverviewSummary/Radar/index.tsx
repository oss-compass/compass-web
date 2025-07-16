import React from 'react';
import { useTranslation } from 'next-i18next';
import { Tooltip } from 'antd';
import { GoQuestion } from 'react-icons/go';
import BaseCard from '@modules/developer/components/DeveloperCard';
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
      isEmpty={!data}
      headRight={(ref, fullScreen, setFullScreen) => (
        <>
          <div
            data-html2canvas-ignore="true"
            className="mr-2 flex items-center justify-end gap-2"
          >
            <Tooltip
              placement="top"
              title={
                <div>
                  <h3>{t('developer:contribution_type_info.title')}</h3>
                  <p>{t('developer:contribution_type_info.description')}</p>
                  <div className="my-2">
                    <p className="mb-2 font-medium">
                      {t(
                        'developer:contribution_type_info.calculation_details'
                      )}
                    </p>
                    <ul className="space-y-1 text-xs">
                      <li>
                        • {t('developer:contribution_type_info.push_count')}
                      </li>
                      <li>
                        • {t('developer:contribution_type_info.pr_count')}
                      </li>
                      <li>
                        • {t('developer:contribution_type_info.issue_count')}
                      </li>
                      <li>
                        •{' '}
                        {t('developer:contribution_type_info.pr_comment_count')}
                      </li>
                      <li>
                        •{' '}
                        {t(
                          'developer:contribution_type_info.issue_comment_count'
                        )}
                      </li>
                      <li>
                        •{' '}
                        {t(
                          'developer:contribution_type_info.code_review_count'
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              }
            >
              <GoQuestion className="cursor-pointer" />
            </Tooltip>
          </div>
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
