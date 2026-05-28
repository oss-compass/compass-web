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
import { useUserJourneyReport } from './hooks/useUserJourneyReport';
import {
  useRegistryData,
  resolveFileKeyFromRegistry,
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

type UserJourneyProps = {
  hidePageHeaderDeveloperControls?: boolean;
  transparentPageHeader?: boolean;
  org?: string;
};

const UserJourney: React.FC<UserJourneyProps> = ({
  hidePageHeaderDeveloperControls = false,
  transparentPageHeader = false,
  org,
}) => {
  const router = useRouter();
  const registry = useRegistryData(org);

  const normalizeRequestedProjects = useMemo(
    () =>
      (project: string | string[] | undefined): UserJourneyProjectFileKey[] => {
        if (!registry) return [];

        const normalizedProjects = getProjectQueryValues(project)
          .map((item) => resolveFileKeyFromRegistry(item, registry))
          .filter((item): item is string => item !== null)
          .filter(
            (item, index, currentProjects) =>
              currentProjects.indexOf(item) === index
          ) as UserJourneyProjectFileKey[];

        if (normalizedProjects.length) {
          return normalizedProjects.slice(0, 2);
        }

        // URL 无 project 参数时，使用 API 返回的默认项目
        return [registry.fallbackProject as UserJourneyProjectFileKey];
      },
    [registry]
  );

  const requestedProjectsRaw = useMemo(
    () => normalizeRequestedProjects(router.query.project),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.query.project, normalizeRequestedProjects]
  );
  const requestedProjectsKey = requestedProjectsRaw.join(',');
  const requestedProjects = useMemo(
    () => requestedProjectsRaw,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [requestedProjectsKey]
  );
  const selectedSig = useMemo(() => {
    const sigQuery = getSingleQueryValue(router.query.sig);
    if (sigQuery === ALL_SIG_QUERY_VALUE) {
      return '';
    }
    return sigQuery;
  }, [router.query.sig]);
  const focusTaskId = useMemo(
    () => getSingleQueryValue(router.query.focusTaskId)?.trim() ?? '',
    [router.query.focusTaskId]
  );
  const painId = useMemo(
    () => getSingleQueryValue(router.query.painId)?.trim() ?? '',
    [router.query.painId]
  );
  const autoOpenPain = useMemo(() => {
    const raw = getSingleQueryValue(router.query.autoOpenPain);
    return raw === '1' || raw === 'true';
  }, [router.query.autoOpenPain]);
  const overviewHref = useMemo(() => {
    const orgValue =
      getSingleQueryValue(router.query.org)?.trim() || org?.trim();
    return orgValue
      ? `/intelligent-analysis/${encodeURIComponent(
          orgValue
        )}/community-experience/overview`
      : '/intelligent-analysis/community-experience/overview';
  }, [org, router.query.org]);
  const [activeStepKey, setActiveStepKey] = useState('');
  const [developerType, setDeveloperType] = useState('');
  const [journeyMode, setJourneyMode] = useState('');

  const project0Key = requestedProjects[0] as
    | UserJourneyProjectFileKey
    | undefined;
  const project1Key = requestedProjects[1] as
    | UserJourneyProjectFileKey
    | undefined;

  const { data: project0Data, isError: isError0 } = useUserJourneyReport(
    router.isReady ? project0Key : undefined
  );
  const { data: project1Data } = useUserJourneyReport(
    router.isReady ? project1Key : undefined
  );

  const projectViews = useMemo<UserJourneyProjectView[]>(() => {
    const views: UserJourneyProjectView[] = [];
    if (project0Key && project0Data) {
      views.push({ queryKey: project0Key, data: project0Data });
    }
    if (project1Key && project1Data) {
      views.push({ queryKey: project1Key, data: project1Data });
    }
    return views;
  }, [project0Key, project0Data, project1Key, project1Data]);

  const compareMode = projectViews.length > 1;
  const primaryProject = projectViews[0]?.data ?? null;
  const loadingError = isError0 ? '报告数据加载失败' : null;

  useEffect(() => {
    const firstProject = projectViews[0]?.data;
    const firstStep = firstProject?.journeySteps[0];

    if (!firstProject || !firstStep) {
      return;
    }

    setDeveloperType(firstProject.defaultDeveloperType);
    setJourneyMode(firstProject.defaultJourneyMode);

    // 默认选中第一个有评估的步骤；若全部未评估则选第一个
    const firstEvaluated = firstProject.journeySteps.find(
      (s) => s.panoramaScore !== null && s.panoramaScore !== undefined
    );
    const defaultStepKey = (firstEvaluated ?? firstStep).key;

    setActiveStepKey(defaultStepKey);
  }, [projectViews]);

  useEffect(() => {
    if (!focusTaskId) {
      return;
    }

    const matchedStep = projectViews
      .map((project) => project.data)
      .find(Boolean)
      ?.journeySteps.find((step) =>
        (step.executionPath ?? []).some((item) => item.taskId === focusTaskId)
      );

    const matchedAcrossProjects =
      matchedStep ??
      projectViews
        .map((project) => project.data)
        .flatMap((project) => project.journeySteps)
        .find((step) =>
          (step.executionPath ?? []).some((item) => item.taskId === focusTaskId)
        );

    if (matchedAcrossProjects && matchedAcrossProjects.key !== activeStepKey) {
      setActiveStepKey(matchedAcrossProjects.key);
    }
  }, [activeStepKey, focusTaskId, projectViews]);

  const currentStep = useMemo(() => {
    if (!primaryProject) {
      return null;
    }

    return (
      primaryProject.journeySteps.find((step) => step.key === activeStepKey) ??
      primaryProject.journeySteps[0] ??
      null
    );
  }, [activeStepKey, primaryProject]);

  const headerProjects = projectViews.map((project) => ({
    queryKey: project.queryKey,
    name: project.data.projectInfo.name,
    version: project.data.projectInfo.version,
  }));
  const currentProjectFileKey = requestedProjects[0];
  const currentProjectKey =
    registry?.fileKeyToProjectKey[currentProjectFileKey] ?? '';
  const currentVersionOptions =
    registry?.versionOptionsMap[currentProjectKey] ?? [];
  const currentVersion = currentProjectFileKey;
  const isLatestReport = useMemo(() => {
    if (!registry || !currentProjectKey || !currentProjectFileKey) return false;
    const latest = registry.defaultFileMap[currentProjectKey];
    return !!latest && latest === currentProjectFileKey;
  }, [currentProjectFileKey, currentProjectKey, registry]);

  const availableCompareProjects = (
    registry?.compareProjectOptions ?? []
  ).filter(
    (option) =>
      !requestedProjects.includes(option.value as UserJourneyProjectFileKey)
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
    const nextProjects = normalizeRequestedProjects([
      ...requestedProjects,
      projectKey,
    ]);

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
      }
    );
  }, [router]);

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
  const painFocusTarget =
    !focusTaskId || !painId
      ? undefined
      : {
          taskId: focusTaskId,
          painId,
          autoOpen: autoOpenPain,
        };

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
        overviewHref={overviewHref}
      />

      <div className="flex min-h-[calc(100vh-136px)] flex-col gap-5 p-5">
        {compareMode ? (
          <>
            <CompareReportSummary
              projects={projectViews}
              activeStepKey={activeStepKey}
              onStepChange={setActiveStepKey}
            />
            <CompareStepSection
              projects={projectViews}
              activeStepKey={activeStepKey}
              onStepChange={setActiveStepKey}
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
              projectFileKey={currentProjectFileKey}
              isLatestReport={isLatestReport}
              activeStepKey={activeStepKey}
              onStepChange={setActiveStepKey}
            />

            <Row gutter={20} wrap={false} className="flex-1 items-stretch">
              <Col flex="260px" className="min-w-[260px]">
                <div className="sticky top-5">
                  <StepSidebar
                    steps={primaryProject.journeySteps}
                    activeStepKey={activeStepKey}
                    onStepChange={setActiveStepKey}
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
                  projectFileKey={currentProjectFileKey}
                  isLatestReport={isLatestReport}
                  painFocusTarget={painFocusTarget}
                  onPainFocusHandled={clearPainFocusQuery}
                  versionOptions={currentVersionOptions}
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
