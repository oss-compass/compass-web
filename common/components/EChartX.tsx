import React, { useRef, useEffect, useCallback } from 'react';
import type { PropsWithChildren } from 'react';
import { useDeepCompareEffect } from 'ahooks';
import debounce from 'lodash/debounce';
import { useResizeDetector } from 'react-resize-detector';
import { init, getInstanceByDom } from 'echarts';
import type { CSSProperties } from 'react';
import type { EChartsOption, ECharts, SetOptionOpts } from 'echarts';

export interface ReactEChartsProps {
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: 'light' | 'dark';
}

const EChartX: React.FC<ReactEChartsProps> = ({
  option,
  style,
  settings,
  loading,
  theme,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // init
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme);
    }

    // resize
    const resizeChart = debounce(() => {
      chart?.resize();
    }, 200);

    window.addEventListener('resize', resizeChart);
    // dispose
    return () => {
      chart?.dispose();
      window.removeEventListener('resize', resizeChart);
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

  return (
    <div ref={chartRef} style={{ width: '100%', height: '350px', ...style }} />
  );
};

// const EChartX: React.FC<PropsWithChildren> = ({ children }) => {
//   const onResize = useCallback(() => {
//     console.log('-----------onResize---------------------');
//     // on resize logic
//   }, []);
//
//   const { ref, width, height } = useResizeDetector({ onResize });
//   return <div ref={ref}>{children}</div>;
// };
//

export default EChartX;
