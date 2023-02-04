import React from 'react';
import ScoreConversion from '@modules/analyze/components/ScoreConversion';
import MedianAndAvg from '@modules/analyze/components/MedianAndAvg';
import { useSnapshot } from 'valtio';
import { avgAndScoreState } from '@modules/analyze/store';

const AvgAndScore = () => {
  const snap = useSnapshot(avgAndScoreState);
  return (
    <div className="mr-4 flex h-8 shrink-0 items-center  md:hidden">
      <MedianAndAvg
        showAvg={snap.showAvg}
        onAvgChange={(b) => (avgAndScoreState.showAvg = b)}
        showMedian={snap.showMedian}
        onMedianChange={(b) => (avgAndScoreState.showMedian = b)}
      />
      <ScoreConversion
        onePoint={snap.onePointSys}
        onChange={(v) => {
          avgAndScoreState.onePointSys = v;
        }}
      />
    </div>
  );
};

export default AvgAndScore;
