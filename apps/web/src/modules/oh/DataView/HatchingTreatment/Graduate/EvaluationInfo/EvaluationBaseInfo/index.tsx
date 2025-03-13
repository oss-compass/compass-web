import React from 'react';
import { Descriptions } from 'antd';
import EditReport from '@modules/oh/DataView/HatchingTreatment/Graduate/EvaluationInfo/EvaluationBaseInfo/EditReport';
import PreviewImage from '@modules/oh/components/PreviewImage';

const EvaluationBaseInfo = ({ item, refetch }) => {
  const baseItems = [
    {
      key: '1',
      label: '软件名称',
      children: item.name,
    },
    {
      key: '2',
      label: '所属领域',
      children: item?.tpcSoftwareSig?.name,
    },
    {
      key: '3',
      label: '编程语言',
      children: item?.programmingLanguage,
    },
    {
      key: '6',
      label: '适配方式',
      children: item.adaptationMethod,
    },
    {
      key: '7',
      label: '源码地址',
      children: (
        <>
          <a
            className="line-clamp-1 text-[#69b1ff]"
            target="_blank"
            href={item.codeUrl}
          >
            {item.codeUrl}
          </a>
        </>
      ),
    },
    {
      key: '8',
      label: '上游源码地址',
      children: (
        <>
          <a
            className="line-clamp-1 text-[#69b1ff]"
            target="_blank"
            href={item.upstreamCodeUrl}
          >
            {item.upstreamCodeUrl}
          </a>
        </>
      ),
    },
    {
      key: '9',
      label: '发布版本生命周期',
      children: item.lifecyclePolicy || '--',
    },
    {
      key: '10',
      label: '回合上游链接',
      children: (
        <>
          {item.upstreamCodeUrl ? (
            <a
              className="line-clamp-1 text-[#69b1ff]"
              target="_blank"
              href={item.upstreamCodeUrl || ''}
            >
              {item.upstreamCodeUrl}
            </a>
          ) : (
            '--'
          )}
        </>
      ),
    },
    {
      key: '11',
      label: '架构图',
      children: (
        <>
          {item.architectureDiagrams.length > 0 ? (
            <div className="text-[#3e8eff]">
              <PreviewImage report={item} />
            </div>
          ) : (
            '--'
          )}
        </>
      ),
    },
  ];
  return (
    <div className="mt-6 border bg-[#fafafa] p-6 pb-3">
      <div className="mb-4 text-lg font-semibold">
        基础信息
        <div className="float-right cursor-pointer text-lg">
          <EditReport report={item} editSuccess={refetch} />
        </div>
      </div>
      <div className="oh">
        <Descriptions items={baseItems} />
      </div>
    </div>
  );
};

export default EvaluationBaseInfo;
