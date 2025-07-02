// 修改后的 EndpointTab.tsx
import React, { useState } from 'react';
import ParamsTableWithForm from './ParamsTableWithForm';
import Breadcrumb from '../../components/Breadcrumb';
import ResponsesViewer from './ResponsesViewer';
import DataSourceSelector from '../../components/DataSourceSelector';
import { useTranslation } from 'react-i18next';
import { getLocalizedText } from '@modules/dataHub/utils';

const EndpointTab = ({ endpoint }) => {
  const { i18n } = useTranslation();
  const [baseUrl, setBaseUrl] = useState('https://oss-compass.isrc.ac.cn');

  return (
    <div className="space-y-6 rounded-lg bg-white">
      <Breadcrumb
        items={[
          { label: 'REST API' },
          { label: getLocalizedText(endpoint?.summary, i18n.language) },
        ]}
      />
      {endpoint?.description && (
        <p className="mt-2 whitespace-pre leading-relaxed text-gray-600">
          {getLocalizedText(endpoint?.description, i18n.language)}
        </p>
      )}
      <DataSourceSelector onChange={(value) => setBaseUrl(value)} />
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
