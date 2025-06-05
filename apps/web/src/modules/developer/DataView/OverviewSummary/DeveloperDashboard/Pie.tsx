import React, { useRef, useEffect } from 'react';
import { EChartsOption, init } from 'echarts';

const Pie = ({ score, rank }) => {
  const colorList = ['#826af9', '#edf0f4'];
  const rankScore = Number(rank.replace('%', ''));
  let option: EChartsOption = {
    title: {
      // text: `{a|}`,
      text: score,
      left: 'center',
      top: 'center',
      textStyle: {
        fontSize: 24,
        color: '#2A3A77',
        // rich: {
        //   a: {
        //     backgroundColor: {
        //       image: '/images/test1/4.png',
        //     },
        //     height: 85,
        //     width: 85,
        //   },
        // },
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
        radius: ['80%', '92%'],
        clockwise: false,
        avoidLabelOverlap: false,
        itemStyle: {
          // borderRadius: 10,
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
            name: 'out',
            value: 100 - rankScore,
            itemStyle: {
              borderRadius: 10,
            },
          },
          {
            name: 'in',
            value: rankScore,
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
