import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import TableCard from '@modules/oh/components/TableCard';
import MyTable from '@common/components/Table';
import Dialog from '@common/components/Dialog';
import CodeDetail from './CodeDetail';
import useGetTableOption from '@modules/oh/hooks/useGetTableOption';
import {
  useCodesRepoPageQuery,
  CodeRepo,
  FilterOptionInput,
  SortOptionInput,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
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
const CodeTable = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [name, setName] = useState('');
  const { timeStart, timeEnd } = useQueryDateRange();

  const {
    tableData,
    setData,
    tableParams,
    setTableParams,
    query,
    handleTableChange,
  } = useGetTableOption<CodeRepo>({
    beginDate: timeStart,
    endDate: timeEnd,
    label: 'openharmony-tpc',
    level: 'community',
  });
  const { isLoading, isFetching } = useCodesRepoPageQuery(
    client,
    query as TableQuery,
    {
      onSuccess: (data) => {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data.codesRepoPage.count as number,
          },
        });
        setData(data.codesRepoPage.items);
      },
    }
  );

  const columns = [
    {
      title: '仓库',
      dataIndex: 'repoName',
      key: 'repoName',
    },
    {
      title: '仓库类型',
      dataIndex: 'repoAttributeType',
      key: 'repoAttributeType',
    },
    {
      title: '技术垂域分类',
      dataIndex: 'sigName',
      key: 'sigName',
    },
    {
      title: '责任人',
      dataIndex: 'manger',
      key: 'manger',
    },
    {
      title: '有效代码量（千行）',
      dataIndex: 'lines',
      key: 'lines',
    },
    {
      title: '总代码量（千行）',
      dataIndex: 'linesTotal',
      key: 'linesTotal',
    },
    {
      title: '变化量（千行）',
      dataIndex: 'linesChang',
      key: 'linesChang',
      render: (text: string, record: any) => {
        return (
          <div className="flex">
            <span
              onClick={() => {
                setName(record.repoName);
                setOpenConfirm(true);
              }}
              className="text-primary ml-2 mt-1 cursor-pointer"
            >
              {text}
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <TableCard id={'topCode'} title={'代码量统计'}>
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
              'border w-[90%] !max-w-[80%] min-h-[400px] !m-0',
              'md:w-full md:h-full md:!m-0 md:!min-h-full md:border-none'
            ),
          }}
          dialogTitle={
            <>
              <p className="">仓库 Commit 详情</p>
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
              <CodeDetail name={name} />
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

export default CodeTable;
