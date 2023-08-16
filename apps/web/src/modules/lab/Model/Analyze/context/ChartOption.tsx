import React, { ReactNode } from 'react';
import { EChartsOption } from 'echarts';
import { DataResults } from '../type';

export const LabChartOption = ({
  data,
  optionFn,
  render,
}: {
  data: DataResults;
  optionFn: (data: DataResults) => EChartsOption;
  render: ((args: { option: EChartsOption }) => ReactNode) | ReactNode;
}) => {
  const echartsOpts = optionFn(data);

  return (
    <>
      {typeof render === 'function' ? render({ option: echartsOpts }) : render}
    </>
  );
};
