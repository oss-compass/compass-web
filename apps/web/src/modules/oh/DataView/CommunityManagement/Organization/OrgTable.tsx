import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import Dialog from '@common/components/Dialog';
import TableCard from '@modules/oh/components/TableCard';
import MyTable from '@common/components/Table';
import useGetTableOption from '@modules/oh/hooks/useGetTableOption';
import {
  useOrganizationPageQuery,
  Organization,
  FilterOptionInput,
  SortOptionInput,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';

interface TableQuery {
  page?: number;
  per?: number;
  filterOpts?: FilterOptionInput | FilterOptionInput[];
  sortOpts?: SortOptionInput | SortOptionInput[];
}
const OrgTable = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [orgName, setOrgName] = useState('');

  const {
    tableData,
    setData,
    tableParams,
    setTableParams,
    query,
    handleTableChange,
  } = useGetTableOption<Organization>({
    label: 'openharmony-tpc',
    level: 'community',
  });

  const columns = [
    // {
    //   title: 'ID',
    //   dataIndex: 'ID',
    //   key: 'ID',
    // },

    {
      title: '组织',
      dataIndex: 'orgName',
      key: 'orgName',
      width: 200,
    },
    {
      title: '邮箱后缀',
      dataIndex: 'domain',
      key: 'domain',
      width: 700,
      render: (text: string, record: any, index: number) => {
        return record.domain.join(', ');
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <div className="text-primary flex gap-2">
          <a>修改</a>
          <a>删除</a>
        </div>
      ),
    },
  ];
  const pagination = {
    hideOnSinglePage: true,
  };
  const { isLoading, isFetching } = useOrganizationPageQuery(
    client,
    query as TableQuery,
    {
      onSuccess: (data) => {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data.organizationPage.count as number,
          },
        });
        setData(data.organizationPage.items);
      },
    }
  );
  return (
    <>
      <TableCard
        className={'mb-0'}
        id={'committerStatistics'}
        title={'组织管理'}
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
              <p className="">Committer 详情 (total：1)</p>
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
          dialogContent={<div className="w-full"></div>}
          handleClose={() => {
            setOpenConfirm(false);
          }}
        />
      </TableCard>
    </>
  );
};

export default OrgTable;
