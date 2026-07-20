import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import CompareReportSummary from './components/CompareReportSummary';
import CompareStepSection from './components/CompareStepSection';
import PageHeader from './components/PageHeader';
import ReportSummaryCard from './components/ReportSummaryCard';
import StepDetailCard from './components/StepDetailCard';
import StepSidebar from './components/StepSidebar';
import { UserJourneyProjectFileKey } from './rawData';
import {
  usePreviewUserJourneyReport,
  useUserJourneyReport,
} from './hooks/useUserJourneyReport';
import {
  useRegistryData,
  resolveFileKeyFromRegistry,
  type RegistryData,
} from './hooks/useRegistryData';
import { UserJourneyProjectView } from './types';

const ALL_SIG_QUERY_VALUE = '__all__';

const getProjectQueryValues = (project: string | string[] | undefined) => {
  if (Array.isArray(project)) {
    return project;
  }

  return project ? [project] : [];
};

const getSingleQueryValue = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

const getBooleanQueryValue = (value: string | string[] | undefined) => {
  const normalized = getSingleQueryValue(value)?.trim().toLowerCase();
  return normalized === '1' || normalized === 'true';
};

const resolveRequestedProjects = (
  project: string | string[] | undefined,
  registry: RegistryData | undefined
): UserJourneyProjectFileKey[] => {
  if (!registry) return [];

  const normalizedProjects = getProjectQueryValues(project)
    .map((item) => resolveFileKeyFromRegistry(item, registry))
    .filter((item): item is string => item !== null)
    .filter(
      (item, index, currentProjects) => currentProjects.indexOf(item) === index
    ) as UserJourneyProjectFileKey[];

  if (normalizedProjects.length) {
    return normalizedProjects.slice(0, 2);
  }

  return [registry.fallbackProject as UserJourneyProjectFileKey];
};

const getSelectedSigValue = (sig: string | string[] | undefined) => {
  const sigQuery = getSingleQueryValue(sig);
  return sigQuery === ALL_SIG_QUERY_VALUE ? '' : sigQuery;
};

const getOverviewHrefValue = (
  orgQuery: string | string[] | undefined,
  org?: string
) => {
  const orgValue = getSingleQueryValue(orgQuery)?.trim() || org?.trim();
  return orgValue
    ? `/intelligent-analysis/${encodeURIComponent(
        orgValue
      )}/community-experience/overview`
    : '/intelligent-analysis/community-experience/overview';
};

const buildProjectViews = ({
  previewMode,
  previewProjectViews,
  project0Key,
  project0Data,
  project1Key,
  project1Data,
}: {
  previewMode: boolean;
  previewProjectViews: UserJourneyProjectView[];
  project0Key?: UserJourneyProjectFileKey;
  project0Data?: UserJourneyProjectView['data'];
  project1Key?: UserJourneyProjectFileKey;
  project1Data?: UserJourneyProjectView['data'];
}): UserJourneyProjectView[] => {
  if (previewMode) {
    return previewProjectViews;
  }

  const views: UserJourneyProjectView[] = [];
  if (project0Key && project0Data) {
    views.push({ queryKey: project0Key, data: project0Data });
  }
  if (project1Key && project1Data) {
    views.push({ queryKey: project1Key, data: project1Data });
  }
  return views;
};

const getLoadingErrorMessage = ({
  previewMode,
  previewParamsReady,
  isPreviewError,
  isError0,
}: {
  previewMode: boolean;
  previewParamsReady: boolean;
  isPreviewError: boolean;
  isError0: boolean;
}) => {
  if (!previewMode) {
    return isError0 ? '报告数据加载失败' : null;
  }
  if (!previewParamsReady) {
    return '缺少预览参数';
  }
  return isPreviewError ? '预发布报告加载失败' : null;
};

const getInitialProjectSelection = (projectViews: UserJourneyProjectView[]) => {
  const firstProject = projectViews[0]?.data;
  const firstStep = firstProject?.journeySteps[0];

  if (!firstProject || !firstStep) {
    return null;
  }

  const firstEvaluated = firstProject.journeySteps.find(
    (step) => step.panoramaScore !== null && step.panoramaScore !== undefined
  );

  return {
    developerType: firstProject.defaultDeveloperType,
    journeyMode: firstProject.defaultJourneyMode,
    defaultStepKey: (firstEvaluated ?? firstStep).key,
  };
};

