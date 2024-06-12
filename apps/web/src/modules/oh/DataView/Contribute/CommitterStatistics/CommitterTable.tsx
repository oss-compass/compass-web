import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import Dialog from '@common/components/Dialog';
import TableCard from '@modules/oh/components/TableCard';
import MyTable from '@common/components/Table';
import useQueryDateRange from '@modules/oh/hooks/useQueryDateRange';
import useGetTableOption from '@modules/oh/hooks/useGetTableOption';
import {
  useCommitsContributorListQuery,
  CommitContributor,
  FilterOptionInput,
  SortOptionInput,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
import CommitterDetail from './CommitterDetail';
interface TableQuery {
  label: string;
  level?: string;
  branch?: string;
  beginDate?: any;
  endDate?: any;
}
const CommitterTable = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [authorEmail, setAuthorEmail] = useState('');
  const { timeStart, timeEnd } = useQueryDateRange();
  const query = {
    beginDate: timeStart,
    endDate: timeEnd,
    label: 'openharmony-tpc',
    level: 'community',
  };
  const { tableData, setData, tableParams, setTableParams, handleTableChange } =
    useGetTableOption<CommitContributor>(query);
  const { isLoading, isFetching } = useCommitsContributorListQuery(
    client,
    query,
    {
      onSuccess: (data) => {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data.commitsContributorList.length as number,
          },
        });
        setData(data.commitsContributorList);
      },
    }
  );

  const columns = [
    {
      title: '名称',
      dataIndex: 'authorEmail',
      key: 'authorEmail',
    },
    // {
    //   title: '子系统/部件',
    //   dataIndex: 'subSystem',
    //   key: 'subSystem',
    // },
    {
      title: 'PR 新增代码量 (行)',
      dataIndex: 'linesAdded',
      key: 'linesAdded',
      render: (text: string, record: any) => {
        return (
          <div className="flex">
            <span
              onClick={() => {
                setAuthorEmail(record.authorEmail);
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
    {
      title: 'PR 删除代码量 (行)',
      dataIndex: 'linesRemoved',
      key: 'linesRemoved',
    },
    {
      title: '修改代码总量 (增 + 删)',
      dataIndex: 'linesChanged',
      key: 'linesChanged',
    },
    {
      title: '组织名',
      dataIndex: 'orgName',
      key: 'orgName',
    },
  ];
  return (
    <>
      <TableCard
        className={'mb-0 min-h-[calc(100vh-164px)]'}
        id={'committerStatistics'}
        title={'Committer贡献统计'}
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
              'border w-[95%] !max-w-[95%] min-h-[400px] !m-0',
              'md:w-full md:h-full md:!m-0 md:!min-h-full md:border-none'
            ),
          }}
          dialogTitle={
            <>
              <p className="">Committer 详情</p>
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
              <CommitterDetail authorEmail={authorEmail} />
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

export default CommitterTable;
