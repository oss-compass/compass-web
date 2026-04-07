import sdxMetrics from './sdx_metrics_calculation.json';

/**
 * 从 sdx_metrics_calculation.json 构建的静态 metric_id → 中文名称 映射表。
 * 同一 metric_id 可能在多个阶段重复出现，取最后一次（名称相同）。
 */
export const SDX_METRIC_NAME_MAP: Record<string, string> = Object.fromEntries(
  (sdxMetrics as Array<{ '指标 ID': string; 指标名称: string }>).map((item) => [
    item['指标 ID'],
    item['指标名称'],
  ])
);
