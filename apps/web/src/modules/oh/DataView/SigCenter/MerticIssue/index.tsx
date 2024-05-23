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
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Issue 详情',
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
      label: 'Issue 解决百分比',
      children: <Pie title={'Issue 解决百分比'} />,
    },
    {
      key: '3',
      label: 'Issues 评论',
      children: <Pie title={'Issues 评论'} />,
    },
  ];
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};

export default MerticIssue;
