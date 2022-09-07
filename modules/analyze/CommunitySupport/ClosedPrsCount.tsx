import React, { useEffect, useMemo, useRef } from 'react';
import { useMetricQuery } from '@graphql/generated';
import client from '@graphql/client';
import { getLineOption } from '../options';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
//
// const echartsOpts = {
//   ...line(),
//   series: [
//     {
//       name: 'Email',
//       type: 'line',
//       stack: 'Total',
//       data: [120, 132, 101, 134, 90, 230, 210],
//     },
//     {
//       name: 'Union Ads',
//       type: 'line',
//       stack: 'Total',
//       data: [220, 182, 191, 234, 290, 330, 310],
//     },
//     {
//       name: 'Video Ads',
//       type: 'line',
//       stack: 'Total',
//       data: [150, 232, 201, 154, 190, 330, 410],
//     },
//     {
//       name: 'Direct',
//       type: 'line',
//       stack: 'Total',
//       data: [320, 332, 301, 334, 390, 330, 320],
//     },
//     {
//       name: 'Search Engine',
//       type: 'line',
//       stack: 'Total',
//       data: [820, 932, 901, 934, 1290, 1330, 1320],
//     },
//   ],
// };

const ClosedPrsCount = () => {
  const chartInesRef = useRef(false);

  // const { data } = useMetricCodequalityQuery(client, {
  //   url: 'https://github.com/facebook/react',
  // });
  // console.log(data);
  //
  const { data: d2, isLoading } = useMetricQuery(client, {
    url: 'https://github.com/facebook/react',
  });

  useEffect(() => {}, []);

  const echartsOpts = useMemo(() => {
    if (!d2) return {};
    const metricCommunity = d2?.metricCommunity;
    console.log(metricCommunity);

    const closedPrsCount = metricCommunity?.map((i) =>
      String(i.closedPrsCount)
    );
    const grimoireCreationDate = metricCommunity?.map((i) =>
      String(i.grimoireCreationDate)
    );
    console.log(grimoireCreationDate);
    return getLineOption({
      xAxisData: grimoireCreationDate,
      series: [
        {
          name: 'Search Engine',
          type: 'line',
          smooth: true,
          data: closedPrsCount,
        },
      ],
    });
  }, [d2]);

  console.log(echartsOpts);
  return (
    <BaseCard
      loading={isLoading}
      title="Overview"
      description="The growth in the aggregated count of unique contributors analyzed during the selected time period."
    >
      <EChartX option={echartsOpts} />
    </BaseCard>
  );
};

export default ClosedPrsCount;
