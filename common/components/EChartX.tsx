import React, { useRef, useEffect, useCallback } from 'react';
import { useDeepCompareEffect } from 'ahooks';
import { init, getInstanceByDom } from 'echarts';
import type { CSSProperties } from 'react';
import type { EChartsOption, ECharts, SetOptionOpts } from 'echarts';
import { useResizeDetector } from 'react-resize-detector';

export interface ReactEChartsProps {
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: 'light' | 'dark';
  containerRef?: React.RefObject<HTMLElement>;
}

const EChartX: React.FC<ReactEChartsProps> = ({
  option,
  style,
  settings = { notMerge: true },
  loading,
  theme,
  containerRef,
}) => {
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
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)!;
      chart.setOption(option, settings);
    }
  }, [option, settings]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)!;
      loading === true ? chart.showLoading() : chart.hideLoading();
    }
  }, [loading]);

  // ----------------container resize------------------------------
  const onResize = useCallback((width?: number, height?: number) => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)!;
      chart.resize({ width: 'auto', height: Number(height) > 650 ? 650 : 350 });
    }
  }, []);

  useResizeDetector({
    targetRef: containerRef,
    onResize,
    skipOnMount: true,
  });

  return (
    <div ref={chartRef} style={{ width: '100%', height: '350px', ...style }} />
  );
};

export default EChartX;
