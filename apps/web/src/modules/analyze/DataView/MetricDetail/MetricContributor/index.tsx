import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useQueryDateRange from '@modules/analyze/hooks/useQueryDateRange';
import { Checkbox } from 'antd';
import { useTranslation } from 'next-i18next';
import { useMileageOptions } from './contribution';
import MetricTable from './ContributorTable';
import ContributionCount from './ContributionCount';
import ContributorContributors from './Contributors';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import Tooltip from '@common/components/Tooltip';
import useLabelStatus from '@modules/analyze/hooks/useLabelStatus';
import { ContributorsPersona } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';

const MetricContributor = () => {
  const { t } = useTranslation();
  const { verifiedItems } = useLabelStatus();
  const { label, level } = verifiedItems[0];
  const [tab, setTab] = useState('1');
  const { timeStart, timeEnd } = useQueryDateRange();
  const options = useMileageOptions();
  const [mileage, setMileage] = useState<string[]>(['core', 'regular']);
  const onChange = (checkedValues: string[]) => {
    setMileage(checkedValues);
  };
  let source;
  switch (tab) {
    case '1': {
      source = (
        <MetricTable
          label={label}
          level={level}
          beginDate={timeStart}
          endDate={timeEnd}
          mileage={mileage}
        />
      );
      break;
    }
    case '2': {
      source = (
        <ContributionCount
          label={label}
          level={level}
          beginDate={timeStart}
          endDate={timeEnd}
          mileage={mileage}
        />
      );
      break;
    }
    case '3': {
      source = (
        <ContributorContributors
          label={label}
          level={level}
          beginDate={timeStart}
          endDate={timeEnd}
          mileage={mileage}
        />
      );
      break;
    }
    default: {
      break;
    }
  }
  return (
    <BaseCard
      title={t('metrics_models:contributors_persona.metrics.contributor')}
      id={ContributorsPersona.Contributor}
      bodyClass="h-[full]"
    >
      <div>
        <Tabs
          classes={{ flexContainer: 'border-b', indicator: '!bg-black' }}
          value={tab}
          onChange={(e, v) => {
            setTab(v);
          }}
          aria-label="Tabs where selection follows focus"
          selectionFollowsFocus
        >
          <Tab
            disableRipple
            classes={{ root: '!normal-case', selected: '!text-black ' }}
            label={t('analyze:metric_detail:persona_detail')}
            value="1"
          ></Tab>
          <Tab
            disableRipple
            classes={{
              root: '!normal-case',
              selected: '!text-black !normal-case',
            }}
            label={t('analyze:metric_detail:contribution_distribution')}
            value="2"
          />
          <Tab
            disableRipple
            classes={{
              root: '!normal-case',
              selected: '!text-black !normal-case',
            }}
            label={t('analyze:metric_detail:contributor_distribution')}
            value="3"
          />
        </Tabs>
        <div className="absolute right-1 top-2.5 flex md:hidden xl:-top-2.5">
          <span className="mr-2 flex items-center font-medium">
            {t('analyze:metric_detail:milestone_persona_filter')}
            <Tooltip
              arrow
              title={
                <>
                  <div>
                    <span className="font-xs font-semibold">
                      {t('analyze:metric_detail:core')} :
                    </span>
                    {t('analyze:metric_detail:core_desc')}
                  </div>
                  <div>
                    <span className="font-xs font-semibold">
                      {t('analyze:metric_detail:regular')} :
                    </span>
                    {t('analyze:metric_detail:regular_desc')}
                  </div>
                  <div>
                    <span className="font-xs font-semibold">
                      {t('analyze:metric_detail:guest')} :
                    </span>
                    {t('analyze:metric_detail:guest_desc')}
                  </div>
                </>
              }
              placement="right"
            >
              <span className="ml-1 text-gray-400">
                <AiOutlineQuestionCircle />
              </span>
            </Tooltip>
          </span>
          <span className="mr-2">:</span>
          <Checkbox.Group
            options={options}
            defaultValue={['core', 'regular']}
            onChange={onChange}
          />
        </div>

        <div className="mt-2 flex-1">{source}</div>
      </div>
    </BaseCard>
  );
};

export default MetricContributor;
