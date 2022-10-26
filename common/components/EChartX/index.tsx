import React, { useRef, useEffect, useCallback } from 'react';
import { useDeepCompareEffect, useInViewport } from 'ahooks';
import { connect, init, getInstanceByDom } from 'echarts';
import type { CSSProperties } from 'react';
import type { EChartsOption, ECharts, SetOptionOpts } from 'echarts';
import { useResizeDetector } from 'react-resize-detector';

connect('group-time');

export interface ReactEChartsProps {
  _flag?: string;
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: 'light' | 'dark';
  containerRef?: React.RefObject<HTMLElement>;
}

const EChartX: React.FC<ReactEChartsProps> = ({
  _flag,
  option,
  style,
  settings = { notMerge: true },
  loading,
  theme,
  containerRef,
}) => {
  const [inViewport] = useInViewport(containerRef);
  const chartRef = useRef<HTMLDivElement>(null);

  if (_flag === 'debug') {
    console.log('debug echartx', { inViewport, loading, option });
  }

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
    if (inViewport && chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)!;
      chart.setOption(option, settings);
    }
  }, [option, settings, inViewport]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)!;
      if (inViewport) {
        loading === true ? chart?.showLoading() : chart?.hideLoading();
        chart!.group = 'group-time';
      } else {
        chart!.group = '';
      }
    }
  }, [loading, inViewport]);

  // ----------------container resize------------------------------
  const onResize = useCallback((width?: number, height?: number) => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)!;
      chart?.resize({
        width: 'auto',
        height: Number(height) > 650 ? 650 : 350,
      });
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

export default React.memo(EChartX);
