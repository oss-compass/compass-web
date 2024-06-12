import React from 'react';
import MyTable from '@common/components/Table';
import useGetTableOption from '@modules/oh/hooks/useGetTableOption';
import {
  useCommitsDetailDataListQuery,
  CommitDetail,
  FilterOptionInput,
  SortOptionInput,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
import ContributorDropdown from '@modules/analyze/DataView/MetricDetail/MetricContributor/ContributorTable/ContributorDropdown';
import useQueryDateRange from '@modules/oh/hooks/useQueryDateRange';
interface TableQuery {
  label: string;
  level?: string;
  branch?: string;
  page?: number;
  per?: number;
  filterOpts?: FilterOptionInput | FilterOptionInput[];
  sortOpts?: SortOptionInput | SortOptionInput[];
  beginDate?: any;
  endDate?: any;
}
const CommitDetailTable = ({ authorEmail }) => {
  const { timeStart, timeEnd } = useQueryDateRange();
  const {
    tableData,
    setData,
    tableParams,
    setTableParams,
    query,
    handleTableChange,
  } = useGetTableOption<CommitDetail>(
    {
      beginDate: timeStart,
      endDate: timeEnd,
      label: 'openharmony-tpc',
      level: 'community',
    },
    {
      filterOpts: [
        {
          type: 'author_email',
          values: [authorEmail],
        },
      ],
    }
  );
  const { isLoading, isFetching } = useCommitsDetailDataListQuery(
    client,
    query as TableQuery,
    {
      onSuccess: (data) => {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data.commitsDetailPage.count as number,
          },
        });
        setData(data.commitsDetailPage.items);
      },
    }
  );
  const columns = [
    {
      title: '提交人',
      dataIndex: 'authorEmail',
      key: 'authorEmail',
    },
    {
      title: 'commit 新增代码量',
      dataIndex: 'linesAdded',
      key: 'linesAdded',
    },
    {
      title: 'commit 删除代码量',
      dataIndex: 'linesRemoved',
      key: 'linesRemoved',
    },
    {
      title: '修改代码量 (增 + 删)',
      dataIndex: 'linesChanged',
      key: 'linesChanged',
    },
    {
      title: '提交时间',
      dataIndex: 'grimoireCreationDate',
      key: 'grimoireCreationDate',
    },
    {
      title: '合入时间',
      dataIndex: 'mergedAt',
      key: 'mergedAt',
    },
  ];

  return (
    <>
      <MyTable
        columns={columns}
        dataSource={tableData}
        loading={isLoading || isFetching}
        onChange={handleTableChange}
        pagination={tableParams.pagination}
        rowKey={'key'}
        scroll={{ x: 'max-content' }}
        style={{ minHeight: '300px' }}
      />
    </>
  );
};

export default CommitDetailTable;
