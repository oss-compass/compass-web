import React, { useRef, useEffect } from 'react';
import { EChartsOption, init } from 'echarts';

const Pie = ({ score }) => {
  var colorList = ['#998CEF', '#D9D8EB'];
  let option: EChartsOption = {
    title: {
      text: score,
      left: 'center',
      top: 'center',
      textStyle: {
        fontSize: 24,
        color: '#2A3A77',
      },
    },
    tooltip: {
      trigger: 'item',
      show: false,
    },
    series: [
      {
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['64%', '72%'],
        clockwise: false,
        avoidLabelOverlap: false,
        itemStyle: {
          color: function (params) {
            return colorList[params.dataIndex];
          },
        },
        label: {
          show: false,
        },
        labelLine: {
          length: 20,
          length2: 30,
          lineStyle: {
            width: 1,
          },
        },
        data: [
          {
            name: '',
            value: score,
          },
          {
            name: '',
            value: 100 - score,
          },
        ],
      },
    ],
  };
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chart = init(cardRef.current);
    chart.setOption(option);
  }, [option, cardRef.current]);

  return <div className="h-32 w-full" ref={cardRef}></div>;
};
export default React.memo(Pie);
