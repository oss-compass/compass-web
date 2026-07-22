import React from 'react';
import { CalendarOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import type { CiRepoData } from '../../types';
import AnalysisMatrices from '../matrices';

type DailyDrilldownProps = {
  data: CiRepoData;
  day: string;
};

/** 当日分析：旅程全景图的矩阵下钻层。 */
const DailyDrilldown: React.FC<DailyDrilldownProps> = ({ data, day }) => {
  const activeDay =
    day && data.boards[day] ? day : data.days[data.days.length - 1];
  const board = activeDay ? data.boards[activeDay] : undefined;

  if (!board) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="text-xl font-semibold text-slate-900">
              当日分析 · 下钻明细
            </h2>
            <Tooltip title="旅程总览的明细层：稳定性看失败全景定位，效率看阶段执行快慢，成本看机时投入是否有效；位置轴采用 workflow 原生阶段名。">
              <InfoCircleOutlined className="shrink-0 cursor-help text-slate-400" />
            </Tooltip>
          </div>
          <p className="mt-1 text-[12px] leading-relaxed text-slate-400">
            三个二维矩阵将旅程体验信号下钻到 workflow 阶段，定位异常发生在哪里、影响多大。
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500">
          <CalendarOutlined className="text-slate-400" />
          数据日期：{board.date || activeDay}
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-200/80 bg-[linear-gradient(180deg,#fbfdff_0%,#f8fbff_100%)] p-4 >md:p-5">
        <AnalysisMatrices matrices={board.matrices} />
      </div>
    </section>
  );
};

export default DailyDrilldown;
