import React from 'react';
import type { CiRepoData } from '../../types';
import AnalysisMatrices from '../matrices';
import { Collapsible } from '../shared';

type DailyDrilldownProps = {
  data: CiRepoData;
  day: string;
};

const DailyDrilldown: React.FC<DailyDrilldownProps> = ({ data, day }) => {
  const board = data.boards[day];
  if (!board) return null;

  return (
    <Collapsible
      className="!rounded-xl"
      summary={
        <span className="inline-block py-2 text-base font-semibold text-slate-900">
          详细数据
        </span>
      }
    >
      <div className="mb-4 text-xs text-slate-500">
        数据日期：{board.date || day}
      </div>
      <AnalysisMatrices matrices={board.matrices} />
    </Collapsible>
  );
};

export default DailyDrilldown;
