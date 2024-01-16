import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useVerifyDateRange from '../useVerifyDateRange';
import MetricTable from './IssueTable';
import IssueCompletion from './IssueCompletion';
import IssueComments from './IssueComments';
import { useTranslation } from 'next-i18next';
import useLabelStatus from '@modules/analyze/hooks/useLabelStatus';
import BaseCard from '@common/components/BaseCard';
import { useRouter } from 'next/router';
import { useHandleQueryParams } from '@modules/analyze/hooks/useHandleQueryParams';

const MetricIssue = () => {
  const router = useRouter();
  const { handleQueryParams } = useHandleQueryParams();
  const { verifiedItems } = useLabelStatus();
  const { timeStart, timeEnd } = useVerifyDateRange();
  const { label, level } = verifiedItems[0];
  const { t } = useTranslation();
  const queryCard = router.query?.card as string;
  const [tab, setTab] = useState(queryCard || '1');
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
  }
  return (
    <BaseCard
      title={t('analyze:metric_detail:issues')}
      bodyClass="flex-1 flex flex-col"
      className="flex h-full flex-col overflow-hidden"
    >
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

      <div className="mt-2 flex-1">{source}</div>
    </BaseCard>
  );
};

export default MetricIssue;
