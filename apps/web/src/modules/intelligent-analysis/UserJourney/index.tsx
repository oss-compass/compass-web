import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import CompareReportSummary from './components/CompareReportSummary';
import CompareStepSection from './components/CompareStepSection';
import PageHeader from './components/PageHeader';
import ReportSummaryCard from './components/ReportSummaryCard';
import StepDetailCard from './components/StepDetailCard';
import StepSidebar from './components/StepSidebar';
import {
  loadUserJourneyProjectData,
  resolveUserJourneyProjectFileKey,
  USER_JOURNEY_COMPARE_PROJECT_OPTIONS,
  USER_JOURNEY_PROJECT_KEY_MAP,
  USER_JOURNEY_PROJECT_OPTIONS,
  USER_JOURNEY_PROJECT_VERSION_OPTIONS_MAP,
  UserJourneyProjectFileKey,
} from './rawData';
import { UserJourneyProjectView } from './types';

const getProjectQueryValues = (project: string | string[] | undefined) => {
  if (Array.isArray(project)) {
    return project;
  }

  return project ? [project] : [];
};

const normalizeRequestedProjects = (
  project: string | string[] | undefined
): UserJourneyProjectFileKey[] => {
  const normalizedProjects = getProjectQueryValues(project)
    .map((item) => resolveUserJourneyProjectFileKey(item))
    .filter(
      (item, index, currentProjects) => currentProjects.indexOf(item) === index
    );

  if (normalizedProjects.length) {
    return normalizedProjects.slice(0, 2);
  }

  // 无 project 参数时，默认进入对比模式
  return [
    'cann_ops_math_20260323_1500',
    'cann_ops_math_20260325_2335',
  ] as UserJourneyProjectFileKey[];
};

type UserJourneyProps = {
  hidePageHeaderDeveloperControls?: boolean;
  transparentPageHeader?: boolean;
};

const UserJourney: React.FC<UserJourneyProps> = ({
  hidePageHeaderDeveloperControls = false,
  transparentPageHeader = false,
}) => {
  const router = useRouter();
  const requestedProjectsRaw = useMemo(
    () => normalizeRequestedProjects(router.query.project),
    [router.query.project]
  );
  // 稳定化引用：内容相同时不产生新数组，避免 iframe 场景下 router 重新初始化导致重复加载
  const requestedProjectsKey = requestedProjectsRaw.join(',');
  const requestedProjects = useMemo(
    () => requestedProjectsRaw,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [requestedProjectsKey]
  );
  const [projectViews, setProjectViews] = useState<UserJourneyProjectView[]>(
    []
  );
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [activeStepKey, setActiveStepKey] = useState('');
  const [developerType, setDeveloperType] = useState('');
  const [journeyMode, setJourneyMode] = useState('');
  const compareMode = projectViews.length > 1;
  const primaryProject = projectViews[0]?.data ?? null;
  // 记录上一次已加载的 key，避免 router 对象重新初始化时重复加载相同数据
  const loadedKeyRef = useRef<string>('');

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (loadedKeyRef.current === requestedProjectsKey) {
      return;
    }

    loadedKeyRef.current = requestedProjectsKey;
    let isCancelled = false;

    setLoadingError(null);

    void Promise.all(
      requestedProjects.map(async (projectKey) => ({
        queryKey: projectKey,
        data: await loadUserJourneyProjectData(projectKey),
      }))
    )
      .then((nextProjectViews) => {
        if (isCancelled) {
          return;
        }

        setProjectViews(nextProjectViews);
      })
      .catch((error) => {
        if (isCancelled) {
          return;
        }

        console.error('Failed to load UserJourney report data.', error);
        setLoadingError('报告数据加载失败');
      });

    return () => {
      isCancelled = true;
    };
  }, [requestedProjects, router.isReady]);

  useEffect(() => {
    const firstProject = projectViews[0]?.data;
    const firstStep = firstProject?.journeySteps[0];

    if (!firstProject || !firstStep) {
      return;
    }

    setDeveloperType(firstProject.defaultDeveloperType);
    setJourneyMode(firstProject.defaultJourneyMode);
    setActiveStepKey((currentActiveStepKey) =>
      firstProject.journeySteps.some(
        (step) => step.key === currentActiveStepKey
      )
        ? currentActiveStepKey
        : firstStep.key
    );
  }, [projectViews]);

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
  const currentProjectKey = USER_JOURNEY_PROJECT_KEY_MAP[currentProjectFileKey];
  const currentVersionOptions =
    USER_JOURNEY_PROJECT_VERSION_OPTIONS_MAP[currentProjectKey] ?? [];
  const currentVersion = currentProjectFileKey;

  const availableCompareProjects = USER_JOURNEY_COMPARE_PROJECT_OPTIONS.filter(
    (option) => !requestedProjects.includes(option.value)
  );

  const updateProjectsRoute = (nextProjects: UserJourneyProjectFileKey[]) => {
    void router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          project: nextProjects,
        },
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

    updateProjectsRoute(nextProjects);
  };

  const handleSelectProject = (projectKey: string) => {
    updateProjectsRoute([resolveUserJourneyProjectFileKey(projectKey)]);
  };

  const handleSelectVersion = (_version: string) => {
    updateProjectsRoute([resolveUserJourneyProjectFileKey(_version)]);
  };

  const handleRemoveProject = (projectKey: string) => {
    const nextProjects = requestedProjects.filter(
      (item) => item !== projectKey
    );

    if (!nextProjects.length) {
      return;
    }

    updateProjectsRoute(nextProjects);
  };

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

  const keyMetrics =
    currentStep?.key === 'discover'
      ? currentStep.metrics.slice(0, 4)
      : currentStep?.metrics.slice(0, 3) ?? [];
  const executionPathItems = currentStep?.executionPath ?? [];
  const keyTools = currentStep?.tools.slice(0, 3) ?? [];

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
        projectOptions={USER_JOURNEY_PROJECT_OPTIONS}
        currentProjectKey={currentProjectKey}
        versionOptions={currentVersionOptions}
        currentVersion={currentVersion}
        compareProjectOptions={availableCompareProjects}
        onSelectProject={handleSelectProject}
        onSelectVersion={handleSelectVersion}
        onAddProject={handleAddProject}
        onRemoveProject={handleRemoveProject}
        hideDeveloperControls={hidePageHeaderDeveloperControls}
        transparent={transparentPageHeader}
      />

      <div className="flex min-h-[calc(100vh-136px)] flex-col gap-5 p-5">
        {compareMode ? (
          <>
            <CompareReportSummary projects={projectViews} />
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
              recommendations={primaryProject.recommendations}
              journeySteps={primaryProject.journeySteps}
              reportUpdatedAt={primaryProject.reportUpdatedAt}
              detailReportUrl={primaryProject.reportDetailUrl}
              projectVersion={primaryProject.projectInfo.version}
            />

            <Row gutter={20} wrap={false} className="flex-1 items-stretch">
              <Col flex="260px" className="flex min-w-[260px]">
                <StepSidebar
                  steps={primaryProject.journeySteps}
                  activeStepKey={activeStepKey}
                  onStepChange={setActiveStepKey}
                />
              </Col>

              <Col flex="auto" className="flex min-w-0">
                <StepDetailCard
                  currentStep={currentStep}
                  keyMetrics={keyMetrics}
                  painNarrative={
                    currentStep.painNarrative || currentStep.painSummary
                  }
                  executionPathItems={executionPathItems}
                  keyTools={keyTools}
                  agentVersion={primaryProject.agentVersion}
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
