import React, { useRef, useEffect } from 'react';
import { EChartsOption, init } from 'echarts';

const Pie = ({ score }) => {
  const colorList = ['#826af9', '#edf0f4'];
  let option: EChartsOption = {
    title: {
      // text: `{a|}`,
      text: `S+`,
      left: 'center',
      top: 'center',
      textStyle: {
        fontSize: 24,
        color: '#2A3A77',
        rich: {
          a: {
            backgroundColor: {
              image: '/images/test1/4.png',
              //'./data/asset/img/weather/sunny_128.png'
              //文本片段的 backgroundColor 可以指定为图片后，就可以在文本中使用图标了
            },
            height: 85, // 可以只指定图片的高度，从而图片的宽度根据图片的长宽比自动得到。
            width: 85,
          },
        },
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
            name: '一月',
            value: score,
            itemStyle: {
              borderRadius: 10,
            },
          },
          {
            name: '一月',
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
