import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Alert,
  Button,
  Card,
  Grid,
  Input,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import {
  ArrowLeftOutlined,
  CheckOutlined,
  FilterFilled,
  ReloadOutlined,
} from '@ant-design/icons';
import {
  cancelOverviewRepoRerun,
  clearCompassOperatorToken,
  fetchCompassOperatorMe,
  fetchOverviewAllRepoRerunRecords,
  fetchOverviewRepoRerunRecords,
  fetchOverviewRerunNodes,
  fetchRepoManagementRegisterOptions,
  getCompassOperatorToken,
  loginCompassOperator,
  registerCompassOperator,
  setCompassOperatorToken,
  triggerOverviewRepoRerun,
} from '../rawData/apiClient';
import type {
  CompassOperatorUser,
  DevxNodeStatus,
  RepoRerunJob,
} from '../rawData/apiClient';
import DashboardStyles from '../OverviewDashboard/DashboardStyles';
import OperatorAccessModal, {
  type OperatorRegisterValues,
} from '../OverviewDashboard/OperatorAccessModal';
import {
  getDevxNodeKey,
  getDevxNodeDisplayName,
  getRerunStatusMeta,
  isActiveRerunJob,
  isRerunReviewCompleted,
  RepoRerunModal,
  RepoRerunRecordsModal,
  RerunActionButton,
} from '../OverviewDashboard/RepoRerunComponents';
import { getReportDisplayText } from '../OverviewDashboard/utils';
import type { RepoProgressRow } from '../OverviewDashboard/types';

const { Title } = Typography;

type TaskStatusFilter = 'all' | RepoRerunJob['status'];

const statusOptions: Array<{ value: TaskStatusFilter; label: string }> = [
  { value: 'all', label: '全部状态' },
  { value: 'queued', label: '排队中' },
  { value: 'pending', label: '待调度' },
  { value: 'running', label: '重跑中' },
  { value: 'completed', label: '已完成' },
  { value: 'failed', label: '失败' },
  { value: 'timeout', label: '已超时' },
  { value: 'cancelled', label: '已撤销' },
];

type HeaderFilterOption = {
  value: string;
  label: string;
};

type HeaderFilterProps = {
  label: string;
  value: string;
  allLabel: string;
  options: HeaderFilterOption[];
  onChange: (value: string) => void;
};

