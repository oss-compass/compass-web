import React from 'react';
import MyTable from '@common/components/Table';

const SigDetail = () => {
  const dataSource = [
    {
      project: 'openharmony',
      repo: 'arkui_ace_engine',
      branch: 'master',
      committer: 'zhengxingyou1@huawei.com',
      committerEmail: 'zhengxingyou1@huawei.com',
      additions: 131,
      deletions: 8,
      sig: 'sig_appframework',
      isThird: null,
      createTime: '2024-05-04 04:48:01',
      mergeTime: '2024-05-06 23:37:20',
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'arkui_ace_engine',
      branch: 'master',
      committer: 'tengfan3@huawei.com',
      committerEmail: 'tengfan3@huawei.com',
      additions: 4,
      deletions: 2,
      sig: 'sig_appframework',
      isThird: null,
      createTime: '2024-05-06 21:51:26',
      mergeTime: '2024-05-06 23:26:56',
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'arkui_ace_engine',
      branch: 'master',
      committer: 'zhangzecong@huawei.com',
      committerEmail: 'zhangzecong@huawei.com',
      additions: 324,
      deletions: 55,
      sig: 'sig_appframework',
      isThird: null,
      createTime: '2024-05-06 20:03:12',
      mergeTime: '2024-05-06 23:15:31',
      employer: null,
    },
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
      repo: 'interface_sdk-js',
      branch: 'master',
      committer: 'xuyong59@huawei.com',
      committerEmail: 'xuyong59@huawei.com',
      additions: 8,
      deletions: 8,
      sig: 'sig_appframework',
      isThird: null,
      createTime: '2024-05-06 20:38:26',
      mergeTime: '2024-05-06 22:25:43',
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'arkui_ace_engine',
      branch: 'master',
      committer: 'huyisuo@huawei.com',
      committerEmail: 'huyisuo@huawei.com',
      additions: 3,
      deletions: 4,
      sig: 'sig_appframework',
      isThird: null,
      createTime: '2024-05-06 19:49:18',
      mergeTime: '2024-05-06 22:09:55',
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'interface_sdk-js',
      branch: 'master',
      committer: 'anchi1@huawei.com',
      committerEmail: 'anchi1@huawei.com',
      additions: 13,
      deletions: 7,
      sig: 'sig_appframework',
      isThird: null,
      createTime: '2024-05-06 15:57:59',
      mergeTime: '2024-05-06 21:43:58',
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'interface_sdk-js',
      branch: 'master',
      committer: 'anchi1@huawei.com',
      committerEmail: 'anchi1@huawei.com',
      additions: 10,
      deletions: 6,
      sig: 'sig_appframework',
      isThird: null,
      createTime: '2024-05-06 20:55:51',
      mergeTime: '2024-05-06 21:43:58',
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'interface_sdk-js',
      branch: 'master',
      committer: 'anchi1@huawei.com',
      committerEmail: 'anchi1@huawei.com',
      additions: 4,
      deletions: 8,
      sig: 'sig_appframework',
      isThird: null,
      createTime: '2024-05-06 16:15:33',
      mergeTime: '2024-05-06 21:43:58',
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'arkui_ace_engine',
      branch: 'master',
      committer: 'wuyinxiao@huawei.com',
      committerEmail: 'wuyinxiao@huawei.com',
      additions: 1,
      deletions: 1,
      sig: 'sig_appframework',
      isThird: null,
      createTime: '2024-05-06 20:19:22',
      mergeTime: '2024-05-06 21:43:07',
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
      title: '仓库',
      dataIndex: 'repo',
      key: 'repo',
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
      dataIndex: 'totalChanges',
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

export default SigDetail;
