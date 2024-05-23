import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import Dialog from '@common/components/Dialog';
import TableCard from '@modules/oh/components/TableCard';
import MyTable from '@common/components/Table';
import CommitterDetail from './CommitterDetail';

const CommitterTable = () => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const dataSource = [
    {
      committerName: '印闯',
      subSystem: 'openharmony/arkui_ace_engine',
      isHwEmployee: true,
      changedAdditions: 72,
      changedDeletions: 4,
      prBugCount: 0,
      prNoteCount: 1,
      prSummaryBugCount: 0,
      prSummaryDefectDensity: ' 2',
      prSummaryReviewTime: 20.98,
      isCommitter: false,
      committerEmail: 'yinchuang@huawei.com',
    },
    {
      committerName: '遥宇一号',
      subSystem: 'openharmony/multimedia_media_library',
      isHwEmployee: true,
      changedAdditions: 521,
      changedDeletions: 2,
      prBugCount: 0,
      prNoteCount: 6,
      prSummaryBugCount: 0,
      prSummaryDefectDensity: ' 2',
      prSummaryReviewTime: 6.23,
      isCommitter: true,
      committerEmail: 'yaojian7@huawei.com',
    },
    {
      committerName: '侯朋飞',
      subSystem: 'openharmony/multimodalinput_input',
      isHwEmployee: true,
      changedAdditions: 11607,
      changedDeletions: 2855,
      prBugCount: 0,
      prNoteCount: 172,
      prSummaryBugCount: 0,
      prSummaryDefectDensity: ' 2',
      prSummaryReviewTime: 779.22,
      isCommitter: false,
      committerEmail: 'pengfei.hou@huawei.com',
    },
    {
      committerName: '李帅',
      subSystem: 'openharmony/developtools_hdc',
      isHwEmployee: true,
      changedAdditions: 225,
      changedDeletions: 189,
      prBugCount: 0,
      prNoteCount: 8,
      prSummaryBugCount: 0,
      prSummaryDefectDensity: ' 2',
      prSummaryReviewTime: 6.03,
      isCommitter: false,
      committerEmail: 'leo.lishuai@huawei.com',
    },
    {
      committerName: '孙海洋',
      subSystem: 'openharmony/ability_form_fwk',
      isHwEmployee: true,
      changedAdditions: 4097,
      changedDeletions: 971,
      prBugCount: 0,
      prNoteCount: 12,
      prSummaryBugCount: 0,
      prSummaryDefectDensity: ' 2',
      prSummaryReviewTime: 40.35,
      isCommitter: false,
      committerEmail: 'sunhy.sun@huawei.com',
    },
    {
      committerName: '龚俊松',
      subSystem: 'openharmony/arkcompiler_ets_runtime',
      isHwEmployee: true,
      changedAdditions: 12356,
      changedDeletions: 8003,
      prBugCount: 0,
      prNoteCount: 52,
      prSummaryBugCount: 0,
      prSummaryDefectDensity: ' 2',
      prSummaryReviewTime: 105.2,
      isCommitter: false,
      committerEmail: 'gongjunsong@huawei.com',
    },
    {
      committerName: 'hw_yang',
      subSystem: 'openharmony/graphic_graphic_2d',
      isHwEmployee: true,
      changedAdditions: 6853,
      changedDeletions: 2755,
      prBugCount: 0,
      prNoteCount: 36,
      prSummaryBugCount: 0,
      prSummaryDefectDensity: ' 2',
      prSummaryReviewTime: 873.28,
      isCommitter: false,
      committerEmail: 'yangjingxiao1@huawei.com',
    },
    {
      committerName: 'BruceZong',
      subSystem: 'openharmony/hiviewdfx_hiview',
      isHwEmployee: true,
      changedAdditions: 2735,
      changedDeletions: 311,
      prBugCount: 0,
      prNoteCount: 58,
      prSummaryBugCount: 0,
      prSummaryDefectDensity: ' 2',
      prSummaryReviewTime: 972.58,
      isCommitter: false,
      committerEmail: 'zongquan@huawei.com',
    },
    {
      committerName: '钟钊',
      subSystem: 'openharmony/multimedia_av_codec',
      isHwEmployee: true,
      changedAdditions: 2025,
      changedDeletions: 9,
      prBugCount: 0,
      prNoteCount: 1,
      prSummaryBugCount: 0,
      prSummaryDefectDensity: ' 2',
      prSummaryReviewTime: 10.66,
      isCommitter: false,
      committerEmail: 'zhongzhao7@huawei.com',
    },
    {
      committerName: '周海锋',
      subSystem: 'openharmony/hiviewdfx_hiview',
      isHwEmployee: true,
      changedAdditions: 33,
      changedDeletions: 8,
      prBugCount: 0,
      prNoteCount: 1,
      prSummaryBugCount: 0,
      prSummaryDefectDensity: ' 2',
      prSummaryReviewTime: 33.41,
      isCommitter: false,
      committerEmail: 'kutcher.zhou@huawei.com',
    },
  ];

  const columns = [
    {
      title: '名称',
      dataIndex: 'committerName',
      key: 'committerName',
    },
    {
      title: '子系统/部件',
      dataIndex: 'subSystem',
      key: 'subSystem',
    },
    {
      title: 'PR 新增代码量 (行)',
      dataIndex: 'changedAdditions',
      key: 'changedAdditions',
      render: (text: string, record: any) => {
        return (
          <div className="flex">
            <span
              onClick={() => {
                // setCurrentName(col.contributor);
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
      title: 'PR 删除代码量 (行)',
      dataIndex: 'changedDeletions',
      key: 'changedDeletions',
    },
    {
      title: 'PR 评论数',
      dataIndex: 'prNoteCount',
      key: 'prNoteCount',
    },
    {
      title: 'PR 响应时间',
      dataIndex: 'prSummaryDefectDensity',
      key: 'prSummaryDefectDensity',
    },
    {
      title: 'PR 关闭时间',
      dataIndex: 'prSummaryReviewTime',
      key: 'prSummaryReviewTime',
    },
  ];
  const pagination = {
    hideOnSinglePage: true,
  };
  return (
    <>
      <TableCard id={'committerStatistics'} title={'Committer贡献统计'}>
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
          dialogContent={
            <div className="w-full">
              <CommitterDetail />
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
