import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Alert,
  Button,
  Card,
  Form,
  Grid,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Spin,
  Switch,
  Table,
  Tabs,
  Tag,
  Tooltip,
  Typography,
  message,
} from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import {
  ArrowLeftOutlined,
  CheckOutlined,
  FilterFilled,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import {
  cancelOverviewRepoRerun,
  clearCompassOperatorToken,
  deleteRepoManagementRepo,
  fetchCompassOperatorMe,
  fetchOverviewRepoRerunRecords,
  fetchOverviewRepoRerunStatuses,
  fetchOverviewRerunNodes,
  fetchRepoManagementRepos,
  fetchRepoManagementRegisterOptions,
  getCompassOperatorToken,
  loginCompassOperator,
  registerCompassOperator,
  setCompassOperatorToken,
  triggerOverviewRepoRerun,
  upsertRepoManagementRepo,
} from '../rawData/apiClient';
import type {
  CompassOperatorUser,
  DevxNodeStatus,
  RepoManagementItem,
  RepoRerunJob,
} from '../rawData/apiClient';
import OperatorAccessModal, {
  type OperatorRegisterValues,
} from '../OverviewDashboard/OperatorAccessModal';
import DashboardStyles from '../OverviewDashboard/DashboardStyles';
import {
  getDevxNodeKey,
  isActiveRerunJob,
  RepoRerunModal,
  RepoRerunRecordsModal,
  RerunActionButton,
} from '../OverviewDashboard/RepoRerunComponents';
import type {
  MetricSummary,
  RepoProgressRow,
} from '../OverviewDashboard/types';
import { getReportDisplayText } from '../OverviewDashboard/utils';
import { useRegistryData } from '../hooks/useRegistryData';

const { Title } = Typography;
const nativeInputClassName =
  'h-8 w-full rounded-2xl border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-3 text-sm text-slate-900 shadow-[0_2px_6px_rgba(15,23,42,0.06)] outline-none transition-colors placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400';
const nativeTextAreaClassName =
  'w-full rounded-2xl border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-3 py-2 text-sm text-slate-900 shadow-[0_2px_6px_rgba(15,23,42,0.06)] outline-none transition-colors placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100';
const nativeButtonClassName =
  'inline-flex h-8 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-60';
const nativePrimaryButtonClassName =
  'inline-flex h-8 items-center justify-center rounded-xl border border-blue-600 bg-blue-600 px-4 text-sm text-white transition-colors hover:border-blue-500 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60';

type RepoManagementServerSortKey = 'benchmark_repo_name' | 'overview_enabled';
type RepoManagementServerSortOrder = 'ascend' | 'descend';
type RepoManagementStatusFilter = 'all' | 'online' | 'registered' | 'offline';

type NativeInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

const NativeInput: React.FC<NativeInputProps> = ({
  value,
  onChange,
  placeholder,
  disabled,
}) => (
  <input
    value={value ?? ''}
    onChange={(event) => onChange?.(event.target.value)}
    placeholder={placeholder}
    disabled={disabled}
    className={nativeInputClassName}
  />
);

const NativeTextArea: React.FC<NativeInputProps & { rows?: number }> = ({
  value,
  onChange,
  placeholder,
  rows = 4,
}) => (
  <textarea
    value={value ?? ''}
    onChange={(event) => onChange?.(event.target.value)}
    placeholder={placeholder}
    rows={rows}
    className={nativeTextAreaClassName}
  />
);

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

const EMPTY_METRICS: MetricSummary = {
  total: 0,
  pending: 0,
  inProgress: 0,
  resolved: 0,
  na: 0,
  closeRate: 0,
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

const normalizeRepoKeyword = (value: string) => {
  const text = String(value || '').trim();
  if (!text) return '';
  const normalized = text.replace(/\\/g, '/');
  const lastSegment = normalized.split('/').filter(Boolean).pop();
  return lastSegment || normalized;
};

const parseHardwareEnvInput = (value: string) =>
  String(value || '')
    .split(/[\n,，;；]+/)
    .map((item) => item.trim())
    .filter(Boolean);

const parseTextListInput = (value: string | string[] | undefined) => {
  const values = Array.isArray(value)
    ? value
    : String(value || '').split(/[\n,，;；]+/);
  return values.map((item) => String(item || '').trim()).filter(Boolean);
};

const formatTextList = (value: string | string[] | undefined) =>
  parseTextListInput(value).join('、');

const buildOwnerContacts = (
  ownerValue: string | string[] | undefined,
  emailValue: string | string[] | undefined
): OwnerContact[] => {
  const owners = parseTextListInput(ownerValue);
  const emails = parseTextListInput(emailValue);
  return owners.map((owner, index) => ({
    name: owner,
    email: emails[index] || '',
  }));
};

const getRecordHardwareEnvs = (
  record: Pick<RepoManagementItem, 'hardware_env' | 'hardware_envs'>
) => {
  const values = Array.isArray(record.hardware_envs)
    ? record.hardware_envs
    : parseHardwareEnvInput(record.hardware_env || '');
  return values.length
    ? values
    : record.hardware_env
    ? [record.hardware_env]
    : [];
};

const getRepoDisplayName = (
  record: Pick<RepoManagementItem, 'repo_name' | 'community_name'>
) => {
  const repoName = String(record.repo_name || '').trim();
  const communityName = String(record.community_name || 'cann').trim();
  if (!repoName) return '';
  if (repoName.includes('/')) return repoName;
  return communityName ? `${communityName}/${repoName}` : repoName;
};

const getRepoLatestReportId = (record: RepoManagementItem) =>
  String(record.latestReportId || record.latest_report_id || '').trim();

const toRepoProgressRow = (record: RepoManagementItem): RepoProgressRow => ({
  id: record.project_key,
  name: getRepoDisplayName(record),
  team: record.team_name || '未分配团队',
  hardwareEnv: getRecordHardwareEnvs(record)[0] || '',
  score: null,
  successRate: null,
  executionTime: null,
  latestReportId: '',
  detailReportUrl: '',
  scoreHistory: [],
  overall: EMPTY_METRICS,
  key: EMPTY_METRICS,
  issues: [],
  benchmark: record.benchmark_repo_name
    ? {
        repoKey: record.benchmark_project_key,
        repoName: record.benchmark_repo_name,
        latestReportId: '',
        detailReportUrl: '',
        latestScore: null,
        latestSuccessRate: null,
        latestExecutionTime: null,
        hardwareEnv: '',
        scoreBreakdown: [],
      }
    : null,
});

type RepoEditorValues = {
  repo_name: string;
  team_name: string;
  hardware_env: string;
  benchmark_repo_name: string;
  remark: string;
};

type OwnerContact = {
  name: string;
  email: string;
};

const RepoManagementPage: React.FC = () => {
  const router = useRouter();
  const screens = Grid.useBreakpoint();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const [keyword, setKeyword] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('');
  const [hardwareFilter, setHardwareFilter] = useState('');
  const [statusFilter, setStatusFilter] =
    useState<RepoManagementStatusFilter>('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [serverSort, setServerSort] = useState<{
    key?: RepoManagementServerSortKey;
    order?: RepoManagementServerSortOrder;
  }>({});
  const [operatorUser, setOperatorUser] = useState<CompassOperatorUser | null>(
    null
  );
  const [authInitialized, setAuthInitialized] = useState(false);
  const [authChecking, setAuthChecking] = useState(false);
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [accessModalOpen, setAccessModalOpen] = useState(false);
  const [editorModalOpen, setEditorModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<RepoManagementItem | null>(
    null
  );
  const [editorSubmitting, setEditorSubmitting] = useState(false);
  const [overviewUpdatingRepo, setOverviewUpdatingRepo] = useState('');
  const [ownerCreateModalOpen, setOwnerCreateModalOpen] = useState(false);
  const [editorOwnerContacts, setEditorOwnerContacts] = useState<
    OwnerContact[]
  >([]);
  const [rerunning, setRerunning] = useState(false);
  const [cancelingRerunJobId, setCancelingRerunJobId] = useState('');
  const [rerunStatusLoading, setRerunStatusLoading] = useState(false);
  const [rerunStatusMap, setRerunStatusMap] = useState<
    Record<string, RepoRerunJob>
  >({});
  const [rerunModal, setRerunModal] = useState<{
    open: boolean;
    repo: RepoManagementItem | null;
  }>({
    open: false,
    repo: null,
  });
  const [rerunAccessModal, setRerunAccessModal] = useState<{
    open: boolean;
    repo: RepoManagementItem | null;
  }>({
    open: false,
    repo: null,
  });
  const [rerunRecordsModal, setRerunRecordsModal] = useState<{
    open: boolean;
    repo: RepoManagementItem | null;
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
  const [form] = Form.useForm<RepoEditorValues>();
  const [ownerCreateForm] = Form.useForm<OwnerContact>();

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
      return user;
    } catch (_error) {
      clearCompassOperatorToken();
      setOperatorUser(null);
      return null;
    } finally {
      setAuthInitialized(true);
      setAuthChecking(false);
    }
  }, []);

  useEffect(() => {
    void loadOperatorUser();
  }, [loadOperatorUser]);

  useEffect(() => {
    const repo = router.query.repo;
    if (!router.isReady || typeof repo !== 'string' || !repo.trim()) return;
    setKeyword(normalizeRepoKeyword(repo));
    setPage(1);
  }, [router.isReady, router.query.repo]);

  const canOperateRepo = useCallback(
    (user: CompassOperatorUser | null, record: RepoManagementItem | null) => {
      if (!user || !record || !user.enabled) return false;
      if (user.role === 'admin') return true;
      const repoKeys = new Set(
        (user.repo_keys || []).map((item) =>
          String(item || '')
            .trim()
            .toLowerCase()
            .replace(/-/g, '_')
        )
      );
      for (const alias of Array.from(
        getProjectKeyAliases(record.project_key)
      )) {
        if (repoKeys.has(alias)) return true;
      }
      const username = String(user.username || '')
        .trim()
        .toLowerCase();
      const displayName = String(user.display_name || '')
        .trim()
        .toLowerCase();
      const ownerNames = new Set(
        parseTextListInput(record.owner).map((item) => item.toLowerCase())
      );
      const ownerEmails = new Set(
        parseTextListInput(record.owner_email).map((item) => item.toLowerCase())
      );
      if (username && (ownerNames.has(username) || ownerEmails.has(username))) {
        return true;
      }
      if (displayName && ownerNames.has(displayName)) return true;
      return ownerNames.size === 0;
    },
    []
  );
  const canEditRepo = useCallback(
    (record: RepoManagementItem | null) => {
      if (!operatorUser || !record || !operatorUser.enabled) return false;
      if (operatorUser.role === 'admin') return true;
      if (canOperateRepo(operatorUser, record)) return true;
      return false;
    },
    [canOperateRepo, operatorUser]
  );

  const {
    data: repoListResp,
    isLoading,
    refetch: refetchRepoList,
  } = useQuery({
    queryKey: [
      'repo-management-list',
      operatorUser?.username,
      keyword,
      teamFilter,
      ownerFilter,
      hardwareFilter,
      statusFilter,
      serverSort.key,
      serverSort.order,
      page,
      pageSize,
    ],
    queryFn: () =>
      fetchRepoManagementRepos({
        keyword: keyword || undefined,
        teamName: teamFilter || undefined,
        owner: ownerFilter || undefined,
        hardwareEnv: hardwareFilter || undefined,
        status: statusFilter === 'all' ? undefined : statusFilter,
        sortKey: serverSort.key,
        sortOrder: serverSort.order,
        page,
        size: pageSize,
      }),
    enabled: !!operatorUser,
  });
  const registry = useRegistryData();
  const { data: registerRepoOptionsResp } = useQuery({
    queryKey: ['repo-management-register-options'],
    queryFn: fetchRepoManagementRegisterOptions,
  });

  const repoItems = useMemo(
    () => repoListResp?.items ?? [],
    [repoListResp?.items]
  );
  const statusTabItems = useMemo(() => {
    const counts = repoListResp?.status_counts ?? {};
    const buildLabel = (
      label: string,
      value: number | undefined,
      badgeClassName: string
    ) => (
      <span className="inline-flex items-center gap-2">
        <span>{label}</span>
        <span
          className={`inline-flex min-w-[28px] justify-center rounded-full px-2 py-0.5 text-xs font-semibold leading-5 ${badgeClassName}`}
        >
          {(value ?? 0).toLocaleString('en-US')}
        </span>
      </span>
    );
    return [
      {
        key: 'all',
        label: buildLabel('全部', counts.all, 'bg-blue-100 text-blue-700'),
      },
      {
        key: 'online',
        label: buildLabel(
          '已上线',
          counts.online,
          'bg-green-100 text-green-700'
        ),
      },
      {
        key: 'registered',
        label: buildLabel(
          '已备案',
          counts.registered,
          'bg-violet-100 text-violet-700'
        ),
      },
      {
        key: 'offline',
        label: buildLabel(
          '未上线',
          counts.offline,
          'bg-slate-100 text-slate-600'
        ),
      },
    ];
  }, [repoListResp?.status_counts]);
  const teamOptions = useMemo(
    () => repoListResp?.team_options ?? [],
    [repoListResp?.team_options]
  );
  const ownerOptions = useMemo(
    () => repoListResp?.owner_options ?? [],
    [repoListResp?.owner_options]
  );
  const hardwareOptions = useMemo(
    () => repoListResp?.hardware_options ?? [],
    [repoListResp?.hardware_options]
  );
  const editorTeamOptions = useMemo(
    () => repoListResp?.all_team_options ?? teamOptions,
    [repoListResp?.all_team_options, teamOptions]
  );
  const editorHardwareOptions = useMemo(
    () => repoListResp?.all_hardware_options ?? hardwareOptions,
    [repoListResp?.all_hardware_options, hardwareOptions]
  );
  const editorOwnerOptions = useMemo(() => {
    const optionMap = new Map<string, OwnerContact>();
    (repoListResp?.all_owner_options ?? []).forEach((item) => {
      const name = String(item.name || '').trim();
      if (!name) return;
      optionMap.set(name, {
        name,
        email: String(item.email || '').trim(),
      });
    });
    editorOwnerContacts.forEach((contact) => {
      const name = contact.name.trim();
      if (!name || optionMap.has(name)) return;
      optionMap.set(name, {
        name,
        email: contact.email.trim(),
      });
    });
    return Array.from(optionMap.values())
      .map((contact) => ({
        value: contact.name,
        label: contact.email
          ? `${contact.name}（${contact.email}）`
          : contact.name,
        contact,
      }))
      .sort((left, right) => left.value.localeCompare(right.value, 'zh-CN'));
  }, [editorOwnerContacts, repoListResp?.all_owner_options]);
  const editorOwnerOptionMap = useMemo(
    () =>
      new Map(
        editorOwnerOptions.map((option) => [option.value, option.contact])
      ),
    [editorOwnerOptions]
  );
  const registerRepoOptions = useMemo(() => {
    const fromRepoManagement = registerRepoOptionsResp?.items ?? [];
    if (fromRepoManagement.length) {
      return fromRepoManagement.map((item) => ({
        value: item.value,
        label: item.label,
      }));
    }
    if (!registry) return [];
    return Object.entries(registry.labelMap)
      .filter(([projectKey]) => String(projectKey || '').startsWith('cann_'))
      .map(([value, label]) => ({ value, label }))
      .sort((left, right) => left.label.localeCompare(right.label, 'zh-CN'));
  }, [registerRepoOptionsResp?.items, registry]);
  const benchmarkRepoOptions = useMemo(() => {
    if (!registry) return [];
    const values = new Set<string>();
    Object.values(registry.entries).forEach((entry) => {
      if (
        String(entry.org || '')
          .trim()
          .toLowerCase() === 'cann'
      )
        return;
      const repoName =
        String(entry.label || '').trim() ||
        String(entry.projectName || '').trim();
      if (repoName) values.add(repoName);
    });
    return Array.from(values).sort((left, right) => left.localeCompare(right));
  }, [registry]);
  const isAdmin = operatorUser?.role === 'admin';
  const taskManagementHref = useMemo(() => {
    const org = router.query.org;
    const orgValue = typeof org === 'string' ? org.trim() : '';
    return orgValue
      ? `/intelligent-analysis/${encodeURIComponent(
          orgValue
        )}/community-experience/task-management`
      : '/intelligent-analysis/community-experience/task-management';
  }, [router.query.org]);

  useEffect(() => {
    const projectKeys = repoItems
      .map((item) => item.project_key)
      .filter(Boolean);
    if (!projectKeys.length) {
      setRerunStatusMap({});
      return;
    }

    let alive = true;
    const loadStatuses = async (silent = false) => {
      if (!silent) setRerunStatusLoading(true);
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
      void loadStatuses(true);
    }, 60000);

    return () => {
      alive = false;
      window.clearInterval(timer);
    };
  }, [repoItems]);

  const closeRerunModal = useCallback(() => {
    setRerunModal({ open: false, repo: null });
    setLoginError('');
    setSelectedRerunNodeKey('');
    setRerunRecordsExpanded(false);
    setLoginForm((prev) => ({ ...prev, password: '' }));
  }, []);

  const closeRerunAccess = useCallback(() => {
    setRerunAccessModal({ open: false, repo: null });
    setLoginError('');
    setLoginForm((prev) => ({ ...prev, password: '' }));
  }, []);

  const closeRerunRecordsModal = useCallback(() => {
    setRerunRecordsModal({ open: false, repo: null });
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
        if (!silent) setRerunRecordsLoading(false);
      }
    },
    []
  );

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

  useEffect(() => {
    if (!rerunRecordsModal.open || !rerunRecordsModal.repo) return undefined;
    const hasActiveJob = rerunRecords.some((item) => isActiveRerunJob(item));
    if (!hasActiveJob) return undefined;
    const timer = window.setInterval(() => {
      void loadRerunRecords(rerunRecordsModal.repo!.project_key, {
        silent: true,
      });
    }, 30000);
    return () => window.clearInterval(timer);
  }, [
    loadRerunRecords,
    rerunRecords,
    rerunRecordsModal.open,
    rerunRecordsModal.repo,
  ]);

  const prepareRerunModal = useCallback(
    (record: RepoManagementItem) => {
      const currentJob = rerunStatusMap[record.project_key];
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
      setRerunModal({ open: true, repo: record });
      void loadRerunRecords(record.project_key, { silent: !!currentJob });
    },
    [loadRerunRecords, rerunStatusMap]
  );

  const openRerunModal = useCallback(
    async (record: RepoManagementItem) => {
      if (!getRecordHardwareEnvs(record).length) {
        messageApi.warning('请先配置硬件环境后再进行重跑');
        return;
      }
      setLoginError('');
      if (getCompassOperatorToken() && !operatorUser) {
        const nextUser = await loadOperatorUser();
        if (nextUser) {
          prepareRerunModal(record);
          return;
        }
      }
      if (!operatorUser) {
        setRerunAccessModal({ open: true, repo: record });
        return;
      }
      prepareRerunModal(record);
    },
    [loadOperatorUser, messageApi, operatorUser, prepareRerunModal]
  );

  const openRerunRecordsModal = useCallback(
    async (record: RepoManagementItem) => {
      const currentJob = rerunStatusMap[record.project_key];
      if (currentJob) {
        setRerunRecords([currentJob]);
        setRerunRecordsError('');
        setRerunRecordsLoading(false);
      } else {
        setRerunRecords([]);
        setRerunRecordsLoading(true);
      }
      setRerunRecordsModalExpanded(true);
      setRerunRecordsModal({ open: true, repo: record });
      if (getCompassOperatorToken() && !operatorUser) {
        await loadOperatorUser();
      }
      await loadRerunRecords(record.project_key);
    },
    [loadOperatorUser, loadRerunRecords, operatorUser, rerunStatusMap]
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

  const getRegisterRepoNames = useCallback(
    (repoKeys: string[]) => {
      const labelMap = new Map(
        registerRepoOptions.map((item) => [item.value, item.label])
      );
      return repoKeys.map((key) => labelMap.get(key) || key);
    },
    [registerRepoOptions]
  );

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

      setAuthSubmitting(true);
      setLoginError('');
      try {
        const result = await registerCompassOperator({
          username,
          password,
          repo_keys: repoKeys,
          repo_names: getRegisterRepoNames(repoKeys),
        });
        setCompassOperatorToken(result.access_token);
        setOperatorUser(result.user);
        setAuthInitialized(true);
        setLoginForm({ username: result.user.username, password: '' });
        messageApi.success(`已注册并登录为 ${result.user.display_name}`);
        if (rerunAccessModal.open && rerunAccessModal.repo) {
          const targetRepo = rerunAccessModal.repo;
          closeRerunAccess();
          prepareRerunModal(targetRepo);
        } else {
          setAccessModalOpen(false);
          await refetchRepoList();
        }
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
    [
      closeRerunAccess,
      getRegisterRepoNames,
      messageApi,
      prepareRerunModal,
      refetchRepoList,
      rerunAccessModal.open,
      rerunAccessModal.repo,
    ]
  );

  const handleOperatorLogout = useCallback(() => {
    clearCompassOperatorToken();
    setOperatorUser(null);
    setAuthInitialized(true);
    setLoginError('');
    setLoginForm((prev) => ({ ...prev, password: '' }));
    setRerunNodes([]);
    setRerunNodesError('');
    setSelectedRerunNodeKey('');
  }, []);

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
    if (!getRecordHardwareEnvs(rerunModal.repo).length) {
      setLoginError('请先配置硬件环境后再进行重跑');
      messageApi.warning('请先配置硬件环境后再进行重跑');
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
      const result = await triggerOverviewRepoRerun(
        rerunModal.repo.project_key,
        {
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
        }
      );
      const projectKey = rerunModal.repo.project_key;
      const targetRepo = rerunModal.repo;
      setRerunStatusMap((prev) => ({
        ...prev,
        [projectKey]: result.data,
      }));
      setRerunRecords([result.data]);
      setRerunRecordsError('');
      setRerunRecordsLoading(false);
      messageApi.success(result.message || '已触发重跑');
      closeRerunModal();
      setRerunRecordsModal({ open: true, repo: targetRepo });
      void loadRerunRecords(projectKey);
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
    async (record: RepoManagementItem | null, job: RepoRerunJob) => {
      if (!record) return;
      if (!operatorUser) {
        setLoginError('请先登录后再操作');
        return;
      }
      if (!canOperateRepo(operatorUser, record)) {
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
        const result = await cancelOverviewRepoRerun(
          record.project_key,
          job.job_id
        );
        setRerunRecords((prev) =>
          prev.map((item) => (item.job_id === job.job_id ? result.data : item))
        );
        setRerunStatusMap((prev) => ({
          ...prev,
          [record.project_key]:
            prev[record.project_key]?.job_id === job.job_id ||
            !prev[record.project_key]
              ? result.data
              : prev[record.project_key],
        }));
        messageApi.success(result.message || '已撤销重跑任务');
        void loadRerunRecords(record.project_key, { silent: true });
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

  const handleOpenCreate = useCallback(() => {
    setEditingRecord(null);
    setEditorOwnerContacts([]);
    form.setFieldsValue({
      repo_name: '',
      team_name: '',
      hardware_env: '',
      benchmark_repo_name: '',
      remark: '',
    });
    setEditorModalOpen(true);
  }, [form]);

  const handleOpenEdit = useCallback(
    (record: RepoManagementItem) => {
      setEditingRecord(record);
      setEditorOwnerContacts(
        buildOwnerContacts(record.owner, record.owner_email)
      );
      form.setFieldsValue({
        repo_name: record.repo_name,
        team_name: record.team_name,
        hardware_env: getRecordHardwareEnvs(record)[0] || '',
        benchmark_repo_name: record.benchmark_repo_name,
        remark: record.remark,
      });
      setEditorModalOpen(true);
    },
    [form]
  );

  const handleSubmitEditor = async (values: RepoEditorValues) => {
    setEditorSubmitting(true);
    try {
      const ownerContacts = editorOwnerContacts.filter((contact) =>
        contact.name.trim()
      );
      const payload = {
        ...values,
        owner: ownerContacts.map((contact) => contact.name.trim()),
        owner_email: ownerContacts.map((contact) => contact.email.trim()),
        hardware_envs: parseHardwareEnvInput(values.hardware_env),
      };
      await upsertRepoManagementRepo(payload);
      messageApi.success(editingRecord ? '仓库信息已更新' : '仓库已创建');
      setEditorModalOpen(false);
      setEditingRecord(null);
      await refetchRepoList();
      await queryClient.invalidateQueries({
        queryKey: ['repo-management-list'],
      });
    } catch (error) {
      messageApi.error(
        error instanceof Error ? error.message : '保存失败，请稍后重试'
      );
    } finally {
      setEditorSubmitting(false);
    }
  };

  const handleToggleOverviewEnabled = useCallback(
    async (record: RepoManagementItem, checked: boolean) => {
      if (!isAdmin) return;
      setOverviewUpdatingRepo(record.repo_name);
      try {
        await upsertRepoManagementRepo({
          repo_name: record.repo_name,
          community_name: record.community_name,
          owner: parseTextListInput(record.owner),
          owner_email: parseTextListInput(record.owner_email),
          team_no: record.team_no,
          team_name: record.team_name,
          hardware_env: record.hardware_env,
          hardware_envs: getRecordHardwareEnvs(record),
          benchmark_repo_name: record.benchmark_repo_name,
          overview_enabled: checked,
          remark: record.remark,
        });
        messageApi.success(checked ? '已上线总览看板' : '已下线总览看板');
        await refetchRepoList();
        await queryClient.invalidateQueries({
          queryKey: ['repo-management-list'],
        });
      } catch (error) {
        messageApi.error(
          error instanceof Error ? error.message : '更新总览看板状态失败'
        );
      } finally {
        setOverviewUpdatingRepo('');
      }
    },
    [isAdmin, messageApi, queryClient, refetchRepoList]
  );

  const handleAddOwnerContact = async () => {
    const values = await ownerCreateForm.validateFields();
    const name = values.name.trim();
    const email = values.email.trim();
    setEditorOwnerContacts((prev) => {
      const next = prev.filter((item) => item.name !== name);
      return [...next, { name, email }];
    });
    ownerCreateForm.resetFields();
    setOwnerCreateModalOpen(false);
  };

  const handleDelete = useCallback(
    async (record: RepoManagementItem) => {
      try {
        await deleteRepoManagementRepo(record.repo_name);
        messageApi.success('仓库已删除');
        await refetchRepoList();
        await queryClient.invalidateQueries({
          queryKey: ['repo-management-list'],
        });
      } catch (error) {
        messageApi.error(
          error instanceof Error ? error.message : '删除失败，请稍后重试'
        );
      }
    },
    [messageApi, queryClient, refetchRepoList]
  );

  const handleEnterManagement = async () => {
    const nextUser = operatorUser ?? (await handleOperatorLogin());
    if (!nextUser) return;
    setAccessModalOpen(false);
    setLoginError('');
    await refetchRepoList();
  };

  const handleEnterRerun = async () => {
    const targetRepo = rerunAccessModal.repo;
    if (!targetRepo) return;
    const nextUser = operatorUser ?? (await handleOperatorLogin());
    if (!nextUser) return;
    closeRerunAccess();
    prepareRerunModal(targetRepo);
  };

  const controlClassName =
    'h-8 !rounded-2xl border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] text-sm shadow-[0_2px_6px_rgba(15,23,42,0.06)]';
  const filterSelectClassName =
    '[&_.ant-select-arrow]:text-slate-500 [&_.ant-select-selector]:!h-8 [&_.ant-select-selector]:!rounded-2xl [&_.ant-select-selector]:!border-slate-200/80 [&_.ant-select-selector]:!bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] [&_.ant-select-selector]:!px-3 [&_.ant-select-selector]:!shadow-[0_2px_6px_rgba(15,23,42,0.06)] [&_.ant-select-selection-item]:!text-sm [&_.ant-select-selection-placeholder]:!text-sm';
  const searchClassName =
    '[&_.ant-input-affix-wrapper]:!h-8 [&_.ant-input-affix-wrapper]:!rounded-l-2xl [&_.ant-input-affix-wrapper]:!border-slate-200/80 [&_.ant-input-affix-wrapper]:!bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] [&_.ant-input-affix-wrapper]:!shadow-[0_2px_6px_rgba(15,23,42,0.06)] [&_.ant-input-group-addon_.ant-btn]:!h-8 [&_.ant-input-group-addon_.ant-btn]:!rounded-r-2xl [&_.ant-input-group-addon_.ant-btn]:!border-slate-200/80';
  const sortableTitle = useCallback(
    (label: string) => (
      <span className="sortable-col-title">
        {label}
        <span className="sort-arrow">↕</span>
      </span>
    ),
    []
  );
  const handleTableChange = useCallback<
    NonNullable<TableProps<RepoManagementItem>['onChange']>
  >(
    (pagination, _filters, sorter, extra) => {
      const isSortAction = extra.action === 'sort';
      setPage(isSortAction ? 1 : pagination.current ?? 1);
      setPageSize(pagination.pageSize ?? pageSize);

      const activeSorter = Array.isArray(sorter)
        ? sorter.find((item) => item.order)
        : sorter;
      const columnKey = activeSorter?.columnKey;
      const order = activeSorter?.order;

      if (
        (columnKey === 'benchmark_repo_name' ||
          columnKey === 'overview_enabled') &&
        (order === 'ascend' || order === 'descend')
      ) {
        setServerSort({ key: columnKey, order });
        return;
      }

      setServerSort({});
    },
    [pageSize]
  );
  const ownerHeaderOptions = useMemo(
    () => ownerOptions.map((item) => ({ value: item, label: item })),
    [ownerOptions]
  );
  const teamHeaderOptions = useMemo(
    () => teamOptions.map((item) => ({ value: item, label: item })),
    [teamOptions]
  );
  const hardwareHeaderOptions = useMemo(
    () => hardwareOptions.map((item) => ({ value: item, label: item })),
    [hardwareOptions]
  );

  const columns = useMemo<ColumnsType<RepoManagementItem>>(
    () => [
      {
        title: '序号',
        dataIndex: 'seq_no',
        key: 'seq_no',
        width: 76,
      },
      {
        title: sortableTitle('仓库名称'),
        dataIndex: 'repo_name',
        key: 'repo_name',
        width: 180,
        sorter: (left, right) =>
          getRepoDisplayName(left).localeCompare(
            getRepoDisplayName(right),
            'zh-CN'
          ),
        sortDirections: ['ascend', 'descend'],
        render: (_value: string, record) => (
          <span
            className="overview-repo-name-cell"
            title={getRepoDisplayName(record)}
          >
            <span className="max-w-full whitespace-normal break-words leading-relaxed [word-break:break-word]">
              {getRepoDisplayName(record)}
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
            options={teamHeaderOptions}
            onChange={(nextValue) => {
              setTeamFilter(nextValue);
              setPage(1);
            }}
          />
        ),
        dataIndex: 'team_name',
        key: 'team_name',
        width: 160,
        render: (value: string) => value || '-',
      },
      {
        title: (
          <HeaderFilter
            label="责任人"
            value={ownerFilter}
            allLabel="全部责任人"
            options={ownerHeaderOptions}
            onChange={(nextValue) => {
              setOwnerFilter(nextValue);
              setPage(1);
            }}
          />
        ),
        key: 'owner',
        width: 180,
        render: (_value, record) => formatTextList(record.owner) || '-',
      },
      {
        title: (
          <HeaderFilter
            label="硬件环境"
            value={hardwareFilter}
            allLabel="全部环境"
            options={hardwareHeaderOptions}
            onChange={(nextValue) => {
              setHardwareFilter(nextValue);
              setPage(1);
            }}
          />
        ),
        dataIndex: 'hardware_env',
        key: 'hardware_env',
        width: 140,
        render: (_value: string, record) => {
          const envs = getRecordHardwareEnvs(record);
          if (!envs.length) return '-';
          return (
            <Space size={[4, 4]} wrap>
              {envs.map((env) => (
                <Tag key={env} color="processing">
                  {env}
                </Tag>
              ))}
            </Space>
          );
        },
      },
      {
        title: sortableTitle('最新报告'),
        key: 'latestReport',
        width: 150,
        sorter: (left, right) =>
          getReportDisplayText(getRepoLatestReportId(left)).localeCompare(
            getReportDisplayText(getRepoLatestReportId(right)),
            'zh-CN'
          ),
        sortDirections: ['ascend', 'descend'],
        render: (_value, record) => {
          const reportId = getRepoLatestReportId(record);
          const displayText = getReportDisplayText(reportId);
          if (!reportId) return <span className="text-slate-300">--</span>;
          return (
            <Link
              href={`/intelligent-analysis/community-experience?project=${encodeURIComponent(
                reportId
              )}`}
              className="overview-table-link"
            >
              {displayText || reportId}
            </Link>
          );
        },
        onHeaderCell: () => ({
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('竞品'),
        dataIndex: 'benchmark_repo_name',
        key: 'benchmark_repo_name',
        width: 220,
        sorter: true,
        sortOrder:
          serverSort.key === 'benchmark_repo_name' ? serverSort.order : null,
        sortDirections: ['ascend', 'descend'],
        render: (value: string) => value || '-',
        onHeaderCell: () => ({
          className: 'sortable-col',
        }),
      },
      {
        title: sortableTitle('总览看板'),
        dataIndex: 'overview_enabled',
        key: 'overview_enabled',
        width: 120,
        sorter: true,
        sortOrder:
          serverSort.key === 'overview_enabled' ? serverSort.order : null,
        sortDirections: ['ascend', 'descend'],
        render: (value: boolean | undefined, record) => {
          const checked = !!value;
          const switchNode = (
            <Switch
              size="small"
              checked={checked}
              checkedChildren="上线"
              unCheckedChildren="下线"
              disabled={!isAdmin}
              loading={overviewUpdatingRepo === record.repo_name}
            />
          );
          if (!isAdmin) {
            return (
              <Tooltip title="需要管理员权限操作">
                <span className="inline-flex">{switchNode}</span>
              </Tooltip>
            );
          }
          return (
            <Popconfirm
              title={checked ? '确认下线总览看板吗？' : '确认上线总览看板吗？'}
              description={`${getRepoDisplayName(record)} 将${
                checked ? '不再纳入' : '纳入'
              }总览看板统计。`}
              okText="确认"
              cancelText="取消"
              onConfirm={() => {
                void handleToggleOverviewEnabled(record, !checked);
              }}
            >
              <span className="inline-flex">{switchNode}</span>
            </Popconfirm>
          );
        },
        onHeaderCell: () => ({
          className: 'sortable-col',
        }),
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        ellipsis: true,
        render: (value: string) => value || '-',
      },
      {
        title: '操作',
        key: 'actions',
        width: 240,
        fixed: screens.xl ? 'right' : undefined,
        render: (_value, record) => {
          const canManageRecord = canEditRepo(record);
          return (
            <Space size={4} wrap>
              {canManageRecord ? (
                <RerunActionButton
                  job={rerunStatusMap[record.project_key]}
                  loading={
                    rerunStatusLoading && !rerunStatusMap[record.project_key]
                  }
                  onOpenRecords={() => {
                    void openRerunRecordsModal(record);
                  }}
                  onOpenRerun={() => {
                    void openRerunModal(record);
                  }}
                />
              ) : null}
              {canManageRecord ? (
                <Button
                  type="link"
                  size="small"
                  className="!h-auto !px-1 !py-0 font-semibold"
                  onClick={() => handleOpenEdit(record)}
                >
                  编辑
                </Button>
              ) : null}
              {isAdmin ? (
                <Popconfirm
                  title="确认删除该仓库吗？"
                  okText="删除"
                  cancelText="取消"
                  onConfirm={() => {
                    void handleDelete(record);
                  }}
                >
                  {/* <Button
                  type="link"
                  danger
                  size="small"
                  className="!h-auto !px-1 !py-0 font-semibold"
                >
                  删除
                </Button> */}
                </Popconfirm>
              ) : null}
            </Space>
          );
        },
      },
    ],
    [
      canEditRepo,
      handleToggleOverviewEnabled,
      isAdmin,
      openRerunModal,
      openRerunRecordsModal,
      rerunStatusLoading,
      rerunStatusMap,
      screens.xl,
      serverSort.key,
      serverSort.order,
      handleDelete,
      handleOpenEdit,
      hardwareFilter,
      hardwareHeaderOptions,
      ownerFilter,
      ownerHeaderOptions,
      overviewUpdatingRepo,
      sortableTitle,
      teamFilter,
      teamHeaderOptions,
    ]
  );

  const rerunTargetRepo = rerunModal.repo
    ? toRepoProgressRow(rerunModal.repo)
    : null;
  const rerunTargetJob =
    (rerunModal.repo && rerunStatusMap[rerunModal.repo.project_key]) ||
    rerunRecords[0];
  const rerunHardware =
    rerunTargetJob?.third_party_hardware ||
    (rerunModal.repo ? getRecordHardwareEnvs(rerunModal.repo)[0] : '') ||
    '--';
  const rerunRecordsTargetRepo = rerunRecordsModal.repo
    ? toRepoProgressRow(rerunRecordsModal.repo)
    : null;
  const rerunRecordsTargetJob =
    (rerunRecordsModal.repo &&
      rerunStatusMap[rerunRecordsModal.repo.project_key]) ||
    rerunRecords[0];
  const rerunRecordsHardware =
    rerunRecordsTargetJob?.third_party_hardware ||
    (rerunRecordsModal.repo
      ? getRecordHardwareEnvs(rerunRecordsModal.repo)[0]
      : '') ||
    '--';
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
              <Spin size="small" />
              <span>正在校验当前登录状态...</span>
            </div>
          </Card>
        ) : !operatorUser ? (
          <Card className="rounded-3xl border border-white/80 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <div className="flex flex-col items-start gap-4 py-6">
              <Alert
                type="info"
                showIcon
                message="请先登录操作账号后查看仓库管理数据"
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
                      仓库管理
                    </Title>
                  </div>
                  {/* <span className="text-sm text-slate-500">
                    当前操作账号：
                    {operatorUser.display_name || operatorUser.username}
                  </span> */}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Input.Search
                  allowClear
                  placeholder="搜索仓库 / 负责人 / 竞品 / 备注"
                  value={keyword}
                  className={searchClassName}
                  onChange={(event) => {
                    setKeyword(event.target.value);
                    setPage(1);
                  }}
                  style={{ width: screens.lg ? 320 : '100%' }}
                />
                <Space wrap className="ml-auto justify-end">
                  <Button
                    icon={<ReloadOutlined />}
                    className={`${controlClassName} px-3 font-semibold text-slate-700`}
                    onClick={() => {
                      void loadOperatorUser();
                      void refetchRepoList();
                    }}
                  >
                    刷新
                  </Button>
                  <Button
                    className={`${controlClassName} px-3 font-semibold text-slate-700`}
                    onClick={() => {
                      void router.push(taskManagementHref);
                    }}
                  >
                    任务管理
                  </Button>
                  <Button
                    className={`${controlClassName} px-3 font-semibold text-slate-700`}
                    onClick={() => setAccessModalOpen(true)}
                  >
                    {operatorUser ? '切换操作账号' : '登录操作账号'}
                  </Button>
                  {isAdmin ? (
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      className="h-8 !rounded-2xl px-3 font-semibold"
                      onClick={handleOpenCreate}
                    >
                      新增仓库
                    </Button>
                  ) : null}
                </Space>
              </div>

              <Tabs
                activeKey={statusFilter}
                items={statusTabItems}
                className="repo-management-status-tabs -mb-2"
                onChange={(nextKey) => {
                  setStatusFilter(nextKey as RepoManagementStatusFilter);
                  setPage(1);
                }}
              />
            </div>

            <div className="w-full">
              <Table<RepoManagementItem>
                className="overview-ant-table"
                style={{ width: '100%' }}
                rowKey={(record) => record.id}
                loading={isLoading || authChecking}
                columns={columns}
                dataSource={repoItems}
                scroll={{ x: '100%' }}
                onChange={handleTableChange}
                pagination={{
                  current: page,
                  pageSize,
                  total: repoListResp?.total || 0,
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
                locale={{ emptyText: '暂无可管理的仓库' }}
              />
            </div>
          </Card>
        )}
      </div>

      <OperatorAccessModal
        open={accessModalOpen}
        title="仓库管理访问校验"
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

      <Modal
        open={editorModalOpen}
        title={editingRecord ? '编辑仓库' : '新增仓库'}
        onCancel={() => {
          setEditorModalOpen(false);
          setEditingRecord(null);
        }}
        destroyOnHidden
        footer={
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className={nativeButtonClassName}
              onClick={() => {
                setEditorModalOpen(false);
                setEditingRecord(null);
              }}
            >
              取消
            </button>
            <button
              type="button"
              className={nativePrimaryButtonClassName}
              disabled={editorSubmitting}
              onClick={() => {
                void form.submit();
              }}
            >
              确定
            </button>
          </div>
        }
        width={720}
        className="[&_.ant-modal-content]:!rounded-3xl [&_.ant-modal-content]:!border [&_.ant-modal-content]:!border-white/80 [&_.ant-modal-content]:!shadow-[0_24px_70px_rgba(15,23,42,0.14)]"
      >
        <Form<RepoEditorValues>
          layout="horizontal"
          form={form}
          labelCol={{ flex: '96px' }}
          wrapperCol={{ flex: '1 1 0' }}
          labelAlign="left"
          colon={false}
          onFinish={(values) => {
            void handleSubmitEditor(values);
          }}
        >
          <div className="grid gap-x-6 gap-y-2 md:grid-cols-2">
            <Form.Item
              label="仓库名称"
              name="repo_name"
              rules={[{ required: true, message: '请输入仓库名称' }]}
            >
              <NativeInput
                placeholder="例如：ops-math"
                disabled={!!editingRecord}
              />
            </Form.Item>

            <Form.Item label="仓库负责人">
              <div className="flex flex-col gap-2">
                <div className="flex min-h-8 items-start gap-2">
                  <Select
                    mode="multiple"
                    value={editorOwnerContacts.map((contact) => contact.name)}
                    placeholder="请选择仓库负责人"
                    className={`${filterSelectClassName} min-w-0 flex-1`}
                    popupMatchSelectWidth={false}
                    popupClassName="overview-select-dropdown"
                    options={editorOwnerOptions.map((option) => ({
                      value: option.value,
                      label: option.label,
                    }))}
                    showSearch
                    optionFilterProp="label"
                    maxTagCount="responsive"
                    onChange={(values) => {
                      setEditorOwnerContacts(
                        values
                          .map((name) => {
                            const contact = editorOwnerOptionMap.get(name);
                            return {
                              name,
                              email: contact?.email || '',
                            };
                          })
                          .filter((contact) => contact.name.trim())
                      );
                    }}
                  />
                  <button
                    type="button"
                    className="inline-flex h-7 shrink-0 items-center justify-center gap-1 rounded-xl px-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
                    onClick={() => setOwnerCreateModalOpen(true)}
                  >
                    <PlusOutlined />
                    新增
                  </button>
                </div>
                <div className="text-xs leading-5 text-slate-500">
                  保存后会同步负责人邮箱账号的仓库权限；如果账号未注册，将自动创建账号并发送通知邮件。
                </div>
              </div>
            </Form.Item>

            <Form.Item label="责任团队" name="team_name">
              <Select
                allowClear
                placeholder="请选择责任团队"
                className={`${filterSelectClassName} w-full`}
                popupMatchSelectWidth={false}
                popupClassName="overview-select-dropdown"
                options={editorTeamOptions.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </Form.Item>

            <Form.Item label="硬件环境" name="hardware_env">
              <Select
                allowClear
                placeholder="请选择硬件环境"
                className={`${filterSelectClassName} w-full`}
                popupMatchSelectWidth={false}
                popupClassName="overview-select-dropdown"
                options={editorHardwareOptions.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </Form.Item>

            <Form.Item label="竞品仓库" name="benchmark_repo_name">
              <Select
                allowClear
                showSearch
                placeholder="请选择竞品仓库"
                className={`${filterSelectClassName} w-full`}
                popupMatchSelectWidth={false}
                popupClassName="overview-select-dropdown"
                optionFilterProp="label"
                options={benchmarkRepoOptions.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </Form.Item>
          </div>

          <Form.Item
            label="备注"
            name="remark"
            className="mt-2"
            labelCol={{ flex: '96px' }}
            wrapperCol={{ flex: '1 1 0' }}
          >
            <NativeTextArea rows={4} placeholder="请输入备注信息" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={ownerCreateModalOpen}
        title="新增负责人"
        onCancel={() => {
          setOwnerCreateModalOpen(false);
          ownerCreateForm.resetFields();
        }}
        footer={
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className={nativeButtonClassName}
              onClick={() => {
                setOwnerCreateModalOpen(false);
                ownerCreateForm.resetFields();
              }}
            >
              取消
            </button>
            <button
              type="button"
              className={nativePrimaryButtonClassName}
              onClick={() => {
                void handleAddOwnerContact();
              }}
            >
              确定
            </button>
          </div>
        }
        destroyOnHidden
        width={420}
      >
        <Form<OwnerContact>
          form={ownerCreateForm}
          layout="horizontal"
          labelCol={{ flex: '72px' }}
          wrapperCol={{ flex: '1 1 0' }}
          labelAlign="left"
          colon={false}
        >
          <Form.Item
            label="名称"
            name="name"
            rules={[{ required: true, message: '请输入负责人名称' }]}
          >
            <NativeInput placeholder="请输入负责人名称" />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: '请输入负责人邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' },
            ]}
          >
            <NativeInput placeholder="请输入负责人邮箱" />
          </Form.Item>
        </Form>
      </Modal>

      <RepoRerunModal
        open={rerunModal.open}
        repo={rerunTargetRepo}
        hardware={rerunHardware}
        operatorUser={operatorUser}
        canCurrentUserOperate={canOperateRepo(operatorUser, rerunModal.repo)}
        rerunRecords={rerunRecords}
        rerunRecordsLoading={rerunRecordsLoading}
        rerunRecordsError={rerunRecordsError}
        cancelingJobId={cancelingRerunJobId}
        shouldShowRerunRecordsTable={shouldShowRerunRecordsTableInRerunModal}
        rerunning={rerunning}
        onCancel={closeRerunModal}
        onSwitchAccount={() => {
          const targetRepo = rerunModal.repo;
          handleOperatorLogout();
          closeRerunModal();
          if (targetRepo) {
            setRerunAccessModal({ open: true, repo: targetRepo });
          }
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
          canOperateRepo(operatorUser, rerunModal.repo) &&
          isActiveRerunJob(record) &&
          !cancelingRerunJobId
        }
        onCancelRecord={(record) => {
          void handleCancelRerunJob(rerunModal.repo, record);
        }}
      />

      <OperatorAccessModal
        open={rerunAccessModal.open}
        title="重跑访问校验"
        confirmText="继续重跑"
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
        onCancel={closeRerunAccess}
        onLogin={() => {
          void handleEnterRerun();
        }}
        onRegister={(values) => {
          void handleOperatorRegister(values);
        }}
        onLogout={handleOperatorLogout}
        onConfirm={() => {
          void handleEnterRerun();
        }}
      />

      <RepoRerunRecordsModal
        open={rerunRecordsModal.open}
        repo={rerunRecordsTargetRepo}
        hardware={rerunRecordsHardware}
        operatorUser={operatorUser}
        canCurrentUserOperate={canOperateRepo(
          operatorUser,
          rerunRecordsModal.repo
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
          canOperateRepo(operatorUser, rerunRecordsModal.repo) &&
          isActiveRerunJob(record) &&
          !cancelingRerunJobId
        }
        onCancelRecord={(record) => {
          void handleCancelRerunJob(rerunRecordsModal.repo, record);
        }}
      />
    </div>
  );
};

export default RepoManagementPage;
