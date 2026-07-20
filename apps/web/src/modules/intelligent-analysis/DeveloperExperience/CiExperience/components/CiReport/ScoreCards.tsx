import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type {
  CiDim,
  CiDimCmpRow,
  CiDimKey,
  CiRepoData,
  CiStatus,
} from '../../types';
import {
  DIM_KEYS,
  DIM_NAME,
  delta,
  num,
  statusDotClass,
  statusWordClass,
} from '../../helpers';
import { ValText } from '../shared';

export type CiGrain = 'daily' | 'weekly';

type ScoreCardsProps = {
  data: CiRepoData;
  grain: CiGrain;
  day: string;
  dim: CiDimKey;
  onSelectGrain: (grain: CiGrain) => void;
  onSelectDay: (day: string) => void;
  onSelectDim: (dim: CiDimKey) => void;
  /** 选中维度的联动详情（关键指标趋势 + 问题定位），渲染在同一卡片内 */
  children?: React.ReactNode;
};

/** 每个维度的引导问句（对齐 dashboard DIM.ask） */
const DIM_ASK: Record<CiDimKey, string> = {
  stability: '构建结果可信吗?',
  efficiency: '反馈够快吗?',
  interaction: '开发者顺畅吗?',
  cost: '算力花得值吗?',
};

const CARD_TONE: Record<CiStatus, string> = {
  red: 'border-rose-200 bg-rose-50/30',
  yellow: 'border-amber-200 bg-amber-50/30',
  green: 'border-emerald-200 bg-emerald-50/30',
};

const DELTA_TONE: Record<'good' | 'bad' | 'flat', string> = {
  good: 'text-emerald-600',
  bad: 'text-rose-600',
  flat: 'text-slate-400',
};

