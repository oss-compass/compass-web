import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import Dialog from '@common/components/Dialog';
import TableCard from '@modules/oh/components/TableCard';
import MyTable from '@common/components/Table';
import useGetTableOption from '@modules/oh/hooks/useGetTableOption';
import {
  useCommitsRepoDataListQuery,
  CommitRepo,
  FilterOptionInput,
  SortOptionInput,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
import ContributorDropdown from '@modules/analyze/DataView/MetricDetail/MetricContributor/ContributorTable/ContributorDropdown';
import useQueryDateRange from '@modules/oh/hooks/useQueryDateRange';
import RepoDetail from './RepoDetail';
import { getRepoName } from '@common/utils';
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
const RepoTable = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [curLabel, setCurLabel] = useState('');
  const { timeStart, timeEnd } = useQueryDateRange();

  const {
    tableData,
    setData,
    tableParams,
    setTableParams,
    query,
    handleTableChange,
  } = useGetTableOption<CommitRepo>({
    beginDate: timeStart,
    endDate: timeEnd,
    label: 'openharmony-tpc',
    level: 'community',
  });
  const columns = [
    {
      title: '仓库',
      dataIndex: 'repoName',
      key: 'repoName',
      render: (text: string, record: any) => {
        return (
          <div className="flex">
            <span
              onClick={() => {
                setCurLabel(record.repoName);
                setOpenConfirm(true);
              }}
              className="text-primary ml-2 mt-1 cursor-pointer"
            >
              {getRepoName(text)}
            </span>
          </div>
        );
      },
      filterDropdown: ({ selectedKeys, setSelectedKeys, confirm }) => {
        return (
          <ContributorDropdown
            selectedKeys={selectedKeys}
            setSelectedKeys={setSelectedKeys}
            confirm={confirm}
            placeholder={''}
          />
        );
      },
    },
    {
      title: '类型',
      dataIndex: 'repoAttributeType',
      key: 'repoAttributeType',
      filterDropdown: ({ selectedKeys, setSelectedKeys, confirm }) => {
        return (
          <ContributorDropdown
            selectedKeys={selectedKeys}
            setSelectedKeys={setSelectedKeys}
            confirm={confirm}
            placeholder={''}
          />
        );
      },
    },
    {
      title: '技术垂域分类',
      dataIndex: 'repoTechnologyType',
      key: 'repoTechnologyType',
    },
    {
      title: 'PR 新增代码量',
      dataIndex: 'linesAdded',
      key: 'linesAdded',
      // sorter: true,
    },
    {
      title: 'PR 删除代码量',
      dataIndex: 'linesRemoved',
      key: 'linesRemoved',
      // sorter: true,
    },
    {
      title: '修改代码总量 (增 + 删)',
      key: 'linesChanged',
      dataIndex: 'linesChanged',
      // sorter: true,
    },
  ];
  const { isLoading, isFetching } = useCommitsRepoDataListQuery(
    client,
    query as TableQuery,
    {
      onSuccess: (data) => {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data.commitsRepoPage.count as number,
          },
        });
        setData(data.commitsRepoPage.items);
      },
    }
  );
  return (
    <>
      <TableCard id={'repoTable'} title={'仓库维度'}>
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
              'border w-[95%] !max-w-[95%] min-h-[400px] !m-0',
              'md:w-full md:h-full md:!m-0 md:!min-h-full md:border-none'
            ),
          }}
          dialogTitle={
            <>
              <p className="">{getRepoName(curLabel)} 仓库详情</p>
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
              <RepoDetail label={curLabel} />
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

export default RepoTable;
