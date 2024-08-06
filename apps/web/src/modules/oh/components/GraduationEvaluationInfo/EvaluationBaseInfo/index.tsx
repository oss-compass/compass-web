import React from 'react';
import { Descriptions } from 'antd';
import EditReport from '@modules/oh/components/GraduationEvaluationInfo/EvaluationBaseInfo/EditReport';

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
    // {
    //   key: '5',
    //   label: '代码量',
    //   children: item.codeCount ? item.codeCount + '行' : '--',
    // },
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
      children: item.lifecyclePolicy || '无',
    },
    {
      key: '10',
      label: '回合上游链接',
      children: (
        <div className="line-clamp-1 ">{item.upstreamCodeUrl || '无'}</div>
      ),
    },
  ];
  return (
    <div className="mt-6 border bg-[#f9f9f9] p-6 pb-3">
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
