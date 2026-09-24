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
  filterData?: any;
  /**
   * Additional echarts events subscribed on the chart instance. The deep
   * insight contribution pie charts use it to open the domain persona window
   * when an individual developer slice is hovered.
   */
  onEvents?: Record<string, (params: any, chart: ECharts) => void>;
}

const MetricChart: React.FC<ReactEChartsProps> = ({
  option,
  style,
  settings = { notMerge: true },
  loading,
  theme,
  containerRef,
  filterData,
  onEvents,
}) => {
  const inView = useInViewportDebounce(containerRef);
  const chartRef = useRef<HTMLDivElement>(null);

  // The chart instance is only re-created when the theme changes, so the
  // handlers are kept in a ref and read lazily to always see the latest one.
  const onEventsRef = useRef(onEvents);
  useEffect(() => {
    onEventsRef.current = onEvents;
  }, [onEvents]);

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
      // Subscribe the extra events on the instance created above, echarts
      // stores the handlers on the instance so they must be bound after init.
      Object.keys(onEventsRef.current || {}).forEach((eventName) => {
        chart?.on(eventName, (params: any) => {
          onEventsRef.current?.[eventName]?.(params, chart as ECharts);
        });
      });
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
      if (filterData) {
        chart.on('legendselectchanged', function (params: any) {
          const selected = params.selected!;
          const options = chart.getOption();
          const selectedList = Object.keys(selected).filter(
            (item) => selected[item]
          );
          options.series[1].data = filterData.filter((item) =>
            selectedList.includes(item.parentName)
          );
          chart.setOption(options);
        });
      }
    }
  }, [option, settings, inView]);

  // ----------------container resize------------------------------
  const onResize = useCallback((width?: number, height?: number) => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)!;
      chart?.resize();
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
