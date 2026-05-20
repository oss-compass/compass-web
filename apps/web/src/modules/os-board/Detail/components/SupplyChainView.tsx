import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Popover, Tooltip } from 'antd';
import { CheckOutlined, ClockCircleOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import type { OsBoardDashboardMetric } from '../../types';
import type {
  MetricData,
  ModelScoreData,
  SecurityDetailByIdentifierResponse,
} from '../../api/dashboard';
import {
  dimensionalityToModelsMap,
  type DimensionalityId,
} from '../../config/dimensionalityModelMap';

const SUPPLY_CHAIN_DIMENSIONS: DimensionalityId[] = [
  'dimensionality_009',
  'dimensionality_010',
  'dimensionality_011',
];

interface SupplyChainViewProps {
  project: string;
  metricsDataMap: Map<string, MetricData[]>;
  modelScoresDataMap: Map<string, ModelScoreData[]>;
  supplyChainMetrics: OsBoardDashboardMetric[];
  securityDetail?: SecurityDetailByIdentifierResponse;
  isSecurityDetailLoading?: boolean;
  isLoading: boolean;
}

interface MetricDisplayItem {
  metricIdent: string;
  modelIdent: string;
  name: string;
  description: string;
  value: number | null;
  unit: string;
  detail?: unknown;
}

interface ModelDisplayGroup {
  modelIdent: string;
  modelName: string;
  modelScore: number | null;
  metrics: MetricDisplayItem[];
}

const getLatestValue = (
  data:
    | { date: string; value: number; extra?: Record<string, any> }[]
    | undefined
): { value: number | null; unit: string } => {
  if (!data || data.length === 0) return { value: null, unit: '' };
  const sorted = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const latest = sorted[sorted.length - 1];
  return { value: latest.value, unit: latest.extra?.unit || '' };
};

const getLatestPoint = <T extends { date: string }>(
  data: T[] | undefined
): T | undefined => {
  if (!data || data.length === 0) return undefined;
  return data.reduce((latest, current) => {
    return new Date(current.date).getTime() > new Date(latest.date).getTime()
      ? current
      : latest;
  }, data[0]);
};

const normalizeDetail = (
  raw: unknown
): { kind: 'empty' } | { kind: 'value'; value: unknown } => {
  if (raw === null || raw === undefined) return { kind: 'empty' };
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    if (!trimmed) return { kind: 'empty' };
    const looksLikeJson =
      (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
      (trimmed.startsWith('[') && trimmed.endsWith(']'));
    if (looksLikeJson) {
      try {
        return { kind: 'value', value: JSON.parse(trimmed) };
      } catch {
        return { kind: 'value', value: raw };
      }
    }
    return { kind: 'value', value: raw };
  }
  return { kind: 'value', value: raw };
};

const limitText = (text: string, maxLen: number) => {
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen)}…`;
};

const joinList = (items: string[], limit: number) => {
  if (items.length <= limit) return items.join('、');
  return `${items.slice(0, limit).join('、')}…(共${items.length}项)`;
};

const formatPercent = (value: unknown) => {
  if (typeof value !== 'number') return null;
  return `${(value * 100).toFixed(2)}%`;
};

const renderOatText = (oatDetail: unknown): string => {
  if (!Array.isArray(oatDetail) || oatDetail.length === 0) return '';
  const lines = oatDetail.filter((x) => typeof x === 'string') as string[];
  if (lines.length === 0) return '';
  if (lines.length > 2) {
    return `以下告警来自 oat 扫描：${lines
      .slice(0, 1)
      .join('、')}；(更多告警信息请下载报告 csv 查看)`;
  }
  return `以下告警来自 oat 扫描：${lines.join('、')}；`;
};

type DetailRenderResult =
  | { mode: 'plain'; node: React.ReactNode }
  | { mode: 'link'; preview: string; full: string };

const renderEmptyDetail = (): DetailRenderResult => {
  return { mode: 'plain', node: '未检出' };
};

const renderBooleanDetail = (value: boolean): DetailRenderResult => {
  if (value) {
    return {
      mode: 'plain',
      node: <CheckOutlined className="text-green-500" />,
    };
  }
  return renderEmptyDetail();
};

const renderTextDetail = (text: string): DetailRenderResult => {
  return { mode: 'link', preview: limitText(text, 36), full: text };
};

const renderArrayDetail = (
  metricIdent: string,
  value: unknown[]
): DetailRenderResult => {
  const list = value.filter((x) => typeof x === 'string') as string[];

  if (metricIdent === 'metric_120') {
    if (list.length === 0) {
      return renderTextDetail('未发现二进制制品');
    }
    const full = `发现二进制制品：${list.join('、')}；`;
    const preview = `发现：${joinList(list, 2)}`;
    return { mode: 'link', preview, full };
  }

  if (metricIdent === 'metric_121') {
    if (list.length === 0) return renderEmptyDetail();
    const full = `详情：${list.join('、')}；`;
    const preview = joinList(list, 2);
    return { mode: 'link', preview, full };
  }

  if (metricIdent === 'metric_122') {
    if (list.length === 0) return renderEmptyDetail();
    const full = `缺少 Release Notes：${list.join('、')}；`;
    const preview = `缺少：${joinList(list, 2)}`;
    return { mode: 'link', preview, full };
  }

  if (value.length === 0) return renderEmptyDetail();
  const text = `共${value.length}项`;
  return renderTextDetail(text);
};

const renderMetric098 = (obj: Record<string, unknown>): DetailRenderResult => {
  const includeCopyrights = Array.isArray(obj.include_copyrights)
    ? (obj.include_copyrights.filter((x) => typeof x === 'string') as string[])
    : [];
  const notIncludedCopyrights = Array.isArray(obj.not_included_copyrights)
    ? (obj.not_included_copyrights.filter(
        (x) => typeof x === 'string'
      ) as string[])
    : [];
  const oatText = renderOatText(obj.oat_detail);

  const lines: string[] = [];
  if (notIncludedCopyrights.length > 0) {
    lines.push(
      `不包含许可头/版权声明的源码文件：${notIncludedCopyrights.join('、')}；`
    );
  } else if (includeCopyrights.length > 0) {
    lines.push(`包含的许可证：${includeCopyrights.join('、')}；`);
  } else {
    lines.push('无；');
  }
  if (oatText) lines.push(oatText);

  const preview =
    notIncludedCopyrights.length > 0
      ? `不包含许可头/版权声明的源码文件：${joinList(notIncludedCopyrights, 2)}`
      : includeCopyrights.length > 0
      ? `包含的许可证：${joinList(includeCopyrights, 2)}`
      : '无';
  return { mode: 'link', preview, full: lines.join('\n') };
};

const renderMetric099 = (obj: Record<string, unknown>): DetailRenderResult => {
  const readmeOpensource = obj.readme_opensource;
  const nonOsiLicenses = Array.isArray(obj.non_osi_licenses)
    ? (obj.non_osi_licenses.filter((x) => typeof x === 'string') as string[])
    : [];
  const osiLicenseList = Array.isArray(obj.osi_license_list)
    ? (obj.osi_license_list.filter((x) => typeof x === 'string') as string[])
    : [];
  const oatText = renderOatText(obj.oat_detail);

  const lines: string[] = [];
  if (readmeOpensource === 0) {
    lines.push('未检测到 README.OpenSource 文件；');
  } else if (readmeOpensource === 2) {
    lines.push('README.OpenSource 文件不规范；');
  }
  if (nonOsiLicenses.length > 0) {
    lines.push(
      `以下许可证不是 OSI 批准的开源许可证：${nonOsiLicenses.join('、')}；`
    );
  }
  if (osiLicenseList.length > 0) {
    lines.push(`检测到的许可证：${osiLicenseList.join('、')}；`);
  }
  if (oatText) lines.push(oatText);

  const parts: string[] = [];
  if (readmeOpensource === 0) parts.push('缺少 README.OpenSource文件');
  if (readmeOpensource === 2) parts.push('README.OpenSource 不规范');
  if (nonOsiLicenses.length > 0) {
    parts.push(`非 OSI许可证：${joinList(nonOsiLicenses, 2)}`);
  }
  if (parts.length === 0) parts.push('无');
  return {
    mode: 'link',
    preview: parts.join('；'),
    full: lines.join('\n') || '无',
  };
};

const renderMetric100 = (obj: Record<string, unknown>): DetailRenderResult => {
  const count = typeof obj.count === 'number' ? obj.count : null;
  const conflicts = Array.isArray(obj.conflicts) ? obj.conflicts : [];

  const lines: string[] = [];
  if (count !== null) {
    lines.push(`兼容性问题数量：${count}；`);
  }

  const conflictTexts: string[] = conflicts.map((c) => {
    if (typeof c === 'string') return c;
    if (c && typeof c === 'object') {
      const cObj = c as any;
      const license = cObj.license ?? cObj.name;
      const list = cObj.licenseConflictList ?? cObj.license_conflict_list;
      if (typeof license === 'string' && Array.isArray(list)) {
        const listStr = list.filter((x) => typeof x === 'string').join('、');
        return `${license} 与 ${listStr} 存在兼容性问题`;
      }
    }
    try {
      return JSON.stringify(c);
    } catch {
      return String(c);
    }
  });

  if (conflictTexts.length > 0) {
    lines.push(`详情：${conflictTexts.join('；')}；`);
  }

  const previewParts: string[] = [];
  if (count !== null) previewParts.push(`问题数：${count}`);
  if (conflicts.length > 0) previewParts.push(`详情：${conflicts.length}项`);
  if (previewParts.length === 0) previewParts.push('无');
  return {
    mode: 'link',
    preview: previewParts.join('；'),
    full: lines.join('\n') || '无',
  };
};

const renderMetric102 = (obj: Record<string, unknown>): DetailRenderResult => {
  const fileSize = typeof obj.file_size === 'number' ? obj.file_size : null;
  const urlCount = typeof obj.url_count === 'number' ? obj.url_count : null;
  const emailCount =
    typeof obj.email_count === 'number' ? obj.email_count : null;
  const parts: string[] = [];
  if (fileSize !== null) parts.push(`文件大小：${fileSize}`);
  if (urlCount !== null) parts.push(`URL 数量：${urlCount}`);
  if (emailCount !== null) parts.push(`邮箱数量：${emailCount}`);
  const text = parts.length > 0 ? `${parts.join('；')}；` : '无';
  return renderTextDetail(text);
};

const renderMetric103 = (obj: Record<string, unknown>): DetailRenderResult => {
  const critical = typeof obj.critical === 'number' ? obj.critical : null;
  const high = typeof obj.high === 'number' ? obj.high : null;
  const medium = typeof obj.medium === 'number' ? obj.medium : null;
  const uniqueIds = typeof obj.unique_ids === 'number' ? obj.unique_ids : null;
  const parts: string[] = [];
  if (critical !== null) parts.push(`致命：${critical}`);
  if (high !== null) parts.push(`高危：${high}`);
  if (medium !== null) parts.push(`中危：${medium}`);
  if (uniqueIds !== null) parts.push(`唯一漏洞数：${uniqueIds}`);
  const text = parts.length > 0 ? `${parts.join('；')}；` : '无';
  return renderTextDetail(text);
};

const renderMetric104 = (obj: Record<string, unknown>): DetailRenderResult => {
  const score = typeof obj.score_0_10 === 'number' ? obj.score_0_10 : null;
  const count =
    typeof obj.readme_file_count === 'number' ? obj.readme_file_count : null;
  const parts: string[] = [];
  if (score !== null) parts.push(`README 得分：${score}`);
  if (count !== null) parts.push(`README 文件数：${count}`);
  const text = parts.length > 0 ? `${parts.join('；')}；` : '无';
  return renderTextDetail(text);
};

const renderMetric114 = (obj: Record<string, unknown>): DetailRenderResult => {
  const coverageRatio = obj.coverage_ratio;
  const coverageScore =
    typeof obj.coverage_score === 'number' ? obj.coverage_score : null;
  const duplicationRatio = obj.duplication_ratio;
  const duplicationScore =
    typeof obj.duplication_score === 'number' ? obj.duplication_score : null;

  const parts: string[] = [];
  const coveragePercent = formatPercent(coverageRatio);
  if (coveragePercent !== null) {
    parts.push(`测试覆盖率：${coveragePercent}`);
    if (coverageScore !== null) parts.push(`测试覆盖率得分：${coverageScore}`);
  }
  const duplicationPercent = formatPercent(duplicationRatio);
  if (duplicationPercent !== null) {
    parts.push(`代码重复率：${duplicationPercent}`);
    if (duplicationScore !== null)
      parts.push(`代码重复率得分：${duplicationScore}`);
  }
  const text = parts.length > 0 ? `${parts.join('；')}；` : '无';
  return renderTextDetail(text);
};

const objectDetailRenderers: Record<
  string,
  (obj: Record<string, unknown>) => DetailRenderResult
> = {
  metric_098: renderMetric098,
  metric_099: renderMetric099,
  metric_100: renderMetric100,
  metric_102: renderMetric102,
  metric_103: renderMetric103,
  metric_104: renderMetric104,
  metric_114: renderMetric114,
};

const renderObjectDetail = (
  metricIdent: string,
  obj: Record<string, unknown>
): DetailRenderResult => {
  if (obj.unavailable === true) {
    return renderEmptyDetail();
  }
  const renderer = objectDetailRenderers[metricIdent];
  if (renderer) return renderer(obj);

  const entries = Object.entries(obj);
  if (entries.length === 0) return renderEmptyDetail();
  const full = entries
    .map(([k, v]) => {
      if (Array.isArray(v)) return `${k}：${v.length}项`;
      if (v && typeof v === 'object') return `${k}：`;
      if (typeof v === 'boolean') return `${k}：${v ? '是' : '否'}`;
      return `${k}：${v ?? '-'}`;
    })
    .join('；');
  return renderTextDetail(full);
};

const renderDetailText = (
  metricIdent: string,
  rawDetail: unknown
): DetailRenderResult => {
  const normalized = normalizeDetail(rawDetail);
  if (normalized.kind === 'empty') return renderEmptyDetail();

  const value = normalized.value;
  if (typeof value === 'boolean') return renderBooleanDetail(value);
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return renderEmptyDetail();
    return renderTextDetail(trimmed);
  }
  if (typeof value === 'number') return renderTextDetail(String(value));
  if (Array.isArray(value)) return renderArrayDetail(metricIdent, value);
  if (!value || typeof value !== 'object')
    return renderTextDetail(String(value));
  return renderObjectDetail(metricIdent, value as Record<string, unknown>);
};

const SupplyChainView: React.FC<SupplyChainViewProps> = ({
  project,
  metricsDataMap,
  modelScoresDataMap,
  supplyChainMetrics,
  securityDetail,
  isSecurityDetailLoading,
  isLoading,
}) => {
  const { t } = useTranslation();

  const securityDetailMap = useMemo(() => {
    const map = new Map<string, unknown>();
    const metrics = securityDetail?.metrics ?? [];
    metrics.forEach((m) => {
      const latest = getLatestPoint(m.data);
      map.set(m.ident, latest?.detail);
    });
    return map;
  }, [securityDetail]);

  const modelGroups = useMemo((): ModelDisplayGroup[] => {
    const groups: ModelDisplayGroup[] = [];

    SUPPLY_CHAIN_DIMENSIONS.forEach((dimId) => {
      const modelIds = dimensionalityToModelsMap[dimId] || [];

      modelIds.forEach((modelIdent) => {
        const projectMetrics = metricsDataMap.get(project) || [];
        const projectModelScores = modelScoresDataMap.get(project) || [];

        const modelScoreData = projectModelScores.find(
          (m) => m.ident === modelIdent
        );
        const { value: modelScore } = getLatestValue(modelScoreData?.data);

        const modelName = t(`metrics_models_v2:${modelIdent}.title`, {
          defaultValue: modelIdent,
        });

        const metricsInModel = supplyChainMetrics.filter(
          (m) => m.dashboard_model_info_ident === modelIdent
        );

        const metricItems: MetricDisplayItem[] = metricsInModel.map((m) => {
          const metricIdent = m.dashboard_metric_info_ident;
          const metricData = projectMetrics.find(
            (md) => md.ident === metricIdent
          );
          const { value, unit } = getLatestValue(metricData?.data);

          const name = t(
            `metrics_models_v2:${modelIdent}.metrics.${metricIdent}.title`,
            { defaultValue: m.name || metricIdent }
          );
          const description = t(
            `metrics_models_v2:${modelIdent}.metrics.${metricIdent}.desc`,
            { defaultValue: '' }
          );

          return {
            metricIdent,
            modelIdent,
            name,
            description,
            value,
            unit,
            detail: securityDetailMap.get(metricIdent),
          };
        });

        if (metricItems.length > 0) {
          groups.push({
            modelIdent,
            modelName,
            modelScore,
            metrics: metricItems,
          });
        }
      });
    });

    return groups;
  }, [
    project,
    metricsDataMap,
    modelScoresDataMap,
    supplyChainMetrics,
    securityDetailMap,
    t,
  ]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <div className="h-6 w-48 rounded bg-slate-200"></div>
            <div className="h-2 w-full rounded bg-slate-200"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 rounded bg-slate-200"></div>
              <div className="h-24 rounded bg-slate-200"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (modelGroups.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        {t('common:no_data')}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {modelGroups.map((group) => {
        const scoreDisplay =
          group.modelScore != null ? Math.round(group.modelScore * 100) : null;

        // 模型得分颜色逻辑：>=80 绿色, 40-80 橙色, <40 红色
        const getModelScoreColor = (score: number) => {
          if (score >= 80) return '#4ade80';
          if (score >= 40) return '#f8961e';
          return '#ff4d4f';
        };

        // 指标得分颜色逻辑：>=8 绿色, 4-7 橙色, <4 红色
        const getMetricScoreColor = (score: number) => {
          if (score >= 8) return 'text-green-500';
          if (score >= 4) return 'text-orange-500';
          return 'text-red-500';
        };

        const getMetricBgColor = (score: number) => {
          if (score >= 8) return 'bg-green-50';
          if (score >= 4) return 'bg-orange-50';
          return 'bg-red-50';
        };

        return (
          <div
            key={group.modelIdent}
            id={`metric_card_${group.modelIdent}`}
            className="base-card relative min-w-0 scroll-mt-[200px] rounded-lg border-2 border-transparent bg-white p-5 drop-shadow-sm md:rounded-none"
          >
            <h3 className="mb-2 text-lg font-semibold text-[#000000]">
              <span className="mr-2 rounded bg-[#F5F0FF] px-2 py-0.5 text-xs font-normal text-[#722ED1]">
                {t('os_board:detail.model_tag')}
              </span>
              {group.modelName}
            </h3>
            {scoreDisplay != null && (
              <div className="mb-5 flex items-center gap-3">
                <div className="h-1.5 flex-1 rounded-full bg-[#e5e5e5]">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${Math.min(scoreDisplay, 100)}%`,
                      backgroundColor: getModelScoreColor(scoreDisplay),
                    }}
                  />
                </div>
                <span
                  className="min-w-[40px] text-base font-semibold"
                  style={{ color: getModelScoreColor(scoreDisplay) }}
                >
                  {scoreDisplay}
                </span>
              </div>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {group.metrics.map((metric) => {
                const isDeveloping = metric.value === -1;
                const hasDetail = securityDetailMap.has(metric.metricIdent);
                const detailRenderResult = isSecurityDetailLoading
                  ? { mode: 'plain' as const, node: '加载中…' }
                  : renderDetailText(metric.metricIdent, metric.detail);

                return (
                  <div
                    key={metric.metricIdent}
                    id={`metric_card_${metric.metricIdent}`}
                    className="rounded-lg border border-gray-100 bg-white p-4 drop-shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={classnames(
                          'flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-lg',
                          isDeveloping
                            ? 'bg-gray-50'
                            : getMetricBgColor(metric.value || 0)
                        )}
                      >
                        {isDeveloping ? (
                          <Tooltip title="功能开发中，敬请期待">
                            <ClockCircleOutlined className="text-xl text-gray-400" />
                          </Tooltip>
                        ) : metric.value != null ? (
                          <span
                            className={classnames(
                              'text-lg font-bold',
                              getMetricScoreColor(metric.value)
                            )}
                          >
                            {Number.isInteger(metric.value)
                              ? metric.value
                              : metric.value.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-[#000000]">
                          {metric.name}
                        </div>
                        {metric.description && (
                          <div
                            className="mt-1 line-clamp-2 text-xs leading-5 text-[#585858]"
                            title={metric.description}
                          >
                            {metric.description}
                          </div>
                        )}
                        {!isDeveloping &&
                          (isSecurityDetailLoading || hasDetail) && (
                            <>
                              {detailRenderResult.mode === 'link' ? (
                                <Popover
                                  trigger={['hover', 'click']}
                                  placement="topLeft"
                                  overlayStyle={{ maxWidth: 760 }}
                                  getPopupContainer={() => document.body}
                                  content={
                                    <pre className="max-h-[420px] w-[720px] overflow-auto whitespace-pre-wrap break-words">
                                      {detailRenderResult.full || '未检出'}
                                    </pre>
                                  }
                                >
                                  <div className="mt-2 cursor-pointer truncate text-xs text-[#1677ff] hover:underline">
                                    {detailRenderResult.preview || '未检出'}
                                  </div>
                                </Popover>
                              ) : (
                                <div className="mt-2 text-xs text-[#585858]">
                                  {detailRenderResult.node}
                                </div>
                              )}
                            </>
                          )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SupplyChainView;
