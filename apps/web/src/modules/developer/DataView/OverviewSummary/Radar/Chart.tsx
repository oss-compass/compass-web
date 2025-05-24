import React from 'react';
import EchartCommon from '@modules/developer/components/EchartCommon';

const Chart = ({ containerRef }) => {
  let data = [4202, 820, 2090, 3509, 4300, 1800];

  const option = {
    grid: {
      top: 20,
      bottom: 30,
      left: 10,
      right: 40,
      containLabel: true,
    },
    legend: {
      show: false,
    },
    radar: {
      splitArea: {
        show: false,
      },
      axisName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#696d6e',
      },
      axisLine: {
        lineStyle: {
          color: '#e6ebf1',
        },
      },
      // shape: 'circle',
      indicator: [
        { name: 'Commits', max: 6500 },
        { name: 'Issues', max: 1600 },
        { name: 'Issue Commenters', max: 3000 },
        { name: 'PR', max: 3800 },
        { name: 'PR Commenters', max: 5200 },
        { name: 'Reviews', max: 2500 },
      ],
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        symbol: 'circle',
        symbolSize: 1,
        shadowBlur: 0,
        lineStyle: {
          width: 4,
          type: 'solid',
          color: '#28b5e1',
        },
        data: [
          {
            value: data,
            areaStyle: {
              color: '#e9f7fb',
            },
          },
        ],
      },
    ],
  };
  // const cardRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   let chart = init(cardRef.current);
  //   chart.setOption(option);
  // }, [option]);

  return (
    <>
      <EchartCommon option={option} containerRef={containerRef} />
    </>
  );
};
export default React.memo(Chart);
