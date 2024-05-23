import React, { useState, useRef } from 'react';
import TableCard from '@modules/oh/components/TableCard';
import MyTable from '@common/components/Table';
import EChartX from '@common/components/EChartX';
import type { EChartsOption } from 'echarts';
import { getPieOption } from '@modules/analyze/DataView/MetricDetail/metricChartOption';

const Pie1 = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rowData = [
    {
      date: '2024-02-14 00:00:00',
      l0l1: 0,
      l2: 0,
      noType: 0,
    },
    {
      date: '2024-02-20',
      l0l1: 0,
      l2: 0,
      noType: 10632962,
    },
    {
      date: '2024-02-27',
      l0l1: 0,
      l2: 0,
      noType: 10637652,
    },
    {
      date: '2024-03-05',
      l0l1: 0,
      l2: 0,
      noType: 10666058,
    },
    {
      date: '2024-03-12',
      l0l1: 0,
      l2: 0,
      noType: 10677702,
    },
    {
      date: '2024-03-19',
      l0l1: 0,
      l2: 0,
      noType: 10837412,
    },
    {
      date: '2024-03-26',
      l0l1: 0,
      l2: 0,
      noType: 10857112,
    },
    {
      date: '2024-04-02',
      l0l1: 0,
      l2: 0,
      noType: 10872428,
    },
    {
      date: '2024-04-09',
      l0l1: 0,
      l2: 0,
      noType: 10880178,
    },
    {
      date: '2024-04-16',
      l0l1: 0,
      l2: 0,
      noType: 10898971,
    },
    {
      date: '2024-04-23',
      l0l1: 0,
      l2: 0,
      noType: 10926446,
    },
    {
      date: '2024-04-30',
      l0l1: 0,
      l2: 0,
      noType: 11018312,
    },
    {
      date: '2024-05-07',
      l0l1: 0,
      l2: 0,
      noType: 11106940,
    },
    {
      date: '2024-05-14 00:00:00',
      l0l1: 0,
      l2: 0,
      noType: 11136940,
    },
  ];
  const option1: EChartsOption = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      // data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },

    series: [
      {
        name: '代码量',
        type: 'line',
        smooth: true,
        data: rowData.map((item) => item.noType),
      },
    ],
  };
  const option = getPieOption({
    seriesData: [
      { value: 1500, name: 'logistics_center' },
      { value: 1100, name: 'manufacturing_plant' },
      { value: 900, name: 'retail_store' },
      { value: 850, name: 'data_center' },
      { value: 700, name: 'research_lab' },
      { value: 680, name: 'warehouse' },
      { value: 580, name: 'distribution_hub' },
      { value: 480, name: 'office_complex' },
      { value: 380, name: 'customer_service_center' },
      { value: 378, name: 'distributed_camera' },
    ],
  });

  return (
    <div className="w-full">
      <TableCard id={'codeChart1'} title={'仓库代码量TOP10'}>
        <div ref={cardRef}>
          <EChartX loading={false} option={option} containerRef={cardRef} />
        </div>
      </TableCard>
      {/* <TableCard id={'codeChart2'} title={'贡献者代码量 TOP10'}>
        <div ref={cardRef}>
          <EChartX loading={false} option={option} containerRef={cardRef} />
        </div>
      </TableCard>
      <TableCard id={'codeChart3'} title={'组织代码量 TOP10'}>
        <div ref={cardRef}>
          <EChartX loading={false} option={option} containerRef={cardRef} />
        </div>
      </TableCard> */}
    </div>
  );
};
const Pie2 = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rowData = [
    {
      date: '2024-02-14 00:00:00',
      l0l1: 0,
      l2: 0,
      noType: 0,
    },
    {
      date: '2024-02-20',
      l0l1: 0,
      l2: 0,
      noType: 10632962,
    },
    {
      date: '2024-02-27',
      l0l1: 0,
      l2: 0,
      noType: 10637652,
    },
    {
      date: '2024-03-05',
      l0l1: 0,
      l2: 0,
      noType: 10666058,
    },
    {
      date: '2024-03-12',
      l0l1: 0,
      l2: 0,
      noType: 10677702,
    },
    {
      date: '2024-03-19',
      l0l1: 0,
      l2: 0,
      noType: 10837412,
    },
    {
      date: '2024-03-26',
      l0l1: 0,
      l2: 0,
      noType: 10857112,
    },
    {
      date: '2024-04-02',
      l0l1: 0,
      l2: 0,
      noType: 10872428,
    },
    {
      date: '2024-04-09',
      l0l1: 0,
      l2: 0,
      noType: 10880178,
    },
    {
      date: '2024-04-16',
      l0l1: 0,
      l2: 0,
      noType: 10898971,
    },
    {
      date: '2024-04-23',
      l0l1: 0,
      l2: 0,
      noType: 10926446,
    },
    {
      date: '2024-04-30',
      l0l1: 0,
      l2: 0,
      noType: 11018312,
    },
    {
      date: '2024-05-07',
      l0l1: 0,
      l2: 0,
      noType: 11106940,
    },
    {
      date: '2024-05-14 00:00:00',
      l0l1: 0,
      l2: 0,
      noType: 11136940,
    },
  ];
  const option1: EChartsOption = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      // data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },

    series: [
      {
        name: '代码量',
        type: 'line',
        smooth: true,
        data: rowData.map((item) => item.noType),
      },
    ],
  };
  const option = getPieOption({
    seriesData: [
      { value: 2500, name: 'johnsmith' },
      { value: 2000, name: 'janelee' },
      { value: 1800, name: 'davidwang' },
      { value: 1600, name: 'sarahkim' },
      { value: 1400, name: 'michaelchen' },
      { value: 1200, name: 'emilywu' },
      { value: 1050, name: 'tomzhang' },
      { value: 900, name: 'jessicaliu' },
      { value: 800, name: 'kevinjin' },
      { value: 700, name: 'xinxin' },
    ],
  });

  return (
    <div className="w-full">
      <TableCard id={'codeChart2'} title={'贡献者代码量 TOP10'}>
        <div ref={cardRef}>
          <EChartX loading={false} option={option} containerRef={cardRef} />
        </div>
      </TableCard>
    </div>
  );
};
const Pie3 = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rowData = [
    {
      date: '2024-02-14 00:00:00',
      l0l1: 0,
      l2: 0,
      noType: 0,
    },
    {
      date: '2024-02-20',
      l0l1: 0,
      l2: 0,
      noType: 10632962,
    },
    {
      date: '2024-02-27',
      l0l1: 0,
      l2: 0,
      noType: 10637652,
    },
    {
      date: '2024-03-05',
      l0l1: 0,
      l2: 0,
      noType: 10666058,
    },
    {
      date: '2024-03-12',
      l0l1: 0,
      l2: 0,
      noType: 10677702,
    },
    {
      date: '2024-03-19',
      l0l1: 0,
      l2: 0,
      noType: 10837412,
    },
    {
      date: '2024-03-26',
      l0l1: 0,
      l2: 0,
      noType: 10857112,
    },
    {
      date: '2024-04-02',
      l0l1: 0,
      l2: 0,
      noType: 10872428,
    },
    {
      date: '2024-04-09',
      l0l1: 0,
      l2: 0,
      noType: 10880178,
    },
    {
      date: '2024-04-16',
      l0l1: 0,
      l2: 0,
      noType: 10898971,
    },
    {
      date: '2024-04-23',
      l0l1: 0,
      l2: 0,
      noType: 10926446,
    },
    {
      date: '2024-04-30',
      l0l1: 0,
      l2: 0,
      noType: 11018312,
    },
    {
      date: '2024-05-07',
      l0l1: 0,
      l2: 0,
      noType: 11106940,
    },
    {
      date: '2024-05-14 00:00:00',
      l0l1: 0,
      l2: 0,
      noType: 11136940,
    },
  ];
  const option1: EChartsOption = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      // data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },

    series: [
      {
        name: '代码量',
        type: 'line',
        smooth: true,
        data: rowData.map((item) => item.noType),
      },
    ],
  };
  const option = getPieOption({
    seriesData: [
      { value: 3000, name: 'huawei' },
      { value: 2800, name: 'apple' },
      { value: 2500, name: 'google' },
      { value: 2300, name: 'amazon' },
      { value: 2100, name: 'facebook' },
      { value: 1800, name: 'alibaba' },
      { value: 1600, name: 'tencent' },
      { value: 1400, name: 'intel' },
      { value: 1200, name: 'oracle' },
      { value: 1000, name: 'osChina' },
    ],
  });

  return (
    <div className="w-full">
      <TableCard id={'codeChart3'} title={'组织代码量 TOP10'}>
        <div ref={cardRef}>
          <EChartX loading={false} option={option} containerRef={cardRef} />
        </div>
      </TableCard>
    </div>
  );
};
const CodePie = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [type, setType] = useState('UI');

  const rowData = [
    {
      date: '2024-02-14 00:00:00',
      l0l1: 0,
      l2: 0,
      noType: 0,
    },
    {
      date: '2024-02-20',
      l0l1: 0,
      l2: 0,
      noType: 10632962,
    },
    {
      date: '2024-02-27',
      l0l1: 0,
      l2: 0,
      noType: 10637652,
    },
    {
      date: '2024-03-05',
      l0l1: 0,
      l2: 0,
      noType: 10666058,
    },
    {
      date: '2024-03-12',
      l0l1: 0,
      l2: 0,
      noType: 10677702,
    },
    {
      date: '2024-03-19',
      l0l1: 0,
      l2: 0,
      noType: 10837412,
    },
    {
      date: '2024-03-26',
      l0l1: 0,
      l2: 0,
      noType: 10857112,
    },
    {
      date: '2024-04-02',
      l0l1: 0,
      l2: 0,
      noType: 10872428,
    },
    {
      date: '2024-04-09',
      l0l1: 0,
      l2: 0,
      noType: 10880178,
    },
    {
      date: '2024-04-16',
      l0l1: 0,
      l2: 0,
      noType: 10898971,
    },
    {
      date: '2024-04-23',
      l0l1: 0,
      l2: 0,
      noType: 10926446,
    },
    {
      date: '2024-04-30',
      l0l1: 0,
      l2: 0,
      noType: 11018312,
    },
    {
      date: '2024-05-07',
      l0l1: 0,
      l2: 0,
      noType: 11106940,
    },
    {
      date: '2024-05-14 00:00:00',
      l0l1: 0,
      l2: 0,
      noType: 11136940,
    },
  ];
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      // data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: rowData.map((item) => item.date.slice(0, 10)),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '代码量',
        type: 'line',
        smooth: true,
        data: rowData.map((item) => item.noType),
      },
    ],
  };
  const onChange = (e) => {
    setType(e);
  };
  return (
    <div className="flex gap-4">
      <Pie1 />
      <Pie2 />
      <Pie3 />
    </div>
  );
};

export default CodePie;
