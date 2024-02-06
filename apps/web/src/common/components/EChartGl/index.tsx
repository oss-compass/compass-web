import React, { useRef, useEffect, useCallback } from 'react';
import { useDeepCompareEffect } from 'ahooks';
import { init, getInstanceByDom } from 'echarts';
import type { CSSProperties } from 'react';
import type { EChartsOption, ECharts, SetOptionOpts } from 'echarts';
import { useResizeDetector } from 'react-resize-detector';
import useInViewportDebounce from '@common/hooks/useInViewportDebounce';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { Bar3DChart } from 'echarts-gl/charts';
import { Grid3DComponent } from 'echarts-gl/components';

echarts.use([Grid3DComponent, Bar3DChart, CanvasRenderer]);
export interface ReactEChartsProps {
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: 'light' | 'dark';
  containerRef?: React.RefObject<HTMLElement>;
  _tracing?: string;
}

const EChartGl: React.FC<ReactEChartsProps> = ({
  option,
  style,
  settings = { notMerge: true },
  loading,
  theme,
  containerRef,
}) => {
  const inView = useInViewportDebounce(containerRef);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // init
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme);
    }
    return () => {
      chart?.dispose();
    };
  }, [theme]);

  useDeepCompareEffect(() => {
    // Update chart
    if (inView && chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)!;
      chart.setOption(option, settings);
    }
  }, [option, settings, inView]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)!;
      if (inView) {
        loading === true ? chart?.showLoading() : chart?.hideLoading();
      } else {
      }
    }
  }, [loading, inView]);

  // ----------------container resize------------------------------
  const onResize = useCallback((width?: number, height?: number) => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)!;
      chart?.resize({
        width: 'auto',
        height: Number(height) > 520 ? height - 80 : 280,
      });
    }
  }, []);

  useResizeDetector({
    targetRef: containerRef,
    onResize,
    skipOnMount: true,
  });

  return (
    <div ref={chartRef} style={{ width: '100%', height: '100%', ...style }} />
  );
};

export default React.memo(EChartGl);
