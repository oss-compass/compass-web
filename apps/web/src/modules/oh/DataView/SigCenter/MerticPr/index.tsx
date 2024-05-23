import React, { useState, useRef, useMemo } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import MyTable from '@common/components/Table';
import { useStateType } from '@modules/analyze/DataView/MetricDetail/MetricPr/PR';
import { format, parseJSON } from 'date-fns';
import Pie from './MetricPie';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const MerticIssue = () => {
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
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'PR 详情',
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
      label: 'PR 解决百分比',
      children: <Pie title={'PR 解决百分比'} />,
    },
    {
      key: '3',
      label: 'PR 评论',
      children: <Pie title={'PR 评论'} />,
    },
  ];
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};

export default MerticIssue;
