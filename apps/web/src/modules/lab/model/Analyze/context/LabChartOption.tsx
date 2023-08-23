import React, { ReactNode } from 'react';
import { EChartsOption } from 'echarts';
import { DataResults } from '../type';

export const LabChartOption = ({
  originData,
  dataFormatFn,
  optionFn,
  render,
}: {
  originData: DataResults;
  dataFormatFn: (data: DataResults) => DataResults;
  optionFn: (data: DataResults) => EChartsOption;
  render: ((args: { option: EChartsOption }) => ReactNode) | ReactNode;
}) => {
  const data = dataFormatFn(originData);
  const echartsOpts = optionFn(data);

  return (
    <>
      {typeof render === 'function' ? render({ option: echartsOpts }) : render}
    </>
  );
};
