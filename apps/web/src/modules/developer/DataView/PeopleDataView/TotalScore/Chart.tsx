import React from 'react';
import EchartCommon from '@modules/developer/components/EchartCommon';
import { calcData } from '@modules/developer/DataView/utils';

const Chart = ({ containerRef, data }) => {
  console.log(data);
  let graph = calcData(data, 'lishengbao', 0, 'to_contributor');
  const option = {
    tooltip: {
      formatter: (params) => {
        if (params.dataType === 'node') {
          return params.data.name + ': ' + params.data.contributor_count;
        } else {
          return (
            params.data.source +
            ' > ' +
            params.data.target +
            ': ' +
            params.data.value
          );
        }
      },
    },
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        roam: false,
        type: 'graph',
        data: graph.nodes,
        links: graph.links,
        label: {
          show: true,
          position: 'right',
          formatter: '{b}',
        },
        selectedMode: 'single',
        draggable: true,
        layout: 'force',
        force: {
          repulsion: 700,
          gravity: 0.02,
          edgeLength: [700, 1000],
          layoutAnimation: true,
        },
        emphasis: {
          focus: 'adjacency',
          label: {
            position: 'right',
            show: true,
          },
        },
        labelLayout: {
          hideOverlap: true,
        },
        nodeScaleRatio: 0.1,
        zoom: 0.2,
        lineStyle: {
          curveness: 0.3,
        },
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
