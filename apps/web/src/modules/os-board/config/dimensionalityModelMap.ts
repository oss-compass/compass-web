/**
 * 维度与模型的对应关系映射
 * 用于根据模型 ID 查找对应的维度
 *
 * 层级关系：L1 维度 → L2 维度 → 模型 → 指标
 * - L1 维度（一级维度）：如 "社区健康"、"贡献总览"、"开发者生态"
 * - L2 维度（二级维度）：如 "协作效率"、"社区活力" 等
 * - 模型：每个 L2 维度下包含若干模型
 * - 指标：每个模型包含固定的指标列表
 */

export type DimensionalityId =
  | 'dimensionality_001'
  | 'dimensionality_002'
  | 'dimensionality_003'
  | 'dimensionality_004'
  | 'dimensionality_005'
  | 'dimensionality_006'
  | 'dimensionality_007'
  | 'dimensionality_008'
  | 'dimensionality_009'
  | 'dimensionality_010'
  | 'dimensionality_011';

export type L1DimensionalityId =
  | 'l1_community_health'
  | 'l1_contributor_overview'
  | 'l1_developer_ecology'
  | 'l1_supply_chain_security';

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
  | 'model_012'
  | 'model_013'
  | 'model_014'
  | 'model_015'
  | 'model_016'
  | 'model_017'
  | 'model_018'
  | 'model_019'
  | 'model_020'
  | 'model_021'
  | 'model_022'
  | 'model_023'
  | 'model_024'
  | 'model_999';

export type MetricId = string;

export interface DimensionalityInfo {
  id: DimensionalityId;
  models: ModelId[];
}

export interface L1DimensionalityInfo {
  id: L1DimensionalityId;
  l2Dimensions: DimensionalityId[];
}

/**
 * L1 维度到 L2 维度的映射
 * - l1_community_health (社区健康): 协作效率、社区活力、生态影响力、开放治理
 * - l1_contributor_overview (贡献总览): 贡献总览(独立指标)
 * - l1_developer_ecology (开发者生态): 开发者吸引、开发者成长、开发者留存
 */
export const l1ToL2Map: Record<L1DimensionalityId, DimensionalityId[]> = {
  l1_community_health: [
    'dimensionality_001',
    'dimensionality_002',
    'dimensionality_003',
    'dimensionality_004',
  ],
  l1_contributor_overview: ['dimensionality_005'],
  l1_developer_ecology: [
    'dimensionality_006',
    'dimensionality_007',
    'dimensionality_008',
  ],
  l1_supply_chain_security: [
    'dimensionality_009',
    'dimensionality_010',
    'dimensionality_011',
  ],
};

/**
 * L1 维度 ID 列表
 */
export const allL1DimensionalityIds: L1DimensionalityId[] = [
  'l1_contributor_overview',
  'l1_community_health',
  'l1_developer_ecology',
  'l1_supply_chain_security',
];

/**
 * L2 维度到模型的映射
 * - dimensionality_001 (协作效率): model_001(响应及时性), model_002(协作开发质量)
 * - dimensionality_002 (社区活力): model_003(开发者基数), model_004(贡献活跃度), model_005(社区流行度)
 * - dimensionality_003 (生态影响力): model_006(生态伙伴多样性), model_007(生态伙伴影响力), model_008(技术采纳度)
 * - dimensionality_004 (开放治理): model_009(组织开放治理), model_010(个人开放治理)
 * - dimensionality_005 (贡献总览/独立指标): model_999(独立指标)
 * - dimensionality_006 (开发者吸引): model_012(开发者吸引)
 * - dimensionality_007 (开发者成长): model_013(开发者参与度分层), model_014(开发者晋升)
 * - dimensionality_008 (开发者留存): model_015(核心开发者留存率), model_016(核心开发者淡出率), model_017(核心开发者流失率)
 */
export const dimensionalityToModelsMap: Record<DimensionalityId, ModelId[]> = {
  dimensionality_001: ['model_001', 'model_002'],
  dimensionality_002: ['model_003', 'model_004', 'model_005'],
  dimensionality_003: ['model_006', 'model_007', 'model_008'],
  dimensionality_004: ['model_009', 'model_010'],
  dimensionality_005: ['model_999'],
  dimensionality_006: ['model_012'],
  dimensionality_007: ['model_013', 'model_014'],
  dimensionality_008: ['model_015', 'model_016', 'model_017'],
  dimensionality_009: ['model_018', 'model_019'],
  dimensionality_010: ['model_020', 'model_021', 'model_022'],
  dimensionality_011: ['model_023', 'model_024'],
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
  model_012: 'dimensionality_006',
  model_013: 'dimensionality_007',
  model_014: 'dimensionality_007',
  model_015: 'dimensionality_008',
  model_016: 'dimensionality_008',
  model_017: 'dimensionality_008',
  model_018: 'dimensionality_009',
  model_019: 'dimensionality_009',
  model_020: 'dimensionality_010',
  model_021: 'dimensionality_010',
  model_022: 'dimensionality_010',
  model_023: 'dimensionality_011',
  model_024: 'dimensionality_011',
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
  // model_012 开发者吸引
  model_012: [
    'metric_065',
    'metric_066',
    'metric_067',
    'metric_068',
    'metric_069',
  ],
  // model_013 开发者参与度分层
  model_013: [
    'metric_070',
    'metric_071',
    'metric_072',
    'metric_073',
    'metric_074',
    'metric_075',
    'metric_076',
    'metric_077',
    'metric_078',
    'metric_079',
    'metric_080',
    'metric_081',
  ],
  // model_014 开发者晋升
  model_014: ['metric_082', 'metric_083', 'metric_084', 'metric_085'],
  // model_015 核心开发者留存率
  model_015: ['metric_086', 'metric_087', 'metric_088', 'metric_089'],
  // model_016 核心开发者淡出率
  model_016: ['metric_090', 'metric_091', 'metric_092', 'metric_093'],
  // model_017 核心开发者流失率
  model_017: ['metric_094', 'metric_095', 'metric_096', 'metric_097'],
  // model_018 合法合规
  model_018: ['metric_098', 'metric_099', 'metric_100', 'metric_101'],
  // model_019 安全管理
  model_019: ['metric_102', 'metric_103'],
  // model_020 开发文档质量
  model_020: ['metric_104', 'metric_105', 'metric_106', 'metric_107'],
  // model_021 代码审查质量
  model_021: [
    'metric_108',
    'metric_109',
    'metric_110',
    'metric_111',
    'metric_112',
    'metric_113',
    'metric_114',
  ],
  // model_022 可信构建
  model_022: ['metric_115', 'metric_116', 'metric_117', 'metric_118'],
  // model_023 发布质量
  model_023: ['metric_119', 'metric_120', 'metric_121', 'metric_122'],
  // model_024 维护管理
  model_024: ['metric_123', 'metric_124'],
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
  'dimensionality_006',
  'dimensionality_007',
  'dimensionality_008',
  'dimensionality_009',
  'dimensionality_010',
  'dimensionality_011',
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
  'model_012',
  'model_013',
  'model_014',
  'model_015',
  'model_016',
  'model_017',
  'model_018',
  'model_019',
  'model_020',
  'model_021',
  'model_022',
  'model_023',
  'model_024',
  'model_999',
];

/**
 * 所有指标 ID 列表
 */
export const allMetricIds: MetricId[] = Object.values(modelToMetricsMap).flat();
