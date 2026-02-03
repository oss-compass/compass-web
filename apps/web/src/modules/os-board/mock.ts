import type {
  OsBoardAlertRule,
  OsBoardAlertEvent,
  OsBoardDashboard,
  OsBoardMetric,
  OsBoardStateSnapshot,
} from './types';

const nowIso = () => new Date().toISOString();

const metrics: OsBoardMetric[] = [
  {
    id: 'active_developers',
    name: '活跃开发者',
    category: 'activity',
    unit: '人',
  },
  { id: 'commits', name: '代码提交', category: 'activity', unit: '次' },
  {
    id: 'issues_opened',
    name: 'Issue 创建',
    category: 'activity',
    unit: '个',
  },
  {
    id: 'issues_closed',
    name: 'Issue 关闭',
    category: 'activity',
    unit: '个',
  },
  { id: 'prs_opened', name: 'PR 提交', category: 'activity', unit: '个' },
  { id: 'prs_merged', name: 'PR 合并', category: 'activity', unit: '个' },
  {
    id: 'release_frequency',
    name: '版本发布频率',
    category: 'service_support',
    unit: '次/月',
  },
  {
    id: 'contributors',
    name: '贡献者总数',
    category: 'community_growth',
    unit: '人',
  },
  {
    id: 'new_contributors',
    name: '新增贡献者',
    category: 'community_growth',
    unit: '人',
  },
  {
    id: 'retention_rate',
    name: '贡献者留存率',
    category: 'community_growth',
    unit: '%',
  },
  {
    id: 'health_score',
    name: '健康度综合评分',
    category: 'composite_score',
    unit: '分',
  },
];

const seedDashboards = (): OsBoardDashboard[] => {
  const createdAt = nowIso();
  const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const monthAgo = new Date(
    Date.now() - 30 * 24 * 60 * 60 * 1000
  ).toISOString();
  return [
    {
      id: 'db-1',
      name: '社区运营模板',
      type: 'community',
      ownerId: 'me',
      createdAt: monthAgo,
      updatedAt: createdAt,
      config: {
        projects: ['github:oss-compass/compass-web', 'github:vercel/next.js'],
        competitorProjects: ['github:facebook/react'],
        metrics: [
          'active_developers',
          'commits',
          'issues_opened',
          'prs_merged',
          'issue_response_median',
          'health_score',
        ],
        compareMode: true,
        timeRange: { preset: '1M' },
      },
      permissions: [{ userId: 'me', role: 'owner' }],
    },
    {
      id: 'db-2',
      name: 'React 生态分析',
      type: 'repo',
      ownerId: 'me',
      createdAt: weekAgo,
      updatedAt: weekAgo,
      config: {
        projects: ['github:facebook/react', 'github:facebook/react-native'],
        competitorProjects: [],
        metrics: [
          'commits',
          'issues_opened',
          'issues_closed',
          'contributors',
          'prs_merged',
        ],
        compareMode: false,
        timeRange: { preset: '3M' },
      },
      permissions: [{ userId: 'me', role: 'owner' }],
    },
    {
      id: 'db-3',
      name: '前端框架对比',
      type: 'repo',
      ownerId: 'me',
      createdAt: dayAgo,
      updatedAt: dayAgo,
      config: {
        projects: ['github:vuejs/vue', 'github:angular/angular'],
        competitorProjects: ['github:sveltejs/svelte'],
        metrics: [
          'contributors',
          'new_contributors',
          'active_developers',
          'release_frequency',
        ],
        compareMode: true,
        timeRange: { preset: '1Y' },
      },
      permissions: [{ userId: 'me', role: 'owner' }],
    },
    {
      id: 'db-4',
      name: 'Node.js 生态监控',
      type: 'community',
      ownerId: 'me',
      createdAt,
      updatedAt: createdAt,
      config: {
        projects: [
          'github:nodejs/node',
          'github:expressjs/express',
          'github:nestjs/nest',
        ],
        competitorProjects: [],
        metrics: [
          'commits',
          'issues_opened',
          'issues_closed',
          'pr_review_median',
        ],
        compareMode: false,
        timeRange: { preset: '1M' },
      },
      permissions: [{ userId: 'me', role: 'owner' }],
    },
    {
      id: 'db-5',
      name: '开源 AI 项目追踪',
      type: 'repo',
      ownerId: 'me',
      createdAt: weekAgo,
      updatedAt: dayAgo,
      config: {
        projects: [
          'github:huggingface/transformers',
          'github:openai/openai-python',
        ],
        competitorProjects: ['github:langchain-ai/langchain'],
        metrics: [
          'contributors',
          'new_contributors',
          'active_developers',
          'commits',
          'retention_rate',
        ],
        compareMode: true,
        timeRange: { preset: '1M' },
      },
      permissions: [{ userId: 'me', role: 'owner' }],
    },
  ];
};

const seedAlertRules = (): OsBoardAlertRule[] => {
  return [
    {
      id: 'ar-1',
      dashboardId: 'db-1',
      metricId: 'active_developers',
      condition: 'lt',
      threshold: 5,
      level: 'critical',
      channels: ['inbox', 'email'],
      enabled: true,
    },
    {
      id: 'ar-2',
      dashboardId: 'db-1',
      metricId: 'new_contributors',
      condition: 'lt',
      threshold: 20,
      level: 'info',
      channels: ['inbox'],
      enabled: true,
    },
    {
      id: 'ar-3',
      dashboardId: 'db-1',
      metricId: 'commits',
      condition: 'lt',
      threshold: 100,
      level: 'warning',
      channels: ['inbox'],
      enabled: false,
    },
  ];
};

const seedAlertEvents = (): OsBoardAlertEvent[] => {
  const now = Date.now();
  return [
    {
      id: 'ae-1',
      dashboardId: 'db-1',
      ruleId: 'ar-1',
      metricId: 'active_developers',
      level: 'critical',
      createdAt: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
      value: 3,
      threshold: 5,
    },
    {
      id: 'ae-2',
      dashboardId: 'db-1',
      ruleId: 'ar-2',
      metricId: 'new_contributors',
      level: 'info',
      createdAt: new Date(now - 24 * 60 * 60 * 1000).toISOString(),
      value: 15,
      threshold: 20,
    },
    {
      id: 'ae-3',
      dashboardId: 'db-1',
      ruleId: 'ar-1',
      metricId: 'active_developers',
      level: 'critical',
      createdAt: new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString(),
      value: 4,
      threshold: 5,
    },
    {
      id: 'ae-4',
      dashboardId: 'db-1',
      ruleId: 'ar-3',
      metricId: 'commits',
      level: 'warning',
      createdAt: new Date(now - 5 * 24 * 60 * 60 * 1000).toISOString(),
      value: 85,
      threshold: 100,
    },
  ];
};

export const createInitialState = (): OsBoardStateSnapshot => {
  return {
    dashboards: seedDashboards(),
    metrics,
    derivedMetrics: [],
    alertRules: seedAlertRules(),
    alertEvents: seedAlertEvents(),
    subscriptions: [],
  };
};