const findStepKeyByFocusTask = (
  projectViews: UserJourneyProjectView[],
  focusTaskId: string
) => {
  if (!focusTaskId) {
    return '';
  }

  const primaryProject = projectViews[0]?.data;
  const primaryMatch = primaryProject?.journeySteps.find((step) =>
    (step.executionPath ?? []).some((item) => item.taskId === focusTaskId)
  );
  if (primaryMatch) {
    return primaryMatch.key;
  }

  return (
    projectViews
      .map((project) => project.data)
      .flatMap((project) => project.journeySteps)
      .find((step) =>
        (step.executionPath ?? []).some((item) => item.taskId === focusTaskId)
      )?.key ?? ''
  );
};

const getCurrentStep = (
  primaryProject: UserJourneyProjectView['data'] | null,
  activeStepKey: string
) => {
  if (!primaryProject) {
    return null;
  }

  return (
    primaryProject.journeySteps.find((step) => step.key === activeStepKey) ??
    primaryProject.journeySteps[0] ??
    null
  );
};

const getProjectContext = ({
  previewMode,
  previewReviewId,
  registry,
  requestedProjects,
  primaryProject,
}: {
  previewMode: boolean;
  previewReviewId: string;
  registry: RegistryData | undefined;
  requestedProjects: UserJourneyProjectFileKey[];
  primaryProject: UserJourneyProjectView['data'] | null;
}) => {
  const currentProjectFileKey = requestedProjects[0];
  const effectiveProjectFileKey = previewMode
    ? previewReviewId
    : currentProjectFileKey;
  const currentProjectKey = previewMode
    ? primaryProject?.projectKey ?? ''
    : registry?.fileKeyToProjectKey[currentProjectFileKey] ?? '';
  const currentVersionOptions =
    previewMode || !registry || !currentProjectKey
      ? []
      : registry.versionOptionsMap[currentProjectKey] ?? [];
  const currentVersion = previewMode ? previewReviewId : currentProjectFileKey;
  const isLatestReport =
    !previewMode &&
    !!registry &&
    !!currentProjectKey &&
    !!currentProjectFileKey &&
    registry.defaultFileMap[currentProjectKey] === currentProjectFileKey;
  const availableCompareProjects = (
    registry?.compareProjectOptions ?? []
  ).filter(
    (option) =>
      !requestedProjects.includes(option.value as UserJourneyProjectFileKey)
  );

  return {
    effectiveProjectFileKey,
    currentProjectKey,
    currentVersionOptions,
    currentVersion,
    isLatestReport,
    availableCompareProjects,
  };
};

const getPainFocusTarget = ({
  focusTaskId,
  painId,
  autoOpenPain,
}: {
  focusTaskId: string;
  painId: string;
  autoOpenPain: boolean;
}) =>
  !focusTaskId || !painId
    ? undefined
    : {
        taskId: focusTaskId,
        painId,
        autoOpen: autoOpenPain,
      };

const useUserJourneyRouteState = (
  router: ReturnType<typeof useRouter>,
  previewMode: boolean,
  org: string | undefined,
  registry: RegistryData | undefined
) => {
  const previewReviewId = useMemo(
    () => getSingleQueryValue(router.query.reviewId)?.trim() ?? '',
    [router.query.reviewId]
  );
  const previewAdminToken = useMemo(
    () => getSingleQueryValue(router.query.adminToken)?.trim() ?? '',
    [router.query.adminToken]
  );
  const requestedProjects = useMemo(
    () => resolveRequestedProjects(router.query.project, registry),
    [registry, router.query.project]
  );
  const selectedSig = useMemo(
    () => getSelectedSigValue(router.query.sig),
    [router.query.sig]
  );
  const focusTaskId = useMemo(
    () => getSingleQueryValue(router.query.focusTaskId)?.trim() ?? '',
    [router.query.focusTaskId]
  );
  const painId = useMemo(
    () => getSingleQueryValue(router.query.painId)?.trim() ?? '',
    [router.query.painId]
  );
  const autoOpenPain = useMemo(
    () => getBooleanQueryValue(router.query.autoOpenPain),
    [router.query.autoOpenPain]
  );
  const overviewHref = useMemo(
    () => getOverviewHrefValue(router.query.org, org),
    [org, router.query.org]
  );

  return {
    previewMode,
    previewReviewId,
    previewAdminToken,
    requestedProjects,
    selectedSig,
    focusTaskId,
    painId,
    autoOpenPain,
    overviewHref,
  };
};

