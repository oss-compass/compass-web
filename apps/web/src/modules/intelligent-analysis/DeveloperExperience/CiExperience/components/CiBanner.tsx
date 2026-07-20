import React from 'react';

/**
 * 数据声明 banner（社区软色卡，无彩色侧边框）：
 * 总目标 + 数据声明 + 不打总分口径。
 */
const CiBanner: React.FC = () => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-[12.5px] leading-relaxed text-slate-600">
    <span className="mr-1">🎯</span>
    <b className="font-semibold text-slate-700">总目标</b>
    ：四个维度共同服务于
    <b className="font-semibold text-slate-700">贡献者使用体验</b>
    ——稳定性是底线，效率是主干，交互体验是直接感知层，成本是团队内部约束（贡献者感知不到，置末）。
    <span className="mx-1">🏷️</span>
    <b className="font-semibold text-slate-700">数据声明</b>
    ：本页全部数字由验证仓{' '}
    <b className="font-semibold text-slate-700">gitcode-ci-lab</b>{' '}
    实测生成（2026-07-11→07-18 全窗：runtime 306 run/133 失败、ops-nn 724 run/175
    失败，失败分类 100% 处理，待定率 0% / 2.9%）；DATA 块由{' '}
    <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[11.5px] text-slate-500">
      parser/page_data.py
    </code>{' '}
    注入，渲染层零硬编码；问题根因只来自机理知识库（人工审定）。
    <b className="font-semibold text-slate-700">本报告不打总分</b>
    ：改进效果 = 结果指标日粒度曲线 + 改进项落地标注 + 前后对比。
  </div>
);

export default CiBanner;
