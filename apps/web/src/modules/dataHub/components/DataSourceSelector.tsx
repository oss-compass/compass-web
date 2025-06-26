// DataSourceSelector.tsx
import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

const DataSourceSelector = ({
  defaultValue,
  onChange,
  hideenCompass = false,
}) => {
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

    let newOptions = isDefaultUrl
      ? [
          { value: apiBaseUrl, label: 'OSS Compass' },
          ...defaultOptions.slice(1),
        ]
      : defaultOptions;

    // 当 hideenCompass 为 true 时，过滤掉 OSS Compass 选项
    if (hideenCompass) {
      newOptions = newOptions.filter(
        (option) => option.label !== 'OSS Compass'
      );
    }

    setOptions(newOptions);
  }, [apiBaseUrl, hideenCompass, t]);

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
