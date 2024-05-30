import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import Dialog from '@common/components/Dialog';
import TableCard from '@modules/oh/components/TableCard';
import MyTable from '@common/components/Table';
import ApproveDetail from './ApproveDetail';
import {
  useCommitFeedbackPageQuery,
  CommitFeedback,
  FilterOptionInput,
  SortOptionInput,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
import useQueryDateRange from '@modules/oh/hooks/useQueryDateRange';
import useGetTableOption from '@modules/oh/hooks/useGetTableOption';
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
const ApproveTable = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [orgName, setOrgName] = useState('');
  const { timeStart, timeEnd } = useQueryDateRange();

  const {
    tableData,
    setData,
    tableParams,
    setTableParams,
    query,
    handleTableChange,
  } = useGetTableOption<CommitFeedback>({
    beginDate: timeStart,
    endDate: timeEnd,
    label: 'openharmony-tpc',
    level: 'community',
  });
  const columns = [
    {
      title: 'Commit Hash',
      dataIndex: 'commitHash',
      key: 'commitHash',
      width: 80,
      render: (text, record: any, index: number) => {
        return <div className="w-40">{text}</div>;
      },
    },
    {
      title: 'PR 链接',
      dataIndex: 'prUrl',
      key: 'prUrl',
      width: 140,
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
      title: '发起时间',
      dataIndex: 'createAtDate',
      key: 'createAtDate',
      render: (text) => {
        return text ? text.slice(0, 10) : '';
      },
    },
    {
      title: '提交人',
      dataIndex: 'submitUserEmail',
      key: 'submitUserEmail',
    },
    {
      title: 'commit 新增代码量',
      dataIndex: 'newLinesAdded',
      key: 'newLinesAdded',
    },
    {
      title: 'commit 删除代码量',
      dataIndex: 'newLinesRemoved',
      key: 'newLinesRemoved',
    },
    {
      title: '修改代码量 (增 + 删)',
      dataIndex: 'newLinesChanged',
      key: 'newLinesChanged',
    },
    {
      title: '申诉原因',
      dataIndex: 'submitReason',
      key: 'submitReason',
    },

    {
      title: '处理人',
      dataIndex: 'reviewerEmail',
      key: 'reviewerEmail',
    },
    {
      title: '当前状态',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: '结论',
      dataIndex: 'reviewMsg',
      key: 'reviewMsg',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <div className="text-primary flex gap-2">
          <a
            onClick={() => {
              setOpenConfirm(true);
            }}
          >
            审批
          </a>
          {/* <a>详情</a> */}
        </div>
      ),
    },
  ];
  const { isLoading, isFetching } = useCommitFeedbackPageQuery(
    client,
    query as TableQuery,
    {
      onSuccess: (data) => {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data.commitFeedbackPage.count as number,
          },
        });
        setData(data.commitFeedbackPage.items);
      },
    }
  );
  return (
    <>
      <TableCard
        className={'mb-0'}
        id={'committerStatistics'}
        title={'审批详情'}
      >
        <MyTable
          columns={columns}
          dataSource={tableData}
          loading={isLoading || isFetching}
          onChange={handleTableChange}
          pagination={tableParams.pagination}
          rowKey={'key'}
          scroll={{ x: 'max-content' }}
        />
        <Dialog
          open={openConfirm}
          classes={{
            paper: classnames(
              'border w-[65%] !max-w-[95%] min-h-[400px] !m-0',
              'md:w-full md:h-full md:!m-0 md:!min-h-full md:border-none'
            ),
          }}
          dialogTitle={
            <>
              <p className="">社区贡献审批</p>
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
          dialogContent={
            <div className="w-full">
              <ApproveDetail
                commitInfo={null}
                setOpenConfirm={(e) => {
                  setOpenConfirm(e);
                }}
              />
            </div>
          }
          handleClose={() => {
            setOpenConfirm(false);
          }}
        />
      </TableCard>
    </>
  );
};

export default ApproveTable;
