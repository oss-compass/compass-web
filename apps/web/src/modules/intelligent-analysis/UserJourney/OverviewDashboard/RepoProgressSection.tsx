import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Button,
  Grid,
  Input,
  Modal,
  Segmented,
  Select,
  Table,
  Tag,
  Typography,
  message,
} from 'antd';
import { CheckOutlined, FilterFilled, RightOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { SEVERITY_CFG } from './constants';
import {
  getDevxNodeKey,
  isActiveRerunJob,
  RerunActionButton,
  RepoRerunModal,
  RepoRerunRecordsModal,
} from './RepoRerunComponents';
import { IssueProgressBar } from './ProgressComponents';
import CapabilityBenchmarkModal from './CapabilityBenchmarkModal';
import CloseRateTrendModal from './CloseRateTrendModal';
import ScoreTrendModal from './ScoreTrendModal';
import { CloseRateSparkline, ScoreSparkline } from './CloseRateTrendChart';
import { buildCloseRateTrend } from './closeRateTrend';
import type { CloseRateTrendPoint } from './closeRateTrend';
import {
  buildScoreTrend,
  buildSuccessRateTrend,
  buildTeamScoreTrend,
  buildTeamSuccessRateTrend,
} from './scoreTrend';
import type { ScoreTrendPoint } from './scoreTrend';
import type {
  DashboardIssue,
  IssueBucket,
  MetricSummary,
  ProgressTab,
  ProgressView,
  RepoProgressRow,
  RepoSortKey,
  Severity,
  TeamProgressRow,
  TeamSortKey,
} from './types';
import {
  cancelOverviewRepoRerun,
  changeCompassOperatorPassword,
  clearCompassOperatorToken,
  compassApiUrl,
  fetchCompassOperatorMe,
  fetchOverviewRepoRerunRecords,
  fetchOverviewRerunNodes,
  fetchOverviewRepoRerunStatuses,
  getCompassOperatorToken,
  loginCompassOperator,
  setCompassOperatorToken,
  triggerOverviewRepoRerun,
} from '../rawData/apiClient';
import type {
  CompassOperatorUser,
  DevxNodeStatus,
  RepoRerunJob,
} from '../rawData/apiClient';
import {
  buildMetricSummaryFromPainRows,
  compareTeamNames,
  formatExecutionTime,
  formatPercent,
  formatScore,
  getReportDisplayText,
  normalizeHardwareEnv,
  normalizeSeverity,
  toSuccessRate,
} from './utils';

const { Link, Title } = Typography;
type ProgressMetricSortKey = 'none' | 'pending' | 'inProgress' | 'resolved';
type ProgressMetricSortOrder = 'asc' | 'desc';

type KnownSeverity = Exclude<Severity, ''>;

const SEVERITY_ORDER: KnownSeverity[] = [
  'P0_BLOCKER',
  'P1_CRITICAL',
  'P2_MAJOR',
  'P3_MINOR',
];

const BEAT_REPO_IDS = new Set([
  'cann_atvoss',
  'cann_ops_tensor',
  'cann_ops_rand',
  'cann_ops_fft',
  'cann_ops_collections',
]);

const normalizeRepoId = (value: unknown) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/-/g, '_');

const isBeatRepo = (value: unknown) =>
  BEAT_REPO_IDS.has(normalizeRepoId(value));

const getPreferredRerunNodeKey = (nodes: DevxNodeStatus[]) => {
  const preferredIndex = nodes.findIndex(
    (node) => normalizeHardwareEnv(node.hardware) === 'ascend-910c'
  );
  const index = preferredIndex >= 0 ? preferredIndex : 0;
  const targetNode = nodes[index];
  return targetNode ? getDevxNodeKey(targetNode, index) : '';
};

