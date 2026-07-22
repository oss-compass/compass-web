import type { CiJourney, CiRepoKey } from '../../types';
import rawJourney from './ci-journey.json';

// ============ 开发者旅程全景图 · 唯一数据源 ============
// 数据由 scripts/extract_ci_journey.js 从 v2 设计稿源数据 HTML 内嵌 DATA.journey 程序化抽取，
// 覆盖每仓每个观测日的八段派生旅程（段综合分 / 四维日度信号 / 段三宫格 / 段趋势 / 段内问题），
// 数据更新至 2026-07-21。
//
// 更新方式：替换设计稿 HTML 后重跑 scripts/extract_ci_journey.js
// 重新生成 ci-journey.json，本文件无需改动。

export const CI_JOURNEY = rawJourney as unknown as Record<CiRepoKey, CiJourney>;
