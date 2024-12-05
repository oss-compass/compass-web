import React, { ReactNode } from 'react';
import { EChartsOption } from 'echarts';
import { DataResults } from '../type';
import useTimeAndChartType from '../hooks/useTimeAndChartType';

export const LabChartOption = ({
  originData,
  dataFormatFn,
  optionFn,
  render,
}: {
  originData: DataResults;
  dataFormatFn: (data: DataResults, timeFormat?: string | null) => DataResults;
  optionFn: (data: DataResults) => EChartsOption;
  render: ((args: { option: EChartsOption }) => ReactNode) | ReactNode;
}) => {
  const { timeFormat } = useTimeAndChartType();
  const data = dataFormatFn(originData, timeFormat);
  const echartsOpts = optionFn(data);

  return (
    <>
      {typeof render === 'function' ? render({ option: echartsOpts }) : render}
    </>
  );
};