const getProjectKeyAliases = (projectKey: string) => {
  const key = String(projectKey || '')
    .trim()
    .toLowerCase()
    .replace(/-/g, '_');
  if (!key) return new Set<string>();
  const aliases = new Set<string>([key]);
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

const compareBeatLast = (leftId: unknown, rightId: unknown) => {
  const leftBeat = isBeatRepo(leftId);
  const rightBeat = isBeatRepo(rightId);
  if (leftBeat === rightBeat) return 0;
  return leftBeat ? 1 : -1;
};

const PROGRESS_METRIC_OPTIONS: Array<{
  value: ProgressMetricSortKey;
  label: string;
}> = [
  { value: 'none', label: '不排序（默认）' },
  { value: 'pending', label: '待处理' },
  { value: 'inProgress', label: '进行中' },
  { value: 'resolved', label: '已闭环' },
];

const PROGRESS_ORDER_OPTIONS: Array<{
  value: ProgressMetricSortOrder;
  label: string;
}> = [
  { value: 'asc', label: '升序' },
  { value: 'desc', label: '降序' },
];

const PROGRESS_LABEL_MAP: Record<
  Exclude<ProgressMetricSortKey, 'none'>,
  string
> = {
  pending: '待处理',
  inProgress: '进行中',
  resolved: '已闭环',
};

type ProgressSortHeaderProps = {
  sortKey: ProgressMetricSortKey;
  sortOrder: ProgressMetricSortOrder;
  onSortKeyChange: (next: ProgressMetricSortKey) => void;
  onSortOrderChange: (next: ProgressMetricSortOrder) => void;
};

const ProgressSortHeader: React.FC<ProgressSortHeaderProps> = ({
  sortKey,
  sortOrder,
  onSortKeyChange,
  onSortOrderChange,
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    const handleDocClick = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleDocClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleDocClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const titleSuffix =
    sortKey === 'none'
      ? '设置排序'
      : `已按${PROGRESS_LABEL_MAP[sortKey]}${
          sortOrder === 'asc' ? '正序' : '逆序'
        }排序`;

  return (
    <span
      ref={wrapperRef}
      className="inline-flex items-center gap-1"
      style={{ position: 'relative' }}
      onClick={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
    >
      <span>问题处理进展</span>
      <button
        type="button"
        aria-label="设置问题处理进展排序"
        title={titleSuffix}
        className={`inline-flex h-5 w-5 items-center justify-center rounded transition-colors ${
          sortKey !== 'none'
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
      {open ? (
        <div
          className="rounded-lg border border-slate-200 bg-white p-3 shadow-lg"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            right: 0,
            zIndex: 1050,
            width: 220,
          }}
          onClick={(event) => event.stopPropagation()}
          onMouseDown={(event) => event.stopPropagation()}
        >
          <div className="mb-2 text-xs font-semibold text-slate-500">
            排序指标
          </div>
          <div className="flex flex-col gap-1">
            {PROGRESS_METRIC_OPTIONS.map((option) => {
              const active = sortKey === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                    active
                      ? 'border-blue-200 bg-blue-50 text-blue-700'
                      : 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                  onClick={(event) => {
                    event.stopPropagation();
                    onSortKeyChange(option.value);
                  }}
                >
                  <span>{option.label}</span>
                  {active ? <CheckOutlined className="text-xs" /> : null}
                </button>
              );
            })}
          </div>
          <div className="mb-2 mt-3 text-xs font-semibold text-slate-500">
            排序方向
          </div>
          <div className="grid grid-cols-2 gap-2">
            {PROGRESS_ORDER_OPTIONS.map((option) => {
              const active = sortOrder === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  className={`flex items-center justify-center rounded-md border px-3 py-2 text-sm transition-colors ${
                    active
                      ? 'border-blue-200 bg-blue-50 text-blue-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                  onClick={(event) => {
                    event.stopPropagation();
                    onSortOrderChange(option.value);
                  }}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </span>
  );
};

type RepoProgressSectionProps = {
  progressView: ProgressView;
  onProgressViewChange: (view: ProgressView) => void;
  currentTab: ProgressTab;
  onTabChange: (tab: ProgressTab) => void;
  hideBeatRepos?: boolean;
  autoExpandAllTeams?: boolean;
  org?: string;
  commonOnly?: boolean | null;
  repoFilter: string;
  repoOptions: Array<{ value: string; label: string }>;
  onRepoFilterChange: (repo: string) => void;
  teamFilter: string;
  teamOptions: string[];
  onTeamFilterChange: (team: string) => void;
  hardwareEnvFilter: string;
  hardwareEnvOptions: string[];
  onHardwareEnvFilterChange: (hardwareEnv: string) => void;
  isLoading: boolean;
  teamRows: TeamProgressRow[];
  repoRows: RepoProgressRow[];
  repoSortKey: RepoSortKey;
  repoSortAsc: boolean;
  repoSortArrow: (key: RepoSortKey) => string;
  teamSortArrow: (key: TeamSortKey) => string;
  teamSortKey: TeamSortKey;
  teamSortAsc: boolean;
  onRepoSort: (key: RepoSortKey) => void;
  onTeamSort: (key: TeamSortKey) => void;
  onOpenRepoIssues: (
    row: RepoProgressRow,
    bucket: 'pending' | 'inProgress' | 'resolved' | 'na' | 'total'
  ) => void;
  onOpenTeamIssues: (
    row: TeamProgressRow,
    bucket: IssueBucket | 'total'
  ) => void;
};

const RepoProgressSection: React.FC<RepoProgressSectionProps> = ({
  progressView,
  onProgressViewChange,
  currentTab,
  onTabChange: _onTabChange,
  hideBeatRepos = false,
  autoExpandAllTeams = false,
  org,
  commonOnly,
  repoFilter,
  repoOptions,
  onRepoFilterChange,
  teamFilter,
  teamOptions,
  onTeamFilterChange,
  hardwareEnvFilter,
  hardwareEnvOptions,
  onHardwareEnvFilterChange,
  isLoading,
  teamRows,
  repoRows,
  repoSortKey,
  repoSortAsc,
  repoSortArrow,
  teamSortArrow,
  teamSortKey,
  teamSortAsc,
  onRepoSort,
  onTeamSort,
  onOpenRepoIssues,
  onOpenTeamIssues,
}) => {
  const screens = Grid.useBreakpoint();
  const isCompactTable = !screens.xl;
  const showActionColumn = true;
  const repoWidthScale = screens.xxl
    ? 1
    : screens.xl
    ? 0.92
    : screens.lg
    ? 0.86
    : 0.78;
  const rw = (base: number, min: number) =>
    Math.max(min, Math.round(base * repoWidthScale));
  const repoColumnWidths = useMemo<number[]>(
    () =>
      isCompactTable
        ? [
            rw(36, 28),
            rw(72, 62),
            rw(52, 44),
            rw(88, 74),
            rw(62, 54),
            rw(62, 54),
            rw(132, 112),
            rw(36, 28),
            rw(70, 58),
            rw(68, 56),
            rw(76, 64),
            rw(58, 50),
          ]
        : [
            rw(40, 30),
            rw(80, 70),
            rw(60, 50),
            rw(96, 84),
            rw(70, 60),
            rw(70, 60),
            rw(160, 140),
            rw(40, 30),
            rw(80, 70),
            rw(86, 72),
            rw(100, 86),
            rw(72, 64),
          ],
    [isCompactTable, repoWidthScale]
  );
  const repoScrollX = repoColumnWidths.reduce((sum, w) => sum + w, 0);
  const teamColumnWidths = useMemo<number[]>(
    () =>
      isCompactTable
        ? [
            rw(36, 28),
            rw(72, 62),
            rw(52, 44),
            rw(88, 74),
            rw(62, 54),
            rw(62, 54),
            rw(132, 112),
            rw(36, 28),
            rw(70, 58),
            rw(68, 56),
            rw(76, 64),
            rw(58, 50),
          ]
        : [
            rw(40, 30),
            rw(80, 70),
            rw(60, 50),
            rw(96, 84),
            rw(70, 60),
            rw(70, 60),
            rw(160, 140),
            rw(40, 30),
            rw(80, 70),
            rw(86, 72),
            rw(100, 86),
            rw(72, 64),
          ],
    [isCompactTable, repoWidthScale]
  );
  const teamScrollX = teamColumnWidths.reduce((sum, w) => sum + w, 0);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const [progressSortKey, setProgressSortKey] =
    useState<ProgressMetricSortKey>('none');
  const [progressSortOrder, setProgressSortOrder] =
    useState<ProgressMetricSortOrder>('desc');
  const [closeRateModal, setCloseRateModal] = useState<{
    open: boolean;
    title: string;
    points: CloseRateTrendPoint[];
  }>({ open: false, title: '', points: [] });
  const [scoreTrendModal, setScoreTrendModal] = useState<{
    open: boolean;
    title: string;
    points: ScoreTrendPoint[];
    legendLabel: string;
    axisTitle: string;
    tooltipLabel: string;
    valueType: 'score' | 'percent';
  }>({
    open: false,
    title: '',
    points: [],
    legendLabel: '综合体验评分',
    axisTitle: '综合体验评分',
    tooltipLabel: '周度评分',
    valueType: 'score',
  });

  const [severityFilters, setSeverityFilters] = useState<KnownSeverity[]>(() =>
    currentTab === 'key'
      ? ['P0_BLOCKER', 'P1_CRITICAL']
      : ['P0_BLOCKER', 'P1_CRITICAL', 'P2_MAJOR', 'P3_MINOR']
  );
  const [exportingCsv, setExportingCsv] = useState(false);
  const [messageApi, messageContextHolder] = message.useMessage();
  const [operatorUser, setOperatorUser] = useState<CompassOperatorUser | null>(
    null
  );
  const [authChecking, setAuthChecking] = useState(false);
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [rerunning, setRerunning] = useState(false);
  const [cancelingRerunJobId, setCancelingRerunJobId] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [changePasswordSubmitting, setChangePasswordSubmitting] =
    useState(false);
  const [changePasswordError, setChangePasswordError] = useState('');
  const [changePasswordForm, setChangePasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [rerunModal, setRerunModal] = useState<{
    open: boolean;
    repo: RepoProgressRow | null;
  }>({
    open: false,
    repo: null,
  });
  const [rerunStatusMap, setRerunStatusMap] = useState<
    Record<string, RepoRerunJob>
  >({});
  const [rerunStatusLoading, setRerunStatusLoading] = useState(false);
  const [rerunRecordsModal, setRerunRecordsModal] = useState<{
    open: boolean;
    repo: RepoProgressRow | null;
  }>({
    open: false,
    repo: null,
  });
  const [rerunRecordsLoading, setRerunRecordsLoading] = useState(false);
  const [rerunRecordsError, setRerunRecordsError] = useState('');
  const [rerunRecords, setRerunRecords] = useState<RepoRerunJob[]>([]);
  const [rerunNodes, setRerunNodes] = useState<DevxNodeStatus[]>([]);
  const [rerunNodesLoading, setRerunNodesLoading] = useState(false);
  const [rerunNodesError, setRerunNodesError] = useState('');
  const [selectedRerunNodeKey, setSelectedRerunNodeKey] = useState('');
  const [rerunRecordsExpanded, setRerunRecordsExpanded] = useState(false);
  const [rerunRecordsModalExpanded, setRerunRecordsModalExpanded] =
    useState(true);
  const [benchmarkModal, setBenchmarkModal] = useState<{
    open: boolean;
    repo: RepoProgressRow | null;
  }>({
    open: false,
    repo: null,
  });

  const loadOperatorUser = useCallback(async () => {
    const token = getCompassOperatorToken();
    if (!token) {
      setOperatorUser(null);
      return null;
    }
    setAuthChecking(true);
    try {
      const user = await fetchCompassOperatorMe(token);
      setOperatorUser(user);
      return user;
    } catch (_error) {
      clearCompassOperatorToken();
      setOperatorUser(null);
      return null;
    } finally {
      setAuthChecking(false);
    }
  }, []);

  useEffect(() => {
    void loadOperatorUser();
  }, [loadOperatorUser]);

  const canOperateRepo = useCallback(
    (user: CompassOperatorUser | null, row: RepoProgressRow | null) => {
      if (!user || !row || !user.enabled) return false;
      if (user.role === 'admin') return true;
      const repoKeys = new Set(
        (user.repo_keys || []).map((item) =>
          String(item || '')
            .trim()
            .toLowerCase()
            .replace(/-/g, '_')
        )
      );
      if (user.role === 'repo_owner') {
        for (const alias of Array.from(
          getProjectKeyAliases(String(row.id || ''))
        )) {
          if (repoKeys.has(alias)) return true;
        }
        return false;
      }
      return false;
    },
    []
  );

  const closeRerunModal = useCallback(() => {
    setRerunModal({ open: false, repo: null });
    setLoginError('');
    setSelectedRerunNodeKey('');
    setRerunRecordsExpanded(false);
    setLoginForm((prev) => ({ ...prev, password: '' }));
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
        if (result.items?.length) {
          setRerunStatusMap((prev) => ({
            ...prev,
            [projectKey]: result.items[0],
          }));
        }
      } catch (error) {
        if (!silent) {
          setRerunRecordsError(
            error instanceof Error ? error.message : '获取重跑记录失败'
          );
        }
      } finally {
        if (!silent) {
          setRerunRecordsLoading(false);
        }
      }
    },
    []
  );

  const openRerunModal = useCallback(
    async (row: RepoProgressRow) => {
      const currentJob = rerunStatusMap[row.id];
      setLoginError('');
      if (currentJob) {
        setRerunRecords([currentJob]);
        setRerunRecordsLoading(false);
      } else {
        setRerunRecords([]);
        setRerunRecordsLoading(true);
      }
      setRerunRecordsError('');
      setSelectedRerunNodeKey('');
      setRerunRecordsExpanded(false);
      setRerunModal({ open: true, repo: row });
      void loadRerunRecords(row.id, { silent: !!currentJob });
      if (getCompassOperatorToken() && !operatorUser) {
        await loadOperatorUser();
      }
    },
    [loadOperatorUser, loadRerunRecords, operatorUser, rerunStatusMap]
  );

  const handleOperatorLogin = useCallback(async () => {
    const username = loginForm.username.trim();
    const password = loginForm.password;
    if (!username || !password) {
      setLoginError('请输入账号和密码');
      return;
    }

    setAuthSubmitting(true);
    setLoginError('');
    try {
      const result = await loginCompassOperator({ username, password });
      setCompassOperatorToken(result.access_token);
      setOperatorUser(result.user);
      setLoginForm((prev) => ({ ...prev, password: '' }));
      messageApi.success(`已登录为 ${result.user.display_name}`);
    } catch (error) {
      setLoginError(
        error instanceof Error ? error.message : '登录失败，请稍后重试'
      );
    } finally {
      setAuthSubmitting(false);
    }
  }, [loginForm.password, loginForm.username, messageApi]);

  const handleOperatorLogout = useCallback(() => {
    clearCompassOperatorToken();
    setOperatorUser(null);
    setLoginError('');
    setChangePasswordModalOpen(false);
    setChangePasswordError('');
    setChangePasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setRerunNodes([]);
    setRerunNodesError('');
    setRerunNodesLoading(false);
    setSelectedRerunNodeKey('');
    setLoginForm((prev) => ({ ...prev, password: '' }));
  }, []);

  const closeChangePasswordModal = useCallback(() => {
    setChangePasswordModalOpen(false);
    setChangePasswordError('');
    setChangePasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  }, []);

  const handleChangePassword = useCallback(async () => {
    if (!operatorUser) {
      setChangePasswordError('请先登录后再修改密码');
      return;
    }
    const currentPassword = changePasswordForm.currentPassword;
    const newPassword = changePasswordForm.newPassword;
    const confirmPassword = changePasswordForm.confirmPassword;
    if (!currentPassword || !newPassword || !confirmPassword) {
      setChangePasswordError('请完整填写当前密码、新密码和确认密码');
      return;
    }
    if (newPassword !== confirmPassword) {
      setChangePasswordError('两次输入的新密码不一致');
      return;
    }

    setChangePasswordSubmitting(true);
    setChangePasswordError('');
    try {
      const result = await changeCompassOperatorPassword({
        current_password: currentPassword,
        new_password: newPassword,
      });
      setOperatorUser(result.user);
      messageApi.success(result.message || '密码修改成功');
      closeChangePasswordModal();
    } catch (error) {
      const text =
        error instanceof Error ? error.message : '修改密码失败，请稍后重试';
      if (/token|未登录|过期/i.test(text)) {
        clearCompassOperatorToken();
        setOperatorUser(null);
        setChangePasswordModalOpen(false);
      }
      setChangePasswordError(text);
    } finally {
      setChangePasswordSubmitting(false);
    }
  }, [
    changePasswordForm.confirmPassword,
    changePasswordForm.currentPassword,
    changePasswordForm.newPassword,
    closeChangePasswordModal,
    messageApi,
    operatorUser,
  ]);

  useEffect(() => {
    const shouldLoadRerunNodes =
      (rerunModal.open || rerunRecordsModal.open) && !!operatorUser;
    if (!shouldLoadRerunNodes) {
      setRerunNodes([]);
      setRerunNodesError('');
      setRerunNodesLoading(false);
      return undefined;
    }

    let alive = true;
    setRerunNodesLoading(true);
    setRerunNodesError('');
    void fetchOverviewRerunNodes()
      .then((result) => {
        if (!alive) return;
        setRerunNodes(result.items || []);
      })
      .catch((error) => {
        if (!alive) return;
        const text =
          error instanceof Error ? error.message : '获取节点状态失败';
        if (/token|未登录|过期/i.test(text)) {
          clearCompassOperatorToken();
          setOperatorUser(null);
        }
        setRerunNodesError(text);
      })
      .finally(() => {
        if (alive) setRerunNodesLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [operatorUser, rerunModal.open, rerunRecordsModal.open]);

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

  const handleConfirmRerun = useCallback(async () => {
    if (!rerunModal.repo) return;
    if (!operatorUser) {
      setLoginError('请先登录后再操作');
      return;
    }
    if (!canOperateRepo(operatorUser, rerunModal.repo)) {
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
      const result = await triggerOverviewRepoRerun(rerunModal.repo.id, {
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
      const repoId = rerunModal.repo.id;
      const targetRepo = rerunModal.repo;
      setRerunStatusMap((prev) => ({
        ...prev,
        [repoId]: result.data,
      }));
      setRerunRecords([result.data]);
      setRerunRecordsError('');
      setRerunRecordsLoading(false);
      messageApi.success(result.message || '已触发重跑');
      closeRerunModal();
      setRerunRecordsModal({ open: true, repo: targetRepo });
      void loadRerunRecords(repoId);
    } catch (error) {
      const text =
        error instanceof Error ? error.message : '重跑失败，请稍后重试';
      if (/token|未登录|过期/i.test(text)) {
        clearCompassOperatorToken();
        setOperatorUser(null);
      }
      setLoginError(text);
    } finally {
      setRerunning(false);
    }
  }, [
    canOperateRepo,
    closeRerunModal,
    loadRerunRecords,
    messageApi,
    operatorUser,
    rerunModal.repo,
    rerunNodes,
    rerunNodesLoading,
    selectedRerunNodeKey,
  ]);

  const handleCancelRerunJob = useCallback(
    async (repo: RepoProgressRow | null, job: RepoRerunJob) => {
      if (!repo) return;
      if (!operatorUser) {
        setLoginError('请先登录后再操作');
        return;
      }
      if (!canOperateRepo(operatorUser, repo)) {
        messageApi.error('当前账号无权操作该仓库');
        return;
      }
      if (!isActiveRerunJob(job)) {
        messageApi.warning('仅排队中或运行中的任务支持撤销');
        return;
      }

      setCancelingRerunJobId(job.job_id);
      setLoginError('');
      try {
        const result = await cancelOverviewRepoRerun(repo.id, job.job_id);
        setRerunRecords((prev) =>
          prev.map((item) => (item.job_id === job.job_id ? result.data : item))
        );
        setRerunStatusMap((prev) => ({
          ...prev,
          [repo.id]:
            prev[repo.id]?.job_id === job.job_id || !prev[repo.id]
              ? result.data
              : prev[repo.id],
        }));
        setRerunRecordsError('');
        messageApi.success(result.message || '已撤销重跑任务');
        void loadRerunRecords(repo.id, { silent: true });
      } catch (error) {
        const text =
          error instanceof Error ? error.message : '撤销失败，请稍后重试';
        if (/token|未登录|过期/i.test(text)) {
          clearCompassOperatorToken();
          setOperatorUser(null);
        }
        setLoginError(text);
        messageApi.error(text);
      } finally {
        setCancelingRerunJobId('');
      }
    },
    [canOperateRepo, loadRerunRecords, messageApi, operatorUser]
  );

  const closeRerunRecordsModal = useCallback(() => {
    setRerunRecordsModal({ open: false, repo: null });
    setRerunRecords([]);
    setRerunRecordsError('');
    setRerunRecordsModalExpanded(true);
  }, []);

  const openRerunRecordsModal = useCallback(
    async (row: RepoProgressRow) => {
      const currentJob = rerunStatusMap[row.id];
      if (currentJob) {
        setRerunRecords([currentJob]);
        setRerunRecordsError('');
        setRerunRecordsLoading(false);
      } else {
        setRerunRecords([]);
        setRerunRecordsLoading(true);
      }
      setRerunRecordsModalExpanded(true);
      setRerunRecordsModal({ open: true, repo: row });
      if (getCompassOperatorToken() && !operatorUser) {
        await loadOperatorUser();
      }
      await loadRerunRecords(row.id);
    },
    [loadOperatorUser, loadRerunRecords, operatorUser, rerunStatusMap]
  );

  const severityFilterSet = useMemo(
    () => new Set(severityFilters),
    [severityFilters]
  );

  const getFilteredIssues = useCallback(
    (issues: DashboardIssue[]) => {
      if (!severityFilters.length) return issues;
      return issues.filter((issue) =>
        severityFilterSet.has(
          normalizeSeverity(issue.severity) as KnownSeverity
        )
      );
    },
    [severityFilterSet, severityFilters.length]
  );

  const repoDerived = useMemo(() => {
    const map = new Map<
      string,
      {
        issues: DashboardIssue[];
        metrics: MetricSummary;
        trend: CloseRateTrendPoint[];
        scoreTrend: ScoreTrendPoint[];
        successRateTrend: ScoreTrendPoint[];
      }
    >();
    repoRows.forEach((row) => {
      const issues = getFilteredIssues(row.issues);
      map.set(row.id, {
        issues,
        metrics: buildMetricSummaryFromPainRows(issues),
        trend: buildCloseRateTrend(issues, 7),
        scoreTrend: buildScoreTrend(row.scoreHistory, 7),
        successRateTrend: buildSuccessRateTrend(row.scoreHistory, 7),
      });
    });
    return map;
  }, [getFilteredIssues, repoRows]);

  const teamDerived = useMemo(() => {
    const map = new Map<
      string,
      {
        issues: DashboardIssue[];
        metrics: MetricSummary;
        trend: CloseRateTrendPoint[];
        scoreTrend: ScoreTrendPoint[];
        successRateTrend: ScoreTrendPoint[];
      }
    >();
    teamRows.forEach((row) => {
      const issues = getFilteredIssues(row.issues);
      map.set(row.id, {
        issues,
        metrics: buildMetricSummaryFromPainRows(issues),
        trend: buildCloseRateTrend(issues, 7),
        scoreTrend: buildTeamScoreTrend(row.repos, 7),
        successRateTrend: buildTeamSuccessRateTrend(row.repos, 7),
      });
    });
    return map;
  }, [getFilteredIssues, teamRows]);

  const sortedByProgressMetric = useCallback(
    <T extends RepoProgressRow | TeamProgressRow>(rows: T[]) => {
      if (progressSortKey === 'none') return rows;
      const direction = progressSortOrder === 'asc' ? 1 : -1;
      return [...rows].sort((left, right) => {
        if (!('repos' in left) && !('repos' in right)) {
          const beatCmp = compareBeatLast(left.id, right.id);
          if (beatCmp !== 0) return beatCmp;
        }

        const leftMetrics =
          ('repos' in left ? teamDerived : repoDerived).get(left.id)?.metrics ??
          buildMetricSummaryFromPainRows(getFilteredIssues(left.issues));
        const rightMetrics =
          ('repos' in right ? teamDerived : repoDerived).get(right.id)
            ?.metrics ??
          buildMetricSummaryFromPainRows(getFilteredIssues(right.issues));

        const leftValue = leftMetrics[progressSortKey] ?? 0;
        const rightValue = rightMetrics[progressSortKey] ?? 0;
        if (leftValue !== rightValue) {
          return (leftValue - rightValue) * direction;
        }
        return String(left.name || '').localeCompare(
          String(right.name || ''),
          'zh-Hans-CN',
          {
            sensitivity: 'base',
          }
        );
      });
    },
    [
      getFilteredIssues,
      progressSortKey,
      progressSortOrder,
      repoDerived,
      teamDerived,
    ]
  );

  const handleRepoSortWithReset = useCallback(
    (key: RepoSortKey) => {
      setProgressSortKey('none');
      onRepoSort(key);
    },
    [onRepoSort]
  );

  const handleTeamSortWithReset = useCallback(
    (key: TeamSortKey) => {
      setProgressSortKey('none');
      onTeamSort(key);
    },
    [onTeamSort]
  );

  const progressHeaderTitle = (
    <ProgressSortHeader
      sortKey={progressSortKey}
      sortOrder={progressSortOrder}
      onSortKeyChange={setProgressSortKey}
      onSortOrderChange={setProgressSortOrder}
    />
  );

  const getMetricTrendPoints = useCallback(
    (value: number | null, points?: ScoreTrendPoint[]) => {
      if (points?.length) {
        if (value == null) return points;
        const lastPoint = points[points.length - 1];
        if (lastPoint?.score === value) return points;
        return [
          ...points.slice(0, -1),
          {
            ...lastPoint,
            score: value,
          },
        ];
      }
      if (value == null) return [];
      return [
        {
          key: 'current',
          date: '当前',
          label: '当前',
          score: value,
        },
      ];
    },
    []
  );

  const renderMetricTrendCell = useCallback(
    (
      name: string,
      value: number | null,
      points: ScoreTrendPoint[] | undefined,
      valueFormatter: (next: number | null) => string,
      modalTitle: string,
      legendLabel: string,
      axisTitle: string,
      tooltipLabel: string,
      valueType: 'score' | 'percent'
    ) => {
      const trendPoints = getMetricTrendPoints(value, points);
      const sparkValues = trendPoints.slice(-5).map((point) => point.score);
      return (
        <div className="overview-close-rate-cell">
          <button
            type="button"
            className="inline-flex items-center rounded-md p-1 transition-colors hover:bg-slate-50"
            title={modalTitle}
            disabled={!trendPoints.length}
            onClick={(event) => {
              event.stopPropagation();
              if (!trendPoints.length) return;
              setScoreTrendModal({
                open: true,
                title: `${name} · ${modalTitle}`,
                points: trendPoints,
                legendLabel,
                axisTitle,
                tooltipLabel,
                valueType,
              });
            }}
          >
            <ScoreSparkline values={sparkValues} />
          </button>
          <span className="overview-close-rate-value text-sm font-semibold text-slate-700">
            {valueFormatter(value)}
          </span>
        </div>
      );
    },
    [getMetricTrendPoints]
  );

  const renderScoreTrendCell = useCallback(
    (name: string, score: number | null, points?: ScoreTrendPoint[]) =>
      renderMetricTrendCell(
        name,
        score,
        points,
        formatScore,
        '综合体验评分趋势',
        '综合体验评分',
        '综合体验评分',
        '周度评分',
        'score'
      ),
    [renderMetricTrendCell]
  );

  const renderSuccessRateTrendCell = useCallback(
    (
      name: string,
      successRate: number | null,
      points?: ScoreTrendPoint[],
      fallbackScore?: number | null
    ) =>
      renderMetricTrendCell(
        name,
        successRate ?? toSuccessRate(fallbackScore ?? null),
        points,
        formatPercent,
        '端到端成功率趋势',
        '端到端成功率',
        '端到端成功率',
        '周度成功率',
        'percent'
      ),
    [renderMetricTrendCell]
  );

  const renderDetailLink = (record: RepoProgressRow) => {
    const fileKey = record.latestReportId;
    const reportUrl = fileKey
      ? `/intelligent-analysis/community-experience?project=${encodeURIComponent(
          fileKey
        )}`
      : '';
    const displayText = getReportDisplayText(fileKey);

    return fileKey ? (
      <Link href={reportUrl} className="overview-table-link">
        {displayText}
      </Link>
    ) : (
      <span className="text-slate-300">--</span>
    );
  };

  const renderBenchmarkTag = useCallback((record: RepoProgressRow) => {
    if (!record.benchmark?.repoName) return null;
    return (
      <Tag
        color="purple"
        className="overview-benchmark-tag"
        onClick={(event) => {
          event.stopPropagation();
          setBenchmarkModal({ open: true, repo: record });
        }}
      >
        竞品
      </Tag>
    );
  }, []);

  const renderRerunAction = useCallback(
    (record: RepoProgressRow) => {
      const job = rerunStatusMap[record.id];
      return (
        <RerunActionButton
          job={job}
          loading={rerunStatusLoading && !job}
          onOpenRecords={() => {
            void openRerunRecordsModal(record);
          }}
          onOpenRerun={() => {
            void openRerunModal(record);
          }}
        />
      );
    },
    [openRerunModal, openRerunRecordsModal, rerunStatusLoading, rerunStatusMap]
  );

  const sortableTitle = (
    label: string,
    arrow: string,
    align: 'left' | 'center' = 'center'
  ) => (
    <span
      className={`sortable-col-title ${
        align === 'left' ? 'sortable-col-title-left' : ''
      }`}
    >
      {label}
      <span className="sort-arrow">{arrow}</span>
    </span>
  );

  const repoColumns = useMemo<TableProps<RepoProgressRow>['columns']>(
    () => [
      {
        title: '序号',
        key: 'index',
        width: repoColumnWidths[0],
        render: (_value, _record, index) => (
          <span className="row-num">{index + 1}</span>
        ),
      },
      {
        title: sortableTitle('仓库', repoSortArrow('name')),
        dataIndex: 'name',
        key: 'name',
        width: repoColumnWidths[1],
        ellipsis: true,
        render: (value, record) => (
          <span className="overview-repo-name-cell">
            <span>{value}</span>
            {renderBenchmarkTag(record)}
            {isBeatRepo(record.id) ? (
              <span className="text-slate-400">(仅支持950，内测中)</span>
            ) : null}
          </span>
        ),
        onHeaderCell: () => ({
          onClick: () => handleRepoSortWithReset('name'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('责任团队', repoSortArrow('team'), 'left'),
        dataIndex: 'team',
        key: 'team',
        width: repoColumnWidths[2],
        align: 'left',
        ellipsis: true,
        onHeaderCell: () => ({
          onClick: () => handleRepoSortWithReset('team'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('综合体验评分', repoSortArrow('score')),
        key: 'score',
        width: repoColumnWidths[3],
        render: (_value, record) => {
          if (isBeatRepo(record.id)) {
            return <span className="text-slate-400">-</span>;
          }
          const scoreTrend = repoDerived.get(record.id)?.scoreTrend;
          return renderScoreTrendCell(record.name, record.score, scoreTrend);
        },
        onHeaderCell: () => ({
          onClick: () => handleRepoSortWithReset('score'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('端到端成功率', repoSortArrow('successRate')),
        key: 'successRate',
        width: repoColumnWidths[4],
        render: (_value, record) => {
          if (isBeatRepo(record.id)) {
            return <span className="text-slate-400">-</span>;
          }
          const successRateTrend = repoDerived.get(record.id)?.successRateTrend;
          return renderSuccessRateTrendCell(
            record.name,
            record.successRate,
            successRateTrend,
            record.score
          );
        },
        onHeaderCell: () => ({
          onClick: () => handleRepoSortWithReset('successRate'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('开发者旅程耗时', repoSortArrow('executionTime')),
        key: 'executionTime',
        width: repoColumnWidths[5],
        render: (_value, record) =>
          isBeatRepo(record.id) ? (
            <span className="text-slate-400">-</span>
          ) : (
            formatExecutionTime(record.executionTime)
          ),
        onHeaderCell: () => ({
          onClick: () => handleRepoSortWithReset('executionTime'),
          className: 'sortable-col',
        }),
      },
      {
        title: progressHeaderTitle,
        key: 'progress',
        width: repoColumnWidths[6],
        render: (_value, record) => {
          if (isBeatRepo(record.id)) {
            return <span className="text-slate-400">-</span>;
          }
          const derived = repoDerived.get(record.id);
          const metrics = derived?.metrics ?? record.overall;
          const rowForModal = derived
            ? ({ ...record, issues: derived.issues } as RepoProgressRow)
            : record;
          return (
            <IssueProgressBar
              pending={metrics.pending}
              inProgress={metrics.inProgress}
              resolved={metrics.resolved}
              onBucketClick={(bucket) => onOpenRepoIssues(rowForModal, bucket)}
            />
          );
        },
      },
      {
        title: sortableTitle('总问题数', repoSortArrow('total')),
        key: 'total',
        width: repoColumnWidths[7],
        render: (_value, record) => {
          if (isBeatRepo(record.id)) {
            return <span className="text-slate-400">-</span>;
          }
          const derived = repoDerived.get(record.id);
          const metrics = derived?.metrics ?? record.overall;
          const rowForModal = derived
            ? ({ ...record, issues: derived.issues } as RepoProgressRow)
            : record;
          return (
            <button
              type="button"
              className="overview-table-link overview-table-link-strong"
              onClick={() => onOpenRepoIssues(rowForModal, 'total')}
            >
              {metrics.total}
            </button>
          );
        },
        onHeaderCell: () => ({
          onClick: () => handleRepoSortWithReset('total'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('闭环率', repoSortArrow('closeRate')),
        key: 'closeRate',
        width: repoColumnWidths[8],
        render: (_value, record) => {
          if (isBeatRepo(record.id)) {
            return <span className="text-slate-400">-</span>;
          }
          const derived = repoDerived.get(record.id);
          const metrics = derived?.metrics ?? record.overall;
          const trendPoints =
            derived?.trend ?? buildCloseRateTrend(record.issues, 7);
          const displayRate = metrics.total === 0 ? 100 : metrics.closeRate;
          const sparkValues =
            metrics.total === 0
              ? Array.from({ length: 5 }, () => 100)
              : trendPoints.slice(-5).map((point) => point.closeRate);
          return (
            <div className="overview-close-rate-cell">
              <button
                type="button"
                className="inline-flex items-center rounded-md transition-colors hover:bg-slate-50"
                title="查看闭环率趋势"
                onClick={(event) => {
                  event.stopPropagation();
                  const modalPoints =
                    metrics.total === 0
                      ? trendPoints.map((point) => ({
                          ...point,
                          closeRate: point.total === 0 ? 100 : point.closeRate,
                        }))
                      : trendPoints;
                  setCloseRateModal({
                    open: true,
                    title: `${record.name} · 闭环率趋势`,
                    points: modalPoints,
                  });
                }}
              >
                <CloseRateSparkline values={sparkValues} />
              </button>
              <span className="overview-close-rate-value text-sm font-semibold text-slate-700">
                {formatPercent(displayRate)}
              </span>
            </div>
          );
        },
        onHeaderCell: () => ({
          onClick: () => handleRepoSortWithReset('closeRate'),
          className: 'sortable-col',
        }),
      },
      {
        title: '硬件环境',
        dataIndex: 'hardwareEnv',
        key: 'hardwareEnv',
        width: repoColumnWidths[9],
        ellipsis: true,
        render: (value, record) =>
          isBeatRepo(record.id) ? (
            <span className="text-slate-400">-</span>
          ) : (
            value || '-'
          ),
      },
      {
        title: sortableTitle('详细报告', repoSortArrow('detail')),
        key: 'detail',
        width: repoColumnWidths[10],
        render: (_value, record) => renderDetailLink(record),
        onHeaderCell: () => ({
          onClick: () => handleRepoSortWithReset('detail'),
          className: 'sortable-col',
        }),
      },
      {
        title: '操作',
        key: 'actions',
        width: repoColumnWidths[11],
        render: (_value, record) => renderRerunAction(record),
      },
    ],
    [
      repoColumnWidths,
      onOpenRepoIssues,
      handleRepoSortWithReset,
      repoSortArrow,
      progressHeaderTitle,
      repoDerived,
      renderRerunAction,
      renderBenchmarkTag,
      renderScoreTrendCell,
      renderSuccessRateTrendCell,
    ]
  );
  const visibleRepoColumns = useMemo(
    () =>
      (repoColumns || []).filter((column) =>
        showActionColumn ? true : column?.key !== 'actions'
      ),
    [repoColumns, showActionColumn]
  );
  const visibleRepoScrollX = useMemo(
    () =>
      showActionColumn
        ? repoScrollX
        : repoScrollX - (repoColumnWidths[11] ?? 0),
    [showActionColumn, repoColumnWidths, repoScrollX]
  );

  const teamColumns = useMemo<TableProps<TeamProgressRow>['columns']>(
    () => [
      {
        title: '序号',
        key: 'index',
        width: teamColumnWidths[0],
        render: (_value, _record, index) => (
          <span className="row-num">{index + 1}</span>
        ),
      },
      {
        title: sortableTitle('责任团队', teamSortArrow('name'), 'left'),
        dataIndex: 'name',
        key: 'name',
        width: teamColumnWidths[1],
        align: 'left',
        render: (value, record) => (
          <span className="overview-expand-label">
            <RightOutlined
              className={`overview-expand-icon ${
                expandedRowKeys.includes(record.id) ? 'is-expanded' : ''
              }`}
            />
            <span>{value}</span>
          </span>
        ),
        onHeaderCell: () => ({
          onClick: () => handleTeamSortWithReset('name'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('负责仓库', teamSortArrow('repoCount')),
        key: 'repoCount',
        width: teamColumnWidths[2],
        render: (_value, record) => {
          const count = hideBeatRepos
            ? (record.repos || []).filter((repo) => !isBeatRepo(repo.id)).length
            : record.repoCount;
          return `${count} 个`;
        },
        onHeaderCell: () => ({
          onClick: () => handleTeamSortWithReset('repoCount'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('综合体验评分', teamSortArrow('score')),
        key: 'score',
        width: teamColumnWidths[3],
        render: (_value, record) => {
          const scoreTrend = teamDerived.get(record.id)?.scoreTrend;
          return renderScoreTrendCell(record.name, record.score, scoreTrend);
        },
        onHeaderCell: () => ({
          onClick: () => handleTeamSortWithReset('score'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('端到端成功率', teamSortArrow('successRate')),
        key: 'successRate',
        width: teamColumnWidths[4],
        render: (_value, record) => {
          const successRateTrend = teamDerived.get(record.id)?.successRateTrend;
          return renderSuccessRateTrendCell(
            record.name,
            record.successRate,
            successRateTrend,
            record.score
          );
        },
        onHeaderCell: () => ({
          onClick: () => handleTeamSortWithReset('successRate'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('开发者旅程耗时', teamSortArrow('executionTime')),
        key: 'executionTime',
        width: teamColumnWidths[5],
        render: (_value, record) => formatExecutionTime(record.executionTime),
        onHeaderCell: () => ({
          onClick: () => handleTeamSortWithReset('executionTime'),
          className: 'sortable-col',
        }),
      },
      {
        title: progressHeaderTitle,
        key: 'progress',
        width: teamColumnWidths[6],
        render: (_value, record) => {
          const derived = teamDerived.get(record.id);
          const metrics = derived?.metrics ?? record.overall;
          const rowForModal = derived
            ? ({ ...record, issues: derived.issues } as TeamProgressRow)
            : record;
          return (
            <IssueProgressBar
              pending={metrics.pending}
              inProgress={metrics.inProgress}
              resolved={metrics.resolved}
              onBucketClick={(bucket) => onOpenTeamIssues(rowForModal, bucket)}
            />
          );
        },
      },
      {
        title: sortableTitle('总问题数', teamSortArrow('total')),
        key: 'total',
        width: teamColumnWidths[7],
        render: (_value, record) => {
          const derived = teamDerived.get(record.id);
          const metrics = derived?.metrics ?? record.overall;
          const rowForModal = derived
            ? ({ ...record, issues: derived.issues } as TeamProgressRow)
            : record;
          return (
            <button
              type="button"
              className="overview-table-link overview-table-link-strong"
              onClick={() => onOpenTeamIssues(rowForModal, 'total')}
            >
              {metrics.total}
            </button>
          );
        },
        onHeaderCell: () => ({
          onClick: () => handleTeamSortWithReset('total'),
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('闭环率', teamSortArrow('closeRate')),
        key: 'closeRate',
        width: teamColumnWidths[8],
        render: (_value, record) => {
          const derived = teamDerived.get(record.id);
          const metrics = derived?.metrics ?? record.overall;
          const trendPoints =
            derived?.trend ?? buildCloseRateTrend(record.issues, 7);
          const displayRate = metrics.total === 0 ? 100 : metrics.closeRate;
          const sparkValues =
            metrics.total === 0
              ? Array.from({ length: 5 }, () => 100)
              : trendPoints.slice(-5).map((point) => point.closeRate);
          return (
            <div className="overview-close-rate-cell">
              <button
                type="button"
                className="inline-flex items-center rounded-md p-1 transition-colors hover:bg-slate-50"
                title="查看闭环率趋势"
                onClick={(event) => {
                  event.stopPropagation();
                  const modalPoints =
                    metrics.total === 0
                      ? trendPoints.map((point) => ({
                          ...point,
                          closeRate: point.total === 0 ? 100 : point.closeRate,
                        }))
                      : trendPoints;
                  setCloseRateModal({
                    open: true,
                    title: `${record.name} · 闭环率趋势`,
                    points: modalPoints,
                  });
                }}
              >
                <CloseRateSparkline values={sparkValues} />
              </button>
              <span className="overview-close-rate-value text-sm font-semibold text-slate-700">
                {formatPercent(displayRate)}
              </span>
            </div>
          );
        },
        onHeaderCell: () => ({
          onClick: () => handleTeamSortWithReset('closeRate'),
          className: 'sortable-col',
        }),
      },
      {
        title: '硬件环境',
        key: 'hardwareEnv',
        width: teamColumnWidths[9],
        render: () => <span className="text-slate-400">-</span>,
      },
      {
        title: '最新报告',
        key: 'detail',
        width: teamColumnWidths[10],
        render: () => <span className="text-slate-400">-</span>,
      },
      {
        title: '操作',
        key: 'actions',
        width: teamColumnWidths[11],
        render: () => <span className="text-slate-400">-</span>,
      },
    ],
    [
      expandedRowKeys,
      teamColumnWidths,
      onOpenTeamIssues,
      handleTeamSortWithReset,
      teamSortArrow,
      progressHeaderTitle,
      teamDerived,
      renderScoreTrendCell,
      renderSuccessRateTrendCell,
    ]
  );
  const visibleTeamColumns = useMemo(
    () =>
      (teamColumns || []).filter((column) =>
        showActionColumn ? true : column?.key !== 'actions'
      ),
    [showActionColumn, teamColumns]
  );
  const visibleTeamScrollX = useMemo(
    () =>
      showActionColumn
        ? teamScrollX
        : teamScrollX - (teamColumnWidths[11] ?? 0),
    [showActionColumn, teamColumnWidths, teamScrollX]
  );

  const getRepoSortValueWithMetrics = useCallback(
    (row: RepoProgressRow, sortKey: RepoSortKey) => {
      const beat = isBeatRepo(row.id);
      const metrics = repoDerived.get(row.id)?.metrics ?? row.overall;
      switch (sortKey) {
        case 'name':
          return row.name;
        case 'team':
          return row.team;
        case 'score':
          return row.score ?? -1;
        case 'successRate':
          return row.successRate ?? -1;
        case 'executionTime':
          return row.executionTime ?? -1;
        case 'total':
          return beat ? -1 : metrics.total;
        case 'closeRate':
          return beat ? -1 : metrics.total === 0 ? 100 : metrics.closeRate;
        case 'detail':
          return getReportDisplayText(row.latestReportId);
        default:
          return row.name;
      }
    },
    [repoDerived]
  );

  const getTeamSortValueWithMetrics = useCallback(
    (row: TeamProgressRow, sortKey: TeamSortKey) => {
      const metrics = teamDerived.get(row.id)?.metrics ?? row.overall;
      switch (sortKey) {
        case 'name':
          return row.name;
        case 'repoCount':
          return row.repoCount;
        case 'score':
          return row.score ?? -1;
        case 'successRate':
          return row.successRate ?? -1;
        case 'executionTime':
          return row.executionTime ?? -1;
        case 'total':
          return metrics.total;
        case 'closeRate':
          return metrics.total === 0 ? 100 : metrics.closeRate;
        default:
          return row.name;
      }
    },
    [teamDerived]
  );

  const sortedRepoRowsBySortKey = useMemo(() => {
    const rows = [...repoRows];
    rows.sort((left, right) => {
      const beatCmp = compareBeatLast(left.id, right.id);
      if (beatCmp !== 0) return beatCmp;

      const a = getRepoSortValueWithMetrics(left, repoSortKey);
      const b = getRepoSortValueWithMetrics(right, repoSortKey);
      if (typeof a === 'string' && typeof b === 'string') {
        const result =
          repoSortKey === 'team'
            ? compareTeamNames(a, b) || left.name.localeCompare(right.name)
            : a.localeCompare(b);
        return repoSortAsc ? result : -result;
      }
      const na = Number(a);
      const nb = Number(b);
      const safeA = Number.isFinite(na) ? na : 0;
      const safeB = Number.isFinite(nb) ? nb : 0;
      if (safeA === safeB) return 0;
      return repoSortAsc ? safeA - safeB : safeB - safeA;
    });
    return rows;
  }, [
    compareTeamNames,
    getRepoSortValueWithMetrics,
    repoRows,
    repoSortAsc,
    repoSortKey,
  ]);

  const sortedTeamRowsBySortKey = useMemo(() => {
    const rows = [...teamRows];
    rows.sort((left, right) => {
      const a = getTeamSortValueWithMetrics(left, teamSortKey);
      const b = getTeamSortValueWithMetrics(right, teamSortKey);
      if (typeof a === 'string' && typeof b === 'string') {
        const result = compareTeamNames(a, b);
        return teamSortAsc ? result : -result;
      }
      const na = Number(a);
      const nb = Number(b);
      const safeA = Number.isFinite(na) ? na : 0;
      const safeB = Number.isFinite(nb) ? nb : 0;
      if (safeA === safeB) return 0;
      return teamSortAsc ? safeA - safeB : safeB - safeA;
    });
    return rows;
  }, [
    compareTeamNames,
    getTeamSortValueWithMetrics,
    teamRows,
    teamSortAsc,
    teamSortKey,
  ]);

  const displayedRepoRows = useMemo(
    () => sortedByProgressMetric(sortedRepoRowsBySortKey),
    [sortedByProgressMetric, sortedRepoRowsBySortKey]
  );

  const displayedTeamRows = useMemo(
    () => sortedByProgressMetric(sortedTeamRowsBySortKey),
    [sortedByProgressMetric, sortedTeamRowsBySortKey]
  );

  const displayedRepoRowsForTable = useMemo(
    () =>
      hideBeatRepos
        ? displayedRepoRows.filter((row) => !isBeatRepo(row.id))
        : displayedRepoRows,
    [displayedRepoRows, hideBeatRepos]
  );

  const displayedTeamRowsForTable = useMemo(
    () =>
      hideBeatRepos
        ? displayedTeamRows.filter((row) =>
            (row.repos || []).some((repo) => !isBeatRepo(repo.id))
          )
        : displayedTeamRows,
    [displayedTeamRows, hideBeatRepos]
  );

  useEffect(() => {
    const projectKeys = displayedRepoRowsForTable
      .map((row) => row.id)
      .filter((item) => !isBeatRepo(item));
    if (!projectKeys.length) {
      setRerunStatusMap({});
      return;
    }

    let alive = true;
    const loadStatuses = async (options?: { silent?: boolean }) => {
      const silent = options?.silent ?? false;
      if (!silent) {
        setRerunStatusLoading(true);
      }
      try {
        const result = await fetchOverviewRepoRerunStatuses(projectKeys);
        if (!alive) return;
        setRerunStatusMap(result.by_project_key || {});
      } catch (_error) {
        if (!alive) return;
      } finally {
        if (alive && !silent) setRerunStatusLoading(false);
      }
    };

    void loadStatuses();
    const timer = window.setInterval(() => {
      void loadStatuses({ silent: true });
    }, 60000);

    return () => {
      alive = false;
      window.clearInterval(timer);
    };
  }, [displayedRepoRowsForTable]);

  useEffect(() => {
    if (!rerunRecordsModal.open || !rerunRecordsModal.repo) return undefined;
    const hasActiveJob = rerunRecords.some((item) => isActiveRerunJob(item));
    if (!hasActiveJob) return undefined;
    const timer = window.setInterval(() => {
      void loadRerunRecords(rerunRecordsModal.repo!.id, { silent: true });
    }, 30000);
    return () => window.clearInterval(timer);
  }, [
    loadRerunRecords,
    rerunRecords,
    rerunRecordsModal.open,
    rerunRecordsModal.repo,
  ]);

  useEffect(() => {
    if (!autoExpandAllTeams || progressView !== 'team') return;
    const nextKeys = displayedTeamRowsForTable.map((row) => row.id);
    setExpandedRowKeys((prev) => {
      if (
        prev.length === nextKeys.length &&
        prev.every((key, index) => key === nextKeys[index])
      ) {
        return prev;
      }
      return nextKeys;
    });
  }, [autoExpandAllTeams, displayedTeamRowsForTable, progressView]);

  const renderExpandedRepoRows = useCallback(
    (repos: RepoProgressRow[]) => {
      // 按 teamSortKey 对仓库列表排序（repoCount 不适用于单仓库，跳过）
      let sortedRepos = hideBeatRepos
        ? repos.filter((repo) => !isBeatRepo(repo.id))
        : [...repos];
      if (teamSortKey !== 'repoCount') {
        const repoKey = teamSortKey as RepoSortKey;
        sortedRepos.sort((a, b) => {
          const beatCmp = compareBeatLast(a.id, b.id);
          if (beatCmp !== 0) return beatCmp;

          const va = getRepoSortValueWithMetrics(a, repoKey);
          const vb = getRepoSortValueWithMetrics(b, repoKey);
          let cmp = 0;
          if (typeof va === 'string' && typeof vb === 'string') {
            cmp =
              repoKey === 'team'
                ? compareTeamNames(va, vb) || a.name.localeCompare(b.name)
                : va.localeCompare(vb);
          } else {
            cmp = (va as number) - (vb as number);
          }
          return teamSortAsc ? cmp : -cmp;
        });
      }
      const visibleRepos = sortedByProgressMetric(sortedRepos);
      if (!visibleRepos.length) return null;
      return (
        <div className="overview-expanded-rows">
          <table
            className="overview-expanded-table"
            style={{ minWidth: visibleRepoScrollX }}
          >
            <colgroup>
              {repoColumnWidths
                .filter((_, index) => showActionColumn || index !== 11)
                .map((width, index) => (
                  <col key={index} style={{ width }} />
                ))}
            </colgroup>
            <tbody>
              {visibleRepos.map((repo, index) => (
                <tr
                  key={repo.id}
                  className="overview-expanded-row"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="overview-expanded-cell overview-expanded-cell-index" />
                  <td className="overview-expanded-cell overview-expanded-cell-name">
                    <span className="overview-expanded-repo-name">
                      <span className="overview-repo-name-cell">
                        <span>{repo.name}</span>
                        {renderBenchmarkTag(repo)}
                        {isBeatRepo(repo.id) ? (
                          <span className="text-slate-400">
                            （仅支持950，内测中）
                          </span>
                        ) : null}
                      </span>
                    </span>
                  </td>
                  <td className="overview-expanded-cell overview-expanded-cell-empty">
                    -
                  </td>
                  <td className="overview-expanded-cell">
                    {isBeatRepo(repo.id) ? (
                      <span className="text-slate-400">-</span>
                    ) : (
                      renderScoreTrendCell(
                        repo.name,
                        repo.score,
                        repoDerived.get(repo.id)?.scoreTrend
                      )
                    )}
                  </td>
                  <td className="overview-expanded-cell">
                    {isBeatRepo(repo.id) ? (
                      <span className="text-slate-400">-</span>
                    ) : (
                      renderSuccessRateTrendCell(
                        repo.name,
                        repo.successRate,
                        repoDerived.get(repo.id)?.successRateTrend,
                        repo.score
                      )
                    )}
                  </td>
                  <td className="overview-expanded-cell">
                    {isBeatRepo(repo.id) ? (
                      <span className="text-slate-400">-</span>
                    ) : (
                      formatExecutionTime(repo.executionTime)
                    )}
                  </td>
                  <td className="overview-expanded-cell">
                    {(() => {
                      if (isBeatRepo(repo.id)) {
                        return <span className="text-slate-400">-</span>;
                      }
                      const derived = repoDerived.get(repo.id);
                      const metrics = derived?.metrics ?? repo.overall;
                      const rowForModal = derived
                        ? ({
                            ...repo,
                            issues: derived.issues,
                          } as RepoProgressRow)
                        : repo;
                      return (
                        <IssueProgressBar
                          pending={metrics.pending}
                          inProgress={metrics.inProgress}
                          resolved={metrics.resolved}
                          onBucketClick={(bucket) =>
                            onOpenRepoIssues(rowForModal, bucket)
                          }
                        />
                      );
                    })()}
                  </td>
                  <td className="overview-expanded-cell">
                    {(() => {
                      if (isBeatRepo(repo.id)) {
                        return <span className="text-slate-400">-</span>;
                      }
                      const derived = repoDerived.get(repo.id);
                      const metrics = derived?.metrics ?? repo.overall;
                      const rowForModal = derived
                        ? ({
                            ...repo,
                            issues: derived.issues,
                          } as RepoProgressRow)
                        : repo;
                      return (
                        <button
                          type="button"
                          className="overview-table-link overview-table-link-strong"
                          onClick={() => onOpenRepoIssues(rowForModal, 'total')}
                        >
                          {metrics.total}
                        </button>
                      );
                    })()}
                  </td>
                  <td className="overview-expanded-cell">
                    {(() => {
                      if (isBeatRepo(repo.id)) {
                        return <span className="text-slate-400">-</span>;
                      }
                      const derived = repoDerived.get(repo.id);
                      const metrics = derived?.metrics ?? repo.overall;
                      const trendPoints =
                        derived?.trend ?? buildCloseRateTrend(repo.issues, 7);
                      const displayRate =
                        metrics.total === 0 ? 100 : metrics.closeRate;
                      const sparkValues =
                        metrics.total === 0
                          ? Array.from({ length: 5 }, () => 100)
                          : trendPoints
                              .slice(-5)
                              .map((point) => point.closeRate);
                      return (
                        <div className="overview-close-rate-cell">
                          <button
                            type="button"
                            className="inline-flex items-center rounded-md p-1 transition-colors hover:bg-slate-50"
                            title="查看闭环率趋势"
                            onClick={(event) => {
                              event.stopPropagation();
                              const modalPoints =
                                metrics.total === 0
                                  ? trendPoints.map((point) => ({
                                      ...point,
                                      closeRate:
                                        point.total === 0
                                          ? 100
                                          : point.closeRate,
                                    }))
                                  : trendPoints;
                              setCloseRateModal({
                                open: true,
                                title: `${repo.name} · 闭环率趋势`,
                                points: modalPoints,
                              });
                            }}
                          >
                            <CloseRateSparkline values={sparkValues} />
                          </button>
                          <span className="overview-close-rate-value text-sm font-semibold text-slate-700">
                            {formatPercent(displayRate)}
                          </span>
                        </div>
                      );
                    })()}
                  </td>
                  <td className="overview-expanded-cell">
                    {isBeatRepo(repo.id) ? (
                      <span className="text-slate-400">-</span>
                    ) : (
                      repo.hardwareEnv || (
                        <span className="text-slate-400">-</span>
                      )
                    )}
                  </td>
                  <td className="overview-expanded-cell">
                    {renderDetailLink(repo)}
                  </td>
                  {showActionColumn ? (
                    <td className="overview-expanded-cell">
                      <RerunActionButton
                        job={rerunStatusMap[repo.id]}
                        loading={rerunStatusLoading && !rerunStatusMap[repo.id]}
                        onOpenRecords={() => {
                          void openRerunRecordsModal(repo);
                        }}
                        onOpenRerun={() => {
                          void openRerunModal(repo);
                        }}
                      />
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
    [
      compareTeamNames,
      getRepoSortValueWithMetrics,
      onOpenRepoIssues,
      repoDerived,
      renderScoreTrendCell,
      renderSuccessRateTrendCell,
      sortedByProgressMetric,
      repoColumnWidths,
      repoScrollX,
      teamSortKey,
      teamSortAsc,
      openRerunModal,
      openRerunRecordsModal,
      rerunStatusLoading,
      rerunStatusMap,
    ]
  );

  const teamExpandable = useMemo<TableProps<TeamProgressRow>['expandable']>(
    () => ({
      expandedRowKeys,
      expandRowByClick: true,
      showExpandColumn: false,
      onExpand: (expanded, record) => {
        setExpandedRowKeys((prev) =>
          expanded
            ? [...prev, record.id]
            : prev.filter((key) => key !== record.id)
        );
      },
      expandedRowRender: (record) => renderExpandedRepoRows(record.repos),
    }),
    [
      currentTab,
      expandedRowKeys,
      teamColumnWidths,
      onOpenRepoIssues,
      renderExpandedRepoRows,
    ]
  );

  const emptyText =
    progressView === 'team' ? '暂无匹配责任团队' : '暂无匹配仓库';

  const SUMMARY_SELECT_H = 32;
  const filterSelectCls =
    '[&_.ant-select-arrow]:text-slate-500 [&_.ant-select-selection-item]:!text-sm [&_.ant-select-selection-item]:!font-semibold [&_.ant-select-selection-item]:!text-slate-900 [&_.ant-select-selector]:!rounded-r-2xl [&_.ant-select-selector]:!rounded-l-none [&_.ant-select-selector]:!border [&_.ant-select-selector]:!border-l-0 [&_.ant-select-selector]:!border-slate-200/80 [&_.ant-select-selector]:!bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] [&_.ant-select-selector]:!px-3 [&_.ant-select-selector]:!shadow-[0_2px_6px_rgba(15,23,42,0.06)] [&_.ant-select-selection-item]:!flex [&_.ant-select-selection-item]:!items-center';
  const FilterLabelTag: React.FC<{ text: string }> = ({ text }) => (
    <span
      style={{ height: SUMMARY_SELECT_H, lineHeight: `${SUMMARY_SELECT_H}px` }}
      className="inline-flex items-center whitespace-nowrap rounded-l-2xl border border-r-0 border-slate-200/80 bg-slate-50 px-2.5 text-xs font-medium text-slate-500 shadow-[0_2px_6px_rgba(15,23,42,0.06)]"
    >
      {text}
    </span>
  );

  const downloadBlob = (blob: Blob, filename: string) => {
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = href;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(href);
  };

  const parseFilenameFromDisposition = (value: string | null) => {
    if (!value) return '';
    const match = value.match(/filename="([^"]+)"/i);
    if (match?.[1]) return match[1];
    return '';
  };

  const handleExportCsv = async () => {
    if (exportingCsv) return;
    setExportingCsv(true);
    try {
      const search = new URLSearchParams();
      if (org) search.set('org', org);
      search.set('tab', currentTab);
      search.set('include_common_issues', 'true');
      if (commonOnly !== undefined && commonOnly !== null) {
        search.set('common_only', String(commonOnly));
      }
      if (teamFilter) search.set('team', teamFilter);
      if (repoFilter) search.set('repo', repoFilter);
      if (hardwareEnvFilter) {
        search.set('hardware_env', hardwareEnvFilter);
      }
      search.set('view', progressView);

      severityFilters.forEach((sev) => search.append('severity', sev));

      const isRepoView = progressView === 'repo';
      search.set('sort_key', isRepoView ? repoSortKey : teamSortKey);
      search.set(
        'sort_order',
        isRepoView
          ? repoSortAsc
            ? 'asc'
            : 'desc'
          : teamSortAsc
          ? 'asc'
          : 'desc'
      );
      search.set('progress_metric', progressSortKey);
      search.set('progress_metric_order', progressSortOrder);

      const url = compassApiUrl(
        `/overview/progress/export-csv?${search.toString()}`
      );
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`导出失败：${res.status} ${res.statusText}`);
      }
      const blob = await res.blob();
      const filename =
        parseFilenameFromDisposition(res.headers.get('content-disposition')) ||
        `progress_${progressView}.csv`;
      downloadBlob(blob, filename);
    } catch (error) {
      messageApi.error(
        error instanceof Error ? error.message : '导出失败，请稍后重试'
      );
    } finally {
      setExportingCsv(false);
    }
  };

  const rerunTargetRepo = rerunModal.repo;
  const canCurrentUserOperate = canOperateRepo(operatorUser, rerunTargetRepo);
  const rerunRecordsTargetRepo = rerunRecordsModal.repo;
  const rerunInfoJob =
    (rerunTargetRepo && rerunStatusMap[rerunTargetRepo.id]) || rerunRecords[0];
  const rerunInfoHardware =
    rerunInfoJob?.third_party_hardware || rerunTargetRepo?.hardwareEnv || '--';
  const rerunRecordsInfoJob =
    (rerunRecordsTargetRepo && rerunStatusMap[rerunRecordsTargetRepo.id]) ||
    rerunRecords[0];
  const rerunRecordsHardware =
    rerunRecordsInfoJob?.third_party_hardware ||
    rerunRecordsTargetRepo?.hardwareEnv ||
    '--';
  const shouldShowRerunRecordsTableInRerunModal =
    rerunRecordsLoading || !!rerunRecordsError || rerunRecords.length > 0;

  return (
    <>
      {messageContextHolder}
      <Title level={4} className="oj-section-title">
        进展
      </Title>
      <div className="section-card">
        <div className="tab-bar progress-toolbar-row">
          <Segmented
            className="overview-segmented"
            value={progressView}
            onChange={(value) => onProgressViewChange(value as ProgressView)}
            options={[
              { label: '责任团队', value: 'team' },
              { label: '仓库', value: 'repo' },
            ]}
          />
          <div className="team-filter overview-filter-group">
            <div className="flex items-center">
              <FilterLabelTag text="仓库" />
              <Select
                value={repoFilter || undefined}
                onChange={(value) => onRepoFilterChange(value ?? '')}
                allowClear
                placeholder="全部仓库"
                style={{ height: SUMMARY_SELECT_H }}
                className={`${filterSelectCls} min-w-[140px]`}
                popupMatchSelectWidth={false}
                popupClassName="overview-select-dropdown"
                getPopupContainer={(node) => node.parentElement ?? node}
                options={repoOptions}
              />
            </div>
            <div className="flex items-center">
              <FilterLabelTag text="团队" />
              <Select
                value={teamFilter || undefined}
                onChange={(value) => onTeamFilterChange(value ?? '')}
                allowClear
                placeholder="全部团队"
                style={{ height: SUMMARY_SELECT_H }}
                className={`${filterSelectCls} min-w-[140px]`}
                popupMatchSelectWidth={false}
                popupClassName="overview-select-dropdown"
                getPopupContainer={(node) => node.parentElement ?? node}
                options={teamOptions.map((team) => ({
                  value: team,
                  label: team,
                }))}
              />
            </div>
            <div className="flex items-center">
              <FilterLabelTag text="硬件环境" />
              <Select
                value={hardwareEnvFilter || undefined}
                onChange={(value) => onHardwareEnvFilterChange(value ?? '')}
                allowClear
                placeholder="全部环境"
                style={{ height: SUMMARY_SELECT_H }}
                className={`${filterSelectCls} min-w-[140px]`}
                popupMatchSelectWidth={false}
                popupClassName="overview-select-dropdown"
                getPopupContainer={(node) => node.parentElement ?? node}
                options={hardwareEnvOptions.map((hardwareEnv) => ({
                  value: hardwareEnv,
                  label: hardwareEnv,
                }))}
              />
            </div>
            <div className="flex items-center">
              <FilterLabelTag text="严重程度" />
              <Select
                mode="multiple"
                value={severityFilters}
                onChange={(values) =>
                  setSeverityFilters(values as Exclude<Severity, ''>[])
                }
                allowClear
                placeholder="全部严重程度"
                maxTagCount="responsive"
                style={{ height: SUMMARY_SELECT_H }}
                className={`${filterSelectCls} min-w-[220px]`}
                popupMatchSelectWidth={false}
                popupClassName="overview-select-dropdown"
                getPopupContainer={(node) => node.parentElement ?? node}
                options={SEVERITY_ORDER.map((severity) => ({
                  value: severity,
                  label: SEVERITY_CFG[severity].label,
                }))}
              />
            </div>
            <button
              type="button"
              disabled={exportingCsv}
              className="inline-flex items-center rounded-full border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-[0_2px_6px_rgba(15,23,42,0.06)] transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={handleExportCsv}
            >
              {exportingCsv ? '导出中...' : '导出'}
            </button>
          </div>
        </div>

        {progressView === 'team' ? (
          <Table<TeamProgressRow>
            className="overview-ant-table"
            loading={isLoading}
            dataSource={displayedTeamRowsForTable}
            columns={visibleTeamColumns}
            rowKey="id"
            pagination={false}
            scroll={{ x: visibleTeamScrollX }}
            tableLayout="fixed"
            locale={{ emptyText }}
            expandable={teamExpandable}
          />
        ) : (
          <Table<RepoProgressRow>
            className="overview-ant-table"
            loading={isLoading}
            dataSource={displayedRepoRowsForTable}
            columns={visibleRepoColumns}
            rowKey="id"
            pagination={false}
            scroll={{ x: visibleRepoScrollX }}
            tableLayout="fixed"
            locale={{ emptyText }}
          />
        )}
      </div>
      <CloseRateTrendModal
        open={closeRateModal.open}
        title={closeRateModal.title}
        points={closeRateModal.points}
        onClose={() =>
          setCloseRateModal({ open: false, title: '', points: [] })
        }
      />
      <ScoreTrendModal
        open={scoreTrendModal.open}
        title={scoreTrendModal.title}
        points={scoreTrendModal.points}
        legendLabel={scoreTrendModal.legendLabel}
        axisTitle={scoreTrendModal.axisTitle}
        tooltipLabel={scoreTrendModal.tooltipLabel}
        valueType={scoreTrendModal.valueType}
        onClose={() =>
          setScoreTrendModal({
            open: false,
            title: '',
            points: [],
            legendLabel: '综合体验评分',
            axisTitle: '综合体验评分',
            tooltipLabel: '周度评分',
            valueType: 'score',
          })
        }
      />
      <CapabilityBenchmarkModal
        open={benchmarkModal.open}
        repo={benchmarkModal.repo}
        onClose={() => setBenchmarkModal({ open: false, repo: null })}
      />
      <RepoRerunModal
        open={rerunModal.open}
        repo={rerunTargetRepo}
        hardware={rerunInfoHardware}
        operatorUser={operatorUser}
        canCurrentUserOperate={canCurrentUserOperate}
        rerunRecords={rerunRecords}
        rerunRecordsLoading={rerunRecordsLoading}
        rerunRecordsError={rerunRecordsError}
        cancelingJobId={cancelingRerunJobId}
        shouldShowRerunRecordsTable={shouldShowRerunRecordsTableInRerunModal}
        rerunning={rerunning}
        authSubmitting={authSubmitting}
        authChecking={authChecking}
        loginError={loginError}
        loginUsername={loginForm.username}
        loginPassword={loginForm.password}
        onLoginUsernameChange={(value) =>
          setLoginForm((prev) => ({
            ...prev,
            username: value,
          }))
        }
        onLoginPasswordChange={(value) =>
          setLoginForm((prev) => ({
            ...prev,
            password: value,
          }))
        }
        onCancel={closeRerunModal}
        onLogout={handleOperatorLogout}
        onConfirmRerun={() => {
          void handleConfirmRerun();
        }}
        onLogin={() => {
          void handleOperatorLogin();
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
        onOpenChangePassword={() => {
          setChangePasswordError('');
          setChangePasswordModalOpen(true);
        }}
        canCancelRecord={(record) =>
          !!operatorUser &&
          canCurrentUserOperate &&
          isActiveRerunJob(record) &&
          !cancelingRerunJobId
        }
        onCancelRecord={(record) => {
          void handleCancelRerunJob(rerunTargetRepo, record);
        }}
      />
      <RepoRerunRecordsModal
        open={rerunRecordsModal.open}
        repo={rerunRecordsTargetRepo}
        hardware={rerunRecordsHardware}
        operatorUser={operatorUser}
        canCurrentUserOperate={canOperateRepo(
          operatorUser,
          rerunRecordsTargetRepo
        )}
        rerunRecords={rerunRecords}
        rerunRecordsLoading={rerunRecordsLoading}
        rerunRecordsError={rerunRecordsError}
        cancelingJobId={cancelingRerunJobId}
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
          setLoginForm((prev) => ({
            ...prev,
            username: value,
          }))
        }
        onLoginPasswordChange={(value) =>
          setLoginForm((prev) => ({
            ...prev,
            password: value,
          }))
        }
        onClose={closeRerunRecordsModal}
        onLogout={handleOperatorLogout}
        onLogin={() => {
          void handleOperatorLogin();
        }}
        onOpenChangePassword={() => {
          setChangePasswordError('');
          setChangePasswordModalOpen(true);
        }}
        canCancelRecord={(record) =>
          !!operatorUser &&
          canOperateRepo(operatorUser, rerunRecordsTargetRepo) &&
          isActiveRerunJob(record) &&
          !cancelingRerunJobId
        }
        onCancelRecord={(record) => {
          void handleCancelRerunJob(rerunRecordsTargetRepo, record);
        }}
      />
      <Modal
        open={changePasswordModalOpen}
        title="修改密码"
        onCancel={closeChangePasswordModal}
        destroyOnHidden
        footer={[
          <Button key="cancel" onClick={closeChangePasswordModal}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={changePasswordSubmitting}
            onClick={() => {
              void handleChangePassword();
            }}
          >
            确认修改
          </Button>,
        ]}
      >
        <div className="flex flex-col gap-3">
          <Input.Password
            value={changePasswordForm.currentPassword}
            placeholder="请输入当前密码"
            onChange={(event) =>
              setChangePasswordForm((prev) => ({
                ...prev,
                currentPassword: event.target.value,
              }))
            }
          />
          <Input.Password
            value={changePasswordForm.newPassword}
            placeholder="请输入新密码"
            onChange={(event) =>
              setChangePasswordForm((prev) => ({
                ...prev,
                newPassword: event.target.value,
              }))
            }
          />
          <Input.Password
            value={changePasswordForm.confirmPassword}
            placeholder="请再次输入新密码"
            onChange={(event) =>
              setChangePasswordForm((prev) => ({
                ...prev,
                confirmPassword: event.target.value,
              }))
            }
            onPressEnter={() => {
              void handleChangePassword();
            }}
          />
          {changePasswordError ? (
            <div className="text-sm text-rose-600">{changePasswordError}</div>
          ) : null}
        </div>
      </Modal>
    </>
  );
};

export default RepoProgressSection;
