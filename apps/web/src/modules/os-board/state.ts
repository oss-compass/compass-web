import { proxy, subscribe } from 'valtio';
import type {
  OsBoardAlertEvent,
  OsBoardAlertRule,
  OsBoardDashboard,
  OsBoardDerivedMetric,
  OsBoardExportFormat,
  OsBoardMetric,
  OsBoardStateSnapshot,
  OsBoardSubscription,
} from './types';
import { createInitialState } from './mock';

const STORAGE_KEY = 'os-board:v2';

const initial = createInitialState();

export const osBoardState = proxy<OsBoardStateSnapshot>(initial);

const uid = (prefix: string) =>
  `${prefix}-${Math.random().toString(16).slice(2)}-${Date.now()}`;

const nowIso = () => new Date().toISOString();

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const hashNumber = (seed: string) => {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return h;
};

/**
 * 生成用于 UI 演示与预警评估的稳定 mock 指标值。
 * 该值由看板、项目与指标三者确定，不依赖后端接口。
 */
export const getMetricValue = ({
  dashboardId,
  project,
  metricId,
}: {
  dashboardId: string;
  project: string;
  metricId: string;
}) => {
  const h = hashNumber(`${dashboardId}|${project}|${metricId}`);
  if (metricId.endsWith('_median')) {
    return clamp((h % 2400) / 100, 0.2, 48);
  }
  if (metricId === 'retention_rate') {
    return clamp((h % 10000) / 100, 0, 100);
  }
  if (metricId === 'health_score') {
    return clamp((h % 10100) / 100, 0, 100);
  }
  if (metricId === 'release_frequency') {
    return clamp((h % 600) / 100, 0, 10);
  }
  return clamp(h % 2000, 0, 2000);
};

/**
 * 基于看板规则对当前 mock 数据进行预警评估，并写入触发记录。
 */
export const evaluateDashboardAlerts = (dashboardId: string) => {
  const dashboard = osBoardState.dashboards.find((d) => d.id === dashboardId);
  if (!dashboard) return [];
  const projects = dashboard.config.projects;

  const nextEvents: OsBoardAlertEvent[] = [];
  const rules = osBoardState.alertRules.filter(
    (r) => r.dashboardId === dashboardId && r.enabled
  );

  for (const rule of rules) {
    for (const project of projects) {
      const value = getMetricValue({
        dashboardId,
        project,
        metricId: rule.metricId,
      });
      const pass =
        rule.condition === 'gt'
          ? value > rule.threshold
          : rule.condition === 'gte'
          ? value >= rule.threshold
          : rule.condition === 'lt'
          ? value < rule.threshold
          : rule.condition === 'lte'
          ? value <= rule.threshold
          : value === rule.threshold;
      if (!pass) continue;
      nextEvents.push({
        id: uid('ae'),
        dashboardId,
        ruleId: rule.id,
        metricId: rule.metricId,
        level: rule.level,
        createdAt: nowIso(),
        value,
        threshold: rule.threshold,
      });
    }
  }

  osBoardState.alertEvents.unshift(...nextEvents);
  return nextEvents;
};

export const serializeSnapshot = (): OsBoardStateSnapshot => {
  return JSON.parse(JSON.stringify(osBoardState));
};

export const hydrateSnapshot = (snapshot: OsBoardStateSnapshot) => {
  osBoardState.dashboards = snapshot.dashboards;
  osBoardState.metrics = snapshot.metrics;
  osBoardState.derivedMetrics = snapshot.derivedMetrics;
  osBoardState.alertRules = snapshot.alertRules;
  osBoardState.alertEvents = snapshot.alertEvents;
  osBoardState.subscriptions = snapshot.subscriptions;
};

export const loadFromStorage = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const snapshot = JSON.parse(raw) as OsBoardStateSnapshot;
    hydrateSnapshot(snapshot);
    return true;
  } catch {
    return false;
  }
};

export const saveToStorage = () => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(serializeSnapshot())
    );
  } catch {
    return;
  }
};

const escapeCsv = (value: string) => {
  const safe = value.replaceAll('"', '""');
  return `"${safe}"`;
};

export const buildCsv = (rows: Array<Record<string, string | number>>) => {
  const keys = Array.from(
    rows.reduce((acc, r) => {
      Object.keys(r).forEach((k) => acc.add(k));
      return acc;
    }, new Set<string>())
  );
  const header = keys.map(escapeCsv).join(',');
  const lines = rows.map((r) =>
    keys
      .map((k) => {
        const v = r[k];
        if (v === undefined || v === null) return '""';
        return escapeCsv(String(v));
      })
      .join(',')
  );
  return [header, ...lines].join('\n');
};

/**
 * 生成一份可下载的文本报告（模板为周报/月报/季度/自定义）。
 */