const useUserJourneySelectionState = (
  projectViews: UserJourneyProjectView[],
  focusTaskId: string
) => {
  const [activeStepKey, setActiveStepKey] = useState('');
  const [ignoreFocusTaskLock, setIgnoreFocusTaskLock] = useState(false);
  const [developerType, setDeveloperType] = useState('');
  const [journeyMode, setJourneyMode] = useState('');
  const initialSelection = useMemo(
    () => getInitialProjectSelection(projectViews),
    [projectViews]
  );
  const matchedFocusStepKey = useMemo(
    () => findStepKeyByFocusTask(projectViews, focusTaskId),
    [focusTaskId, projectViews]
  );

  useEffect(() => {
    if (!initialSelection) {
      return;
    }

    setDeveloperType(initialSelection.developerType);
    setJourneyMode(initialSelection.journeyMode);
    setActiveStepKey(initialSelection.defaultStepKey);
  }, [initialSelection]);

  useEffect(() => {
    if (!focusTaskId) {
      setIgnoreFocusTaskLock(false);
    }
  }, [focusTaskId]);

  useEffect(() => {
    if (
      !focusTaskId ||
      ignoreFocusTaskLock ||
      !matchedFocusStepKey ||
      matchedFocusStepKey === activeStepKey
    ) {
      return;
    }

    setActiveStepKey(matchedFocusStepKey);
  }, [activeStepKey, focusTaskId, ignoreFocusTaskLock, matchedFocusStepKey]);

  return {
    activeStepKey,
    setActiveStepKey,
    ignoreFocusTaskLock,
    setIgnoreFocusTaskLock,
    developerType,
    setDeveloperType,
    journeyMode,
    setJourneyMode,
  };
};

type UserJourneyProps = {
  hidePageHeaderDeveloperControls?: boolean;
  hidePageHeaderOverviewLink?: boolean;
  transparentPageHeader?: boolean;
  org?: string;
};

