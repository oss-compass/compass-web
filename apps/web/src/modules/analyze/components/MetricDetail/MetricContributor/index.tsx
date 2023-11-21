import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useQueryDateRange from '@modules/analyze/hooks/useQueryDateRange';
import { Checkbox } from 'antd';
import { useTranslation } from 'next-i18next';
import { useMileageOptions } from './contribution';
import MetricTable from './ContributorTable';
import ContributorContribution from './ContributorContribution';
import ContributorOrganizations from './ContributorOrganizations';
import ContributorContributors from './ContributorContributors';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import Tooltip from '@common/components/Tooltip';

const MetricContributor: React.FC<{
  label: string;
  level: string;
}> = ({ label, level }) => {
  const { t } = useTranslation();
  const [tab, setTab] = useState('1');
  const { timeStart, timeEnd } = useQueryDateRange();
  const options = useMileageOptions();
  const [mileage, setMileage] = useState<string[]>(['core', 'guest']);
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
        <ContributorContribution
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
        <ContributorOrganizations
          label={label}
          level={level}
          beginDate={timeStart}
          endDate={timeEnd}
          mileage={mileage}
        />
      );
      break;
    }
    case '4': {
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
    <div className="relative flex h-full flex-col overflow-hidden">
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
          label={t('analyze:metric_detail:contribution')}
          value="2"
        />
        <Tab
          disableRipple
          classes={{
            root: '!normal-case',
            selected: '!text-black !normal-case',
          }}
          label={t('analyze:metric_detail:organization')}
          value="3"
        />
        <Tab
          disableRipple
          classes={{
            root: '!normal-case',
            selected: '!text-black !normal-case',
          }}
          label={t('analyze:metric_detail:contributor')}
          value="4"
        />
      </Tabs>
      <div className="absolute right-2 top-2 flex">
        {/* <span className="mr-4">
          {t('analyze:metric_detail:milestone_persona_filter')}:
        </span> */}
        <span className="mr-4 flex items-center font-medium">
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
              </>
            }
            placement="right"
          >
            <span className="ml-1 text-gray-400">
              <AiOutlineQuestionCircle />
            </span>
          </Tooltip>
        </span>
        <span className="mr-4"> :</span>
        <Checkbox.Group
          options={options}
          defaultValue={['core', 'guest']}
          onChange={onChange}
        />
      </div>

      <div className="mt-1 flex flex-1 flex-col">{source}</div>
    </div>
  );
};

export default MetricContributor;
