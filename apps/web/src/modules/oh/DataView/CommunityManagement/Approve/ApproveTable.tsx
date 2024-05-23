import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import Dialog from '@common/components/Dialog';
import TableCard from '@modules/oh/components/TableCard';
import MyTable from '@common/components/Table';
import ApproveDetail from './ApproveDetail';

const ApproveTable = () => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const dataSource = [
    {
      authorEmail: 'zhanghuan165@h-partners.com',
      commitHash: '51ba011c34b6a20777331b39cc571df35f8b96bc',
      grimoireCreationDate: '2024-05-13T17:21:46+08:00',
      linesAdded: 29,
      linesChanged: 30,
      linesRemoved: 1,
      mergedAt: null,
      orgName: 'Huawei',
      prUrl: null,
      repoName: 'https://gitee.com/openharmony-tpc/MMKV',
    },
    {
      authorEmail: 'zhanghuan165@h-partners.com',
      commitHash: '23c61e047e530626c26e6c37841fd36d8f14982d',
      grimoireCreationDate: '2024-04-11T16:51:20+08:00',
      linesAdded: 163,
      linesChanged: 175,
      linesRemoved: 12,
      mergedAt: '2024-04-17T12:04:45+08:00',
      orgName: 'Huawei',
      prUrl: 'https://gitee.com/openharmony-tpc/MMKV/pulls/63',
      repoName: 'https://gitee.com/openharmony-tpc/MMKV',
    },
    {
      authorEmail: 'longfeng20@huawei.com',
      commitHash: 'd09d96887f08437a67a81c564539481f0c932481',
      grimoireCreationDate: '2024-04-01T10:58:58+08:00',
      linesAdded: 9,
      linesChanged: 14,
      linesRemoved: 5,
      mergedAt: '2024-04-01T17:31:36+08:00',
      orgName: 'Huawei',
      prUrl: 'https://gitee.com/openharmony-tpc/MMKV/pulls/62',
      repoName: 'https://gitee.com/openharmony-tpc/MMKV',
    },
    {
      authorEmail: 'renheng6@h-partners.com',
      commitHash: '2f1c7aff0426c80992fb5ca9d216b9977dd9e1ca',
      grimoireCreationDate: '2024-01-18T15:35:50+08:00',
      linesAdded: 229,
      linesChanged: 230,
      linesRemoved: 1,
      mergedAt: '2024-01-19T14:26:08+08:00',
      orgName: 'Huawei',
      prUrl: 'https://gitee.com/openharmony-tpc/MMKV/pulls/61',
      repoName: 'https://gitee.com/openharmony-tpc/MMKV',
    },
    {
      authorEmail: 'longfeng20@huawei.com',
      commitHash: 'b8755f5b6d3e229c46fe6b5f7524be564240e610',
      grimoireCreationDate: '2023-12-04T16:00:47+08:00',
      linesAdded: 33,
      linesChanged: 46,
      linesRemoved: 13,
      mergedAt: '2023-12-05T16:11:19+08:00',
      orgName: 'Huawei',
      prUrl: 'https://gitee.com/openharmony-tpc/MMKV/pulls/58',
      repoName: 'https://gitee.com/openharmony-tpc/MMKV',
    },
    {
      authorEmail: 'liuyaoming3@h-partners.com',
      commitHash: 'cdb4e7357db7f1c066b4c603bf36df40d1043f11',
      grimoireCreationDate: '2023-12-04T10:07:22+08:00',
      linesAdded: 8,
      linesChanged: 13,
      linesRemoved: 5,
      mergedAt: '2023-12-04T14:33:00+08:00',
      orgName: 'Huawei',
      prUrl: 'https://gitee.com/openharmony-tpc/MMKV/pulls/57',
      repoName: 'https://gitee.com/openharmony-tpc/MMKV',
    },
    {
      authorEmail: 'liuyaoming3@h-partners.com',
      commitHash: '0eed100bcc4d23f6c36f88fe5d334ee04ba7933d',
      grimoireCreationDate: '2023-11-22T10:24:47+08:00',
      linesAdded: 12,
      linesChanged: 20,
      linesRemoved: 8,
      mergedAt: '2023-11-22T17:31:42+08:00',
      orgName: 'Huawei',
      prUrl: 'https://gitee.com/openharmony-tpc/MMKV/pulls/56',
      repoName: 'https://gitee.com/openharmony-tpc/MMKV',
    },
  ];
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
      title: '关联 PR',
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
      dataIndex: 'grimoireCreationDate',
      key: 'startingTime',
      render: (text) => {
        return text ? text.slice(0, 10) : '';
      },
    },
    {
      title: '提交人',
      dataIndex: 'authorEmail',
      key: 'authorEmail',
    },
    // {
    //   title: 'commit 新增代码量',
    //   dataIndex: 'linesAdded',
    //   key: 'linesAdded',
    // },
    // {
    //   title: 'commit 删除代码量',
    //   dataIndex: 'linesRemoved',
    //   key: 'linesRemoved',
    // },
    // {
    //   title: '修改代码量 (增 + 删)',
    //   dataIndex: 'linesChanged',
    //   key: 'linesChanged',
    // },
    {
      title: '申诉原因',
      dataIndex: 'cause',
      key: 'cause',
    },

    {
      title: '处理人',
      dataIndex: 'handler',
      key: 'handler',
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '结论',
      dataIndex: 'conclusion',
      key: 'conclusion',
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
  const pagination = {
    hideOnSinglePage: true,
  };
  return (
    <>
      <TableCard
        className={'mb-0'}
        id={'committerStatistics'}
        title={'审批详情'}
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
