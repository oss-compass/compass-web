import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import Dialog from '@common/components/Dialog';
import TableCard from '@modules/oh/components/TableCard';
import MyTable from '@common/components/Table';
import useGetTableOption from '@modules/oh/hooks/useGetTableOption';
import {
  useSubjectAccessLevelPageQuery,
  SubjectAccessLevel,
  FilterOptionInput,
  SortOptionInput,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';

interface TableQuery {
  label: string;
  level: string;
  page: number;
  per: number;
  accessLevel: number;
}

const MemberTable = () => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const {
    tableData,
    setData,
    tableParams,
    setTableParams,
    query,
    handleTableChange,
  } = useGetTableOption({
    label: 'openharmony-tpc',
    level: 'community',
  });

  const columns = [
    {
      title: '用户名',
      dataIndex: 'ID',
      key: 'ID',
      render: (_, record) => {
        return record.user.name;
      },
    },
    {
      title: '组织',
      render: (_, record) => {
        return record.user?.contributingOrgs?.[0]?.orgName;
      },
    },
    {
      title: '邮箱',
      render: (_, record) => {
        return record.user.email;
      },
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (_, record) => {
        return record.user.subjectId === 1 ? '管理员' : '成员';
      },
    },
    {
      title: '权限',
      dataIndex: 'permission',
      key: 'permission',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <div className="text-primary flex gap-2">
          <a>修改</a>
          <a>删除</a>
        </div>
      ),
    },
  ];
  const myQuery = {
    page: query.page,
    per: query.per,
    label: 'openharmony-tpc',
    level: 'community',
  };
  const { isLoading, isFetching } = useSubjectAccessLevelPageQuery(
    client,
    myQuery,
    {
      onSuccess: (data) => {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data.subjectAccessLevelPage.count as number,
          },
        });
        setData(data.subjectAccessLevelPage.items);
      },
    }
  );
  return (
    <>
      <TableCard
        className={'mb-0'}
        id={'committerStatistics'}
        title={'用户管理'}
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

export default MemberTable;
