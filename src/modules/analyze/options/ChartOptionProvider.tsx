import React, { ReactNode } from 'react';
import { EChartsOption } from 'echarts';
import { useSnapshot } from 'valtio';
import { ChartThemeState, chartThemeState } from '@modules/analyze/store';
import { DataContainerResult } from '@modules/analyze/type';
import { DebugLogger } from '@common/debug';

const logger = new DebugLogger('ChartOptionProvider');

export const ChartOptionProvider = ({
  _tracing,
  data,
  optionFn,
  render,
}: {
  data: DataContainerResult;
  optionFn: (
    data: DataContainerResult,
    theme: ChartThemeState
  ) => EChartsOption;
  render: ((args: { option: EChartsOption }) => ReactNode) | ReactNode;
  _tracing?: string;
}) => {
  const theme = useSnapshot(chartThemeState) as ChartThemeState;
  const echartsOpts = optionFn(data, theme);

  if (_tracing) {
    logger.debug(_tracing, echartsOpts);
  }

  return (
    <>
      {typeof render === 'function' ? render({ option: echartsOpts }) : render}
    </>
  );
};
