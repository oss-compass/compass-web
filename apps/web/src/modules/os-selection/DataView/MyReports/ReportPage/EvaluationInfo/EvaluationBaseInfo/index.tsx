import React from 'react';
import { Descriptions } from 'antd';
import EditReport from '@modules/oh/DataView/HatchingTreatment/Hatch/EvaluationInfo/EvaluationBaseInfo/EditReport';
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
      key: '4',
      label: '编程语言',
      children: item.programmingLanguage,
    },
    {
      key: '5',
      label: '代码量',
      children: item.codeCount + '行',
    },
    {
      key: '8',
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
      key: '9',
      label: '漏洞响应机制',
      children: (
        <>
          <a
            className="line-clamp-1 text-[#69b1ff]"
            target="_blank"
            href={item.codeUrl}
          >
            {item.vulnerabilityResponse || ''}
          </a>
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