/** 日级/周级分段开关 */
const GrainToggle: React.FC<{
  grain: CiGrain;
  onSelectGrain: (grain: CiGrain) => void;
}> = ({ grain, onSelectGrain }) => (
  <span className="inline-flex overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[13px]">
    {(['daily', 'weekly'] as CiGrain[]).map((g) => (
      <button
        key={g}
        type="button"
        onClick={() => onSelectGrain(g)}
        className={`rounded-md px-3 py-1 font-medium transition-colors ${
          grain === g
            ? 'bg-white text-slate-800 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        {g === 'daily' ? '日级' : '周级'}
      </button>
    ))}
  </span>
);

/** 卡片外壳（旅程全景图交互：选中环，占满栅格列） */
const CardShell: React.FC<{
  active: boolean;
  status?: CiStatus;
  onClick: () => void;
  ask: string;
  children: React.ReactNode;
}> = ({ active, status, onClick, ask, children }) => (
  <button
    type="button"
    role="tab"
    aria-selected={active}
    onClick={onClick}
    title={ask}
    className={`flex h-full w-full flex-col rounded-2xl border px-4 py-3.5 text-left shadow-[0_12px_32px_rgba(15,23,42,0.05)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
      status ? CARD_TONE[status] : 'border-slate-200/80 bg-white/90'
    } ${
      active
        ? 'ring-2 ring-violet-400'
        : 'hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]'
    }`}
  >
    {children}
  </button>
);

/** 日级维度卡内容 */
const DailyCard: React.FC<{ d: CiDim }> = ({ d }) => (
  <>
    <div className="flex flex-wrap items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${statusDotClass[d.s]}`} />
      <span className="text-[15px] font-semibold text-slate-900">{d.name}</span>
      {d.probn ? (
        <span className="inline-flex items-center rounded-md border border-rose-200 bg-rose-50 px-1.5 py-0.5 text-[10.5px] font-semibold text-rose-700">
          {d.toppri ? `${d.toppri}·` : ''}
          {d.probn} 问题
        </span>
      ) : null}
      <span
        className={`ml-auto text-[12px] font-semibold ${statusWordClass[d.s]}`}
      >
        {d.word}
      </span>
    </div>
    <div className="mt-1 text-[11.5px] text-slate-400">{DIM_ASK[d.key]}</div>
    <ul className="mt-2.5 flex flex-col gap-1.5">
      {d.vals.slice(0, 3).map((v, i) => (
        <li
          key={`${v[0]}-${i}`}
          className="flex items-center justify-between gap-2 text-[12.5px]"
        >
          <span className="min-w-0 truncate text-slate-500">{v[0]}</span>
          <ValText
            value={v[1]}
            className="shrink-0 font-semibold tabular-nums text-slate-800"
          />
        </li>
      ))}
    </ul>
    {d.note ? (
      <div className="mt-2 text-[11px] leading-relaxed text-slate-400">
        ⚠ {d.note}
      </div>
    ) : null}
  </>
);

/** 周级维度卡内容（本周 vs 上周） */
const WeeklyCard: React.FC<{ k: CiDimKey; row?: CiDimCmpRow }> = ({
  k,
  row,
}) => {
  if (!row) {
    return (
      <>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="text-[15px] font-semibold text-slate-900">
            {DIM_NAME[k]}
          </span>
        </div>
        <div className="mt-1 text-[11.5px] text-slate-400">{DIM_ASK[k]}</div>
        <div className="mt-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-3 py-4 text-center text-[12px] text-slate-400">
          本周无对比数据
        </div>
      </>
    );
  }
  const di = delta(num(row[3]), num(row[2]), true);
  return (
    <>
      <div className="flex items-center gap-2">
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            di.cls === 'bad'
              ? 'bg-rose-500'
              : di.cls === 'good'
              ? 'bg-emerald-500'
              : 'bg-amber-500'
          }`}
        />
        <span className="text-[15px] font-semibold text-slate-900">
          {DIM_NAME[k]}
        </span>
        <span
          className={`ml-auto text-[12px] font-semibold ${DELTA_TONE[di.cls]}`}
        >
          {di.arrow} {di.word}
        </span>
      </div>
      <div className="mt-1 text-[11.5px] text-slate-400">{DIM_ASK[k]}</div>
      <ul className="mt-2.5 flex flex-col gap-1.5 text-[12.5px]">
        <li className="flex items-center justify-between gap-2">
          <span className="min-w-0 truncate text-slate-500">{row[1]}</span>
          <ValText
            value={row[2]}
            className="shrink-0 font-semibold tabular-nums text-slate-800"
          />
        </li>
        <li className="flex items-center justify-between gap-2">
          <span className="text-slate-500">上周</span>
          <ValText
            value={row[3]}
            className="shrink-0 tabular-nums text-slate-500"
          />
        </li>
        {row[4] ? (
          <li className="text-[11px] leading-relaxed text-slate-400">
            {row[4]}
          </li>
        ) : null}
      </ul>
    </>
  );
};

/**
 * 体验得分卡：标题右上角日级/周级切换；四维度卡按旅程全景图样式横排（单选常驻），
 * 点击 onSelectDim 联动下方趋势与问题定位。
 */
const ScoreCards: React.FC<ScoreCardsProps> = ({
  data,
  grain,
  day,
  dim,
  onSelectGrain,
  onSelectDay,
  onSelectDim,
  children,
}) => {
  const board = data.boards[day];
  const w = data.weekly;
  const cmpByKey = React.useMemo(() => {
    const map: Partial<Record<CiDimKey, CiDimCmpRow>> = {};
    w.dimcmp.forEach((r) => {
      const key = DIM_KEYS.find((k) => DIM_NAME[k] === r[0]);
      if (key) {
        map[key] = r;
      }
    });
    return map;
  }, [w.dimcmp]);

  const title =
    grain === 'daily'
      ? `体验得分 · 日级 · ${board ? board.date : ''}`
      : `体验得分 · 周级 · ${w.period}`;
  const anno =
    grain === 'daily'
      ? '四个维度当日指标；点卡片联动下方趋势与问题定位'
      : '四个维度本周 vs 上周；点卡片联动下方趋势与问题定位';

  const dims: CiDim[] = board ? board.dims : [];
  const [detailExpanded, setDetailExpanded] = React.useState(true);

  return (
    <section className=">md:p-5 overflow-hidden rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          <p className="mt-1 text-[11.5px] leading-relaxed text-slate-500">
            {anno}
          </p>
        </div>
        <GrainToggle grain={grain} onSelectGrain={onSelectGrain} />
      </div>

      {/* 日级：日期切换行 + 当日 meta */}
      {grain === 'daily' && board ? (
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="text-[11.5px] text-slate-400">日期：</span>
          <div
            className="inline-flex flex-wrap gap-1"
            role="tablist"
            aria-label="日期切换"
          >
            {data.days.map((x) => (
              <button
                key={x}
                type="button"
                onClick={() => onSelectDay(x)}
                className={`rounded-md border px-2 py-0.5 text-[12px] font-medium transition-colors ${
                  x === day
                    ? 'border-sky-300 bg-sky-50 text-sky-700'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                }`}
              >
                {x.slice(5)}
              </button>
            ))}
          </div>
          <span className="ml-1 text-[11.5px] text-slate-400">
            {board.meta.map((mm, i) => (
              <span key={`${mm[0]}-${i}`}>
                {i > 0 ? ' · ' : ''}
                {mm[0]}{' '}
                <b className="font-semibold text-slate-600">
                  <ValText value={mm[1]} />
                </b>
              </span>
            ))}
          </span>
        </div>
      ) : null}

      {/* 四维度卡（占满整行） */}
      <div
        role="tablist"
        aria-label="维度得分卡"
        className="grid grid-cols-4 gap-3"
      >
        {grain === 'daily'
          ? dims.map((d) => (
              <CardShell
                key={d.key}
                active={dim === d.key}
                status={d.s}
                ask={DIM_ASK[d.key]}
                onClick={() => onSelectDim(d.key)}
              >
                <DailyCard d={d} />
              </CardShell>
            ))
          : DIM_KEYS.map((k) => (
              <CardShell
                key={k}
                active={dim === k}
                ask={DIM_ASK[k]}
                onClick={() => onSelectDim(k)}
              >
                <WeeklyCard k={k} row={cmpByKey[k]} />
              </CardShell>
            ))}
      </div>

      {/* 得分卡与联动详情之间的可收缩连接按钮（对齐社区入门体验旅程全景图） */}
      {children ? (
        <>
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setDetailExpanded((v) => !v)}
              aria-expanded={detailExpanded}
              className="group flex w-full cursor-pointer items-center gap-3 text-left"
            >
              <div className="h-px flex-1 bg-slate-200" />
              <span
                className={`flex items-center gap-2 rounded-full border px-3 py-1 text-[13px] transition-colors duration-150 ${
                  detailExpanded
                    ? 'border-slate-300 bg-white text-slate-700 shadow-sm'
                    : 'border-slate-200 bg-slate-100 text-slate-500 group-hover:border-slate-300'
                }`}
              >
                <span className="font-semibold">{DIM_NAME[dim]}</span>
                <span className="text-slate-400">· 关键指标趋势与问题定位</span>
                <DownOutlined
                  className={`text-[10px] text-slate-400 transition-transform duration-200 ${
                    detailExpanded ? '' : '-rotate-90'
                  }`}
                />
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </button>
          </div>

          {detailExpanded ? (
            <div className=">md:p-5 mt-4 overflow-hidden rounded-2xl border border-slate-200/80 bg-[linear-gradient(180deg,#fbfdff_0%,#f8fbff_100%)] p-4">
              {children}
            </div>
          ) : null}
        </>
      ) : null}
    </section>
  );
};

export default ScoreCards;
