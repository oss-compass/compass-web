import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useQuery } from '@tanstack/react-query';
import SituationCard from '../components/SituationCard';
import DependencywheelCommon from '../components/DependencywheelCommon';
import { Select, Alert } from 'antd';
import { getTranslatedCountryName } from '../utils/countryMapping';

const fetchPublicData = async (url) => {
  const response = await fetch(url); // 确保路径正确
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const ChartCards = ({ ChartInfo }) => {
  const { t } = useTranslation('os-situation');
  const { data, error, isLoading } = useQuery([ChartInfo.text], () => {
    return fetchPublicData(ChartInfo.value);
  });

  // 处理数据，国际化国家名称
  const processedData = data
    ? data.map((item) => {
        if (Array.isArray(item) && item.length >= 2) {
          // 处理 [from, to, weight] 格式的数据
          return [
            getTranslatedCountryName(item[0], t),
            getTranslatedCountryName(item[1], t),
            ...item.slice(2),
          ];
        } else if (typeof item === 'object' && item.from && item.to) {
          // 处理对象格式的数据
          return {
            ...item,
            from: getTranslatedCountryName(item.from, t),
            to: getTranslatedCountryName(item.to, t),
          };
        }
        return item;
      })
    : data;

  console.log(processedData);
  return (
    <SituationCard
      bodyClass="h-[600px]"
      title={ChartInfo.text}
      id={'importExport.global'}
      loading={isLoading}
    >
      {(ref) => {
        return (
          <DependencywheelCommon
            containerRef={ref}
            loading={isLoading}
            data={processedData}
          />
        );
      }}
    </SituationCard>
  );
};

const Dependencywheel = () => {
  const { t } = useTranslation('os-situation');
  const yearList = [
    {
      label: '2022',
      value: '/test/collaborator_model/dependency_wheel_2022_AS_country.json',
    },
    {
      label: '2023',
      value: '/test/collaborator_model/dependency_wheel_2023_AS_country.json',
    },
    {
      label: '2024',
      value: '/test/collaborator_model/dependency_wheel_2024_AS_country.json',
    },
    {
      label: '2022-Q1',
      value:
        '/test/collaborator_model/dependency_wheel_2022 Q1_QS-JAN_country.json',
    },
    {
      label: '2022-Q2',
      value:
        '/test/collaborator_model/dependency_wheel_2022 Q2_QS-JAN_country.json',
    },
    {
      label: '2022-Q3',
      value:
        '/test/collaborator_model/dependency_wheel_2022 Q3_QS-JAN_country.json',
    },
    {
      label: '2022-Q4',
      value:
        '/test/collaborator_model/dependency_wheel_2022 Q4_QS-JAN_country.json',
    },
    {
      label: '2023-Q1',
      value:
        '/test/collaborator_model/dependency_wheel_2023 Q1_QS-JAN_country.json',
    },
    {
      label: '2023-Q2',
      value:
        '/test/collaborator_model/dependency_wheel_2023 Q2_QS-JAN_country.json',
    },
    {
      label: '2023-Q3',
      value:
        '/test/collaborator_model/dependency_wheel_2023 Q3_QS-JAN_country.json',
    },
    {
      label: '2023-Q4',
      value:
        '/test/collaborator_model/dependency_wheel_2023 Q4_QS-JAN_country.json',
    },
    {
      label: '2024-Q1',
      value:
        '/test/collaborator_model/dependency_wheel_2024 Q1_QS-JAN_country.json',
    },
    {
      label: '2024-Q2',
      value:
        '/test/collaborator_model/dependency_wheel_2024 Q2_QS-JAN_country.json',
    },
    {
      label: '2024-Q3',
      value:
        '/test/collaborator_model/dependency_wheel_2024 Q3_QS-JAN_country.json',
    },
    {
      label: '2024-Q4',
      value:
        '/test/collaborator_model/dependency_wheel_2024 Q4_QS-JAN_country.json',
    },
    {
      label: '2025-Q1',
      value:
        '/test/collaborator_model/dependency_wheel_2025 Q1_QS-JAN_country.json',
    },
  ];
  const [label, setLabel] = useState(yearList[2].label);
  const [selectedYear, setYear] = useState(yearList[2].value);
  const handleYearChange = (value, Option) => {
    setYear(value);
    setLabel(Option.label);
  };
  const title = t('dependency.global_import_export_contribution');
  return (
    <div className="relative">
      <div className="mb-6">
        <Alert message={t('dependency.description')} showIcon />
      </div>
      <div className="relative  mb-12 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-1">
        <div className="absolute right-0 top-0 z-50 flex items-center justify-end gap-1">
          <Select
            defaultValue={selectedYear}
            style={{ width: 100 }}
            onChange={handleYearChange}
            variant="borderless"
            options={yearList}
          />
        </div>
        <ChartCards
          ChartInfo={{ value: selectedYear, text: label + ' ' + title }}
        />
      </div>
    </div>
  );
};

export default Dependencywheel;
