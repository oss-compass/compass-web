import type { DevxNodeStatus } from '../rawData/apiClient';
import { normalizeHardwareEnv } from './utils';

const ASCEND_950_ONLY_REPO_IDS = new Set([
  'cann_atvoss',
  'cann_ops_tensor',
  'cann_ops_rand',
  'cann_ops_fft',
  'cann_ops_collections',
  'cann_ops_gnn',
  'cann_cannbot_dsl',
  'cann_asc_comm',
]);

const normalizeRepoId = (value: unknown) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[/-]/g, '_');

export const isAscend950OnlyRepo = (value: unknown) =>
  ASCEND_950_ONLY_REPO_IDS.has(normalizeRepoId(value));

export const getSelectableRerunNodes = (
  repoId: unknown,
  nodes: DevxNodeStatus[]
): DevxNodeStatus[] =>
  isAscend950OnlyRepo(repoId)
    ? nodes.filter(
        (node) => normalizeHardwareEnv(node.hardware) === 'ascend-950'
      )
    : nodes;

export const getRerunNodeConstraintError = (
  repoId: unknown,
  nodes: DevxNodeStatus[],
  loading: boolean
): string =>
  isAscend950OnlyRepo(repoId) && !loading && nodes.length === 0
    ? '该仓库仅支持 ascend-950，当前暂无可用节点'
    : '';
