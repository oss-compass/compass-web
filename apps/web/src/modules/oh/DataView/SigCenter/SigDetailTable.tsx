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

// const MerticTable = () => {
//   const [openConfirm, setOpenConfirm] = useState(false);
//   const { t } = useTranslation();
//   return (
//     <>
//       <TableCard
//         className={'mb-0'}
//         id={'committerStatistics'}
//         title={'用户管理'}
//       >

//       </TableCard>
//     </>
//   );
// };
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
  return (
    <MyTable
      columns={columns}
      dataSource={dataSource}
      // loading={isLoading || isFetching}
      // onChange={handleTableChange}
      pagination={pagination}
      rowKey={'contributor'}
      scroll={{ x: 'max-content' }}
    />
  );
};
const MerticPr = () => {
  const { t } = useTranslation();
  const dataSource = [
    {
      closedAt: null,
      createdAt: '2024-02-16T15:21:10Z',
      idInRepo: 23005,
      labels: ['DO-NOT-MERGE', 'team-extension-platform', 'needs-dev-review'],
      mergeAuthorLogin: null,
      numReviewComments: 0,
      repository: 'https://github.com/MetaMask/metamask-extension',
      reviewersLogin: [],
      state: 'open',
      timeToCloseDays: null,
      timeToFirstAttentionWithoutBot: null,
      title: 'feat: Delay network controller provider initialization',
      url: 'https://github.com/MetaMask/metamask-extension/pull/23005',
      userLogin: 'pedronfigueiredo',
    },
    {
      closedAt: null,
      createdAt: '2024-03-26T19:55:08Z',
      idInRepo: 23744,
      labels: ['external-contributor'],
      mergeAuthorLogin: null,
      numReviewComments: 0,
      repository: 'https://github.com/MetaMask/metamask-extension',
      reviewersLogin: [],
      state: 'open',
      timeToCloseDays: null,
      timeToFirstAttentionWithoutBot: null,
      title: 'feat: add IoTeX logo and update config',
      url: 'https://github.com/MetaMask/metamask-extension/pull/23744',
      userLogin: 'nicky-ru',
    },
    {
      closedAt: null,
      createdAt: '2024-04-01T19:11:31Z',
      idInRepo: 23824,
      labels: ['team-extension-platform'],
      mergeAuthorLogin: null,
      numReviewComments: 0,
      repository: 'https://github.com/MetaMask/metamask-extension',
      reviewersLogin: [],
      state: 'open',
      timeToCloseDays: null,
      timeToFirstAttentionWithoutBot: null,
      title: 'refactor: convert `jazzicon.component.js` to typescript',
      url: 'https://github.com/MetaMask/metamask-extension/pull/23824',
      userLogin: 'davidmurdoch',
    },
    {
      closedAt: null,
      createdAt: '2024-03-18T13:30:42Z',
      idInRepo: 23549,
      labels: ['INVALID-PR-TEMPLATE'],
      mergeAuthorLogin: null,
      numReviewComments: 0,
      repository: 'https://github.com/MetaMask/metamask-extension',
      reviewersLogin: [],
      state: 'open',
      timeToCloseDays: null,
      timeToFirstAttentionWithoutBot: null,
      title: 'Fix confirmation estimate numbers 4',
      url: 'https://github.com/MetaMask/metamask-extension/pull/23549',
      userLogin: 'danjm',
    },
    {
      closedAt: null,
      createdAt: '2024-03-20T19:36:59Z',
      idInRepo: 23615,
      labels: ['team-extension-platform'],
      mergeAuthorLogin: null,
      numReviewComments: 0,
      repository: 'https://github.com/MetaMask/metamask-extension',
      reviewersLogin: [],
      state: 'open',
      timeToCloseDays: null,
      timeToFirstAttentionWithoutBot: null,
      title: 'feat: Speed up wallet onboarding for developers',
      url: 'https://github.com/MetaMask/metamask-extension/pull/23615',
      userLogin: 'pedronfigueiredo',
    },
    {
      closedAt: null,
      createdAt: '2024-03-06T20:38:41Z',
      idInRepo: 23356,
      labels: [],
      mergeAuthorLogin: null,
      numReviewComments: 0,
      repository: 'https://github.com/MetaMask/metamask-extension',
      reviewersLogin: [],
      state: 'open',
      timeToCloseDays: null,
      timeToFirstAttentionWithoutBot: null,
      title: 'Add third party details for offchain signatures',
      url: 'https://github.com/MetaMask/metamask-extension/pull/23356',
      userLogin: '409H',
    },
    {
      closedAt: null,
      createdAt: '2024-04-01T19:05:30Z',
      idInRepo: 23823,
      labels: ['team-extension-platform'],
      mergeAuthorLogin: null,
      numReviewComments: 2,
      repository: 'https://github.com/MetaMask/metamask-extension',
      reviewersLogin: ['DDDDDanica', 'davidmurdoch'],
      state: 'open',
      timeToCloseDays: null,
      timeToFirstAttentionWithoutBot: 29.66,
      title: 'refactor: convert `icon-factory.js` to typescript',
      url: 'https://github.com/MetaMask/metamask-extension/pull/23823',
      userLogin: 'davidmurdoch',
    },
    {
      closedAt: null,
      createdAt: '2024-03-21T08:37:59Z',
      idInRepo: 23620,
      labels: ['team-shared-libraries'],
      mergeAuthorLogin: null,
      numReviewComments: 10,
      repository: 'https://github.com/MetaMask/metamask-extension',
      reviewersLogin: ['mikesposito', 'Gudahtt', 'mcmire', 'kanthesha'],
      state: 'open',
      timeToCloseDays: null,
      timeToFirstAttentionWithoutBot: 5.39,
      title:
        'refactor(preferences-controller): remove `syncIdentities` and `setAddresses`',
      url: 'https://github.com/MetaMask/metamask-extension/pull/23620',
      userLogin: 'mikesposito',
    },
    {
      closedAt: null,
      createdAt: '2024-04-23T16:09:40Z',
      idInRepo: 24199,
      labels: ['team-accounts'],
      mergeAuthorLogin: null,
      numReviewComments: 10,
      repository: 'https://github.com/MetaMask/metamask-extension',
      reviewersLogin: ['ccharly', 'gantunesr', 'legobeat', 'montelaidev'],
      state: 'open',
      timeToCloseDays: null,
      timeToFirstAttentionWithoutBot: 0.89,
      title: 'chore(deps): bump keyring controller to ^15.0.0',
      url: 'https://github.com/MetaMask/metamask-extension/pull/24199',
      userLogin: 'montelaidev',
    },
    {
      closedAt: null,
      createdAt: '2024-05-02T09:03:53Z',
      idInRepo: 24340,
      labels: ['team-transactions'],
      mergeAuthorLogin: null,
      numReviewComments: 0,
      repository: 'https://github.com/MetaMask/metamask-extension',
      reviewersLogin: ['davibroc'],
      state: 'open',
      timeToCloseDays: null,
      timeToFirstAttentionWithoutBot: null,
      title: 'feat: post-MVP updates for Smart Transactions',
      url: 'https://github.com/MetaMask/metamask-extension/pull/24340',
      userLogin: 'dan437',
    },
  ];
  const stateOption = useStateType();
  const columns = [
    {
      title: t('analyze:metric_detail:pr_title'),
      dataIndex: 'title',
      align: 'left',
      width: '200px',
      sorter: true,
      fixed: 'left',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      align: 'left',
      width: '220px',
    },
    {
      title: t('analyze:metric_detail:state'),
      dataIndex: 'state',
      align: 'left',
      width: '100px',
      filters: stateOption,
      sorter: true,
      render: (text) => {
        return stateOption.find((i) => i.value === text)?.text || text;
      },
    },
    {
      title: t('analyze:metric_detail:created_time'),
      dataIndex: 'createdAt',
      align: 'left',
      width: '140px',
      sorter: true,
      render: (time) => (time ? format(parseJSON(time)!, 'yyyy-MM-dd') : ''),
    },
    {
      title: t('analyze:metric_detail:close_time'),
      dataIndex: 'closedAt',
      align: 'left',
      width: '120px',
      sorter: true,
      render: (time) => (time ? format(parseJSON(time)!, 'yyyy-MM-dd') : ''),
    },
    {
      title: t('analyze:metric_detail:processing_time'),
      dataIndex: 'timeToCloseDays',
      align: 'left',
      width: '200px',
      sorter: true,
    },
    {
      title: t('analyze:metric_detail:first_response_time'),
      dataIndex: 'timeToFirstAttentionWithoutBot',
      align: 'left',
      width: '220px',
      sorter: true,
    },
    {
      title: t('analyze:metric_detail:comments_count'),
      dataIndex: 'numReviewComments',
      align: 'left',
      width: '160px',
      sorter: true,
    },
    {
      title: t('analyze:metric_detail:tags'),
      dataIndex: 'labels',
      align: 'left',
      width: '100px',
      render: (list) => list?.join(', ') || '',
    },
    {
      title: t('analyze:metric_detail:creator'),
      dataIndex: 'userLogin',
      align: 'left',
      width: '100px',
    },
    {
      title: t('analyze:metric_detail:reviewer'),
      dataIndex: 'reviewersLogin',
      align: 'left',
      width: '100px',
      render: (list) => list?.join(',') || '',
    },
    {
      title: t('analyze:metric_detail:merge_author'),
      dataIndex: 'mergeAuthorLogin',
      align: 'left',
      width: '140px',
    },
  ];
  const pagination = {
    hideOnSinglePage: true,
  };
  return (
    <MyTable
      columns={columns}
      dataSource={dataSource}
      // loading={isLoading || isFetching}
      // onChange={handleTableChange}
      pagination={pagination}
      rowKey={'contributor'}
      scroll={{ x: 'max-content' }}
    />
  );
};
const MerticIssue = () => {
  const { t } = useTranslation();
  const dataSource = [
    {
      assigneeLogin: null,
      closedAt: null,
      createdAt: '2023-11-23T13:32:34Z',
      idInRepo: 21987,
      labels: [
        'area-documentation',
        'team-extension-platform',
        'INVALID-ISSUE-TEMPLATE',
      ],
      numOfCommentsWithoutBot: null,
      repository: 'https://github.com/MetaMask/metamask-extension',
      state: 'open',
      timeToCloseDays: null,
      timeToFirstAttentionWithoutBot: null,
      title:
        'Advanced settings: Check “Show conversion on test networks” toggle works correctly',
      url: 'https://github.com/MetaMask/metamask-extension/issues/21987',
      userLogin: 'chloeYue',
    },
    {
      assigneeLogin: null,
      closedAt: null,
      createdAt: '2023-11-23T13:35:11Z',
      idInRepo: 21995,
      labels: [
        'area-documentation',
        'team-extension-platform',
        'INVALID-ISSUE-TEMPLATE',
      ],
      numOfCommentsWithoutBot: null,
      repository: 'https://github.com/MetaMask/metamask-extension',
      state: 'open',
      timeToCloseDays: null,
      timeToFirstAttentionWithoutBot: null,
      title: 'General settings: Current Language',
      url: 'https://github.com/MetaMask/metamask-extension/issues/21995',
      userLogin: 'chloeYue',
    },
    {
      assigneeLogin: 'georgewrmarshall',
      closedAt: null,
      createdAt: '2023-12-10T21:28:03Z',
      idInRepo: 22223,
      labels: ['team-design-system'],
      numOfCommentsWithoutBot: 1,
      repository: 'https://github.com/MetaMask/metamask-extension',
      state: 'open',
      timeToCloseDays: null,
      timeToFirstAttentionWithoutBot: 0.69,
      title:
        'Update Instances of ModalContent to Use New Padding and Scrolling Behavior',
      url: 'https://github.com/MetaMask/metamask-extension/issues/22223',
      userLogin: 'georgewrmarshall',
    },
    {
      assigneeLogin: null,
      closedAt: null,
      createdAt: '2024-02-29T15:15:35Z',
      idInRepo: 23245,
      labels: [
        'type-bug',
        'area-Sentry',
        'Sev2-normal',
        'team-extension-platform',
        'regression-prod-11.10.0',
      ],
      numOfCommentsWithoutBot: null,
      repository: 'https://github.com/MetaMask/metamask-extension',
      state: 'open',
      timeToCloseDays: null,
      timeToFirstAttentionWithoutBot: null,
      title:
        "[Sentry] TypeError: Cannot read properties of undefined (reading 'preventDefault')",
      url: 'https://github.com/MetaMask/metamask-extension/issues/23245',
      userLogin: 'sentry-io[bot]',
    },
    {
      assigneeLogin: null,
      closedAt: null,
      createdAt: '2024-03-05T05:19:46Z',
      idInRepo: 23303,
      labels: ['external-contributor', 'INVALID-ISSUE-TEMPLATE'],
      numOfCommentsWithoutBot: null,
      repository: 'https://github.com/MetaMask/metamask-extension',
      state: 'open',
      timeToCloseDays: null,
      timeToFirstAttentionWithoutBot: null,
      title:
        'Hidden Accounts Drop-Menu Persistence Issue After Deleting Accounts',
      url: 'https://github.com/MetaMask/metamask-extension/issues/23303',
      userLogin: 'WantenMN',
    },
    {
      assigneeLogin: 'mikesposito',
      closedAt: null,
      createdAt: '2024-02-29T15:22:29Z',
      idInRepo: 23246,
      labels: ['team-shared-libraries', 'INVALID-ISSUE-TEMPLATE'],
      numOfCommentsWithoutBot: null,
      repository: 'https://github.com/MetaMask/metamask-extension',
      state: 'open',
      timeToCloseDays: null,
      timeToFirstAttentionWithoutBot: null,
      title:
        'Update `KeyringController` and remove redundant `PreferencesController.updateIdentities` calls',
      url: 'https://github.com/MetaMask/metamask-extension/issues/23246',
      userLogin: 'mikesposito',
    },
    {
      assigneeLogin: null,
      closedAt: null,
      createdAt: '2024-03-08T22:04:38Z',
      idInRepo: 23404,
      labels: [],
      numOfCommentsWithoutBot: null,
      repository: 'https://github.com/MetaMask/metamask-extension',
      state: 'open',
      timeToCloseDays: null,
      timeToFirstAttentionWithoutBot: null,
      title:
        '[development] pop up an OS notification when a development build finishes',
      url: 'https://github.com/MetaMask/metamask-extension/issues/23404',
      userLogin: 'BelfordZ',
    },
    {
      assigneeLogin: null,
      closedAt: null,
      createdAt: '2024-02-06T23:24:17Z',
      idInRepo: 22837,
      labels: [
        'type-bug',
        'Sev2-normal',
        'hardware-ledger',
        'regression-RC',
        'team-hardware-wallets',
        'regression-prod-11.9.0',
        'release-11.10.0',
      ],
      numOfCommentsWithoutBot: 1,
      repository: 'https://github.com/MetaMask/metamask-extension',
      state: 'open',
      timeToCloseDays: null,
      timeToFirstAttentionWithoutBot: 0.87,
      title:
        '[Bug]: Unable to pair to Ledger a second time after removing accounts',
      url: 'https://github.com/MetaMask/metamask-extension/issues/22837',
      userLogin: 'plasmacorral',
    },
    {
      assigneeLogin: 'benjisclowder',
      closedAt: null,
      createdAt: '2024-01-29T13:43:58Z',
      idInRepo: 22696,
      labels: ['team-extension-platform'],
      numOfCommentsWithoutBot: null,
      repository: 'https://github.com/MetaMask/metamask-extension',
      state: 'open',
      timeToCloseDays: null,
      timeToFirstAttentionWithoutBot: null,
      title:
        'RCA on #13738 [Sentry] [Bug] Bug/Error: div() number type has more than 15 significant digits',
      url: 'https://github.com/MetaMask/metamask-extension/issues/22696',
      userLogin: 'benjisclowder',
    },
    {
      assigneeLogin: 'benjisclowder',
      closedAt: null,
      createdAt: '2024-01-30T11:34:36Z',
      idInRepo: 22725,
      labels: ['team-extension-platform'],
      numOfCommentsWithoutBot: null,
      repository: 'https://github.com/MetaMask/metamask-extension',
      state: 'open',
      timeToCloseDays: null,
      timeToFirstAttentionWithoutBot: null,
      title:
        'RCA on #21904 ([Bug]: After changing network and then back to Mainnet, fetching swap quotes on non-native token is getting call revert exception)',
      url: 'https://github.com/MetaMask/metamask-extension/issues/22725',
      userLogin: 'benjisclowder',
    },
  ];
  const stateOption = useStateType();
  const columns = [
    {
      title: t('analyze:metric_detail:issue_title'),
      dataIndex: 'title',
      align: 'left',
      width: '200px',
      sorter: true,
      fixed: 'left',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      align: 'left',
      width: '220px',
    },
    {
      title: t('analyze:metric_detail:state'),
      dataIndex: 'state',
      align: 'left',
      width: '100px',
      sorter: true,
      filters: stateOption,
      render: (text) => {
        return stateOption.find((i) => i.value === text)?.text || text;
      },
    },
    {
      title: t('analyze:metric_detail:created_time'),
      dataIndex: 'createdAt',
      align: 'left',
      sorter: true,
      width: '140px',
      render: (time) => format(parseJSON(time)!, 'yyyy-MM-dd'),
    },
    {
      title: t('analyze:metric_detail:close_time'),
      dataIndex: 'closedAt',
      align: 'left',
      sorter: true,
      width: '120px',
      render: (time) => (time ? format(parseJSON(time)!, 'yyyy-MM-dd') : ''),
    },
    {
      title: t('analyze:metric_detail:processing_time'),
      dataIndex: 'timeToCloseDays',
      align: 'left',
      sorter: true,
      width: '200px',
    },
    {
      title: t('analyze:metric_detail:first_response_time'),
      dataIndex: 'timeToFirstAttentionWithoutBot',
      align: 'left',
      sorter: true,
      width: '220px',
    },
    {
      title: t('analyze:metric_detail:comments_count'),
      dataIndex: 'numOfCommentsWithoutBot',
      align: 'left',
      sorter: true,
      width: '160px',
    },
    {
      title: t('analyze:metric_detail:tags'),
      dataIndex: 'labels',
      align: 'left',
      render: (list) => list?.join(', ') || '',
      width: '100px',
    },
    {
      title: t('analyze:metric_detail:creator'),
      dataIndex: 'userLogin',
      align: 'left',
      width: '100px',
    },
    {
      title: t('analyze:metric_detail:assignee'),
      dataIndex: 'assigneeLogin',
      align: 'left',
      width: '100px',
    },
  ];
  const pagination = {
    hideOnSinglePage: true,
  };
  return (
    <MyTable
      columns={columns}
      dataSource={dataSource}
      // loading={isLoading || isFetching}
      // onChange={handleTableChange}
      pagination={pagination}
      rowKey={'contributor'}
      scroll={{ x: 'max-content' }}
    />
  );
};
const SigDetailTable = ({ sigInfo }) => {
  const onChange = (key: string) => {
    console.log(key);
  };
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '贡献者',
      children: <MerticTable />,
    },
    {
      key: '2',
      label: 'Issue',
      children: <MerticIssue />,
    },
    {
      key: '3',
      label: 'PR',
      children: <MerticPr />,
    },
  ];
  return (
    <TableCard
      className={'mb-0 min-h-[calc(100vh-164px)]'}
      id={'committerStatistics'}
      title={sigInfo['ID'] + ' SIG 洞察详情'}
    >
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </TableCard>
  );
};
export default SigDetailTable;
