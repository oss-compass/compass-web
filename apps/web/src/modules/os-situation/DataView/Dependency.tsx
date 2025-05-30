import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useQuery } from '@tanstack/react-query';
import SituationCard from '../components/SituationCard';
import DependencywheelCommon from '../components/DependencywheelCommon';
import { Select, Alert } from 'antd';

const fetchPublicData = async (url) => {
  const response = await fetch(url); // 确保路径正确
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const ChartCards = ({ ChartInfo }) => {
  console.log(ChartInfo.value);
  const { data, error, isLoading } = useQuery([ChartInfo.text], () => {
    return fetchPublicData(ChartInfo.value);
  });
  console.log(data);
  return (
    <SituationCard
      bodyClass="h-[600px]"
      title={ChartInfo.text}
      id={'全球开源进出口贡献量'}
      loading={isLoading}
    >
      {(ref) => {
        return (
          !isLoading && (
            <DependencywheelCommon
              containerRef={ref}
              loading={isLoading}
              data={data}
            />
          )
        );
      }}
    </SituationCard>
  );
};

const Dependencywheel = () => {
  const { t } = useTranslation();
  const dependencywheel = [
    {
      name: '进出口依轮图',
      id: 'import_xport_rotation chart(EU_Merger)',
      value: [
        {
          value:
            '/test/collaborator_model/dependency_wheel_2022_AS_country.json',
          text: '22 进出口(欧盟合并)',
        },
        {
          value:
            '/test/collaborator_model/dependency_wheel_2023_AS_country.json',
          text: '23 进出口(欧盟合并)',
        },
        {
          value:
            '/test/collaborator_model/dependency_wheel_2024_AS_country.json',
          text: '24 进出口(欧盟合并)',
        },
        {
          value:
            '/test/collaborator_model/dependency_wheel_2022 Q1_QS-JAN_country.json',
          text: '22 Q1 进出口(欧盟合并)',
        },
        {
          value:
            '/test/collaborator_model/dependency_wheel_2022 Q2_QS-JAN_country.json',
          text: '22 Q2 进出口(欧盟合并)',
        },
        {
          value:
            '/test/collaborator_model/dependency_wheel_2022 Q3_QS-JAN_country.json',
          text: '22 Q3 进出口(欧盟合并)',
        },
        {
          value:
            '/test/collaborator_model/dependency_wheel_2022 Q4_QS-JAN_country.json',
          text: '22 Q4 进出口(欧盟合并)',
        },
        {
          value:
            '/test/collaborator_model/dependency_wheel_2023 Q1_QS-JAN_country.json',
          text: '23 Q1 进出口(欧盟合并)',
        },
        {
          value:
            '/test/collaborator_model/dependency_wheel_2023 Q2_QS-JAN_country.json',
          text: '23 Q2 进出口(欧盟合并)',
        },
        {
          value:
            '/test/collaborator_model/dependency_wheel_2023 Q3_QS-JAN_country.json',
          text: '23 Q3 进出口(欧盟合并)',
        },
        {
          value:
            '/test/collaborator_model/dependency_wheel_2023 Q4_QS-JAN_country.json',
          text: '23 Q4 进出口(欧盟合并)',
        },
        {
          value:
            '/test/collaborator_model/dependency_wheel_2024 Q1_QS-JAN_country.json',
          text: '24 Q1 进出口(欧盟合并)',
        },
        {
          value:
            '/test/collaborator_model/dependency_wheel_2024 Q2_QS-JAN_country.json',
          text: '24 Q2 进出口(欧盟合并)',
        },
        {
          value:
            '/test/collaborator_model/dependency_wheel_2024 Q3_QS-JAN_country.json',
          text: '24 Q3 进出口(欧盟合并)',
        },
        {
          value:
            '/test/collaborator_model/dependency_wheel_2024 Q4_QS-JAN_country.json',
          text: '24 Q4 进出口(欧盟合并)',
        },
        {
          value:
            '/test/collaborator_model/dependency_wheel_2025 Q1_QS-JAN_country.json',
          text: '25 Q1 进出口(欧盟合并)',
        },
      ],
    },
    // {
    //     name: '进出口依轮图（欧盟）',
    //     id: 'import_xport_rotation chart(EU_Separate)',
    //     value: [
    //         {
    //             value: '/test/collaborator_model/dependency_wheel_not_merge_eu_2022 Q1_QS-JAN_country.json',
    //             text: '22 Q1 进出口(欧盟拆开)',
    //         },
    //         {
    //             value: '/test/collaborator_model/dependency_wheel_not_merge_eu_2022 Q2_QS-JAN_country.json',
    //             text: '22 Q2 进出口(欧盟拆开)',
    //         },
    //         {
    //             value: '/test/collaborator_model/dependency_wheel_not_merge_eu_2022 Q3_QS-JAN_country.json',
    //             text: '22 Q3 进出口(欧盟拆开)',
    //         },
    //         {
    //             value: '/test/collaborator_model/dependency_wheel_not_merge_eu_2022 Q4_QS-JAN_country.json',
    //             text: '22 Q4 进出口(欧盟拆开)',
    //         },
    //         {
    //             value: '/test/collaborator_model/dependency_wheel_not_merge_eu_2023 Q1_QS-JAN_country.json',
    //             text: '23 Q1 进出口(欧盟拆开)',
    //         },
    //         {
    //             value: '/test/collaborator_model/dependency_wheel_not_merge_eu_2023 Q2_QS-JAN_country.json',
    //             text: '23 Q2 进出口(欧盟拆开)',
    //         },
    //         {
    //             value: '/test/collaborator_model/dependency_wheel_not_merge_eu_2023 Q3_QS-JAN_country.json',
    //             text: '23 Q3 进出口(欧盟拆开)',
    //         },
    //         {
    //             value: '/test/collaborator_model/dependency_wheel_not_merge_eu_2023 Q4_QS-JAN_country.json',
    //             text: '23 Q4 进出口(欧盟拆开)',
    //         },
    //         {
    //             value: '/test/collaborator_model/dependency_wheel_not_merge_eu_2024 Q1_QS-JAN_country.json',
    //             text: '24 Q1 进出口(欧盟拆开)',
    //         },
    //         {
    //             value: '/test/collaborator_model/dependency_wheel_not_merge_eu_2024 Q2_QS-JAN_country.json',
    //             text: '24 Q2 进出口(欧盟拆开)',
    //         },
    //         {
    //             value: '/test/collaborator_model/dependency_wheel_not_merge_eu_2024 Q3_QS-JAN_country.json',
    //             text: '24 Q3 进出口(欧盟拆开)',
    //         },
    //         {
    //             value: '/test/collaborator_model/dependency_wheel_not_merge_eu_2024 Q4_QS-JAN_country.json',
    //             text: '24 Q4 进出口(欧盟拆开)',
    //         },
    //         {
    //             value: '/test/collaborator_model/dependency_wheel_not_merge_eu_2025 Q1_QS-JAN_country.json',
    //             text: '25 Q1 进出口(欧盟拆开)',
    //         },
    //         {
    //             value: '/test/collaborator_model/dependency_wheel_not_merge_eu_2022_AS_country.json',
    //             text: '22 进出口(欧盟拆开)',
    //         },
    //         {
    //             value: '/test/collaborator_model/dependency_wheel_not_merge_eu_2023_AS_country.json',
    //             text: '23 进出口(欧盟拆开)',
    //         },
    //         {
    //             value: '/test/collaborator_model/dependency_wheel_not_merge_eu_2024_AS_country.json',
    //             text: '24 进出口(欧盟拆开)',
    //         },
    //     ]
    // }
  ];
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
  const title = '全球开源进出口贡献量';
  return (
    <div className="relative">
      <div key={title}>
        <h1
          id={title}
          className={
            'group relative z-20 mb-8 flex text-3xl font-semibold md:px-4 md:text-3xl'
          }
        >
          {title}
          <a href={`#${title}`}>
            <span className="group-hover:text-primary invisible ml-2 cursor-pointer group-hover:visible">
              #
            </span>
          </a>
        </h1>
        <div className="mb-6">
          {' '}
          <Alert
            message="开源进出口贡献量是衡量国家和地区之间开源协作程度的重要指标。它被定义为某个国家或地区的开发者向其他国家或地区的开源项目贡献的代码量，即“出口”，以及该国家或地区的开源项目接受来自其他国家或地区开发者贡献的代码量，即“进口”。这里的代码量是指开发者在开源项目中实际编写的代码数量，通常以提交次数、代码行数来衡量。"
            showIcon
          />
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
            ChartInfo={{ value: selectedYear, text: label + title }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dependencywheel;