export const buildReportText = ({
  dashboardId,
  template,
}: {
  dashboardId: string;
  template: 'weekly' | 'monthly' | 'quarterly' | 'custom';
}) => {
  const dashboard = osBoardState.dashboards.find((d) => d.id === dashboardId);
  if (!dashboard) return null;
  const allMetrics = [...osBoardState.metrics, ...osBoardState.derivedMetrics];
  const metricMap = new Map(allMetrics.map((m) => [m.id, m]));

  const now = new Date();
  const title =
    template === 'weekly'
      ? '社区健康度周报'
      : template === 'monthly'
      ? '社区健康度月报'
      : template === 'quarterly'
      ? '社区健康度季度报告'
      : '社区健康度报告';

  const projects = dashboard.config.projects;
  const selectedMetrics = dashboard.config.metrics;

  const alertEvents = osBoardState.alertEvents
    .filter((e) => e.dashboardId === dashboardId)
    .slice(0, 10);

  const lines: string[] = [];
  lines.push(`# ${title}`);
  lines.push(`看板：${dashboard.name}`);
  lines.push(`生成时间：${now.toISOString()}`);
  lines.push(`时间范围：${dashboard.config.timeRange.preset}`);
  lines.push('');
  lines.push('## 一、核心数据摘要');
  for (const metricId of selectedMetrics.slice(0, 6)) {
    const metric = metricMap.get(metricId);
    const values = projects.map((p) =>
      getMetricValue({ dashboardId, project: p, metricId })
    );
    const avg = values.reduce((a, b) => a + b, 0) / Math.max(1, values.length);
    const unit = metric?.unit ? ` ${metric.unit}` : '';
    lines.push(`- ${metric?.name || metricId}：${avg.toFixed(2)}${unit}`);
  }
  lines.push('');
  lines.push('## 二、预警事项');
  if (alertEvents.length === 0) {
    lines.push('- 无');
  } else {
    for (const e of alertEvents) {
      const metric = metricMap.get(e.metricId);
      lines.push(
        `- [${e.level}] ${metric?.name || e.metricId}：${e.value.toFixed(
          2
        )}（阈值 ${e.threshold}） @ ${e.createdAt}`
      );
    }
  }
  lines.push('');
  lines.push('## 三、项目数据');
  for (const p of projects) {
    lines.push(`### ${p}`);
    for (const metricId of selectedMetrics.slice(0, 10)) {
      const metric = metricMap.get(metricId);
      const v = getMetricValue({ dashboardId, project: p, metricId });
      lines.push(
        `- ${metric?.name || metricId}: ${v.toFixed(2)}${
          metric?.unit ? ` ${metric.unit}` : ''
        }`
      );
    }
    lines.push('');
  }
  return lines.join('\n');
};