const HeaderFilter: React.FC<HeaderFilterProps> = ({
  label,
  value,
  allLabel,
  options,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ left: 0, top: 0 });
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const hasValue = Boolean(value);
  const popupWidth = 220;

  const updatePopupPosition = useCallback(() => {
    if (!wrapperRef.current || typeof window === 'undefined') return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const viewportPadding = 8;
    const left = Math.min(
      Math.max(rect.right - popupWidth, viewportPadding),
      window.innerWidth - popupWidth - viewportPadding
    );
    setPopupPosition({
      left,
      top: rect.bottom + 4,
    });
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    updatePopupPosition();
    const handleDocClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !wrapperRef.current?.contains(target) &&
        !popupRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const handleReposition = () => updatePopupPosition();
    document.addEventListener('mousedown', handleDocClick);
    document.addEventListener('keydown', handleKey);
    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);
    return () => {
      document.removeEventListener('mousedown', handleDocClick);
      document.removeEventListener('keydown', handleKey);
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [open, updatePopupPosition]);

  const visibleOptions = [{ value: '', label: allLabel }, ...options];
  const popup =
    open && typeof document !== 'undefined'
      ? createPortal(
          <div
            ref={popupRef}
            className="rounded-lg border border-slate-200 bg-white p-3 shadow-lg"
            style={{
              position: 'fixed',
              left: popupPosition.left,
              top: popupPosition.top,
              zIndex: 3000,
              width: popupWidth,
            }}
            onClick={(event) => event.stopPropagation()}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="mb-2 text-xs font-semibold text-slate-500">
              筛选{label}
            </div>
            <div className="flex max-h-64 flex-col gap-1 overflow-y-auto">
              {visibleOptions.map((option) => {
                const active = value === option.value;
                return (
                  <button
                    key={option.value || '__all__'}
                    type="button"
                    className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                      active
                        ? 'border-blue-200 bg-blue-50 text-blue-700'
                        : 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50'
                    }`}
                    onClick={(event) => {
                      event.stopPropagation();
                      onChange(option.value);
                      setOpen(false);
                    }}
                  >
                    <span className="truncate">{option.label}</span>
                    {active ? <CheckOutlined className="text-xs" /> : null}
                  </button>
                );
              })}
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <span
      ref={wrapperRef}
      className="inline-flex items-center gap-1"
      onClick={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
    >
      <span>{label}</span>
      <button
        type="button"
        aria-label={`筛选${label}`}
        title={hasValue ? `已筛选：${value}` : `筛选${label}`}
        className={`inline-flex h-5 w-5 items-center justify-center rounded transition-colors ${
          hasValue
            ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
        }`}
        onClick={(event) => {
          event.stopPropagation();
          setOpen((prev) => !prev);
        }}
      >
        <FilterFilled className="text-[12px]" />
      </button>
      {popup}
    </span>
  );
};

const getProjectKeyAliases = (projectKey: string) => {
  const key = String(projectKey || '')
    .trim()
    .toLowerCase()
    .replace(/-/g, '_');
  if (!key) return new Set<string>();
  const aliases = new Set([key]);
  if (key.startsWith('cann_')) {
    if (key.startsWith('cann_cann_')) {
      aliases.add(`cann_${key.slice('cann_cann_'.length)}`);
    } else {
      aliases.add(`cann_cann_${key.slice('cann_'.length)}`);
    }
  } else {
    aliases.add(`cann_${key}`);
    aliases.add(`cann_cann_${key}`);
  }
  return aliases;
};

const getPreferredRerunNodeKey = (nodes: DevxNodeStatus[]) => {
  const preferredIndex = nodes.findIndex((node) =>
    String(node.hardware || '')
      .trim()
      .toLowerCase()
      .includes('910c')
  );
  const index = preferredIndex >= 0 ? preferredIndex : 0;
  const targetNode = nodes[index];
  return targetNode ? getDevxNodeKey(targetNode, index) : '';
};

const formatDateTime = (value: unknown) => {
  const text = String(value || '').trim();
  if (!text) return '--';
  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return text;
  return parsed.toLocaleString('zh-CN', {
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

const getReportHref = (job: RepoRerunJob) => {
  const fileKey = String(job.generated_file_key || '').trim();
  const status = String(job.status || '')
    .trim()
    .toLowerCase();
  if (status !== 'completed' || !fileKey || !isRerunReviewCompleted(job)) {
    return '';
  }
  return `/intelligent-analysis/community-experience?project=${encodeURIComponent(
    fileKey
  )}`;
};

const getJobRepoDisplayName = (job: Pick<RepoRerunJob, 'repo_name'>) => {
  const repoName = String(job.repo_name || '').trim();
  if (!repoName) return '';
  if (repoName.includes('/')) return repoName;
  return `cann/${repoName}`;
};

const toRepoProgressRow = (job: RepoRerunJob | null): RepoProgressRow | null =>
  job
    ? {
        id: job.project_key,
        name: getJobRepoDisplayName(job),
        team: job.team_name || '未分配团队',
        hardwareEnv:
          String(
            job.selected_node_hardware || job.third_party_hardware || ''
          ).trim() || '',
        score: null,
        successRate: null,
        executionTime: null,
        latestReportId: '',
        detailReportUrl: '',
        scoreHistory: [],
        overall: {
          total: 0,
          pending: 0,
          inProgress: 0,
          resolved: 0,
          na: 0,
          closeRate: 0,
        },
        key: {
          total: 0,
          pending: 0,
          inProgress: 0,
          resolved: 0,
          na: 0,
          closeRate: 0,
        },
        issues: [],
        benchmark: null,
      }
    : null;

const getTimeValue = (value: unknown) => {
  const text = String(value || '').trim();
  if (!text) return 0;
  const parsed = new Date(text).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
};

const compareText = (left: unknown, right: unknown) =>
  String(left || '').localeCompare(String(right || ''), 'zh-CN');

const getSortedNodes = (nodes: DevxNodeStatus[]) =>
  [...nodes].sort((left, right) => {
    const leftHardware = String(left.hardware || '').trim();
    const rightHardware = String(right.hardware || '').trim();
    const hardwareCompare = compareText(leftHardware, rightHardware);
    if (hardwareCompare !== 0) return hardwareCompare;
    return compareText(
      left.node_name || left.name || left.hostname || left.node_id,
      right.node_name || right.name || right.hostname || right.node_id
    );
  });

type NodeStatusSectionProps = {
  nodes: DevxNodeStatus[];
  loading: boolean;
  error: string;
};

const NodeStatusSection: React.FC<NodeStatusSectionProps> = ({
  nodes,
  loading,
  error,
}) => {
  const sortedNodes = useMemo(() => getSortedNodes(nodes), [nodes]);
  const columnCount = Math.min(Math.max(sortedNodes.length, 1), 6);

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-slate-900">节点状态</div>
        {!loading && !error && sortedNodes.length ? (
          <div className="text-xs text-slate-500">
            在线节点 {sortedNodes.length} 个
          </div>
        ) : null}
      </div>
      {loading ? (
        <div className="text-sm text-slate-500">正在加载节点状态...</div>
      ) : error ? (
        <div className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </div>
      ) : sortedNodes.length ? (
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
          }}
        >
          {sortedNodes.map((node, index) => {
            const name = getDevxNodeDisplayName(node, index);
            const nodeKey = getDevxNodeKey(node, index);
            const hardwareText = String(node.hardware || '--').trim() || '--';
            const used = Number(node.used_slots ?? 0);
            const free = Number(node.free_slots ?? 0);
            const max = Number(node.max_slots ?? used + free);
            const total = max > 0 ? max : used + free;
            const usagePercent =
              total > 0
                ? Math.max(0, Math.min(100, Math.round((used / total) * 100)))
                : 0;
            return (
              <div
                key={nodeKey}
                className="min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate font-medium text-slate-900">
                      {name}
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <span className="shrink-0 text-xs text-slate-500">
                        硬件环境:
                      </span>
                      <span className="truncate text-slate-700">
                        {hardwareText}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    使用率 {usagePercent}%
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <span className="shrink-0 text-xs text-slate-500">
                    资源占用:
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all"
                        style={{ width: `${usagePercent}%` }}
                      />
                    </div>
                  </div>
                  <span className="shrink-0 text-xs text-slate-600">
                    {used} / {total || 0}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-sm text-slate-500">暂无在线节点信息</div>
      )}
    </div>
  );
};

const canOperateJob = (
  user: CompassOperatorUser | null,
  job: RepoRerunJob | null
) => {
  if (!user || !job || !user.enabled) return false;
  if (user.role === 'admin') return true;
  const repoKeys = new Set(
    (user.repo_keys || []).map((item) =>
      String(item || '')
        .trim()
        .toLowerCase()
        .replace(/-/g, '_')
    )
  );
  for (const alias of Array.from(getProjectKeyAliases(job.project_key))) {
    if (repoKeys.has(alias)) return true;
  }
  return false;
};

const TaskManagementPage: React.FC = () => {
  const router = useRouter();
  const screens = Grid.useBreakpoint();
  const [messageApi, contextHolder] = message.useMessage();
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatusFilter>('all');
  const [teamFilter, setTeamFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [operatorUser, setOperatorUser] = useState<CompassOperatorUser | null>(
    null
  );
  const [authInitialized, setAuthInitialized] = useState(false);
  const [authChecking, setAuthChecking] = useState(false);
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [accessModalOpen, setAccessModalOpen] = useState(false);
  const [cancelingJobId, setCancelingJobId] = useState('');
  const [rerunning, setRerunning] = useState(false);
  const [rerunModal, setRerunModal] = useState<{
    open: boolean;
    job: RepoRerunJob | null;
  }>({ open: false, job: null });
  const [rerunRecordsModal, setRerunRecordsModal] = useState<{
    open: boolean;
    job: RepoRerunJob | null;
  }>({ open: false, job: null });
  const [rerunRecords, setRerunRecords] = useState<RepoRerunJob[]>([]);
  const [rerunRecordsLoading, setRerunRecordsLoading] = useState(false);
  const [rerunRecordsError, setRerunRecordsError] = useState('');
  const [rerunRecordsExpanded, setRerunRecordsExpanded] = useState(false);
  const [rerunRecordsModalExpanded, setRerunRecordsModalExpanded] =
    useState(true);
  const [rerunNodes, setRerunNodes] = useState<DevxNodeStatus[]>([]);
  const [rerunNodesLoading, setRerunNodesLoading] = useState(false);
  const [rerunNodesError, setRerunNodesError] = useState('');
  const [selectedRerunNodeKey, setSelectedRerunNodeKey] = useState('');

  const loadOperatorUser = useCallback(async () => {
    const token = getCompassOperatorToken();
    if (!token) {
      setOperatorUser(null);
      setAuthInitialized(true);
      return null;
    }
    setAuthChecking(true);
    try {
      const user = await fetchCompassOperatorMe(token);
      setOperatorUser(user);
      setAuthInitialized(true);
      return user;
    } catch {
      clearCompassOperatorToken();
      setOperatorUser(null);
      setAuthInitialized(true);
      return null;
    } finally {
      setAuthChecking(false);
    }
  }, []);

  useEffect(() => {
    void loadOperatorUser();
  }, [loadOperatorUser]);

  const {
    data: taskListResp,
    isLoading,
    refetch: refetchTaskList,
  } = useQuery({
    queryKey: [
      'overview-rerun-task-list',
      operatorUser?.username,
      keyword,
      statusFilter,
      teamFilter,
      page,
      pageSize,
    ],
    queryFn: () =>
      fetchOverviewAllRepoRerunRecords({
        keyword: keyword || undefined,
        status: statusFilter === 'all' ? undefined : statusFilter,
        teamName: teamFilter || undefined,
        page,
        size: pageSize,
      }),
    enabled: !!operatorUser,
  });

  const { data: registerRepoOptionsResp } = useQuery({
    queryKey: ['repo-management-register-options'],
    queryFn: fetchRepoManagementRegisterOptions,
  });

  const registerRepoOptions = useMemo(
    () =>
      (registerRepoOptionsResp?.items ?? []).map((item) => ({
        value: item.value,
        label: item.label,
      })),
    [registerRepoOptionsResp?.items]
  );

  const taskItems = useMemo(
    () => taskListResp?.items ?? [],
    [taskListResp?.items]
  );

  const teamOptions = useMemo(
    () =>
      Array.from(
        new Set(
          taskItems
            .map((item) => String(item.team_name || '').trim())
            .filter(Boolean)
        )
      ).map((item) => ({ value: item, label: item })),
    [taskItems]
  );
  const statusHeaderOptions = useMemo(
    () =>
      statusOptions
        .filter((item) => item.value !== 'all')
        .map((item) => ({ value: item.value, label: item.label })),
    []
  );

  const closeRerunModal = useCallback(() => {
    setRerunModal({ open: false, job: null });
    setLoginError('');
    setSelectedRerunNodeKey('');
    setRerunRecordsExpanded(false);
    setLoginForm((prev) => ({ ...prev, password: '' }));
  }, []);

  const closeRerunRecordsModal = useCallback(() => {
    setRerunRecordsModal({ open: false, job: null });
    setRerunRecords([]);
    setRerunRecordsError('');
    setRerunRecordsModalExpanded(true);
  }, []);

  const loadRerunRecords = useCallback(
    async (projectKey: string, options?: { silent?: boolean }) => {
      const silent = options?.silent ?? false;
      if (!silent) {
        setRerunRecordsLoading(true);
        setRerunRecordsError('');
      }
      try {
        const result = await fetchOverviewRepoRerunRecords(projectKey, 50);
        setRerunRecords(result.items || []);
      } catch (error) {
        if (!silent) {
          setRerunRecordsError(
            error instanceof Error ? error.message : '获取重跑记录失败'
          );
        }
      } finally {
        if (!silent) setRerunRecordsLoading(false);
      }
    },
    []
  );

  const loadRerunNodes = useCallback(async () => {
    setRerunNodesLoading(true);
    setRerunNodesError('');
    try {
      const result = await fetchOverviewRerunNodes();
      setRerunNodes(result.items || []);
    } catch (error) {
      const text = error instanceof Error ? error.message : '获取节点状态失败';
      if (/token|未登录|过期/i.test(text)) {
        clearCompassOperatorToken();
        setOperatorUser(null);
      }
      setRerunNodesError(text);
    } finally {
      setRerunNodesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!operatorUser) {
      setRerunNodes([]);
      setRerunNodesError('');
      setRerunNodesLoading(false);
      return;
    }
    void loadRerunNodes();
  }, [loadRerunNodes, operatorUser]);

  useEffect(() => {
    if (!rerunModal.open) {
      setSelectedRerunNodeKey('');
      return;
    }
    if (!rerunNodes.length) {
      setSelectedRerunNodeKey('');
      return;
    }
    const hasSelected = rerunNodes.some(
      (node, index) => getDevxNodeKey(node, index) === selectedRerunNodeKey
    );
    if (!hasSelected) {
      setSelectedRerunNodeKey(getPreferredRerunNodeKey(rerunNodes));
    }
  }, [rerunModal.open, rerunNodes, selectedRerunNodeKey]);

  useEffect(() => {
    if (!rerunRecordsModal.open || !rerunRecordsModal.job) return undefined;
    const hasActiveJob = rerunRecords.some((item) => isActiveRerunJob(item));
    if (!hasActiveJob) return undefined;
    const timer = window.setInterval(() => {
      void loadRerunRecords(rerunRecordsModal.job!.project_key, {
        silent: true,
      });
    }, 30000);
    return () => window.clearInterval(timer);
  }, [
    loadRerunRecords,
    rerunRecords,
    rerunRecordsModal.job,
    rerunRecordsModal.open,
  ]);

  const openRerunModal = useCallback(
    (job: RepoRerunJob) => {
      setLoginError('');
      setRerunRecords([job]);
      setRerunRecordsError('');
      setRerunRecordsLoading(false);
      setSelectedRerunNodeKey('');
      setRerunRecordsExpanded(false);
      setRerunModal({ open: true, job });
      void loadRerunRecords(job.project_key, { silent: true });
    },
    [loadRerunRecords]
  );

  const openRerunRecordsModal = useCallback(
    (job: RepoRerunJob) => {
      setRerunRecords([job]);
      setRerunRecordsError('');
      setRerunRecordsLoading(false);
      setRerunRecordsModalExpanded(true);
      setRerunRecordsModal({ open: true, job });
      void loadRerunRecords(job.project_key);
    },
    [loadRerunRecords]
  );

  const handleOperatorLogin = useCallback(async () => {
    const username = loginForm.username.trim();
    const password = loginForm.password;
    if (!username || !password) {
      setLoginError('请输入账号和密码');
      return null;
    }
    setAuthSubmitting(true);
    setLoginError('');
    try {
      const result = await loginCompassOperator({ username, password });
      setCompassOperatorToken(result.access_token);
      setOperatorUser(result.user);
      setAuthInitialized(true);
      setLoginForm((prev) => ({ ...prev, password: '' }));
      messageApi.success(`已登录为 ${result.user.display_name}`);
      return result.user;
    } catch (error) {
      setLoginError(
        error instanceof Error ? error.message : '登录失败，请稍后重试'
      );
      return null;
    } finally {
      setAuthSubmitting(false);
    }
  }, [loginForm.password, loginForm.username, messageApi]);

  const handleOperatorRegister = useCallback(
    async (values: OperatorRegisterValues) => {
      const username = values.username.trim();
      const password = values.password;
      const repoKeys = values.repoKeys.filter(Boolean);
      if (!username || !password) {
        setLoginError('请输入账号和密码');
        return null;
      }
      if (password.length < 6) {
        setLoginError('密码至少 6 位');
        return null;
      }
      if (!repoKeys.length) {
        setLoginError('请选择负责仓库');
        return null;
      }
      const labelMap = new Map(
        registerRepoOptions.map((item) => [item.value, item.label])
      );
      setAuthSubmitting(true);
      setLoginError('');
      try {
        const result = await registerCompassOperator({
          username,
          password,
          repo_keys: repoKeys,
          repo_names: repoKeys.map((key) => labelMap.get(key) || key),
        });
        setCompassOperatorToken(result.access_token);
        setOperatorUser(result.user);
        setAuthInitialized(true);
        setAccessModalOpen(false);
        setLoginForm({ username: result.user.username, password: '' });
        messageApi.success(`已注册并登录为 ${result.user.display_name}`);
        return result.user;
      } catch (error) {
        setLoginError(
          error instanceof Error ? error.message : '注册失败，请稍后重试'
        );
        return null;
      } finally {
        setAuthSubmitting(false);
      }
    },
    [messageApi, registerRepoOptions]
  );

  const handleOperatorLogout = useCallback(() => {
    clearCompassOperatorToken();
    setOperatorUser(null);
    setLoginError('');
    setLoginForm((prev) => ({ ...prev, password: '' }));
  }, []);

  const handleEnterManagement = useCallback(async () => {
    const nextUser = operatorUser ?? (await handleOperatorLogin());
    if (!nextUser) return;
    setAccessModalOpen(false);
    setLoginError('');
    await refetchTaskList();
  }, [handleOperatorLogin, operatorUser, refetchTaskList]);

  const handleConfirmRerun = useCallback(async () => {
    const job = rerunModal.job;
    if (!job) return;
    if (!operatorUser) {
      setLoginError('请先登录后再操作');
      return;
    }
    if (!canOperateJob(operatorUser, job)) {
      messageApi.error('当前账号无权操作该仓库');
      return;
    }
    if (rerunNodesLoading) {
      setLoginError('节点状态加载中，请稍后再试');
      return;
    }

    const selectedNodeIndex = rerunNodes.findIndex(
      (node, index) => getDevxNodeKey(node, index) === selectedRerunNodeKey
    );
    const selectedNode =
      selectedNodeIndex >= 0 ? rerunNodes[selectedNodeIndex] : null;
    if (!selectedNode) {
      setLoginError('请先选择一个节点后再确认重跑');
      messageApi.warning('请先选择一个节点后再确认重跑');
      return;
    }

    setRerunning(true);
    setLoginError('');
    try {
      const result = await triggerOverviewRepoRerun(job.project_key, {
        selected_node_id:
          String(
            selectedNode.node_id ||
              getDevxNodeKey(selectedNode, selectedNodeIndex)
          ).trim() || undefined,
        selected_node_name:
          String(
            selectedNode.node_name ||
              selectedNode.name ||
              selectedNode.hostname ||
              ''
          ).trim() || undefined,
        selected_node_hardware:
          String(selectedNode.hardware || '').trim() || undefined,
      });
      setRerunRecords([result.data]);
      messageApi.success(result.message || '已触发重跑');
      closeRerunModal();
      setRerunRecordsModal({ open: true, job: result.data });
      await loadRerunRecords(job.project_key);
      await refetchTaskList();
    } catch (error) {
      const text =
        error instanceof Error ? error.message : '重跑失败，请稍后重试';
      if (/token|未登录|过期/i.test(text)) {
        clearCompassOperatorToken();
        setOperatorUser(null);
      }
      setLoginError(text);
      messageApi.error(text);
    } finally {
      setRerunning(false);
    }
  }, [
    closeRerunModal,
    loadRerunRecords,
    messageApi,
    operatorUser,
    refetchTaskList,
    rerunModal.job,
    rerunNodes,
    rerunNodesLoading,
    selectedRerunNodeKey,
  ]);

  const handleCancelJob = useCallback(
    async (job: RepoRerunJob) => {
      if (!operatorUser) {
        setLoginError('请先登录后再操作');
        setAccessModalOpen(true);
        return;
      }
      if (!canOperateJob(operatorUser, job)) {
        messageApi.error('当前账号无权操作该仓库');
        return;
      }
      if (!isActiveRerunJob(job)) {
        messageApi.warning('仅排队中或运行中的任务支持撤销');
        return;
      }
      setCancelingJobId(job.job_id);
      try {
        const result = await cancelOverviewRepoRerun(
          job.project_key,
          job.job_id
        );
        setRerunRecords((prev) =>
          prev.map((item) => (item.job_id === job.job_id ? result.data : item))
        );
        messageApi.success(result.message || '已撤销重跑任务');
        void loadRerunRecords(job.project_key, { silent: true });
        await refetchTaskList();
      } catch (error) {
        const text =
          error instanceof Error ? error.message : '撤销失败，请稍后重试';
        if (/token|未登录|过期/i.test(text)) {
          clearCompassOperatorToken();
          setOperatorUser(null);
        }
        messageApi.error(text);
      } finally {
        setCancelingJobId('');
      }
    },
    [loadRerunRecords, messageApi, operatorUser, refetchTaskList]
  );

  const sortableTitle = useCallback(
    (label: string) => (
      <span className="sortable-col-title">
        {label}
        <span className="sort-arrow">↕</span>
      </span>
    ),
    []
  );

  const columns = useMemo<ColumnsType<RepoRerunJob>>(
    () => [
      {
        title: sortableTitle('仓库名称'),
        dataIndex: 'repo_name',
        key: 'repo_name',
        width: 180,
        sorter: (left, right) =>
          compareText(
            getJobRepoDisplayName(left),
            getJobRepoDisplayName(right)
          ),
        sortDirections: ['ascend', 'descend'],
        render: (_value, record) => (
          <span
            className="overview-repo-name-cell"
            title={getJobRepoDisplayName(record)}
          >
            <span className="max-w-full whitespace-normal break-words leading-relaxed [word-break:break-word]">
              {getJobRepoDisplayName(record)}
            </span>
          </span>
        ),
        onHeaderCell: () => ({
          className: 'sortable-col',
        }),
      },
      {
        title: (
          <HeaderFilter
            label="责任团队"
            value={teamFilter}
            allLabel="全部团队"
            options={teamOptions}
            onChange={(nextValue) => {
              setTeamFilter(nextValue);
              setPage(1);
            }}
          />
        ),
        dataIndex: 'team_name',
        key: 'team_name',
        width: 140,
        sorter: (left, right) => compareText(left.team_name, right.team_name),
        sortDirections: ['ascend', 'descend'],
        render: (value) => value || '--',
        onHeaderCell: () => ({
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('操作人'),
        dataIndex: 'requested_by',
        key: 'requested_by',
        width: 170,
        sorter: (left, right) =>
          compareText(left.requested_by, right.requested_by),
        sortDirections: ['ascend', 'descend'],
        render: (value) => value || '--',
        onHeaderCell: () => ({
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('创建时间'),
        dataIndex: 'created_at',
        key: 'created_at',
        width: 168,
        sorter: (left, right) =>
          getTimeValue(left.created_at) - getTimeValue(right.created_at),
        sortDirections: ['ascend', 'descend'],
        render: (value) => formatDateTime(value),
        onHeaderCell: () => ({
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('完成时间'),
        dataIndex: 'completed_at',
        key: 'completed_at',
        width: 168,
        sorter: (left, right) =>
          getTimeValue(left.completed_at) - getTimeValue(right.completed_at),
        sortDirections: ['ascend', 'descend'],
        render: (value) => formatDateTime(value),
        onHeaderCell: () => ({
          className: 'sortable-col',
        }),
      },
      {
        title: (
          <HeaderFilter
            label="任务状态"
            value={statusFilter === 'all' ? '' : statusFilter}
            allLabel="全部状态"
            options={statusHeaderOptions}
            onChange={(nextValue) => {
              setStatusFilter((nextValue || 'all') as TaskStatusFilter);
              setPage(1);
            }}
          />
        ),
        dataIndex: 'status',
        key: 'status',
        width: 132,
        sorter: (left, right) => {
          const leftMeta = getRerunStatusMeta(
            left.status,
            left.generated_report_review_status
          );
          const rightMeta = getRerunStatusMeta(
            right.status,
            right.generated_report_review_status
          );
          return compareText(leftMeta.label, rightMeta.label);
        },
        sortDirections: ['ascend', 'descend'],
        render: (value, record) => {
          const meta = getRerunStatusMeta(
            String(value || '').trim(),
            record.generated_report_review_status
          );
          return (
            <Tag color={meta.color as any}>
              <span className="inline-flex items-center gap-1">
                {meta.icon}
                <span>{meta.label}</span>
              </span>
            </Tag>
          );
        },
        onHeaderCell: () => ({
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('队列排名'),
        dataIndex: 'queue_rank',
        key: 'queue_rank',
        width: 100,
        sorter: (left, right) =>
          Number(left.queue_rank || 0) - Number(right.queue_rank || 0),
        sortDirections: ['ascend', 'descend'],
        render: (value, record) => {
          const status = String(record.status || '')
            .trim()
            .toLowerCase();
          const rank = Number(value);
          if (
            (status === 'queued' || status === 'pending') &&
            Number.isFinite(rank) &&
            rank > 0
          ) {
            return `第${rank}位`;
          }
          return <span className="text-slate-400">--</span>;
        },
        onHeaderCell: () => ({
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('硬件环境'),
        dataIndex: 'selected_node_hardware',
        key: 'selected_node_hardware',
        width: 150,
        sorter: (left, right) =>
          compareText(
            left.selected_node_hardware || left.third_party_hardware,
            right.selected_node_hardware || right.third_party_hardware
          ),
        sortDirections: ['ascend', 'descend'],
        render: (value, record) =>
          String(value || record.third_party_hardware || '').trim() || '--',
        onHeaderCell: () => ({
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('报告ID'),
        key: 'generated_report_id',
        width: 240,
        sorter: (left, right) =>
          compareText(left.generated_report_id, right.generated_report_id),
        sortDirections: ['ascend', 'descend'],
        render: (_value, record) => {
          const reportId = String(record.generated_report_id || '').trim();
          const displayText = getReportDisplayText(reportId);
          const href = getReportHref(record);
          if (!reportId) return <span className="text-slate-400">--</span>;
          return href ? (
            <Link href={href} className="overview-table-link">
              {displayText || reportId}
            </Link>
          ) : (
            <span>{displayText || reportId}</span>
          );
        },
        onHeaderCell: () => ({
          className: 'sortable-col',
        }),
      },
      {
        title: '操作',
        key: 'actions',
        fixed: 'right',
        width: 140,
        render: (_value, record) => {
          const canManageRecord = canOperateJob(operatorUser, record);
          if (!canManageRecord)
            return <span className="text-slate-400">-</span>;
          return (
            <Space size={4} wrap>
              <RerunActionButton
                job={record}
                onOpenRecords={() => {
                  openRerunRecordsModal(record);
                }}
                onOpenRerun={() => {
                  openRerunModal(record);
                }}
              />
              {isActiveRerunJob(record) ? (
                <Button
                  type="link"
                  danger
                  size="small"
                  className="!px-0"
                  loading={cancelingJobId === record.job_id}
                  onClick={() => {
                    void handleCancelJob(record);
                  }}
                >
                  撤销
                </Button>
              ) : null}
            </Space>
          );
        },
      },
    ],
    [
      cancelingJobId,
      handleCancelJob,
      openRerunModal,
      openRerunRecordsModal,
      operatorUser,
      sortableTitle,
      statusFilter,
      statusHeaderOptions,
      teamFilter,
      teamOptions,
    ]
  );

  const handleTableChange = useCallback<
    NonNullable<TableProps<RepoRerunJob>['onChange']>
  >(
    (pagination) => {
      setPage(pagination.current ?? 1);
      setPageSize(pagination.pageSize ?? pageSize);
    },
    [pageSize]
  );

  const controlClassName =
    'h-8 !rounded-2xl border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] text-sm shadow-[0_2px_6px_rgba(15,23,42,0.06)]';
  const searchClassName =
    '[&_.ant-input-affix-wrapper]:!h-8 [&_.ant-input-affix-wrapper]:!rounded-l-2xl [&_.ant-input-affix-wrapper]:!border-slate-200/80 [&_.ant-input-affix-wrapper]:!bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] [&_.ant-input-affix-wrapper]:!shadow-[0_2px_6px_rgba(15,23,42,0.06)] [&_.ant-input-group-addon_.ant-btn]:!h-8 [&_.ant-input-group-addon_.ant-btn]:!rounded-r-2xl [&_.ant-input-group-addon_.ant-btn]:!border-slate-200/80';
  const rerunTargetRepo = toRepoProgressRow(rerunModal.job);
  const rerunRecordsTargetRepo = toRepoProgressRow(rerunRecordsModal.job);
  const rerunHardware =
    String(
      rerunModal.job?.selected_node_hardware ||
        rerunModal.job?.third_party_hardware ||
        ''
    ).trim() || '';
  const rerunRecordsHardware =
    String(
      rerunRecordsModal.job?.selected_node_hardware ||
        rerunRecordsModal.job?.third_party_hardware ||
        ''
    ).trim() || '';
  const shouldShowRerunRecordsTableInRerunModal =
    rerunRecordsLoading || !!rerunRecordsError || rerunRecords.length > 0;

  return (
    <div className="oj-page min-h-full bg-[#eef2fa] px-7 py-4 md:px-6">
      {contextHolder}
      <DashboardStyles />
      <div className="flex w-full flex-col gap-4">
        {!authInitialized ? (
          <Card className="w-full rounded-3xl border border-white/80 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <div className="flex items-center gap-3 py-6 text-sm text-slate-500">
              <span>正在校验当前登录状态...</span>
            </div>
          </Card>
        ) : !operatorUser ? (
          <Card className="rounded-3xl border border-white/80 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <div className="flex flex-col items-start gap-4 py-6">
              <Alert
                type="info"
                showIcon
                message="请先登录操作账号后查看重跑任务"
              />
              <Button
                type="primary"
                className="rounded-full px-4 font-semibold"
                onClick={() => setAccessModalOpen(true)}
              >
                登录并进入
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="rounded-3xl border border-white/80 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <div className="mb-5 flex flex-col gap-4">
              <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <div className="mb-1 flex items-center gap-2">
                    <Button
                      type="text"
                      icon={
                        <ArrowLeftOutlined className="text-xs transition-transform group-hover:-translate-x-0.5" />
                      }
                      className="group inline-flex h-9 flex-shrink-0 items-center gap-2 !rounded-full border border-white/80 bg-white px-3.5 text-sm font-semibold text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur transition hover:!-translate-y-0.5 hover:!border-sky-200 hover:!bg-white hover:!text-sky-700 hover:!shadow-[0_16px_36px_rgba(59,130,246,0.18)]"
                      onClick={() => router.back()}
                    >
                      返回看板
                    </Button>
                    <Title level={4} className="!mb-0 !mt-0">
                      任务管理
                    </Title>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <NodeStatusSection
                nodes={rerunNodes}
                loading={rerunNodesLoading}
                error={rerunNodesError}
              />
            </div>

            <div className="mb-5 flex flex-wrap items-center gap-3">
              <Input.Search
                allowClear
                placeholder="搜索仓库 / 任务ID / 操作人 / 报告ID"
                value={keyword}
                className={searchClassName}
                onChange={(event) => {
                  setKeyword(event.target.value);
                  setPage(1);
                }}
                style={{ width: screens.lg ? 340 : '100%' }}
              />
              <Space wrap className="ml-auto justify-end">
                <Button
                  icon={<ReloadOutlined />}
                  className={`${controlClassName} px-3 font-semibold text-slate-700`}
                  onClick={() => {
                    void loadOperatorUser();
                    void loadRerunNodes();
                    void refetchTaskList();
                  }}
                >
                  刷新
                </Button>
                <Button
                  className={`${controlClassName} px-3 font-semibold text-slate-700`}
                  onClick={() => setAccessModalOpen(true)}
                >
                  切换操作账号
                </Button>
              </Space>
            </div>

            <Table<RepoRerunJob>
              className="overview-ant-table"
              style={{ width: '100%' }}
              rowKey={(record) =>
                record.job_id ||
                record.third_party_task_id ||
                `${record.project_key}-${record.created_at}`
              }
              loading={isLoading || authChecking}
              columns={columns}
              dataSource={taskItems}
              scroll={{ x: 1544 }}
              onChange={handleTableChange}
              pagination={{
                current: page,
                pageSize,
                total: taskListResp?.total || 0,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
                locale: {
                  items_per_page: '条/页',
                  jump_to: '跳至',
                  jump_to_confirm: '确定',
                  page: '页',
                  prev_page: '上一页',
                  next_page: '下一页',
                  prev_5: '向前 5 页',
                  next_5: '向后 5 页',
                  prev_3: '向前 3 页',
                  next_3: '向后 3 页',
                },
              }}
              locale={{ emptyText: '暂无重跑任务' }}
            />
          </Card>
        )}
      </div>

      <RepoRerunModal
        open={rerunModal.open}
        repo={rerunTargetRepo}
        hardware={rerunHardware}
        operatorUser={operatorUser}
        canCurrentUserOperate={canOperateJob(operatorUser, rerunModal.job)}
        rerunRecords={rerunRecords}
        rerunRecordsLoading={rerunRecordsLoading}
        rerunRecordsError={rerunRecordsError}
        cancelingJobId={cancelingJobId}
        shouldShowRerunRecordsTable={shouldShowRerunRecordsTableInRerunModal}
        rerunning={rerunning}
        onCancel={closeRerunModal}
        onSwitchAccount={() => {
          handleOperatorLogout();
          closeRerunModal();
          setAccessModalOpen(true);
        }}
        onConfirmRerun={() => {
          void handleConfirmRerun();
        }}
        nodeStatuses={rerunNodes}
        nodeStatusesLoading={rerunNodesLoading}
        nodeStatusesError={rerunNodesError}
        selectedNodeKey={selectedRerunNodeKey}
        onSelectNode={(nodeKey) => {
          setSelectedRerunNodeKey(nodeKey);
          setLoginError('');
        }}
        rerunRecordsExpanded={rerunRecordsExpanded}
        onToggleRerunRecords={() => {
          setRerunRecordsExpanded((prev) => !prev);
        }}
        canCancelRecord={(record) =>
          !!operatorUser &&
          canOperateJob(operatorUser, rerunModal.job) &&
          isActiveRerunJob(record) &&
          !cancelingJobId
        }
        onCancelRecord={(record) => {
          void handleCancelJob(record);
        }}
      />

      <RepoRerunRecordsModal
        open={rerunRecordsModal.open}
        repo={rerunRecordsTargetRepo}
        hardware={rerunRecordsHardware}
        operatorUser={operatorUser}
        canCurrentUserOperate={canOperateJob(
          operatorUser,
          rerunRecordsModal.job
        )}
        rerunRecords={rerunRecords}
        rerunRecordsLoading={rerunRecordsLoading}
        rerunRecordsError={rerunRecordsError}
        cancelingJobId={cancelingJobId}
        nodeStatuses={rerunNodes}
        nodeStatusesLoading={rerunNodesLoading}
        nodeStatusesError={rerunNodesError}
        rerunRecordsExpanded={rerunRecordsModalExpanded}
        onToggleRerunRecords={() => {
          setRerunRecordsModalExpanded((prev) => !prev);
        }}
        authSubmitting={authSubmitting}
        authChecking={authChecking}
        loginError={loginError}
        loginUsername={loginForm.username}
        loginPassword={loginForm.password}
        onLoginUsernameChange={(value) =>
          setLoginForm((prev) => ({ ...prev, username: value }))
        }
        onLoginPasswordChange={(value) =>
          setLoginForm((prev) => ({ ...prev, password: value }))
        }
        onClose={closeRerunRecordsModal}
        onLogout={handleOperatorLogout}
        onLogin={() => {
          void handleOperatorLogin();
        }}
        canCancelRecord={(record) =>
          !!operatorUser &&
          canOperateJob(operatorUser, rerunRecordsModal.job) &&
          isActiveRerunJob(record) &&
          !cancelingJobId
        }
        onCancelRecord={(record) => {
          void handleCancelJob(record);
        }}
      />

      <OperatorAccessModal
        open={accessModalOpen}
        title="任务管理访问校验"
        operatorUser={operatorUser}
        authSubmitting={authSubmitting}
        authChecking={authChecking}
        loginError={loginError}
        loginUsername={loginForm.username}
        loginPassword={loginForm.password}
        repoOptions={registerRepoOptions}
        onLoginUsernameChange={(value) =>
          setLoginForm((prev) => ({ ...prev, username: value }))
        }
        onLoginPasswordChange={(value) =>
          setLoginForm((prev) => ({ ...prev, password: value }))
        }
        onCancel={() => {
          setAccessModalOpen(false);
          setLoginError('');
        }}
        onLogin={() => {
          void handleEnterManagement();
        }}
        onRegister={(values) => {
          void handleOperatorRegister(values);
        }}
        onLogout={handleOperatorLogout}
        onConfirm={() => {
          void handleEnterManagement();
        }}
      />
    </div>
  );
};

export default TaskManagementPage;
