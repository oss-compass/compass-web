import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import Dialog from '@common/components/Dialog';
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
import CommitDetails from './CommitDetails';

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
const RepoDetail = ({ label }) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const { timeStart, timeEnd } = useQueryDateRange();
  const [commitInfo, setCommitInfo] = useState<CommitDetail>(null);

  const {
    tableData,
    setData,
    tableParams,
    setTableParams,
    query,
    handleTableChange,
  } = useGetTableOption<CommitDetail>({
    beginDate: timeStart,
    endDate: timeEnd,
    label: label,
    level: 'repo',
  });
  const columns = [
    {
      title: 'Commit Hash',
      dataIndex: 'commitHash',
      key: 'commitHash',
      width: 100,
      render: (text, record: any, index: number) => {
        return (
          <div
            className="w-40"
            onClick={() => {
              setCommitInfo(record);
              setOpenConfirm(true);
            }}
          >
            <a className="text-[#3e8eff] hover:text-[#3e8eff] hover:underline">
              {text}
            </a>
          </div>
        );
      },
    },
    {
      title: '关联 PR',
      dataIndex: 'prUrl',
      key: 'prUrl',
      width: 160,
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
      render: (text) => {
        return text ? text.slice(0, 10) : '';
      },
    },
    {
      title: '合入时间',
      dataIndex: 'mergedAt',
      key: 'mergedAt',
      render: (text) => {
        return text ? text.slice(0, 10) : '';
      },
    },
  ];
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
      <Dialog
        open={openConfirm}
        classes={{
          paper: classnames(
            'border w-[55%] !max-w-[55%] min-h-[400px] !m-0',
            'md:w-full md:h-full md:!m-0 md:!min-h-full md:border-none'
          ),
        }}
        dialogTitle={
          <>
            <p className=""></p>
            <div
              className="absolute right-6 top-4 cursor-pointer p-2"
              onClick={() => {
                setOpenConfirm(false);
              }}
            >
              <GrClose className="text-base" />
            </div>
          </>
        }
        dialogContent={<CommitDetails commitInfo={commitInfo} />}
        handleClose={() => {
          setOpenConfirm(false);
        }}
      />
    </>
  );
};

export default RepoDetail;
