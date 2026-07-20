import React from 'react';

/**
 * 数据声明 banner（社区软色卡，无彩色侧边框）：
 * 看板回答四个问题 + 数据声明 + 不打总分口径。
 */
const CiBanner: React.FC = () => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-[12.5px] leading-relaxed text-slate-600">
    <span className="mr-1">🎯</span>
    <b className="font-semibold text-slate-700">看板回答四个问题</b>：
    <b className="font-semibold text-slate-700">构建稳不稳</b>、
    <b className="font-semibold text-slate-700">反馈快不快</b>、
    <b className="font-semibold text-slate-700">开发者顺不顺</b>、
    <b className="font-semibold text-slate-700">算力值不值</b>
    ，总目标服务于
    <b className="font-semibold text-slate-700">贡献者使用体验</b>。
    <span className="mx-1">🏷️</span>
    <b className="font-semibold text-slate-700">数据声明</b>
    ：全部数字由验证仓{' '}
    <b className="font-semibold text-slate-700">gitcode-ci-lab</b>{' '}
    实测生成（2026-07-11→07-18）；DATA 块由{' '}
    <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[11.5px] text-slate-500">
      parser/page_data.py
    </code>{' '}
    注入，渲染层零硬编码；问题根因只来自机理知识库（人工审定）。
    <b className="font-semibold text-slate-700">本报告不打总分</b>
    ：改进效果 = 指标曲线 + 改进项落地标注 + 前后对比。
  </div>
);

export default CiBanner;
