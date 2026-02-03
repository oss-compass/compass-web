export type OsBoardDashboardType = 'community' | 'repo';

export type OsBoardRole = 'owner' | 'editor' | 'viewer';

export type OsBoardAlertCondition = 'gt' | 'lt' | 'eq' | 'gte' | 'lte';

export type OsBoardAlertLevel = 'critical' | 'warning' | 'info';

export type OsBoardExportFormat = 'json' | 'csv' | 'pdf';

// 与 analyze 模块的 RangeTag 保持一致
export type OsBoardTimeRangePreset =
  | '1M'
  | '3M'
  | '6M'
  | '1Y'
  | '3Y'
  | '5Y'
  | 'Since 2000';

export interface OsBoardTimeRange {
  preset: OsBoardTimeRangePreset;
  start?: string;
  end?: string;
}

export interface OsBoardMetric {
  id: string;
  name: string;
  category: string;
  unit?: string;
  description?: string;
}

export interface OsBoardDerivedMetric extends OsBoardMetric {
  baseMetricIds: string[];
  script: string;
}

export interface OsBoardPermission {
  userId: string;
  role: OsBoardRole;
}

export interface OsBoardAlertRule {
  id: string;
  dashboardId: string;
  metricId: string;
  condition: OsBoardAlertCondition;
  threshold: number;
  level: OsBoardAlertLevel;
  channels: Array<'inbox' | 'email'>;
  enabled: boolean;
}

export interface OsBoardAlertEvent {
  id: string;
  dashboardId: string;
  ruleId: string;
  metricId: string;
  level: OsBoardAlertLevel;
  createdAt: string;
  value: number;
  threshold: number;
}

export interface OsBoardSubscription {
  id: string;
  dashboardId: string;
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
  template: 'weekly' | 'monthly' | 'quarterly' | 'custom';
  sendTime: string;
  recipients: string[];
}

export interface OsBoardDashboardConfig {
  projects: string[];
  competitorProjects: string[];
  metrics: string[];
  compareMode: boolean;
  timeRange: OsBoardTimeRange;
}

// 后端返回的看板指标结构
export interface OsBoardDashboardMetric {
  id: number;
  name: string;
  from_model: boolean;
  hidden: boolean;
  dashboard_model_id: number | null;
  dashboard_id: number;
  dashboard_metric_info_id: number | null;
  dashboard_metric_info_ident: string;
  dashboard_model_info_ident: string;
  sort: number;
  created_at: string;
  updated_at: string;
}

// 后端返回的看板模型结构
export interface OsBoardDashboardModel {
  id: number;
  name: string;
  description: string;
  dashboard_model_info_id: number;
  dashboard_model_info_ident: string;
  dashboard_id: number;
  created_at: string;
  updated_at: string;
}

export interface OsBoardDashboard {
  id: string | number;
  identifier?: string;
  name: string;
  type?: OsBoardDashboardType;
  dashboard_type?: 'repo' | 'community';
  ownerId?: string;
  user_id?: number;
  createdAt?: string;
  created_at?: string;
  updatedAt?: string;
  updated_at?: string;
  config?: OsBoardDashboardConfig;
  repo_urls?: string;
  competitor_urls?: string;
  permissions?: OsBoardPermission[];
  dashboard_models?: OsBoardDashboardModel[];
  dashboard_metrics?: OsBoardDashboardMetric[];
}

export interface OsBoardStateSnapshot {
  dashboards: OsBoardDashboard[];
  metrics: OsBoardMetric[];
  derivedMetrics: OsBoardDerivedMetric[];
  alertRules: OsBoardAlertRule[];
  alertEvents: OsBoardAlertEvent[];
  subscriptions: OsBoardSubscription[];
}
