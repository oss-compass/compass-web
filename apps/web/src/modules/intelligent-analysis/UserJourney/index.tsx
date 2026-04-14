import React, { useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import CompareReportSummary from './components/CompareReportSummary';
import CompareStepSection from './components/CompareStepSection';
import PageHeader from './components/PageHeader';
import ReportSummaryCard from './components/ReportSummaryCard';
import StepDetailCard from './components/StepDetailCard';
import StepSidebar from './components/StepSidebar';
import {
  resolveUserJourneyProjectFileKey,
  USER_JOURNEY_COMPARE_PROJECT_OPTIONS,
  USER_JOURNEY_PROJECT_KEY_MAP,
  USER_JOURNEY_PROJECT_OPTIONS,
  USER_JOURNEY_PROJECT_VERSION_OPTIONS_MAP,
  UserJourneyProjectFileKey,
} from './rawData';
import { useUserJourneyReport } from './hooks/useUserJourneyReport';
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

  return normalizedProjects.length
    ? normalizedProjects.slice(0, 2)
    : [resolveUserJourneyProjectFileKey(undefined)];
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

  const keyMetrics = currentStep?.metrics ?? [];
  const executionPathItems = currentStep?.executionPath ?? [];

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
              journeySteps={primaryProject.journeySteps}
              reportUpdatedAt={primaryProject.reportUpdatedAt}
              detailReportUrl={primaryProject.reportDetailUrl}
              projectVersion={primaryProject.projectInfo.version}
              projectFileKey={currentProjectFileKey}
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
