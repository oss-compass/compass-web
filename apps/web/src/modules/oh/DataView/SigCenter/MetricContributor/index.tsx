import React, { useState, useRef, useMemo } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
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
import Pie from './MetricPie';
const MerticTable = () => {
  const { t } = useTranslation();
  const dataSource = [
    {
      contribution: 638,
      contributionTypeList: [
        {
          contribution: 63,
          contributionType: 'pr_creation',
        },
        {
          contribution: 292,
          contributionType: 'pr_comments',
        },
        {
          contribution: 260,
          contributionType: 'code_author',
        },
        {
          contribution: 5,
          contributionType: 'code_committer',
        },
        {
          contribution: 8,
          contributionType: 'issue_creation',
        },
        {
          contribution: 10,
          contributionType: 'issue_comments',
        },
      ],
      contributionWithoutObserve: 638,
      contributor: 'darkwing',
      ecologicalType: 'organization manager',
      isBot: false,
      mileageType: 'core',
      organization: 'Mozilla',
    },
    {
      contribution: 627,
      contributionTypeList: [
        {
          contribution: 37,
          contributionType: 'pr_creation',
        },
        {
          contribution: 280,
          contributionType: 'code_author',
        },
        {
          contribution: 88,
          contributionType: 'code_committer',
        },
        {
          contribution: 203,
          contributionType: 'pr_comments',
        },
        {
          contribution: 7,
          contributionType: 'issue_creation',
        },
        {
          contribution: 12,
          contributionType: 'issue_comments',
        },
      ],
      contributionWithoutObserve: 627,
      contributor: 'dbrans',
      ecologicalType: 'individual manager',
      isBot: false,
      mileageType: 'core',
      organization: null,
    },
    {
      contribution: 578,
      contributionTypeList: [
        {
          contribution: 41,
          contributionType: 'issue_creation',
        },
        {
          contribution: 58,
          contributionType: 'pr_creation',
        },
        {
          contribution: 276,
          contributionType: 'pr_comments',
        },
        {
          contribution: 26,
          contributionType: 'issue_comments',
        },
        {
          contribution: 177,
          contributionType: 'code_author',
        },
      ],
      contributionWithoutObserve: 578,
      contributor: 'jpuri',
      ecologicalType: 'individual manager',
      isBot: false,
      mileageType: 'core',
      organization: null,
    },
    {
      contribution: 537,
      contributionTypeList: [
        {
          contribution: 3,
          contributionType: 'issue_creation',
        },
        {
          contribution: 9,
          contributionType: 'issue_comments',
        },
        {
          contribution: 36,
          contributionType: 'pr_creation',
        },
        {
          contribution: 333,
          contributionType: 'pr_comments',
        },
        {
          contribution: 149,
          contributionType: 'code_author',
        },
        {
          contribution: 7,
          contributionType: 'code_committer',
        },
      ],
      contributionWithoutObserve: 537,
      contributor: 'matthewwalsh0',
      ecologicalType: 'organization manager',
      isBot: false,
      mileageType: 'core',
      organization: 'Consensys',
    },
    {
      contribution: 443,
      contributionTypeList: [
        {
          contribution: 332,
          contributionType: 'pr_comments',
        },
        {
          contribution: 27,
          contributionType: 'issue_creation',
        },
        {
          contribution: 29,
          contributionType: 'pr_creation',
        },
        {
          contribution: 12,
          contributionType: 'issue_comments',
        },
        {
          contribution: 42,
          contributionType: 'code_author',
        },
        {
          contribution: 1,
          contributionType: 'code_committer',
        },
      ],
      contributionWithoutObserve: 443,
      contributor: 'DDDDDanica',
      ecologicalType: 'individual manager',
      isBot: false,
      mileageType: 'core',
      organization: null,
    },
    {
      contribution: 435,
      contributionTypeList: [
        {
          contribution: 31,
          contributionType: 'issue_creation',
        },
        {
          contribution: 42,
          contributionType: 'pr_creation',
        },
        {
          contribution: 236,
          contributionType: 'pr_comments',
        },
        {
          contribution: 37,
          contributionType: 'issue_comments',
        },
        {
          contribution: 89,
          contributionType: 'code_author',
        },
      ],
      contributionWithoutObserve: 435,
      contributor: 'digiwand',
      ecologicalType: 'organization manager',
      isBot: false,
      mileageType: 'core',
      organization: '@MetaMask',
    },
    {
      contribution: 411,
      contributionTypeList: [
        {
          contribution: 18,
          contributionType: 'pr_creation',
        },
        {
          contribution: 310,
          contributionType: 'pr_comments',
        },
        {
          contribution: 73,
          contributionType: 'code_author',
        },
        {
          contribution: 5,
          contributionType: 'issue_comments',
        },
        {
          contribution: 5,
          contributionType: 'code_committer',
        },
      ],
      contributionWithoutObserve: 411,
      contributor: 'adonesky1',
      ecologicalType: 'organization manager',
      isBot: false,
      mileageType: 'core',
      organization: 'Consensys',
    },
    {
      contribution: 406,
      contributionTypeList: [
        {
          contribution: 2,
          contributionType: 'issue_comments',
        },
        {
          contribution: 75,
          contributionType: 'pr_creation',
        },
        {
          contribution: 329,
          contributionType: 'pr_comments',
        },
      ],
      contributionWithoutObserve: 406,
      contributor: 'FrederikBolding',
      ecologicalType: 'organization participant',
      isBot: false,
      mileageType: 'core',
      organization: '@MetaMask @MyCryptoHQ',
    },
    {
      contribution: 387,
      contributionTypeList: [
        {
          contribution: 41,
          contributionType: 'pr_creation',
        },
        {
          contribution: 230,
          contributionType: 'pr_comments',
        },
        {
          contribution: 78,
          contributionType: 'code_author',
        },
        {
          contribution: 7,
          contributionType: 'issue_comments',
        },
        {
          contribution: 7,
          contributionType: 'issue_creation',
        },
        {
          contribution: 24,
          contributionType: 'code_committer',
        },
      ],
      contributionWithoutObserve: 387,
      contributor: 'NidhiKJha',
      ecologicalType: 'organization manager',
      isBot: false,
      mileageType: 'core',
      organization: '@ConsenSys @MetaMask',
    },
    {
      contribution: 386,
      contributionTypeList: [
        {
          contribution: 37,
          contributionType: 'pr_creation',
        },
        {
          contribution: 219,
          contributionType: 'pr_comments',
        },
        {
          contribution: 128,
          contributionType: 'code_author',
        },
        {
          contribution: 2,
          contributionType: 'issue_comments',
        },
      ],
      contributionWithoutObserve: 386,
      contributor: 'jiexi',
      ecologicalType: 'organization manager',
      isBot: false,
      mileageType: 'core',
      organization: '@MetaMask',
    },
  ];
  const mileageOptions = useMileageOptions();
  const ecologicalOptions = useEcologicalType();

  const maxDomain = useMemo(() => {
    return getMaxDomain(dataSource);
  }, [dataSource]);
  const columns = [
    {
      title: t('analyze:metric_detail:contributor'),
      dataIndex: 'contributor',
      align: 'left',
      width: '150px',
      fixed: 'left',
    },
    {
      title: t('analyze:metric_detail:role_persona'),
      dataIndex: 'ecologicalType',
      align: 'left',
      width: '150px',
      render: (text) => {
        return ecologicalOptions.find((i) => i.value === text)?.text || text;
      },
    },
    {
      title: t('analyze:metric_detail:milestone_persona'),
      dataIndex: 'mileageType',
      render: (text) => {
        return mileageOptions.find((i) => i.value === text)?.label || text;
      },
      align: 'left',
      width: '150px',
    },
    {
      title: t('analyze:metric_detail:domain_persona'),
      dataIndex: 'contributionTypeList',
      render: (dataList, col) => {
        return (
          <DomainPersona
            maxDomain={640}
            dataList={dataList}
            name={col.contributor}
            origin={origin}
          />
        );
      },
      filters: useContributionTypeLsit(),
      filterMode: 'tree',
      align: 'left',
      width: '300px',
    },
    {
      title: t('analyze:metric_detail:organization'),
      dataIndex: 'organization',
      align: 'left',
      width: '160px',
    },
    {
      title: t('analyze:metric_detail:contribution'),
      dataIndex: 'contribution',
      key: 'contribution',
      align: 'left',
      width: '120px',
      sorter: true,
    },
  ];
  const pagination = {
    hideOnSinglePage: true,
  };
  const onChange = (key: string) => {
    console.log(key);
  };
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '贡献者详情',
      children: (
        <MyTable
          columns={columns}
          dataSource={dataSource}
          // loading={isLoading || isFetching}
          // onChange={handleTableChange}
          pagination={pagination}
          rowKey={'contributor'}
          scroll={{ x: 'max-content' }}
        />
      ),
    },
    {
      key: '2',
      label: '贡献次数分布',
      children: <Pie title={'贡献次数分布'} />,
    },
    {
      key: '3',
      label: '贡献者分布',
      children: <Pie title={'贡献者分布'} />,
    },
  ];
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
};

export default MerticTable;
