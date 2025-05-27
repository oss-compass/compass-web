// 修改后的 EndpointTab.tsx
import React, { useState } from 'react';
import ParamsTableWithForm from './ParamsTableWithForm';
import Breadcrumb from '../../components/Breadcrumb';
import ResponsesViewer from './ResponsesViewer';
import DataSourceSelector from '../../components/DataSourceSelector';

const EndpointTab = ({ endpoint }) => {
  const apiBaseUrl = `${window.location.origin}`;
  const [baseUrl, setBaseUrl] = useState(apiBaseUrl);

  return (
    <div className="space-y-6 rounded-lg bg-white">
      <Breadcrumb
        items={[{ label: 'REST API' }, { label: endpoint?.summary }]}
      />
      {endpoint?.description && (
        <p className="mt-2 whitespace-pre leading-relaxed text-gray-600">
          {endpoint.description}
        </p>
      )}
      <DataSourceSelector
        defaultValue={apiBaseUrl}
        onChange={(value) => setBaseUrl(value)}
      />
      <div className="rounded-md border border-gray-200 bg-gray-50 px-4 py-3">
        <code className="font-mono text-blue-600">
          <span className="mr-3 text-purple-600">{endpoint.method}</span>
          {baseUrl + endpoint.path}
        </code>
      </div>
      <ResponsesViewer responses={endpoint.responses} />
      <ParamsTableWithForm
        key={endpoint?.id}
        method={endpoint.method}
        path={endpoint.path}
        params={endpoint.parameters.map((p) => ({
          ...p,
          key: p.name,
        }))}
      />
    </div>
  );
};

export default EndpointTab;
