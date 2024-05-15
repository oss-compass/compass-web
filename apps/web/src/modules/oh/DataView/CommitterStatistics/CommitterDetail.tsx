import React from 'react';
import MyTable from '@common/components/Table';

const CommitDetail = () => {
  const dataSource = [
    {
      committerName: 'yangzk',
      prId: 10910351,
      pr: 7728,
      prLink:
        'https://gitee.com/openharmony/ability_ability_runtime/pulls/7728',
      prState: 'merged',
      issueNo: 'I94I4J',
      issueLink:
        'https://gitee.com/openharmony/ability_ability_runtime/issues/I94I4J',
      reviewTime: '2024-05-15 10:21:53',
      changedAdditions: 578,
      changedDeletions: 77,
      prBugCount: 0,
      prNoteCount: 1,
      prSumBugCount: 0,
      prDefectDensity: '0%',
      prReviewTime: 26.46,
      prOwnerName: 'yangzk',
      prOwnerLogin: 'yzkp',
      prOwnerEmail: null,
      diffCommentCount: null,
    },
  ];
  const columns = [
    {
      title: '名称',
      dataIndex: 'committerName',
      key: 'committerName',
    },
    {
      title: 'PR 创建人',
      dataIndex: 'prOwnerName',
      key: 'prOwnerName',
    },
    {
      title: 'PrID',
      dataIndex: 'prId',
      key: 'prId',
    },
    {
      title: 'PR 仓库内编号',
      dataIndex: 'pr',
      key: 'pr',
    },
    {
      title: 'PR 状态',
      dataIndex: 'prState',
      key: 'prState',
    },
    {
      title: 'IssueNo',
      dataIndex: 'issueNo',
      key: 'issueNo',
    },
    {
      title: '检视时间',
      dataIndex: 'reviewTime',
      key: 'reviewTime',
    },
    {
      title: '检视 PR 新增代码量 (行)',
      dataIndex: 'changedAdditions',
      key: 'changedAdditions',
    },
    {
      title: '检视 PR 删除代码量 (行)',
      dataIndex: 'changedDeletions',
      key: 'changedDeletions',
    },
    {
      title: '检视评论数',
      dataIndex: 'diffCommentCount',
      key: 'diffCommentCount',
    },
    {
      title: '检视缺陷数',
      dataIndex: 'prBugCount',
      key: 'prBugCount',
    },
    {
      title: 'PR 缺陷总数',
      dataIndex: 'prSumBugCount',
      key: 'prSumBugCount',
    },
    {
      title: '检视缺陷占比 (%)',
      dataIndex: 'prDefectDensity',
      key: 'prDefectDensity',
    },
    {
      title: '检视时长 (小时)',
      dataIndex: 'prReviewTime',
      key: 'prReviewTime',
    },
  ];
  const pagination = {
    hideOnSinglePage: true,
  };
  return (
    <>
      <MyTable
        columns={columns}
        dataSource={dataSource}
        //   loading={isLoading || isFetching}
        //   onChange={handleTableChange}
        pagination={pagination}
        rowKey={'key'}
        scroll={{ x: 'max-content' }}
        style={{ height: '300px' }}
      />
    </>
  );
};

export default CommitDetail;
