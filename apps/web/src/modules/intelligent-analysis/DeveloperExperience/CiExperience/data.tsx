import type { CiRepoData, CiRepoKey } from './types';
import runtimeData from './ci-runtime-data.json';
import opsnnData from './ci-opsnn-data.json';
import opscvData from './ci-opscv-data.json';
import graphafData from './ci-graphaf-data.json';
import opstransformerData from './ci-opstransformer-data.json';
import hcommData from './ci-hcomm-data.json';
import pyptoData from './ci-pypto-data.json';
import ascdevkitData from './ci-ascdevkit-data.json';
import hcclData from './ci-hccl-data.json';
import hixlData from './ci-hixl-data.json';
import ptoisaData from './ci-ptoisa-data.json';
import oamtoolsData from './ci-oamtools-data.json';
import amctData from './ci-amct-data.json';
import opbaseData from './ci-opbase-data.json';
import pyascData from './ci-pyasc-data.json';
import metadefData from './ci-metadef-data.json';
import asctoolsData from './ci-asctools-data.json';

// ============ 唯一数据源 ============
// 17 个仓库全量实测数据由验证仓 gitcode-ci-lab 日粒度聚合，
// 整块取自 v2 设计稿看板 DATA。渲染层零硬编码：所有数字来自下方 JSON。

export const CI_DATA: Record<CiRepoKey, CiRepoData> = {
  runtime: runtimeData as unknown as CiRepoData,
  opsnn: opsnnData as unknown as CiRepoData,
  opscv: opscvData as unknown as CiRepoData,
  graphaf: graphafData as unknown as CiRepoData,
  opstransformer: opstransformerData as unknown as CiRepoData,
  hcomm: hcommData as unknown as CiRepoData,
  pypto: pyptoData as unknown as CiRepoData,
  ascdevkit: ascdevkitData as unknown as CiRepoData,
  hccl: hcclData as unknown as CiRepoData,
  hixl: hixlData as unknown as CiRepoData,
  ptoisa: ptoisaData as unknown as CiRepoData,
  oamtools: oamtoolsData as unknown as CiRepoData,
  amct: amctData as unknown as CiRepoData,
  opbase: opbaseData as unknown as CiRepoData,
  pyasc: pyascData as unknown as CiRepoData,
  metadef: metadefData as unknown as CiRepoData,
  asctools: asctoolsData as unknown as CiRepoData,
};
