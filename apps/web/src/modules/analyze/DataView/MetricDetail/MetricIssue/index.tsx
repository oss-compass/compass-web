import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useQueryDateRange from '@modules/analyze/hooks/useQueryDateRange';
import MetricTable from './IssueTable';
import IssueCompletion from './IssueCompletion';
import IssueComments from './IssueComments';
import { useTranslation } from 'next-i18next';
import useLabelStatus from '@modules/analyze/hooks/useLabelStatus';
import { ContributorsPersona } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';

const MetricIssue = () => {
  const { verifiedItems } = useLabelStatus();
  const { label, level } = verifiedItems[0];
  const { t } = useTranslation();
  const [tab, setTab] = useState('1');
  const { timeStart, timeEnd } = useQueryDateRange();
  let source;
  switch (tab) {
    case '1': {
      source = (
        <MetricTable
          label={label}
          level={level}
          beginDate={timeStart}
          endDate={timeEnd}
        />
      );
      break;
    }
    case '2': {
      source = (
        <IssueCompletion
          label={label}
          level={level}
          beginDate={timeStart}
          endDate={timeEnd}
        />
      );
      break;
    }
    case '3': {
      source = (
        <IssueComments
          label={label}
          level={level}
          beginDate={timeStart}
          endDate={timeEnd}
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
      title={t('metrics_models:contributors_persona.metrics.issue')}
      id={ContributorsPersona.Issue}
      bodyClass="h-[650px]"
    >
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
          label={t('analyze:metric_detail:issue_detail')}
          value="1"
        ></Tab>
        <Tab
          disableRipple
          classes={{
            root: '!normal-case',
            selected: '!text-black !normal-case',
          }}
          label={t('analyze:metric_detail:issue_completion')}
          value="2"
        />
        <Tab
          disableRipple
          classes={{
            root: '!normal-case',
            selected: '!text-black !normal-case',
          }}
          label={t('analyze:metric_detail:issues_comments')}
          value="3"
        />
      </Tabs>

      <div className="mt-2 flex h-[600px] flex-1 flex-col">{source}</div>
    </BaseCard>
  );
};

export default MetricIssue;
