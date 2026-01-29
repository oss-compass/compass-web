export type OsBoardDashboardType = 'community' | 'project';

export type OsBoardRole = 'owner' | 'editor' | 'viewer';

export type OsBoardAlertCondition = 'gt' | 'lt' | 'eq' | 'gte' | 'lte';

export type OsBoardAlertLevel = 'critical' | 'warning' | 'info';

export type OsBoardExportFormat = 'json' | 'csv' | 'pdf';

export type OsBoardTimeRangePreset = '7d' | '30d' | '90d' | '1y' | 'custom';

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

export interface OsBoardDashboard {
  id: string;
  name: string;
  type: OsBoardDashboardType;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  config: OsBoardDashboardConfig;
  permissions: OsBoardPermission[];
}

export interface OsBoardStateSnapshot {
  dashboards: OsBoardDashboard[];
  metrics: OsBoardMetric[];
  derivedMetrics: OsBoardDerivedMetric[];
  alertRules: OsBoardAlertRule[];
  alertEvents: OsBoardAlertEvent[];
  subscriptions: OsBoardSubscription[];
}
