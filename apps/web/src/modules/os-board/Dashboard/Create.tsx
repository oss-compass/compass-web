import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import Center from '@common/components/Layout/Center';
import { Button } from '@oss-compass/ui';
import Dialog from '@common/components/Dialog';
import { useSnapshot } from 'valtio';
import { useMetricSetListQuery } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import { actions, osBoardState } from '../state';
import type { OsBoardDashboardType, OsBoardTimeRangePreset } from '../types';
import ProjectSearchInput from './components/ProjectSearchInput';
import { SearchType } from '@modules/home/Banner/Search/types';
import {
  MetricSelectionModal,
  DraggableMetricList,
} from './components/MetricSelector';
import { useEffect } from 'react';
import {
  useCollaborationDevelopmentIndex,
  useCommunityServiceAndSupport,
  useCommunityActivity,
  useOrganizationsActivity,
  useContributorMilestonePersona,
  useContributorRolePersona,
  useContributorDomainPersona,
} from '@modules/analyze/components/SideBar/config';
import { MODEL_METRICS_MAP, MODEL_CONFIGS } from './config/modelMetrics';
import ModelSelectionModal from './components/ModelSelector/ModelSelectionModal';

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="border-b py-6 last:border-b-0">
      <div className="mb-4 text-base font-semibold">{title}</div>
      {children}
    </div>
  );
};

