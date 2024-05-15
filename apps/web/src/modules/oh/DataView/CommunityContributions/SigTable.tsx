import React, { useState } from 'react';
import classnames from 'classnames';
import { GrClose } from 'react-icons/gr';
import Dialog from '@common/components/Dialog';
import TableCard from '@modules/oh/components/TableCard';
import MyTable from '@common/components/Table';
import SigDetail from './SigDetail';

const SigTable = () => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const dataSource = [
    {
      project: 'openharmony',
      repo: 'advertising_oaid',
      branch: 'master',
      additions: 2242,
      deletions: 1188,
      totalAdditions: null,
      totalDeletions: null,
      tagCodeLines: null,
      sig: 'sig_ads',
      isThird: 0,
      mailSuffix: null,
      committer: null,
      committerEmail: null,
      authorEmail: null,
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'third_party_mindspore',
      branch: 'master',
      additions: 494829,
      deletions: 655440,
      totalAdditions: null,
      totalDeletions: null,
      tagCodeLines: null,
      sig: 'sig_ai_framework',
      isThird: 1,
      mailSuffix: null,
      committer: null,
      committerEmail: null,
      authorEmail: null,
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'ability_ability_runtime',
      branch: 'master',
      additions: 5746090,
      deletions: 2591705,
      totalAdditions: null,
      totalDeletions: null,
      tagCodeLines: null,
      sig: 'sig_appframework',
      isThird: 0,
      mailSuffix: null,
      committer: null,
      committerEmail: null,
      authorEmail: null,
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'community',
      branch: 'master',
      additions: 324,
      deletions: 91,
      totalAdditions: null,
      totalDeletions: null,
      tagCodeLines: null,
      sig: 'sig_architecture',
      isThird: 0,
      mailSuffix: null,
      committer: null,
      committerEmail: null,
      authorEmail: null,
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'hiviewdfx_hisysevent',
      branch: 'master',
      additions: 2954193,
      deletions: 1704379,
      totalAdditions: null,
      totalDeletions: null,
      tagCodeLines: null,
      sig: 'sig_basicsoftwareservice',
      isThird: 0,
      mailSuffix: null,
      committer: null,
      committerEmail: null,
      authorEmail: null,
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'build',
      branch: 'master',
      additions: 70937,
      deletions: 36800,
      totalAdditions: null,
      totalDeletions: null,
      tagCodeLines: null,
      sig: 'sig_buildsystem',
      isThird: 0,
      mailSuffix: null,
      committer: null,
      committerEmail: null,
      authorEmail: null,
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'castengine_wifi_display',
      branch: 'master',
      additions: 25622,
      deletions: 41092,
      totalAdditions: null,
      totalDeletions: null,
      tagCodeLines: null,
      sig: 'sig_castengine',
      isThird: 0,
      mailSuffix: null,
      committer: null,
      committerEmail: null,
      authorEmail: null,
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'commonlibrary_c_utils',
      branch: 'master',
      additions: 2758127,
      deletions: 1340160,
      totalAdditions: null,
      totalDeletions: null,
      tagCodeLines: null,
      sig: 'sig_compileruntime',
      isThird: 0,
      mailSuffix: null,
      committer: null,
      committerEmail: null,
      authorEmail: null,
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'vendor_hihope',
      branch: 'master',
      additions: 869118,
      deletions: 330052,
      totalAdditions: null,
      totalDeletions: null,
      tagCodeLines: null,
      sig: 'sig_devboard',
      isThird: 0,
      mailSuffix: null,
      committer: null,
      committerEmail: null,
      authorEmail: null,
      employer: null,
    },
    {
      project: 'openharmony',
      repo: 'multimedia_media_library',
      branch: 'master',
      additions: 496006,
      deletions: 212930,
      totalAdditions: null,
      totalDeletions: null,
      tagCodeLines: null,
      sig: 'sig_distributeddatamgr',
      isThird: 0,
      mailSuffix: null,
      committer: null,
      committerEmail: null,
      authorEmail: null,
      employer: null,
    },
  ];

  const columns = [
    {
      title: '所属 SIG',
      dataIndex: 'sig',
      key: 'sig',
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
  ];
  const pagination = {
    hideOnSinglePage: true,
  };
  return (
    <>
      <TableCard id={'sigTable'} title={'SIG维度'}>
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
              <p className="">SIG 维度详情</p>
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
              <SigDetail />
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

export default SigTable;
