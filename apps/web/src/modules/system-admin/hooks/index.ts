// 导出所有系统管理相关的 hooks

// Dashboard 相关的 API hooks
export {
  useAdminApi,
  useStatsData,
  useVisitData,
  useUserData,
  useDurationData,
  useServiceVisitData,
  useUserReferrerData,
  useOssSelectionClickData,
  useCollectionSearchRankData,
  useDatahubApiRankData,
  useDatahubArchiveRankData,
  useUserRegionData,
  useServiceVisitTrendData,
  useOsSituationVisitData,
  useOssSelectionSearchData,
  useUserListData,
  useDataHubRestApiList,
  useDataHubRestApiTable,
  useDataHubArchiveDownloadTable,
  useDatasetList,
  // 类型导出
  type OssSelectionSearchItem,
  type OssSelectionSearchResponse,
  type UserListApiResponse,
  type DataHubUserUsageItem,
  type DataHubUserUsageResponse,
  type DataHubRestApiItem,
  type DataHubRestApiTableItem,
  type DataHubRestApiTableResponse,
  type DataHubArchiveDownloadTableItem,
  type DataHubArchiveDownloadTableResponse,
  type DatasetItem,
} from './useAdminApi';

// SystemMonitor 相关的 API hooks
export {
  useServerList,
  useServerMetricData,
  // 类型导出
  type ApiServerData,
  type MetricTableRequest,
  type MetricTableResponse,
} from './useServerApi';

// 日期参数处理 hook
export { default as useDateParams } from './useDateParams';

// EcosystemEvaluationMonitor API hooks
export {
  useProjectUpdateCountData,
  useProjectPlatformCountData,
  useRepositoryUpdateOverview,
  useRepositoryPlatformOverview,
  useCommunityUpdateOverview,
  useCommunityPlatformOverview,
  useRepositoryList,
  useCommunityList,
  RepositoryTimeType,
  RepositoryPlatformType,
  CommunityTimeType,
  CommunityPlatformType,
  type UpdateOverviewResponse,
  type PlatformOverviewResponse,
  type RepositoryListRequest,
  type RepositoryListItem,
  type RepositoryListResponse,
  type CommunityListRequest,
  type CommunityListItem,
  type CommunityListResponse,
} from './useEcosystemApi';

export {
  useSelectionUpdateOverviewData,
  useSelectionPlatformOverviewData,
  useIncubationUpdateOverview,
  useIncubationPlatformOverview,
  useGraduationUpdateOverview,
  useGraduationPlatformOverview,
  useIncubationProjectList,
  useGraduationProjectList,
  SelectionProjectType,
  TimeType,
  PlatformType,
  PROJECT_STATE_MAP,
  type SelectionUpdateOverviewResponse,
  type SelectionPlatformOverviewResponse,
  type ProjectListRequest,
  type ProjectListItem,
  type ProjectListResponse,
  type LoginBind,
  type BaseRequestParams,
  type OverviewRequestParams,
} from './useSelectionApi';
