import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import Dialog from '@common/components/Dialog';
import TableCard from '@modules/oh/components/TableCard';
import MyTable from '@common/components/Table';
import EmployerDetail from './EmployerDetail';

const EmployerTable = () => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const dataSource = [
    {
      project: 'openharmony',
      repo: 'graphic_graphic_2d',
      branch: 'master',
      additions: 24018431,
      deletions: 15415662,
      totalAdditions: 39905571,
      totalDeletions: 18178189,
      tagCodeLines: null,
      sig: 'sig_graphics',
      isThird: 0,
      mailSuffix: '@huawei.com,@qq.com',
      committer: null,
      committerEmail: 'changleipeng4@huawei.com',
      authorEmail: '1049829758@qq.com',
      employer: '华为',
    },
    {
      project: 'openharmony',
      repo: 'xts_acts',
      branch: 'master',
      additions: 12088031,
      deletions: 604580,
      totalAdditions: 39905571,
      totalDeletions: 18178189,
      tagCodeLines: null,
      sig: 'sig_test',
      isThird: 0,
      mailSuffix: '@kaihong.com,@kaihong.com',
      committer: null,
      committerEmail: 'bayanxing@kaihong.com',
      authorEmail: 'bayanxing@kaihong.com',
      employer: '深开鸿',
    },
    {
      project: 'openharmony',
      repo: 'applications_app_samples',
      branch: 'master',
      additions: 2738028,
      deletions: 1545798,
      totalAdditions: 39905571,
      totalDeletions: 18178189,
      tagCodeLines: null,
      sig: 'sig_systemapplications',
      isThird: 0,
      mailSuffix: '@qq.com,@qq.com',
      committer: null,
      committerEmail: '1003746358@qq.com',
      authorEmail: '1003746358@qq.com',
      employer: '未知',
    },
    {
      project: 'openharmony',
      repo: 'startup_init',
      branch: 'master',
      additions: 446586,
      deletions: 353880,
      totalAdditions: 39905571,
      totalDeletions: 18178189,
      tagCodeLines: null,
      sig: 'sig_basicsoftwareservice',
      isThird: 0,
      mailSuffix: '@hoperun.com,@hoperun.com',
      committer: null,
      committerEmail: 'liu_zhiwei2@hoperun.com',
      authorEmail: 'liu_zhiwei2@hoperun.com',
      employer: '润和',
    },
    {
      project: 'openharmony',
      repo: 'applications_app_samples',
      branch: 'master',
      additions: 304890,
      deletions: 185228,
      totalAdditions: 39905571,
      totalDeletions: 18178189,
      tagCodeLines: null,
      sig: 'sig_systemapplications',
      isThird: 0,
      mailSuffix: '@openvalley.net,@openvalley.net',
      committer: null,
      committerEmail: 'aibin@openvalley.net',
      authorEmail: 'aibin@openvalley.net',
      employer: '开鸿智谷',
    },
    {
      project: 'openharmony',
      repo: 'xts_acts',
      branch: 'master',
      additions: 253020,
      deletions: 15362,
      totalAdditions: 39905571,
      totalDeletions: 18178189,
      tagCodeLines: null,
      sig: 'sig_test',
      isThird: 0,
      mailSuffix: '@i-soft.com.cn,@i-soft.com.cn',
      committer: null,
      committerEmail: 'developer.huanglei@i-soft.com.cn',
      authorEmail: 'developer.huanglei@i-soft.com.cn',
      employer: '普华基础软件',
    },
    {
      project: 'openharmony',
      repo: 'telephony_ril_adapter',
      branch: 'master',
      additions: 41481,
      deletions: 39941,
      totalAdditions: 39905571,
      totalDeletions: 18178189,
      tagCodeLines: null,
      sig: 'sig_telephony',
      isThird: 0,
      mailSuffix: '@thundersoft.com,@thundersoft.com',
      committer: null,
      committerEmail: 'xieyh0509@thundersoft.com',
      authorEmail: 'cheng.wang_c@thundersoft.com',
      employer: '中科创达',
    },
    {
      project: 'openharmony',
      repo: 'vendor_unionman',
      branch: 'master',
      additions: 10402,
      deletions: 14881,
      totalAdditions: 39905571,
      totalDeletions: 18178189,
      tagCodeLines: null,
      sig: 'sig_devboard',
      isThird: 0,
      mailSuffix: '@unionman.com.cn,@unionman.com.cn',
      committer: null,
      committerEmail: 'dongmin.wang@unionman.com.cn',
      authorEmail: 'dongmin.wang@unionman.com.cn',
      employer: '九联开鸿',
    },
    {
      project: 'openharmony',
      repo: 'applications_launcher',
      branch: 'master',
      additions: 3181,
      deletions: 2337,
      totalAdditions: 39905571,
      totalDeletions: 18178189,
      tagCodeLines: null,
      sig: 'sig_systemapplications',
      isThird: 0,
      mailSuffix: '@archermind.com,@archermind.com',
      committer: null,
      committerEmail: 'dao.lu@archermind.com',
      authorEmail: 'dao.lu@archermind.com',
      employer: '诚迈科技',
    },
    {
      project: 'openharmony',
      repo: 'hiviewdfx_faultloggerd',
      branch: 'master',
      additions: 704,
      deletions: 73,
      totalAdditions: 39905571,
      totalDeletions: 18178189,
      tagCodeLines: null,
      sig: 'sig_basicsoftwareservice',
      isThird: 0,
      mailSuffix: '@iscas.ac.cn,@iscas.ac.cn',
      committer: null,
      committerEmail: 'polyos@iscas.ac.cn',
      authorEmail: 'polyos@iscas.ac.cn',
      employer: '中国科学院软件研究所',
    },
  ];
  const total = dataSource.reduce(
    (acc, cur) => acc + cur.additions + cur.deletions,
    0
  );
  const columns = [
    {
      title: '序号',
      key: 'index',
      render: (text: string, record: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: '雇主 (企业)',
      dataIndex: 'employer',
      key: 'employer',
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
      title: 'PR 新增代码量',
      dataIndex: 'additions',
      key: 'additions',
    },
    {
      title: 'PR 删除代码量',
      dataIndex: 'deletions',
      key: 'deletions',
    },
    {
      title: '修改代码总量 (增 + 删)',
      key: 'totalAdditions',
      render: (text: string, record: any, index: number) => {
        return record.additions + record.deletions;
      },
    },
    {
      title: '修改量占比',
      dataIndex: 'tagCodeLines',
      key: 'tagCodeLines',
      render: (text: string, record: any, index: number) => {
        return (
          (((record.additions + record.deletions) / total) * 100).toFixed(2) +
          '%'
        );
      },
    },
  ];
  const pagination = {
    hideOnSinglePage: true,
  };
  return (
    <>
      <TableCard id={'employerTable'} title={'雇主维度'}>
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
              <p className="">雇主维度详情</p>
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
              <EmployerDetail />
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
