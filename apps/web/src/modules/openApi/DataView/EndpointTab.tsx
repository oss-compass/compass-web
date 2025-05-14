// 修改后的 EndpointTab.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import ParamsTableWithForm from './ParamsTableWithForm';

const EndpointTab = ({ endpoint }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 rounded-lg bg-white">
      {/* 标题区块 */}
      <div className="border-l-4 border-blue-500 pl-4">
        <h1 className="text-2xl font-bold text-gray-800">
          {endpoint?.description}
        </h1>
        {endpoint?.summary && (
          <p className="mt-2 leading-relaxed text-gray-600">
            {endpoint.summary}
          </p>
        )}
      </div>
      <div className="rounded-md border border-gray-200 bg-gray-50 px-4 py-3">
        <code className="font-mono text-blue-600">
          <span className="mr-3 text-purple-600">{endpoint.method}</span>
          {endpoint.path}
        </code>
      </div>

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
