import React from 'react';
import MyTable from '@common/components/Table';
import useGetTableOption from '@modules/oh/hooks/useGetTableOption';
import {
  useCodesDetailPageQuery,
  CodeDetail,
  FilterOptionInput,
  SortOptionInput,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
import useQueryDateRange from '@modules/oh/hooks/useQueryDateRange';
// const CommitDetail = () => {
//   const dataSource = [];
//   const columns = [
//     {
//       title: '单号',
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//       title: '描述',
//       dataIndex: 'prTitle',
//       key: 'prTitle',
//     },
//     {
//       title: '提交人员',
//       dataIndex: 'prCommitter',
//       key: 'prCommitter',
//     },
//     {
//       title: '提交链接',
//       dataIndex: 'prUrl',
//       key: 'prUrl',
//     },
//     {
//       title: '提交时间',
//       dataIndex: 'commitTime',
//       key: 'commitTime',
//     },
//     {
//       title: '合入时间',
//       dataIndex: 'mergedTime',
//       key: 'mergedTime',
//     },
//     {
//       title: '代码量（千行）',
//       dataIndex: 'codeLine',
//       key: 'codeLine',
//     },
//   ];
//   const pagination = {
//     hideOnSinglePage: true,
//   };
//   return (
//     <>
//       <MyTable
//         columns={columns}
//         dataSource={dataSource}
//         //   loading={isLoading || isFetching}
//         //   onChange={handleTableChange}
//         pagination={pagination}
//         rowKey={'key'}
//         scroll={{ x: 'max-content' }}
//       />
//     </>
//   );
// };
// const PrDetail = () => {
//   const dataSource = [];
//   const columns = [
//     {
//       title: 'PR 链接',
//       dataIndex: 'prUrl',
//       key: 'prUrl',
//     },
//     {
//       title: '描述',
//       dataIndex: 'prTitle',
//       key: 'prTitle',
//     },
//     {
//       title: '提交人员',
//       dataIndex: 'prCommitter',
//       key: 'prCommitter',
//     },
//     {
//       title: '提交时间',
//       dataIndex: 'commitTime',
//       key: 'commitTime',
//     },
//     {
//       title: '合入时间',
//       dataIndex: 'mergedTime',
//       key: 'mergedTime',
//     },
//     {
//       title: '代码量（千行）',
//       dataIndex: 'codeLine',
//       key: 'codeLine',
//     },
//   ];
//   const pagination = {
//     hideOnSinglePage: true,
//   };
//   return (
//     <>
//       <MyTable
//         columns={columns}
//         dataSource={dataSource}
//         //   loading={isLoading || isFetching}
//         //   onChange={handleTableChange}
//         pagination={pagination}
//         rowKey={'key'}
//         scroll={{ x: 'max-content' }}
//       />
//     </>
//   );
// };
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
const CodeDetails = ({ name }) => {
  const { timeStart, timeEnd } = useQueryDateRange();
  const {
    tableData,
    setData,
    tableParams,
    setTableParams,
    query,
    handleTableChange,
  } = useGetTableOption<CodeDetail>(
    {
      beginDate: timeStart,
      endDate: timeEnd,
      label: name,
      level: 'repo',
    }
    // {
    //   filterOpts: [
    //     {
    //       type: 'repo_name',
    //       values: [name],
    //     },
    //   ],
    // }
  );
  const columns = [
    {
      title: '提交人',
      dataIndex: 'userLogin',
      key: 'userLogin',
    },
    {
      title: 'PR 地址',
      dataIndex: 'url',
      key: 'url',
      width: 200,
      render: (text, record: any, index: number) => {
        return (
          <div>
            <a
              onClick={() => text && window.open(text, '_blank')}
              className="text-[#3e8eff] hover:text-[#3e8eff] hover:underline"
            >
              {text}
            </a>
          </div>
        );
      },
    },
    // {
    //   title: 'Commit 地址',
    //   dataIndex: 'commitUrls',
    //   key: 'commitUrls',
    //   width: 200,
    // },
    {
      title: '提交时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => {
        return text ? text.slice(0, 10) : '';
      },
    },
    {
      title: 'Issue 地址',
      dataIndex: 'issueNum',
      key: 'issueNum',
      width: 200,
    },
    {
      title: 'Issue 标题',
      dataIndex: 'title',
      key: 'title',
      width: 200,
    },
    {
      title: '修改代码量 (增 + 删)',
      dataIndex: 'linesTotal',
      key: 'linesTotal',
    },
    // {
    //   title: 'Tag',
    //   dataIndex: 'tag',
    //   key: 'tag',
    // },
    {
      title: '合入时间',
      dataIndex: 'mergedAt',
      key: 'mergedAt',
      render: (text) => {
        return text ? text.slice(0, 10) : '';
      },
    },
  ];
  const { isLoading, isFetching } = useCodesDetailPageQuery(
    client,
    query as TableQuery,
    {
      onSuccess: (data) => {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data.codesDetailPage.count as number,
          },
        });
        setData(data.codesDetailPage.items);
      },
    }
  );
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

export default CodeDetails;
