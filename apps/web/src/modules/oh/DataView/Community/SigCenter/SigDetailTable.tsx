import React, { useState, useMemo } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import TableCard from '@modules/oh/components/TableCard';
import MyTable from '@common/components/Table';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import {
  useContributionTypeLsit,
  useEcologicalType,
  useMileageOptions,
} from '@modules/analyze/DataView/MetricDetail/MetricContributor/contribution';
import DomainPersona from '@modules/analyze/DataView/MetricDetail/MetricContributor/ContributorTable/DomainPersona';
import { getMaxDomain } from '@modules/analyze/DataView/MetricDetail/MetricContributor/utils';

import { useStateType } from '@modules/analyze/DataView/MetricDetail/MetricPr/PR';
import { format, parseJSON } from 'date-fns';

import MyTab from '@common/components/Tab';
import MetricContributor from './MetricContributor';
import MerticIssue from './MerticIssue';
import MerticPr from './MerticPr';

const SigDetailTable = ({ sigInfo }) => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<string>('contributor');
  let source;
  switch (tab) {
    case 'contributor': {
      source = <MetricContributor />;
      break;
    }
    case 'issue': {
      source = <MerticIssue />;
      break;
    }
    case 'pr': {
      source = <MerticPr />;
      break;
    }
    default: {
      break;
    }
  }
  const tabOptions = [
    {
      label: t('analyze:metric_detail:contributors_persona'),
      value: 'contributor',
    },
    { label: t('analyze:metric_detail:issues'), value: 'issue' },
    { label: t('analyze:metric_detail:pull_requests'), value: 'pr' },
  ];
  return (
    <TableCard
      className={'mb-0 min-h-[calc(100vh-164px)]'}
      id={'SigDetailTable'}
      title={sigInfo['ID'] + ' SIG 洞察详情'}
    >
      <div className="absolute -top-12 left-[40%]">
        <MyTab
          options={tabOptions}
          value={tab}
          onChange={(v) => {
            setTab(v);
          }}
        />
      </div>
      {source}
    </TableCard>
  );
};
export default SigDetailTable;
