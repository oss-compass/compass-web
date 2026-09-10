import React from 'react';
import { CloseRateSparkline } from '../../../../UserJourney/OverviewDashboard/CloseRateTrendChart';
import IssueTrendModal, { IssueTrendModalData } from './IssueTrendModal';

/** 小趋势图统一入口：缩略图与弹窗共用同一份数据。 */
const IssueTrendSparkline: React.FC<{
  trend: IssueTrendModalData;
  width?: number;
  height?: number;
  maxValue?: number;
  className?: string;
}> = ({ trend, width = 52, height = 26, maxValue = 100, className = '' }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button
        type="button"
        className={`inline-flex shrink-0 cursor-pointer items-center justify-center rounded transition-colors hover:bg-teal-50 focus-visible:outline-teal-500 ${className}`}
        title="点击查看趋势大图"
        aria-label={`查看${trend.title}`}
        onClick={(event) => {
          event.stopPropagation();
          setOpen(true);
        }}
      >
        <CloseRateSparkline
          values={trend.values}
          width={width}
          height={height}
          stroke="#2563EB"
          minValue={0}
          maxValue={maxValue}
        />
      </button>
      <IssueTrendModal
        open={open}
        trend={trend}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default IssueTrendSparkline;
