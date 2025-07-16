import React from 'react';
import { useTranslation } from 'next-i18next';
import { Tooltip } from 'antd';
import { GoQuestion } from 'react-icons/go';
import BaseCard from '@modules/developer/components/DeveloperCard';
import CardDropDownMenu from '@modules/developer/components/CardDropDownMenu';
import Chart from './Chart';

const TotalScore = ({ data, error, isLoading }) => {
  const { t } = useTranslation();

  return (
    <BaseCard
      title={t('developer:repo_graph')}
      id="repo_graph"
      loading={isLoading}
      isEmpty={data?.length === 0}
      description=""
      className="h-[550px]"
      bodyClass="h-[490px]"
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
                  <h3>{t('developer:repo_collaboration_info.title')}</h3>
                  <p>{t('developer:repo_collaboration_info.description')}</p>
                  <div className="my-2">
                    <p className="mb-2 font-medium">
                      {t(
                        'developer:repo_collaboration_info.calculation_details'
                      )}
                    </p>
                    <ul className="space-y-1 text-xs">
                      <li>
                        •{' '}
                        {t(
                          'developer:repo_collaboration_info.contributed_repos'
                        )}
                      </li>
                      <li>
                        •{' '}
                        {t(
                          'developer:repo_collaboration_info.contribution_volume'
                        )}
                      </li>
                      <li>
                        •{' '}
                        {t(
                          'developer:repo_collaboration_info.relationship_strength'
                        )}
                      </li>
                      <li>
                        •{' '}
                        {t(
                          'developer:repo_collaboration_info.collaboration_network'
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

export default TotalScore;
