import React from 'react';
import type { CiBoard, CiDimKey, CiRepoKey } from '../types';
import { DIM_NAME } from '../helpers';
import SectionCard from './SectionCard';
import DimensionCards from './DimensionCards';
import ProblemPanel from './ProblemPanel';
import AnalysisMatrices from './matrices';

type DimSelection = CiDimKey | 'all';

type DailyViewProps = {
  repo: CiRepoKey;
  days: string[];
  currentDay: string;
  board: CiBoard;
  dim: DimSelection;
  startIndex: number;
  onSelectDay: (day: string) => void;
  onSelectDim: (dim: DimSelection) => void;
};

const DailyView: React.FC<DailyViewProps> = ({
  repo,
  days,
  currentDay,
  board,
  dim,
  startIndex,
  onSelectDay,
  onSelectDim,
}) => {
  const sel = dim === 'all' ? null : dim;
  const panelTitle = sel
    ? `${DIM_NAME[sel]} · 当日问题清单与结果指标`
    : '全部问题总览 · 按优先级混排';
  const panelAnno = sel
    ? '点击其他维度卡切换；「全部问题总览」看四维度混排'
    : '点击维度卡进入单维度联动';

  return (
    <>
      <SectionCard
        cardIndex={startIndex}
        title={
          <>
            四维度状态 ·{' '}
            <span className="font-normal text-slate-500">{board.date}</span>
          </>
        }
        anno="四个维度共同服务于贡献者使用体验；点击维度卡，下方联动该维度的问题清单 / 结果指标 / 细分。卡片仅示数，口径以下方指标表为准；状态阈值 provisional，回测后定稿"
      >
        <DimensionCards
          days={days}
          currentDay={currentDay}
          board={board}
          dim={dim}
          onSelectDay={onSelectDay}
          onSelectDim={onSelectDim}
        />
      </SectionCard>

      <SectionCard
        cardIndex={startIndex + 1}
        title={panelTitle}
        anno={panelAnno}
      >
        <ProblemPanel repo={repo} board={board} dim={dim} />
      </SectionCard>

      <SectionCard
        cardIndex={startIndex + 2}
        title="当日分析 · 三个二维矩阵"
        anno="稳定性=失败全景定位；效率=快不快（时长统计）；成本=值不值（机时归属）。同一批秒数两种视角，不重复建表；交互体验无阶段矩阵，其分析视图=首次失败耗时按责任方分布（见维度细分）"
      >
        <AnalysisMatrices matrices={board.matrices} />
      </SectionCard>
    </>
  );
};

export default DailyView;
