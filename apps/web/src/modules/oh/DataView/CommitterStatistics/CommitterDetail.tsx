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
      title: 'PR 新增代码量 (行)',
      dataIndex: 'changedAdditions',
      key: 'changedAdditions',
    },
    {
      title: 'PR 删除代码量 (行)',
      dataIndex: 'changedDeletions',
      key: 'changedDeletions',
    },
    {
      title: 'PR 评论数',
      dataIndex: 'diffCommentCount',
      key: 'diffCommentCount',
    },
    {
      title: 'PR 响应时间',
      dataIndex: 'prBugCount',
      key: 'prBugCount',
    },
    {
      title: 'PR 关闭时间',
      dataIndex: 'prSumBugCount',
      key: 'prSumBugCount',
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
