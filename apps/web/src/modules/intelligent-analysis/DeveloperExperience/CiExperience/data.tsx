import type { CiRepoData, CiRepoKey } from './types';
import runtimeData from './ci-runtime-data.json';
import opsnnData from './ci-opsnn-data.json';

// ============ 唯一数据源 ============
// runtime / ops-nn 全量实测数据由验证仓 gitcode-ci-lab 日粒度聚合，
// 整块取自 v2 设计稿看板 DATA。渲染层零硬编码：所有数字来自下方 JSON。

export const CI_DATA: Record<CiRepoKey, CiRepoData> = {
  runtime: runtimeData as unknown as CiRepoData,
  opsnn: opsnnData as unknown as CiRepoData,
};
