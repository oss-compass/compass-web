import React from 'react';
import { Tabs } from 'antd';
import MyTable from '@common/components/Table';

const CommitDetail = () => {
  const dataSource = [];
  const columns = [
    {
      title: '单号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '描述',
      dataIndex: 'prTitle',
      key: 'prTitle',
    },
    {
      title: '提交人员',
      dataIndex: 'prCommitter',
      key: 'prCommitter',
    },
    {
      title: '提交链接',
      dataIndex: 'prUrl',
      key: 'prUrl',
    },
    {
      title: '提交时间',
      dataIndex: 'commitTime',
      key: 'commitTime',
    },
    {
      title: '合入时间',
      dataIndex: 'mergedTime',
      key: 'mergedTime',
    },
    {
      title: '代码量（千行）',
      dataIndex: 'codeLine',
      key: 'codeLine',
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
      />
    </>
  );
};
const PrDetail = () => {
  const dataSource = [];
  const columns = [
    {
      title: 'PR 链接',
      dataIndex: 'prUrl',
      key: 'prUrl',
    },
    {
      title: '描述',
      dataIndex: 'prTitle',
      key: 'prTitle',
    },
    {
      title: '提交人员',
      dataIndex: 'prCommitter',
      key: 'prCommitter',
    },
    {
      title: '提交时间',
      dataIndex: 'commitTime',
      key: 'commitTime',
    },
    {
      title: '合入时间',
      dataIndex: 'mergedTime',
      key: 'mergedTime',
    },
    {
      title: '代码量（千行）',
      dataIndex: 'codeLine',
      key: 'codeLine',
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
      />
    </>
  );
};

const CodeDetail = () => {
  const items = [
    {
      key: '1',
      label: 'Commit',
      children: <CommitDetail />,
    },
    {
      key: '2',
      label: 'PR',
      children: <PrDetail />,
    },
  ];
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};

export default CodeDetail;