export const actions = {
  createDashboard: (
    input: Pick<OsBoardDashboard, 'name' | 'type'> & {
      config: OsBoardDashboard['config'];
    }
  ) => {
    const createdAt = nowIso();
    const dashboard: OsBoardDashboard = {
      id: uid('db'),
      name: input.name,
      type: input.type,
      ownerId: 'me',
      createdAt,
      updatedAt: createdAt,
      config: input.config,
      permissions: [{ userId: 'me', role: 'owner' }],
    };
    osBoardState.dashboards.unshift(dashboard);
    return dashboard;
  },

  updateDashboard: (
    id: string,
    patch: Partial<Pick<OsBoardDashboard, 'name' | 'config' | 'permissions'>>
  ) => {
    const dashboard = osBoardState.dashboards.find((d) => d.id === id);
    if (!dashboard) return;
    if (patch.name !== undefined) dashboard.name = patch.name;
    if (patch.config !== undefined) dashboard.config = patch.config;
    if (patch.permissions !== undefined)
      dashboard.permissions = patch.permissions;
    dashboard.updatedAt = nowIso();
  },

  addDashboardMember: ({
    dashboardId,
    userId,
    role,
  }: {
    dashboardId: string;
    userId: string;
    role: 'owner' | 'editor' | 'viewer';
  }) => {
    const dashboard = osBoardState.dashboards.find((d) => d.id === dashboardId);
    if (!dashboard) return;
    if (dashboard.permissions.some((p) => p.userId === userId)) return;
    dashboard.permissions.push({ userId, role });
    dashboard.updatedAt = nowIso();
  },

  setDashboardMemberRole: ({
    dashboardId,
    userId,
    role,
  }: {
    dashboardId: string;
    userId: string;
    role: 'owner' | 'editor' | 'viewer';
  }) => {
    const dashboard = osBoardState.dashboards.find((d) => d.id === dashboardId);
    if (!dashboard) return;
    const p = dashboard.permissions.find((x) => x.userId === userId);
    if (!p) return;
    p.role = role;
    dashboard.updatedAt = nowIso();
  },

  removeDashboardMember: ({
    dashboardId,
    userId,
  }: {
    dashboardId: string;
    userId: string;
  }) => {
    const dashboard = osBoardState.dashboards.find((d) => d.id === dashboardId);
    if (!dashboard) return;
    const target = dashboard.permissions.find((p) => p.userId === userId);
    if (!target) return;
    if (target.role === 'owner') return;
    dashboard.permissions = dashboard.permissions.filter(
      (p) => p.userId !== userId
    );
    dashboard.updatedAt = nowIso();
  },

  deleteDashboard: (id: string) => {
    osBoardState.dashboards = osBoardState.dashboards.filter(
      (d) => d.id !== id
    );
    osBoardState.alertRules = osBoardState.alertRules.filter(
      (r) => r.dashboardId !== id
    );
    osBoardState.alertEvents = osBoardState.alertEvents.filter(
      (e) => e.dashboardId !== id
    );
    osBoardState.subscriptions = osBoardState.subscriptions.filter(
      (s) => s.dashboardId !== id
    );
  },

  copyDashboard: (id: string) => {
    const dashboard = osBoardState.dashboards.find((d) => d.id === id);
    if (!dashboard) return null;
    const createdAt = nowIso();
    const copy: OsBoardDashboard = {
      ...JSON.parse(JSON.stringify(dashboard)),
      id: uid('db'),
      name: `${dashboard.name} - Copy`,
      createdAt,
      updatedAt: createdAt,
      ownerId: 'me',
      permissions: [{ userId: 'me', role: 'owner' }],
    };
    osBoardState.dashboards.unshift(copy);
    const rulesToCopy = osBoardState.alertRules
      .filter((r) => r.dashboardId === id)
      .map((r) => ({
        ...r,
        id: uid('ar'),
        dashboardId: String(copy.id),
      }));
    osBoardState.alertRules.unshift(...rulesToCopy);
    return copy;
  },

  upsertAlertRule: (rule: Omit<OsBoardAlertRule, 'id'> & { id?: string }) => {
    if (rule.id) {
      const existing = osBoardState.alertRules.find((r) => r.id === rule.id);
      if (!existing) return;
      Object.assign(existing, rule);
      return;
    }
    osBoardState.alertRules.unshift({
      ...rule,
      id: uid('ar'),
    } as OsBoardAlertRule);
  },

  removeAlertRule: (id: string) => {
    osBoardState.alertRules = osBoardState.alertRules.filter(
      (r) => r.id !== id
    );
  },

  addDerivedMetric: (input: Omit<OsBoardDerivedMetric, 'id'>) => {
    osBoardState.derivedMetrics.unshift({ ...input, id: uid('dm') });
  },

  updateDerivedMetric: (id: string, patch: Partial<OsBoardDerivedMetric>) => {
    const m = osBoardState.derivedMetrics.find((x) => x.id === id);
    if (!m) return;
    Object.assign(m, patch);
  },

  removeDerivedMetric: (id: string) => {
    osBoardState.derivedMetrics = osBoardState.derivedMetrics.filter(
      (m) => m.id !== id
    );
  },

  upsertSubscription: (
    sub: Omit<OsBoardSubscription, 'id'> & { id?: string }
  ) => {
    if (sub.id) {
      const existing = osBoardState.subscriptions.find((s) => s.id === sub.id);
      if (!existing) return;
      Object.assign(existing, sub);
      return;
    }
    osBoardState.subscriptions.unshift({ ...(sub as any), id: uid('sub') });
  },

  exportDashboardSnapshot: (
    dashboardId: string,
    format: OsBoardExportFormat
  ) => {
    const dashboard = osBoardState.dashboards.find((d) => d.id === dashboardId);
    if (!dashboard) return { ok: false as const, reason: 'not_found' as const };
    const metrics = [...osBoardState.metrics, ...osBoardState.derivedMetrics];
    const rows = dashboard.config.projects.map((project) => {
      const row: Record<string, string | number> = { project };
      for (const metricId of dashboard.config.metrics) {
        row[metricId] = getMetricValue({ dashboardId, project, metricId });
      }
      return row;
    });
    const snapshot = {
      dashboard,
      metrics,
      rows,
      exportedAt: nowIso(),
    };
    if (format === 'json') {
      return { ok: true as const, payload: JSON.stringify(snapshot, null, 2) };
    }
    if (format === 'csv') {
      return { ok: true as const, payload: buildCsv(rows) };
    }
    return { ok: true as const, payload: JSON.stringify(snapshot) };
  },
};

let saveTimer: number | NodeJS.Timeout | null = null;
subscribe(osBoardState, () => {
  if (typeof window === 'undefined') return;
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveToStorage();
  }, 200);
});
