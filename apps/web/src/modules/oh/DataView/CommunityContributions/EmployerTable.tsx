import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import Dialog from '@common/components/Dialog';
import TableCard from '@modules/oh/components/TableCard';
import MyTable from '@common/components/Table';
import EmployerDetail from './EmployerDetail';
import useGetTableOption from '@modules/oh/hooks/useGetTableOption';
import {
  useCommitsOrganizationDataListQuery,
  CommitOrganization,
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
const EmployerTable = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [orgName, setOrgName] = useState(false);
  const { timeStart, timeEnd } = useQueryDateRange();

  const {
    tableData,
    setData,
    tableParams,
    setTableParams,
    query,
    handleTableChange,
  } = useGetTableOption<CommitOrganization>({
    beginDate: timeStart,
    endDate: timeEnd,
    label: 'openharmony-tpc',
    level: 'community',
  });
  const columns = [
    {
      title: '序号',
      key: 'index',
      render: (text: string, record: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: '组织',
      dataIndex: 'orgName',
      key: 'orgName',
      render: (text: string, record: any) => {
        return (
          <div className="flex">
            <span
              onClick={() => {
                setOrgName(record.orgName);
                // col.organization && setCurrentOrgName(col.organization);
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
      title: 'PR 新增代码量',
      dataIndex: 'linesAdded',
      key: 'linesAdded',
    },
    {
      title: 'PR 删除代码量',
      dataIndex: 'linesRemoved',
      key: 'linesRemoved',
    },
    {
      title: '修改代码总量 (增 + 删)',
      key: 'linesChanged',
      dataIndex: 'linesChanged',
    },
    {
      title: '修改量占比',
      dataIndex: 'linesChangedRatio',
      key: 'linesChangedRatio',
    },
  ];
  const { isLoading, isFetching } = useCommitsOrganizationDataListQuery(
    client,
    query as TableQuery,
    {
      onSuccess: (data) => {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data.commitsOrganizationPage.count as number,
          },
        });
        setData(data.commitsOrganizationPage.items);
      },
    }
  );
  return (
    <>
      <TableCard id={'employerTable'} title={'组织维度'}>
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
              <p className="">组织维度详情</p>
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
              <EmployerDetail orgName={orgName} />
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

export default EmployerTable;
