import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import Dialog from '@common/components/Dialog';
import TableCard from '@modules/oh/components/TableCard';
import MyTable from '@common/components/Table';

const MemberTable = () => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const dataSource = [
    {
      ID: 'coder',
      company: '中软国际',
      role: '社区管理员',
      permission: '反馈审核，SIG 管理',
      subSystem: 'coder@chinasoft.com',
    },
    {
      ID: 'xinxin',
      company: '华为',
      role: '社区管理员',
      permission: '反馈审核，SIG 管理',
      subSystem: 'xinxin@huawei.com',
    },
  ];

  const columns = [
    {
      title: '用户名',
      dataIndex: 'ID',
      key: 'ID',
    },
    {
      title: '组织',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: '邮箱',
      dataIndex: 'subSystem',
      key: 'subSystem',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
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
  const pagination = {
    hideOnSinglePage: true,
  };
  return (
    <>
      <TableCard
        className={'mb-0'}
        id={'committerStatistics'}
        title={'用户管理'}
      >
        <MyTable
          columns={columns}
          dataSource={dataSource}
          //   loading={isLoading || isFetching}
          //   onChange={handleTableChange}
          pagination={pagination}
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
