import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useVerifyDateRange from '../useVerifyDateRange';
import { Checkbox } from 'antd';
import { useTranslation } from 'next-i18next';
import { useMileageOptions } from './contribution';
import MetricTable from './ContributorTable';
import ContributionCount from './ContributionCount';
import ContributorContributors from './Contributors';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import Tooltip from '@common/components/Tooltip';
import useLabelStatus from '@modules/analyze/hooks/useLabelStatus';
import BaseCard from '@common/components/BaseCard';
import { useRouter } from 'next/router';
import { useHandleQueryParams } from '@modules/analyze/hooks/useHandleQueryParams';

const MetricContributor = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { handleQueryParams } = useHandleQueryParams();
  const { verifiedItems } = useLabelStatus();
  const { label, level } = verifiedItems[0];
  const queryCard = router.query?.card as string;
  const [tab, setTab] = useState(queryCard || '1');
  const { timeStart, timeEnd } = useVerifyDateRange();
  const options = useMileageOptions();
  const queryMileage = router.query?.mileage as string;
  const defaultMileage = queryMileage
    ? JSON.parse(queryMileage)
    : ['core', 'regular'];
  const [mileage, setMileage] = useState<string[]>(defaultMileage);
  const onChange = (checkedValues: string[]) => {
    setMileage(checkedValues);
    handleQueryParams({ mileage: JSON.stringify(checkedValues) });
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
  }
  return (
    <BaseCard
      title={t('analyze:metric_detail:contributor')}
      bodyClass="flex-1"
      className="flex h-full flex-col overflow-hidden"
    >
      <div className="flex h-full flex-col">
        <div>
          <Tabs
            classes={{ flexContainer: 'border-b', indicator: '!bg-black' }}
            value={tab}
            onChange={(e, v) => {
              setTab(v);
              handleQueryParams({ card: v });
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
        </div>

        <div className="absolute right-14 top-2.5 flex md:hidden xl:right-0 xl:-top-4">
          <span className="mr-2 flex cursor-pointer items-center font-medium">
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
            defaultValue={defaultMileage}
            onChange={onChange}
          />
        </div>

        <div className="flex-1">{source}</div>
      </div>
    </BaseCard>
  );
};

export default MetricContributor;
