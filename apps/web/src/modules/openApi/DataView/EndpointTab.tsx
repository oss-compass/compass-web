import React from 'react';
import ParamsTable from './ParamsTable';
import APITestForm from './APITestForm';
import { useTranslation } from 'react-i18next';

const EndpointTab = ({ endpoint }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4 py-4">
      <div className="rounded bg-gray-50 p-4">
        <h2 className="text-xl font-semibold">{endpoint.path}</h2>
      </div>

      <ParamsTable
        params={endpoint.parameters.map((item) => {
          return { ...item, key: item.id };
        })}
      />

      <div className="mt-6">
        <h3 className="mb-4 text-lg font-semibold">
          {t('open_api:try_it_out')}
        </h3>
        <APITestForm
          method={endpoint.method}
          path={endpoint.path}
          params={endpoint.parameters}
        />
      </div>
    </div>
  );
};
export default EndpointTab;
