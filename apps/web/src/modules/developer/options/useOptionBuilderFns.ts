import React, { useReducer, useCallback } from 'react';
import { EChartsOption } from 'echarts';
import { ChartThemeState } from '@modules/developer/store';
import { DataContainerResult } from '../type';

export type getBuilderOptionFn<T> = (v: T) => BuilderFn;

type BuilderFn = (
  pre: EChartsOption,
  data: DataContainerResult,
  theme: ChartThemeState
) => EChartsOption;

export const useOptionBuilderFns = (fns: BuilderFn[]) => {
  return (data: DataContainerResult, theme: ChartThemeState) => {
    return fns.reduce((pre, current) => {
      return current(pre, data, theme);
    }, {});
  };
};
