import React, { useRef, useEffect, useCallback } from 'react';
import { useDeepCompareEffect } from 'ahooks';
import { init, getInstanceByDom } from 'echarts';
import type { CSSProperties } from 'react';
import type { EChartsOption, ECharts, SetOptionOpts } from 'echarts';
import { useResizeDetector } from 'react-resize-detector';
import useInViewportDebounce from '@common/hooks/useInViewportDebounce';

export interface ReactEChartsProps {
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: 'light' | 'dark';
  containerRef?: React.RefObject<HTMLElement>;
  legendselectchanged?: any;
}

const MetricChart: React.FC<ReactEChartsProps> = ({
  option,
  style,
  settings = { notMerge: true },
  loading,
  theme,
  containerRef,
  legendselectchanged,
}) => {
  const inView = useInViewportDebounce(containerRef);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)!;
      if (inView) {
        loading === true ? chart?.showLoading() : chart?.hideLoading();
      }
    }
  }, [loading, inView]);

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
      if (legendselectchanged) {
        const chart = getInstanceByDom(chartRef.current)!;
        chart.on('legendselectchanged', function (params: any) {
          let selected = params.selected!;
          let options = chart.getOption();
          let selectedList = Object.keys(selected).filter(
            (item) => selected[item]
          );
          options.series[1].data = legendselectchanged.filter((item) =>
            selectedList.includes(item.org)
          );
          this.setOption(options);
        });
      }
    }
  }, [option, settings, inView]);

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
    <div ref={chartRef} style={{ width: '100%', height: '100%', ...style }} />
  );
};

export default React.memo(MetricChart);
