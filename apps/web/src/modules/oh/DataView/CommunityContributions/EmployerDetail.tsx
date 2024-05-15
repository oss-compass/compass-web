import React from 'react';
import MyTable from '@common/components/Table';

const EmployerDetail = () => {
  const dataSource = [
    {
      project: 'openharmony',
      repo: 'arkcompiler_ets_runtime',
      branch: 'master',
      committer: 'jiachong6@huawei.com',
      committerEmail: 'jiachong6@huawei.com',
      additions: 30,
      deletions: 3,
      sig: 'sig_compileruntime',
      isThird: null,
      createTime: '2024-05-06 21:37:04',
      mergeTime: '2024-05-06 23:40:26',
      employer: null,
    },
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
      repo: 'communication_wifi',
      branch: 'master',
      committer: 'lihui410@huawei.com',
      committerEmail: 'lihui410@huawei.com',
      additions: 1,
      deletions: 2,
      sig: 'sig_softbus',
      isThird: null,
      createTime: '2024-05-06 19:57:56',
      mergeTime: '2024-05-06 23:35:11',
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'drivers_peripheral',
      branch: 'master',
      committer: 'liangpenghui2@huawei.com',
      committerEmail: 'liangpenghui2@huawei.com',
      additions: 7,
      deletions: 5,
      sig: 'sig_driver',
      isThird: null,
      createTime: '2024-05-06 19:35:58',
      mergeTime: '2024-05-06 23:29:26',
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'drivers_peripheral',
      branch: 'master',
      committer: 'liangpenghui2@huawei.com',
      committerEmail: 'liangpenghui2@huawei.com',
      additions: 8,
      deletions: 7,
      sig: 'sig_driver',
      isThird: null,
      createTime: '2024-05-06 19:24:10',
      mergeTime: '2024-05-06 23:29:26',
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'drivers_peripheral',
      branch: 'master',
      committer: 'liangpenghui2@huawei.com',
      committerEmail: 'liangpenghui2@huawei.com',
      additions: 1,
      deletions: 2,
      sig: 'sig_driver',
      isThird: null,
      createTime: '2024-05-06 20:41:17',
      mergeTime: '2024-05-06 23:29:26',
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'drivers_peripheral',
      branch: 'master',
      committer: 'liangpenghui2@huawei.com',
      committerEmail: 'liangpenghui2@huawei.com',
      additions: 2,
      deletions: 2,
      sig: 'sig_driver',
      isThird: null,
      createTime: '2024-05-06 19:15:34',
      mergeTime: '2024-05-06 23:29:26',
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'drivers_peripheral',
      branch: 'master',
      committer: 'liangpenghui2@huawei.com',
      committerEmail: 'liangpenghui2@huawei.com',
      additions: 66,
      deletions: 22,
      sig: 'sig_driver',
      isThird: null,
      createTime: '2024-05-06 19:02:42',
      mergeTime: '2024-05-06 23:29:26',
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'drivers_peripheral',
      branch: 'master',
      committer: 'liangpenghui2@huawei.com',
      committerEmail: 'liangpenghui2@huawei.com',
      additions: 5,
      deletions: 2,
      sig: 'sig_driver',
      isThird: null,
      createTime: '2024-05-06 19:09:58',
      mergeTime: '2024-05-06 23:29:26',
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

export default EmployerDetail;
