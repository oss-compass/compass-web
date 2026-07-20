import React from 'react';
import type { CiBoard, CiDim, CiDimKey } from '../types';
import { fmt, statusDotClass, statusWordClass } from '../helpers';
import { SparkLine } from './shared';

type DimSelection = CiDimKey | 'all';

type DimensionCardsProps = {
  days: string[];
  currentDay: string;
  board: CiBoard;
  dim: DimSelection;
  onSelectDay: (day: string) => void;
  onSelectDim: (dim: DimSelection) => void;
};

const segBase =
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors';
const segOn = 'border-slate-300 bg-slate-900 text-white';
const segOff =
  'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700';

const DimCard: React.FC<{
  dim: CiDim;
  selected: boolean;
  onClick: () => void;
}> = ({ dim, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={`flex flex-col rounded-2xl border bg-white px-4 py-3.5 text-left transition-all ${
      selected
        ? 'border-blue-300 ring-2 ring-blue-200'
        : 'border-slate-200 hover:border-slate-300'
    }`}
  >
    <div className="flex items-center gap-2">
      <span
        className={`h-2.5 w-2.5 shrink-0 rounded-full ${statusDotClass[dim.s]}`}
      />
      <span className="text-[13.5px] font-bold text-slate-800">{dim.name}</span>
      {dim.probn ? (
        <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10.5px] font-bold text-slate-500">
          {dim.toppri ? `${dim.toppri}·` : ''}
          {dim.probn} 问题
        </span>
      ) : null}
      <span
        className={`ml-auto text-[12px] font-extrabold ${statusWordClass[dim.s]}`}
      >
        {dim.word}
      </span>
    </div>

    <ul className="mt-2 flex flex-col">
      {dim.vals.map((v, i) => {
        const val = fmt(v[1]);
        return (
          <li
            key={i}
            className="flex justify-between gap-2 border-b border-dashed border-slate-200 py-1 text-[12.5px] last:border-b-0"
          >
            <span className="text-slate-500">{v[0]}</span>
            <b className="whitespace-nowrap tabular-nums text-slate-800">
              {val.text}
            </b>
          </li>
        );
      })}
    </ul>

    <SparkLine
      className="mt-1.5"
      pts={dim.spark.pts}
      label={dim.spark.label}
      demo={dim.spark.demo}
    />
    {dim.note ? (
      <div className="mt-1.5 text-[11.5px] leading-relaxed text-amber-600">
        ⚠ {dim.note}
      </div>
    ) : null}
  </button>
);

const DimensionCards: React.FC<DimensionCardsProps> = ({
  days,
  currentDay,
  board,
  dim,
  onSelectDay,
  onSelectDim,
}) => (
  <div className="flex flex-col gap-3">
    {/* 日期切换 */}
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[11.5px] text-slate-400">
        日期（逐日观测板，基线随日滚动）：
      </span>
      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="日期切换">
        {days.map((dt) => (
          <button
            key={dt}
            type="button"
            role="tab"
            aria-selected={dt === currentDay}
            onClick={() => onSelectDay(dt)}
            className={`${segBase} ${dt === currentDay ? segOn : segOff}`}
          >
            {dt.slice(5)}
          </button>
        ))}
      </div>
    </div>

    {/* 当日 meta */}
    <div className="text-[11.5px] text-slate-500">
      {board.meta.map((m, i) => {
        const val = fmt(m[1]);
        return (
          <span key={i}>
            {i > 0 ? ' · ' : ''}
            {m[0]} <b className="font-semibold text-slate-700">{val.text}</b>
          </span>
        );
      })}
    </div>

    {/* 四维度卡 */}
    <div className="grid grid-cols-1 gap-3 >md:grid-cols-2 >lg:grid-cols-4">
      {board.dims.map((d) => (
        <DimCard
          key={d.key}
          dim={d}
          selected={dim === d.key}
          onClick={() => onSelectDim(d.key)}
        />
      ))}
    </div>

    {/* 全部问题总览 */}
    <div className="flex flex-wrap items-center gap-2.5">
      <button
        type="button"
        onClick={() => onSelectDim('all')}
        className={`${segBase} ${dim === 'all' ? segOn : segOff}`}
      >
        全部问题总览
      </button>
      <span className="text-[11.5px] leading-relaxed text-slate-400">
        问题归维度规则：单主维度按直接表现判（失败→稳定性，慢→效率，浪费→成本，反馈感知→交互体验），跨维度影响挂标注，不重复列。
      </span>
    </div>

    <p className="text-[11.5px] leading-relaxed text-slate-400">
      状态标准：<b className="font-semibold text-slate-600">需处理</b> = 当日有 P0/P1
      问题（今天就要派活）；<b className="font-semibold text-slate-600">关注</b> = 有 P2
      问题，或结果指标水位超阈（慢性项，处置走周复盘）；
      <b className="font-semibold text-slate-600">正常</b> = 两者皆无。水位阈值（provisional，回测后定稿）：Action
      平台失败率 ≥15%、流水线时长 90 分位 ≥90 min、CI 阻塞 PR ≥10、无效机时 ≥2 机时。
    </p>
  </div>
);

export default DimensionCards;