const CreateDashboard = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const snap = useSnapshot(osBoardState);

  const [name, setName] = useState('');
  const [type, setType] = useState<OsBoardDashboardType>('project');
  const [compareMode, setCompareMode] = useState(false);

  // Split state for projects and competitors by dashboard type
  const [repoProjects, setRepoProjects] = useState<string[]>([]);
  const [communityProjects, setCommunityProjects] = useState<string[]>([]);
  const [repoCompetitors, setRepoCompetitors] = useState<string[]>([]);
  const [communityCompetitors, setCommunityCompetitors] = useState<string[]>(
    []
  );

  const projects = type === 'project' ? repoProjects : communityProjects;
  const setProjects = (vals: string[]) => {
    if (type === 'project') setRepoProjects(vals);
    else setCommunityProjects(vals);
  };

  const competitors =
    type === 'project' ? repoCompetitors : communityCompetitors;
  const setCompetitors = (vals: string[]) => {
    if (type === 'project') setRepoCompetitors(vals);
    else setCommunityCompetitors(vals);
  };

  const [metricIds, setMetricIds] = useState<string[]>([]);
  // 记录手动添加的指标（非模型带来的）
  const [manualMetricIds, setManualMetricIds] = useState<string[]>([]);

  const [confirmCancel, setConfirmCancel] = useState(false);
  const [metricModalOpen, setMetricModalOpen] = useState(false);

  // 模型选择相关状态
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [modelModalOpen, setModelModalOpen] = useState(false);

  // 模型指标映射
  const collaborationDevelopmentIndex = useCollaborationDevelopmentIndex();
  const communityServiceAndSupport = useCommunityServiceAndSupport();
  const communityActivity = useCommunityActivity();
  const organizationsActivity = useOrganizationsActivity();
  const contributorMilestonePersona = useContributorMilestonePersona();
  const contributorRolePersona = useContributorRolePersona();
  const contributorDomainPersona = useContributorDomainPersona();

  const allModels = [
    collaborationDevelopmentIndex,
    communityServiceAndSupport,
    communityActivity,
    organizationsActivity,
    contributorMilestonePersona,
    contributorRolePersona,
    contributorDomainPersona,
  ];

  // 当模型选择变化时更新指标
  useEffect(() => {
    // 计算选中模型的所有指标
    const modelBasedMetrics: string[] = [];
    selectedModels.forEach((modelId) => {
      const metrics = MODEL_METRICS_MAP[modelId];
      if (metrics) {
        modelBasedMetrics.push(...metrics);
      }
    });

    // 合并手动选择和模型选择的指标，去重
    const allMetrics = [...manualMetricIds, ...modelBasedMetrics];
    const uniqueMetrics = Array.from(new Set(allMetrics));

    setMetricIds(uniqueMetrics);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedModels, manualMetricIds]);

  // 使用 GraphQL API 获取指标数据
  const { data: metricData } = useMetricSetListQuery(
    gqlClient,
    {},
    { staleTime: 5 * 60 * 1000 }
  );

  // 合并本地指标和远程指标
  const selectableMetrics = useMemo(() => {
    // 本地指标
    const localMetrics = [...snap.metrics, ...snap.derivedMetrics];

    // 远程指标
    const remoteMetrics = metricData?.metricSetOverview || [];

    // 将远程指标转换为本地格式
    const convertedRemoteMetrics = remoteMetrics.map((m) => ({
      id: m.ident || String(m.id), // 使用 ident 作为 id 以匹配初始值
      name: m.ident || '',
      category: m.category || '',
      unit: '',
    }));

    // 合并指标，避免重复
    const allMetrics = [...localMetrics, ...convertedRemoteMetrics];
    const uniqueMetrics = allMetrics.filter(
      (m, index, self) => index === self.findIndex((mm) => mm.id === m.id)
    );

    return uniqueMetrics;
  }, [snap.metrics, snap.derivedMetrics, metricData]);

  const validateAndCreate = () => {
    const errors: string[] = [];

    if (!name.trim()) {
      errors.push(t('os_board:create.validation.name_required'));
    }
    if (!type) {
      errors.push(t('os_board:create.validation.type_required'));
    }
    if (projects.length === 0) {
      errors.push(t('os_board:create.validation.projects_required'));
    }
    if (metricIds.length === 0) {
      errors.push(t('os_board:create.validation.metrics_required'));
    }

    if (errors.length > 0) {
      const errorMsg = `${t('os_board:create.validation.title')} ${errors.join(
        '、'
      )}`;
      toast.error(errorMsg, { duration: 4000 });
      return;
    }

    const dashboard = actions.createDashboard({
      name: name.trim(),
      type,
      config: {
        projects,
        competitorProjects: competitors,
        metrics: metricIds,
        compareMode,
        timeRange: { preset: '30d' },
      },
    });
    router.push(`/os-board/dashboard/${dashboard.id}`);
  };

  return (
    <div className="py-12 text-sm">
      <Center className="md:px-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="text-xl font-semibold">
            <Link href="/os-board">{t('os_board:home.title')}</Link> /
            <span className="ml-2">{t('os_board:create.title')}</span>
          </div>
          <Button
            intent="text"
            size="sm"
            onClick={() => setConfirmCancel(true)}
          >
            {t('common:btn.cancel')}
          </Button>
        </div>

        <div className="border bg-white p-6 md:p-4">
          <Section
            title={`${t('os_board:create.steps.basic')} & ${t(
              'os_board:create.steps.scope'
            )}`}
          >
            <div className="grid grid-cols-1 gap-6">
              <div>
                <div className="mb-2 font-semibold">
                  {t('os_board:create.basic.name')}
                </div>
                <input
                  className="w-full border px-3 py-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('os_board:create.basic.name_placeholder')}
                />
              </div>
              <div>
                <div className="mb-2 font-semibold">
                  {t('os_board:create.basic.type')}
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    className={
                      type === 'project'
                        ? 'border border-blue-600 bg-blue-50 px-3 py-2'
                        : 'border px-3 py-2'
                    }
                    onClick={() => setType('project')}
                    type="button"
                  >
                    {t('os_board:dashboard.type.project')}
                  </button>
                  <button
                    className={
                      type === 'community'
                        ? 'border border-blue-600 bg-blue-50 px-3 py-2'
                        : 'border px-3 py-2'
                    }
                    onClick={() => setType('community')}
                    type="button"
                  >
                    {t('os_board:dashboard.type.community')}
                  </button>
                </div>
              </div>
              <div>
                <div className="mb-2 font-semibold">
                  {t('os_board:create.scope.projects')}
                </div>
                <ProjectSearchInput
                  values={projects}
                  onChange={setProjects}
                  placeholder={
                    type === 'project'
                      ? t('os_board:create.scope.placeholder_repo')
                      : t('os_board:create.scope.placeholder_community')
                  }
                  searchLevel={type === 'project' ? 'repo' : 'community'}
                />
              </div>
              <div>
                <div className="mb-2 font-semibold">
                  {t('os_board:create.basic.compare')}
                </div>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={compareMode}
                    onChange={(e) => setCompareMode(e.target.checked)}
                  />
                  <span>{t('os_board:create.basic.compare_help')}</span>
                </label>
              </div>
              {compareMode && (
                <div>
                  <div className="mb-2 font-semibold">
                    {t('os_board:create.scope.competitors')}
                  </div>
                  <ProjectSearchInput
                    values={competitors}
                    onChange={setCompetitors}
                    placeholder={
                      type === 'project'
                        ? t('os_board:create.scope.placeholder_repo')
                        : t('os_board:create.scope.placeholder_community')
                    }
                    searchLevel={type === 'project' ? 'repo' : 'community'}
                  />
                </div>
              )}
            </div>
          </Section>

          <Section title={t('os_board:create.steps.metrics')}>
            <div className="mb-4 flex gap-3">
              <Button
                intent="primary"
                size="sm"
                onClick={() => setMetricModalOpen(true)}
              >
                {t('os_board:create.metrics.add_metric')}
              </Button>
              <Button
                intent="secondary"
                size="sm"
                onClick={() => setModelModalOpen(true)}
              >
                选择模型（可选）
              </Button>
            </div>

            {/* 展示选中模型列表 */}
            {selectedModels.length > 0 && (
              <div className="mb-4">
                <div className="mb-2 font-semibold">
                  {t('os_board:create.model_selection.selected_models')} (
                  {selectedModels.length})
                </div>
                <div className="space-y-2">
                  {selectedModels.map((modelId) => {
                    const model = allModels.find((m) => m.id === modelId);
                    if (!model) return null;

                    return (
                      <div
                        key={modelId}
                        className="flex items-center justify-between border bg-white px-3 py-2"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium">
                            {model.name}
                          </div>
                          <div className="truncate text-xs text-[#585858]">
                            包含 {model.groups.length} 个指标：
                            {model.groups.map((m) => m.name).join('、')}
                          </div>
                        </div>
                        <button
                          className="ml-2 flex-shrink-0 border px-2 py-1 text-xs hover:bg-gray-50"
                          type="button"
                          onClick={() => {
                            const newSelectedModels = selectedModels.filter(
                              (id) => id !== modelId
                            );
                            setSelectedModels(newSelectedModels);
                          }}
                        >
                          {t('common:btn.delete')}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div>
              <div className="mb-2 font-semibold">
                {t('os_board:create.metrics.selected')}（{metricIds.length}）
              </div>
              <DraggableMetricList
                metricIds={metricIds}
                allMetrics={selectableMetrics}
                onReorder={(newIds) => {
                  // 重新排序时，需要更新 manualMetricIds
                  // 过滤掉模型带来的指标
                  const allModelMetrics: string[] = [];
                  selectedModels.forEach((modelId) => {
                    const metrics = MODEL_METRICS_MAP[modelId];
                    if (metrics) {
                      allModelMetrics.push(...metrics);
                    }
                  });
                  const newManualMetrics = newIds.filter(
                    (id) => !allModelMetrics.includes(id)
                  );
                  setManualMetricIds(newManualMetrics);
                }}
                onDelete={(id) => {
                  // 删除指标时，检查是否是手动添加的
                  if (manualMetricIds.includes(id)) {
                    setManualMetricIds(manualMetricIds.filter((x) => x !== id));
                  }
                  // 如果是模型带来的指标，不允许删除，需要删除模型
                }}
              />
            </div>
          </Section>
        </div>

        <div className="mt-6 flex justify-end">
          <Button size="sm" onClick={validateAndCreate}>
            {t('common:btn.confirm')}
          </Button>
        </div>
      </Center>

      <Dialog
        open={confirmCancel}
        dialogTitle={t('os_board:create.cancel.title')}
        dialogContent={
          <div className="w-96">{t('os_board:create.cancel.body')}</div>
        }
        dialogActions={
          <div className="flex">
            <Button
              intent="text"
              size="sm"
              onClick={() => setConfirmCancel(false)}
            >
              {t('common:btn.cancel')}
            </Button>
            <Button
              intent="primary"
              size="sm"
              className="ml-4"
              onClick={() => {
                setConfirmCancel(false);
                router.push('/os-board');
              }}
            >
              {t('common:btn.confirm')}
            </Button>
          </div>
        }
        handleClose={() => setConfirmCancel(false)}
      />

      <MetricSelectionModal
        open={metricModalOpen}
        onClose={() => setMetricModalOpen(false)}
        selectedIds={manualMetricIds}
        onConfirm={(newIds) => {
          console.log('MetricSelectionModal onConfirm:', newIds);
          // 更新手动选择的指标列表
          setManualMetricIds(newIds);
        }}
      />

      <ModelSelectionModal
        open={modelModalOpen}
        onClose={() => setModelModalOpen(false)}
        selectedModelIds={selectedModels}
        onConfirm={(newModelIds) => {
          setSelectedModels(newModelIds);
        }}
      />
    </div>
  );
};

export default CreateDashboard;
