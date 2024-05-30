import React, { useState, useRef, useMemo } from 'react';
import TableCard from '@modules/oh/components/TableCard';
import EChartX from '@common/components/EChartX';
import type { EChartsOption } from 'echarts';
import { Select } from 'antd';
import useQueryDateRange from '@modules/oh/hooks/useQueryDateRange';
import { useCodesTrendQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';

let yList = [
  '数据压缩算法',
  'UI',
  '图片',
  '工具',
  '数据存储',
  '其他',
  '框架类',
  '图像图形处理',
  '字体字幕处理',
  '网络协议通信',
  '视频编解码',
  '日志打印',
  '文本解析器',
  '深度学习',
  '安全',
  '数据结构存储',
  '音视频',
  '加解密算法',
  '搜索',
  '动画',
  '多媒体',
  '文件数据与传输',
];
const CodeChart = () => {
  const { timeStart, timeEnd } = useQueryDateRange();
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
      noType: 0,
    },
  ];
  const onChange = (e) => {
    setType(e);
  };
  const query = {
    beginDate: timeStart,
    endDate: timeEnd,
    label: 'openharmony-tpc',
    level: 'community',
  };
  const { isLoading, isFetching, data } = useCodesTrendQuery(client, query, {});
  const option = useMemo(() => {
    console.log(data?.codesTrend.map((item) => item.type));
    const typeData =
      data?.codesTrend?.find((item) => item.type === type)?.detailList || [];
    const echartsOpts: EChartsOption = {
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
        data: typeData.map((item) => item.date.slice(0, 10)),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: type,
          type: 'line',
          smooth: true,
          data: typeData.map((item) => item.count),
        },
      ],
    };
    return echartsOpts;
  }, [data, type]);
  return (
    <>
      <TableCard id={'codeChart'} title={'代码量趋势图'}>
        <div>
          分类：
          <Select onChange={onChange} style={{ width: 120 }} value={type}>
            {yList.map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div ref={cardRef}>
          <EChartX loading={isLoading} option={option} containerRef={cardRef} />
        </div>
      </TableCard>
    </>
  );
};

export default CodeChart;
