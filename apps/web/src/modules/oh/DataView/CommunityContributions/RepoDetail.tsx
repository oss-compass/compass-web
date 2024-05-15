import React from 'react';
import MyTable from '@common/components/Table';

const RepoDetail = () => {
  const dataSource = [
    {
      project: 'openharmony',
      repo: 'ability_ability_runtime',
      branch: 'master',
      committer: 'huyingsongstyle@163.com',
      committerEmail: 'huyingsongstyle@163.com',
      additions: 18,
      deletions: 14,
      sig: 'sig_appframework',
      isThird: null,
      createTime: '2024-05-06 22:16:33',
      mergeTime: '2024-05-06 22:55:35',
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'ability_ability_runtime',
      branch: 'master',
      committer: 'xuzheheng2@huawei.com',
      committerEmail: 'xuzheheng2@huawei.com',
      additions: 8,
      deletions: 2,
      sig: 'sig_appframework',
      isThird: null,
      createTime: '2024-05-06 19:57:45',
      mergeTime: '2024-05-06 21:05:53',
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'ability_ability_runtime',
      branch: 'master',
      committer: 'huzeshan@huawei.com',
      committerEmail: 'huzeshan@huawei.com',
      additions: 4,
      deletions: 4,
      sig: 'sig_appframework',
      isThird: null,
      createTime: '2024-05-05 14:52:52',
      mergeTime: '2024-05-06 20:50:44',
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'ability_ability_runtime',
      branch: 'master',
      committer: 'duansizhao@huawei.com',
      committerEmail: 'duansizhao@huawei.com',
      additions: 277,
      deletions: 3,
      sig: 'sig_appframework',
      isThird: null,
      createTime: '2024-05-05 16:51:57',
      mergeTime: '2024-05-05 20:54:18',
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'ability_ability_runtime',
      branch: 'master',
      committer: 'wangzhen346@huawei.com',
      committerEmail: 'wangzhen346@huawei.com',
      additions: 247,
      deletions: 270,
      sig: 'sig_appframework',
      isThird: null,
      createTime: '2024-05-01 14:09:26',
      mergeTime: '2024-05-05 14:56:15',
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'ability_ability_runtime',
      branch: 'master',
      committer: 'zhangyuhang72@huawei.com',
      committerEmail: 'zhangyuhang72@huawei.com',
      additions: 605,
      deletions: 5,
      sig: 'sig_appframework',
      isThird: null,
      createTime: '2024-05-01 18:30:33',
      mergeTime: '2024-05-05 12:28:36',
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'ability_ability_runtime',
      branch: 'master',
      committer: 'xinxin13@huawei.com',
      committerEmail: 'xinxin13@huawei.com',
      additions: 2,
      deletions: 24,
      sig: 'sig_appframework',
      isThird: null,
      createTime: '2024-05-04 10:18:57',
      mergeTime: '2024-05-04 15:15:59',
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'ability_ability_runtime',
      branch: 'master',
      committer: 'wangkailong6@huawei.com',
      committerEmail: 'wangkailong6@huawei.com',
      additions: 309,
      deletions: 22,
      sig: 'sig_appframework',
      isThird: null,
      createTime: '2024-05-02 22:28:35',
      mergeTime: '2024-05-04 12:50:51',
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'ability_ability_runtime',
      branch: 'master',
      committer: 'xinxin13@huawei.com',
      committerEmail: 'xinxin13@huawei.com',
      additions: 501,
      deletions: 49,
      sig: 'sig_appframework',
      isThird: null,
      createTime: '2024-05-03 15:40:24',
      mergeTime: '2024-05-03 18:37:01',
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'ability_ability_runtime',
      branch: 'master',
      committer: 'xialiangwei1@huawei.com',
      committerEmail: 'xialiangwei1@huawei.com',
      additions: 4,
      deletions: 1,
      sig: 'sig_appframework',
      isThird: null,
      createTime: '2024-05-01 21:15:46',
      mergeTime: '2024-05-03 17:30:06',
      employer: null,
    },
  ];
  const columns = [
    {
      title: '提交人',
      dataIndex: 'committer',
      key: 'committer',
    },
    {
      title: 'commit 新增代码量',
      dataIndex: 'additions',
      key: 'additions',
    },
    {
      title: 'commit 删除代码量',
      dataIndex: 'deletions',
      key: 'deletions',
    },
    {
      title: '修改代码量 (增 + 删)',
      key: 'totalAdditions',
      render: (text: string, record: any, index: number) => {
        return record.additions + record.deletions;
      },
    },
    {
      title: '提交时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '合入时间',
      dataIndex: 'mergeTime',
      key: 'mergeTime',
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
        style={{ minHeight: '300px' }}
      />
    </>
  );
};

export default RepoDetail;
