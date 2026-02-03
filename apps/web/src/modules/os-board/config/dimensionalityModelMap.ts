/**
 * 维度与模型的对应关系映射
 * 用于根据模型 ID 查找对应的维度
 */

export type DimensionalityId =
  | 'dimensionality_001'
  | 'dimensionality_002'
  | 'dimensionality_003'
  | 'dimensionality_004'
  | 'dimensionality_005';

export type ModelId =
  | 'model_001'
  | 'model_002'
  | 'model_003'
  | 'model_004'
  | 'model_005'
  | 'model_006'
  | 'model_007'
  | 'model_008'
  | 'model_009'
  | 'model_010'
  | 'model_999';

export type MetricId = string;

export interface DimensionalityInfo {
  id: DimensionalityId;
  models: ModelId[];
}

/**
 * 维度到模型的映射
 * - dimensionality_001 (协作效率): model_001(响应及时性), model_002(协作开发质量)
 * - dimensionality_002 (社区活力): model_003(开发者基数), model_004(贡献活跃度), model_005(社区流行度)
 * - dimensionality_003 (生态影响力): model_006(生态伙伴多样性), model_007(生态伙伴影响力), model_008(技术采纳度)
 * - dimensionality_004 (开发治理): model_009(组织开放治理), model_010(个人开放治理)
 * - dimensionality_005 (其他指标): model_999(独立指标)
 */
export const dimensionalityToModelsMap: Record<DimensionalityId, ModelId[]> = {
  dimensionality_001: ['model_001', 'model_002'],
  dimensionality_002: ['model_003', 'model_004', 'model_005'],
  dimensionality_003: ['model_006', 'model_007', 'model_008'],
  dimensionality_004: ['model_009', 'model_010'],
  dimensionality_005: ['model_999'],
};

/**
 * 模型到维度的映射
 * 用于根据模型 ID 快速查找对应的维度
 */
export const modelToDimensionalityMap: Record<ModelId, DimensionalityId> = {
  model_001: 'dimensionality_001',
  model_002: 'dimensionality_001',
  model_003: 'dimensionality_002',
  model_004: 'dimensionality_002',
  model_005: 'dimensionality_002',
  model_006: 'dimensionality_003',
  model_007: 'dimensionality_003',
  model_008: 'dimensionality_003',
  model_009: 'dimensionality_004',
  model_010: 'dimensionality_004',
  model_999: 'dimensionality_005',
};

/**
 * 模型到指标的映射
 * 用于根据模型 ID 获取该模型下的所有指标
 */
export const modelToMetricsMap: Record<ModelId, MetricId[]> = {
  // model_001 响应及时性
  model_001: [
    'metric_001',
    'metric_002',
    'metric_003',
    'metric_004',
    'metric_005',
    'metric_006',
  ],
  // model_002 协作开发质量
  model_002: [
    'metric_007',
    'metric_008',
    'metric_009',
    'metric_010',
    'metric_011',
    'metric_012',
  ],
  // model_003 开发者基数
  model_003: ['metric_013', 'metric_014', 'metric_015'],
  // model_004 贡献活跃度
  model_004: [
    'metric_016',
    'metric_017',
    'metric_018',
    'metric_019',
    'metric_020',
    'metric_021',
  ],
  // model_005 社区流行度
  model_005: [
    'metric_022',
    'metric_023',
    'metric_024',
    'metric_025',
    'metric_026',
    'metric_027',
  ],
  // model_006 生态伙伴多样性
  model_006: [
    'metric_028',
    'metric_029',
    'metric_030',
    'metric_031',
    'metric_032',
  ],
  // model_007 生态伙伴影响力
  model_007: ['metric_033', 'metric_034', 'metric_035'],
  // model_008 技术采纳度
  model_008: ['metric_036', 'metric_037', 'metric_038', 'metric_039'],
  // model_009 组织开放治理
  model_009: [
    'metric_040',
    'metric_041',
    'metric_042',
    'metric_043',
    'metric_044',
    'metric_045',
    'metric_046',
    'metric_047',
    'metric_048',
    'metric_049',
    'metric_050',
    'metric_051',
  ],
  // model_010 个人开放治理
  model_010: [
    'metric_052',
    'metric_053',
    'metric_054',
    'metric_055',
    'metric_056',
    'metric_057',
    'metric_058',
    'metric_059',
    'metric_060',
    'metric_061',
  ],
  // model_999 其他指标（独立指标）
  model_999: ['metric_062', 'metric_063', 'metric_064'],
};

/**
 * 指标到模型的映射
 * 用于根据指标 ID 快速查找对应的模型
 */
export const metricToModelMap: Record<MetricId, ModelId> = Object.entries(
  modelToMetricsMap
).reduce((acc, [modelId, metricIds]) => {
  metricIds.forEach((metricId) => {
    acc[metricId] = modelId as ModelId;
  });
  return acc;
}, {} as Record<MetricId, ModelId>);

/**
 * 根据模型 ID 获取对应的维度 ID
 * @param modelId 模型 ID
 * @returns 维度 ID，如果未找到则返回 undefined
 */
export function getDimensionalityByModel(
  modelId: string
): DimensionalityId | undefined {
  return modelToDimensionalityMap[modelId as ModelId];
}

/**
 * 根据维度 ID 获取该维度下的所有模型 ID
 * @param dimensionalityId 维度 ID
 * @returns 模型 ID 数组，如果未找到则返回空数组
 */
export function getModelsByDimensionality(dimensionalityId: string): ModelId[] {
  return dimensionalityToModelsMap[dimensionalityId as DimensionalityId] || [];
}

/**
 * 根据模型 ID 获取该模型下的所有指标 ID
 * @param modelId 模型 ID
 * @returns 指标 ID 数组，如果未找到则返回空数组
 */
export function getMetricsByModel(modelId: string): MetricId[] {
  return modelToMetricsMap[modelId as ModelId] || [];
}

/**
 * 根据指标 ID 获取对应的模型 ID
 * @param metricId 指标 ID
 * @returns 模型 ID，如果未找到则返回 undefined
 */
export function getModelByMetric(metricId: string): ModelId | undefined {
  return metricToModelMap[metricId];
}

/**
 * 根据指标 ID 获取对应的维度 ID
 * @param metricId 指标 ID
 * @returns 维度 ID，如果未找到则返回 undefined
 */
export function getDimensionalityByMetric(
  metricId: string
): DimensionalityId | undefined {
  const modelId = getModelByMetric(metricId);
  return modelId ? getDimensionalityByModel(modelId) : undefined;
}

/**
 * 所有维度 ID 列表
 */
export const allDimensionalityIds: DimensionalityId[] = [
  'dimensionality_001',
  'dimensionality_002',
  'dimensionality_003',
  'dimensionality_004',
  'dimensionality_005',
];

/**
 * 所有模型 ID 列表
 */
export const allModelIds: ModelId[] = [
  'model_001',
  'model_002',
  'model_003',
  'model_004',
  'model_005',
  'model_006',
  'model_007',
  'model_008',
  'model_009',
  'model_010',
  'model_999',
];

/**
 * 所有指标 ID 列表
 */
export const allMetricIds: MetricId[] = Object.values(modelToMetricsMap).flat();
