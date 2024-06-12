import React, { useState, useRef } from 'react';
import TableCard from '@modules/oh/components/TableCard';
import MyTable from '@common/components/Table';
import EChartX from '@common/components/EChartX';
import type { EChartsOption } from 'echarts';
import { Select } from 'antd';

const CodeChart = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [type, setType] = useState('UI');

  const rowData = [
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
    <>
      <TableCard id={'codeChart'} title={'代码总量趋势图'}>
        <div ref={cardRef}>
          <EChartX loading={false} option={option} containerRef={cardRef} />
        </div>
      </TableCard>
    </>
  );
};

export default CodeChart;
