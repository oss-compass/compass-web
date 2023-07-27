import React, { useRef, useEffect, useCallback } from 'react';
import { useDeepCompareEffect } from 'ahooks';
import { connect, init, getInstanceByDom } from 'echarts';
import type { CSSProperties } from 'react';
import type { EChartsOption, ECharts, SetOptionOpts } from 'echarts';
import { useResizeDetector } from 'react-resize-detector';
import useInViewportDebounce from '@common/hooks/useInViewportDebounce';
import { DebugLogger } from '@common/debug';

const logger = new DebugLogger('EChartX');

connect('group-time');

export interface ReactEChartsProps {
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: 'light' | 'dark';
  containerRef?: React.RefObject<HTMLElement>;
  _tracing?: string;
}

const EChartX: React.FC<ReactEChartsProps> = ({
  option,
  style,
  settings = { notMerge: true },
  loading,
  theme,
  containerRef,
  _tracing,
}) => {
  const inView = useInViewportDebounce(containerRef);
  const chartRef = useRef<HTMLDivElement>(null);

  if (_tracing) {
    logger.debug(_tracing, { inView, loading, option });
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
        chart!.group = 'group-time';
      } else {
        chart!.group = '';
      }
    }
  }, [loading, inView]);

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