const UserJourney: React.FC<UserJourneyProps> = ({
  hidePageHeaderDeveloperControls = false,
  hidePageHeaderOverviewLink = false,
  transparentPageHeader = false,
  org,
}) => {
  const router = useRouter();
  const previewMode = useMemo(
    () => getBooleanQueryValue(router.query.preview),
    [router.query.preview]
  );
  const registry = useRegistryData(org, { enabled: !previewMode });
  const {
    previewReviewId,
    previewAdminToken,
    requestedProjects,
    selectedSig,
    focusTaskId,
    painId,
    autoOpenPain,
    overviewHref,
  } = useUserJourneyRouteState(router, previewMode, org, registry);
  const previewParamsReady =
    !previewMode || (!!previewReviewId && !!previewAdminToken);

  const project0Key = requestedProjects[0] as
    | UserJourneyProjectFileKey
    | undefined;
  const project1Key = requestedProjects[1] as
    | UserJourneyProjectFileKey
    | undefined;
  const reportQueryEnabled = router.isReady && !previewMode;
  const previewQueryEnabled =
    router.isReady && previewMode && previewParamsReady;

  const { data: project0Data, isError: isError0 } = useUserJourneyReport(
    reportQueryEnabled ? project0Key : undefined,
    { enabled: reportQueryEnabled }
  );
  const { data: project1Data } = useUserJourneyReport(
    reportQueryEnabled ? project1Key : undefined,
    { enabled: reportQueryEnabled }
  );
  const { data: previewProjectData, isError: isPreviewError } =
    usePreviewUserJourneyReport(
      previewQueryEnabled ? previewReviewId : undefined,
      previewAdminToken,
      { enabled: previewQueryEnabled }
    );
  const previewProjectViews = useMemo<UserJourneyProjectView[]>(
    () =>
      previewProjectData && previewReviewId
        ? [{ queryKey: previewReviewId, data: previewProjectData }]
        : [],
    [previewProjectData, previewReviewId]
  );

  const projectViews = useMemo(
    () =>
      buildProjectViews({
        previewMode,
        previewProjectViews,
        project0Key,
        project0Data,
        project1Key,
        project1Data,
      }),
    [
      previewMode,
      previewProjectViews,
      project0Key,
      project0Data,
      project1Key,
      project1Data,
    ]
  );
  const {
    activeStepKey,
    setActiveStepKey,
    setIgnoreFocusTaskLock,
    developerType,
    setDeveloperType,
    journeyMode,
    setJourneyMode,
  } = useUserJourneySelectionState(projectViews, focusTaskId);

  const compareMode = projectViews.length > 1;
  const primaryProject = projectViews[0]?.data ?? null;
  const loadingError = getLoadingErrorMessage({
    previewMode,
    previewParamsReady,
    isPreviewError,
    isError0,
  });
  const currentStep = useMemo(
    () => getCurrentStep(primaryProject, activeStepKey),
    [activeStepKey, primaryProject]
  );

  const headerProjects = projectViews.map((project) => ({
    queryKey: project.queryKey,
    name: project.data.projectInfo.name,
    version: project.data.projectInfo.version,
  }));
  const {
    effectiveProjectFileKey,
    currentProjectKey,
    currentVersionOptions,
    currentVersion,
    isLatestReport,
    availableCompareProjects,
  } = useMemo(
    () =>
      getProjectContext({
        previewMode,
        previewReviewId,
        registry,
        requestedProjects,
        primaryProject,
      }),
    [previewMode, previewReviewId, registry, requestedProjects, primaryProject]
  );

  const updateProjectsRoute = (
    nextProjects: UserJourneyProjectFileKey[],
    selection?: { sig?: string }
  ) => {
    const nextQuery = {
      ...router.query,
      project: nextProjects,
    } as Record<string, string | string[]>;

    if (selection && 'sig' in selection) {
      if (selection.sig === '') {
        nextQuery.sig = ALL_SIG_QUERY_VALUE;
      } else if (selection.sig) {
        nextQuery.sig = selection.sig;
      } else {
        delete nextQuery.sig;
      }
    }

    void router.push(
      {
        pathname: router.pathname,
        query: nextQuery,
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const handleAddProject = (projectKey: string) => {
    const nextProjects = resolveRequestedProjects(
      [...requestedProjects, projectKey],
      registry
    );

    updateProjectsRoute(nextProjects, { sig: selectedSig });
  };

  const handleSelectVersion = (
    _version: string,
    selection?: { sig: string }
  ) => {
    const resolved = resolveFileKeyFromRegistry(_version, registry);
    if (resolved) {
      updateProjectsRoute([resolved as UserJourneyProjectFileKey], {
        sig: selection?.sig ?? selectedSig,
      });
    }
  };

  const handleRemoveProject = (projectKey: string) => {
    const nextProjects = requestedProjects.filter(
      (item) => item !== projectKey
    );

    if (!nextProjects.length) {
      return;
    }

    updateProjectsRoute(nextProjects, { sig: selectedSig });
  };

  const clearPainFocusQuery = useCallback(() => {
    const nextQuery = {
      ...router.query,
    } as Record<string, string | string[]>;
    let changed = false;

    (
      ['focusTaskId', 'painId', 'focusPainIndex', 'autoOpenPain'] as const
    ).forEach((key) => {
      if (key in nextQuery) {
        delete nextQuery[key];
        changed = true;
      }
    });

    if (!changed) {
      return;
    }

    void router.replace(
      {
        pathname: router.pathname,
        query: nextQuery,
      },
      undefined,
      {
        shallow: true,
        scroll: false,
      }
    );
  }, [router]);

  const handleStepChange = useCallback(
    (nextStepKey: string) => {
      if (focusTaskId || painId || autoOpenPain) {
        setIgnoreFocusTaskLock(true);
      }
      setActiveStepKey(nextStepKey);
      if (focusTaskId || painId || autoOpenPain) {
        clearPainFocusQuery();
      }
    },
    [
      autoOpenPain,
      clearPainFocusQuery,
      focusTaskId,
      painId,
      setActiveStepKey,
      setIgnoreFocusTaskLock,
    ]
  );

  if (
    !projectViews.length ||
    !primaryProject ||
    (!compareMode && !currentStep)
  ) {
    return (
      <div className="flex min-h-full items-center justify-center px-6 text-sm text-slate-500">
        {loadingError ?? '报告加载中...'}
      </div>
    );
  }

  const keyMetrics = currentStep?.metrics ?? [];
  const executionPathItems = currentStep?.executionPath ?? [];
  const painFocusTarget = getPainFocusTarget({
    focusTaskId,
    painId,
    autoOpenPain,
  });

  if (previewMode && currentStep) {
    return (
      <div className="min-h-full bg-[linear-gradient(180deg,#f8fbff_0%,#eef3fb_100%)]">
        <div className="mx-auto flex min-h-screen max-w-[1520px] flex-col gap-5 p-5">
          <ReportSummaryCard
            projectName={primaryProject.projectInfo.name}
            reportMetadata={primaryProject.reportMetadata}
            overviewMetrics={primaryProject.overviewMetrics}
            journeySteps={primaryProject.journeySteps}
            reportUpdatedAt={primaryProject.reportUpdatedAt}
            detailReportUrl={primaryProject.reportDetailUrl}
            projectVersion={primaryProject.projectInfo.version}
            projectFileKey={effectiveProjectFileKey}
            isLatestReport={false}
            activeStepKey={activeStepKey}
            onStepChange={handleStepChange}
            previewMode
          />
          <Row gutter={20} wrap={false} className="flex-1 items-stretch">
            <Col flex="260px" className="min-w-[260px]">
              <div className="sticky top-5">
                <StepSidebar
                  steps={primaryProject.journeySteps}
                  activeStepKey={activeStepKey}
                  onStepChange={handleStepChange}
                />
              </div>
            </Col>
            <Col flex="auto" className="flex min-w-0">
              <StepDetailCard
                currentStep={currentStep}
                keyMetrics={keyMetrics}
                painNarrative={
                  currentStep.painNarrative || currentStep.painSummary
                }
                executionPathItems={executionPathItems}
                agentVersion={primaryProject.agentVersion}
                projectFileKey={effectiveProjectFileKey}
                isLatestReport={false}
                versionOptions={[]}
                previewMode
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.08),_transparent_24%),linear-gradient(180deg,#f6f8fc_0%,#eef3fb_100%)]">
      <PageHeader
        developerType={developerType}
        developerTypeOptions={primaryProject.developerTypeOptions}
        journeyMode={journeyMode}
        journeyModeOptions={primaryProject.journeyModeOptions}
        onDeveloperTypeChange={setDeveloperType}
        onJourneyModeChange={setJourneyMode}
        projects={headerProjects}
        projectOptions={registry?.projectOptions ?? []}
        currentProjectKey={currentProjectKey}
        versionOptions={currentVersionOptions}
        currentVersion={currentVersion}
        selectedSig={selectedSig}
        compareProjectOptions={availableCompareProjects}
        onSelectVersion={handleSelectVersion}
        onAddProject={handleAddProject}
        onRemoveProject={handleRemoveProject}
        hideDeveloperControls={hidePageHeaderDeveloperControls}
        transparent={transparentPageHeader}
        org={org}
        overviewHref={hidePageHeaderOverviewLink ? undefined : overviewHref}
      />

      <div className="flex min-h-[calc(100vh-136px)] flex-col gap-5 p-5">
        {compareMode ? (
          <>
            <CompareReportSummary
              projects={projectViews}
              activeStepKey={activeStepKey}
              onStepChange={handleStepChange}
            />
            <CompareStepSection
              projects={projectViews}
              activeStepKey={activeStepKey}
              onStepChange={handleStepChange}
              stickyTop={0}
            />
          </>
        ) : currentStep ? (
          <>
            <ReportSummaryCard
              projectName={primaryProject.projectInfo.name}
              reportMetadata={primaryProject.reportMetadata}
              overviewMetrics={primaryProject.overviewMetrics}
              journeySteps={primaryProject.journeySteps}
              reportUpdatedAt={primaryProject.reportUpdatedAt}
              detailReportUrl={primaryProject.reportDetailUrl}
              projectVersion={primaryProject.projectInfo.version}
              projectFileKey={effectiveProjectFileKey}
              isLatestReport={isLatestReport}
              activeStepKey={activeStepKey}
              onStepChange={handleStepChange}
              previewMode={previewMode}
            />

            <Row gutter={20} wrap={false} className="flex-1 items-stretch">
              <Col flex="260px" className="min-w-[260px]">
                <div className="sticky top-5">
                  <StepSidebar
                    steps={primaryProject.journeySteps}
                    activeStepKey={activeStepKey}
                    onStepChange={handleStepChange}
                  />
                </div>
              </Col>

              <Col flex="auto" className="flex min-w-0">
                <StepDetailCard
                  currentStep={currentStep}
                  keyMetrics={keyMetrics}
                  painNarrative={
                    currentStep.painNarrative || currentStep.painSummary
                  }
                  executionPathItems={executionPathItems}
                  agentVersion={primaryProject.agentVersion}
                  projectFileKey={effectiveProjectFileKey}
                  isLatestReport={isLatestReport}
                  painFocusTarget={painFocusTarget}
                  onPainFocusHandled={clearPainFocusQuery}
                  versionOptions={currentVersionOptions}
                  previewMode={previewMode}
                />
              </Col>
            </Row>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default UserJourney;
