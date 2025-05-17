// 修改后的 EndpointTab.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import ParamsTableWithForm from '../ParamsTableWithForm';
import Breadcrumb from '../../components/Breadcrumb';
import ResponsesViewer from './ResponsesViewer';

const EndpointTab = ({ endpoint }) => {
  const { t } = useTranslation();
  console.log(endpoint);
  return (
    <div className="space-y-6 rounded-lg bg-white">
      {/* 标题区块 */}
      <Breadcrumb
        items={[{ label: 'REST API' }, { label: endpoint?.description }]}
      />
      {endpoint?.summary && (
        <p className="mt-2 leading-relaxed text-gray-600">{endpoint.summary}</p>
      )}
      <div>
        <span className="mr-4 text-lg font-semibold">数据源</span>
        <Select
          className="ml-2"
          defaultValue="数据源1"
          style={{ width: 140 }}
          options={[
            { value: '数据源1', label: 'OSS Compass' },
            { value: '数据源2', label: '中科院镜像站' },
          ]}
        />
      </div>
      <div className="rounded-md border border-gray-200 bg-gray-50 px-4 py-3">
        <code className="font-mono text-blue-600">
          <span className="mr-3 text-purple-600">{endpoint.method}</span>
          {endpoint.path}
        </code>
      </div>
      <ResponsesViewer responses={endpoint.responses} />
      <ParamsTableWithForm
        key={endpoint?.id}
        method={endpoint.method}
        path={endpoint.path}
        params={endpoint.parameters.map((p) => ({
          ...p,
          key: p.id,
        }))}
      />
    </div>
  );
};

export default EndpointTab;
