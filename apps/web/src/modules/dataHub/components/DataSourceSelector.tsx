// DataSourceSelector.tsx
import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

const DataSourceSelector = ({ defaultValue, onChange }) => {
  const { t } = useTranslation();
  const apiBaseUrl = `${window.location.origin}`;
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const isDefaultUrl =
      apiBaseUrl === 'https://oss-compass.org' ||
      apiBaseUrl === 'https://compass.gitee.com';
    const defaultOptions = [
      { value: 'https://oss-compass.org', label: 'OSS Compass' },
      {
        value: 'https://oss-compass.isrc.ac.cn',
        label: t('common:header.mirror_site_of_iscas'),
      },
      {
        value: 'https://oss-compass.osslab-pku.org',
        label: t('common:header.mirror_site_of_pku'),
      },
    ];

    const newOptions = isDefaultUrl
      ? [
          { value: apiBaseUrl, label: 'OSS Compass' },
          ...defaultOptions.slice(1),
        ]
      : defaultOptions;

    setOptions(newOptions);
  }, [apiBaseUrl]);

  return (
    <div>
      <span className="mr-4 text-lg font-semibold">
        {t('open_api:data_source')}
      </span>
      <Select
        className="ml-2"
        defaultValue={defaultValue}
        style={{ width: 300 }}
        onChange={onChange}
        options={options}
      />
    </div>
  );
};

export default DataSourceSelector;
