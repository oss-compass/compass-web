import React from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import SigDetailTable from './SigDetailTable';
import { AiOutlineLeftCircle } from 'react-icons/ai';
import { getPathname, getRepoName } from '@common/utils';

const SigDetail = ({ sigInfo, setSigName }) => {
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '描述',
      children:
        'The SIG provides a place for technical discussions and haring about compilers, covering GCC, LLVM, OpenJDK, and other program optimization technologies.',
      span: 3,
    },
    {
      key: '2',
      label: '邮件列表',
      children: (
        <div className="text-primary cursor-pointer">dev@openharmony.org</div>
      ),
      span: 3,
    },
    {
      key: '3',
      label: 'Maintainer',
      children: (
        <div className="text-primary cursor-pointer">
          <div>huzeshan</div>
          <div>wangzhen</div>
        </div>
      ),
      span: 3,
    },
    {
      key: '4',
      label: '仓库',
      children: (
        <div className="text-primary cursor-pointer overflow-hidden">
          {sigInfo.URL.slice(0, 10).map((item) => {
            return <div key={item.ID}>{getRepoName(item)}</div>;
          })}
        </div>
      ),
      span: 3,
    },
  ];
  return (
    <>
      <div className="flex gap-4">
        <div className="h-full w-80 flex-shrink-0 rounded-lg border-2 border-transparent bg-white p-5 drop-shadow-sm">
          <div className="flex items-center text-2xl font-medium text-[#333]">
            <AiOutlineLeftCircle
              onClick={() => {
                // const query = window.location.search;
                setSigName('');
              }}
              className="mr-2 cursor-pointer text-[#3f60ef]"
            />
            <div>{sigInfo['ID']}</div>
          </div>
          <div className="mt-6 text-sm text-[#404040]"></div>
          <Descriptions
            labelStyle={{ fontSize: '18px', color: 'black' }}
            title=""
            layout="vertical"
            items={items}
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <SigDetailTable sigInfo={sigInfo} />
        </div>
      </div>
    </>
  );
};

export default SigDetail;
