import React, { type ReactNode } from 'react';
import type {
  CiDiag,
  CiDimKey,
  CiMatrices,
  CiRepoData,
  CiRepoKey,
} from '../../types';
import { DIM_NAME } from '../../helpers';
import { MatrixCost, MatrixEff, MatrixStab } from '../matrices';
import ProblemPanel from '../ProblemPanel';
import WeeklyProblemBoard from '../WeeklyProblemBoard';
import DiagBlock from '../DiagBlock';
import { ValText } from '../shared';
import type { CiGrain } from './ScoreCards';

type ProblemLocationProps = {
  data: CiRepoData;
  repo: CiRepoKey;
  grain: CiGrain;
  day: string;
  dim: CiDimKey;
};

/** 编号定位块（对齐社区入门报告「任务与关键动作」卡片：左侧灰底编号列，无色条） */
const LocBlock: React.FC<{
  step: number;
  title: string;
  sub?: string;
  children: ReactNode;
}> = ({ step, title, sub, children }) => (
  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
    <div className="flex items-stretch gap-0 border-b border-slate-100">
      <div className="flex w-14 shrink-0 flex-col items-center justify-center self-stretch border-r border-slate-100 bg-slate-50 py-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600">
          {step}
        </span>
      </div>
      <div className="min-w-0 flex-1 px-4 py-3.5">
        <div className="text-[13.5px] font-semibold text-slate-900">
          {title}
        </div>
        {sub ? (
          <div className="mt-1 text-[11.5px] leading-relaxed text-slate-500">
            {sub}
          </div>
        ) : null}
      </div>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

/** 选中维度对应的「定位」矩阵（daily=当日矩阵；weekly=周汇总矩阵） */
const DimMatrix: React.FC<{
  dim: CiDimKey;
  matrices: CiMatrices;
  diag?: CiDiag;
}> = ({ dim, matrices, diag }) => {
  if (dim === 'stability') {
    return <MatrixStab m={matrices.stab} />;
  }
  if (dim === 'efficiency') {
    return <MatrixEff m={matrices.eff} />;
  }
  if (dim === 'cost') {
    return <MatrixCost m={matrices.cost} />;
  }
  // interaction：无独立失败矩阵
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11.5px] leading-relaxed text-slate-400">
        交互体验无独立失败矩阵——定位落在「多快知道失败 / 是否需要重试」。被卡 PR
        多源于稳定性维度的平台故障拦截。
      </p>
      {diag ? (
        <DiagBlock dimKey="interaction" diag={diag} />
      ) : (
        <p className="text-[11.5px] leading-relaxed text-slate-400">
          周汇总交互细分见体验得分卡「本周 vs 上周」及稳定性定位表。
        </p>
      )}
    </div>
  );
};

/**
 * 问题定位卡：① 识别（问题现象 + 影响面）② 定位（阶段 × 机理 / 机时归属）；随维度联动。
 */
const ProblemLocation: React.FC<ProblemLocationProps> = ({
  data,
  repo,
  grain,
  day,
  dim,
}) => {
  const dimName = DIM_NAME[dim];

  if (grain === 'daily') {
    const board = data.boards[day];
    if (!board) {
      return null;
    }
    return (
      <div>
        <div className="mb-3">
          <h3 className="text-[15px] font-semibold text-slate-900">
            问题定位 · 日级 · {dimName}
          </h3>
          <p className="mt-1 text-[11.5px] leading-relaxed text-slate-500">
            先识别问题，再定位到阶段与责任；随维度联动
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <LocBlock
            step={1}
            title="识别 · 有哪些问题、影响多大"
            sub="根因只来自机理知识库（人工审定），不做推测"
          >
            <ProblemPanel repo={repo} board={board} dim={dim} />
          </LocBlock>
          <LocBlock
            step={2}
            title="定位 · 落在哪个阶段、是谁的责任"
            sub="失败矩阵：阶段 × 机理 / 机时归属"
          >
            <DimMatrix dim={dim} matrices={board.matrices} diag={board.diag} />
          </LocBlock>
        </div>
      </div>
    );
  }

  // 周级
  const w = data.weekly;
  const wp = w.probs.filter((p) => p.dim === dimName);
  const cmp = w.dimcmp.find((r) => r[0] === dimName);
  return (
    <div>
      <div className="mb-3">
        <h3 className="text-[15px] font-semibold text-slate-900">
          问题定位 · 周级 · {dimName}
        </h3>
        <p className="mt-1 text-[11.5px] leading-relaxed text-slate-500">
          先识别本周问题，再定位到阶段与责任；随维度联动
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <LocBlock step={1} title="识别 · 本周问题与环比">
          <div className="flex flex-col gap-2">
            <WeeklyProblemBoard probs={wp} />
            {cmp ? (
              <p className="text-[11.5px] leading-relaxed text-slate-400">
                环比：{cmp[1]} 本周{' '}
                <b className="font-semibold text-slate-600">
                  <ValText value={cmp[2]} />
                </b>{' '}
                · 上周 <ValText value={cmp[3]} />
                {cmp[4] ? ` · ${cmp[4]}` : ''}
              </p>
            ) : null}
          </div>
        </LocBlock>
        <LocBlock step={2} title="定位 · 落在哪个阶段、是谁的责任（周汇总）">
          <DimMatrix dim={dim} matrices={w.matrices} />
        </LocBlock>
      </div>
    </div>
  );
};

export default ProblemLocation;
