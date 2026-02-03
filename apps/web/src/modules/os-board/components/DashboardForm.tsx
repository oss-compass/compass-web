import React, { forwardRef, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@oss-compass/ui';
import type { OsBoardDashboardType } from '../types';
import ProjectSearchInput from './ProjectSearchInput';
import { MetricSelectionModal, DraggableMetricList } from './MetricSelector';
import { useDashboardMetrics } from './useDashboardMetrics';
import {
  useDashboardFormState,
  DashboardFormValues,
} from './useDashboardFormState';

export type { DashboardFormValues };

export interface DashboardFormProps {
  initialValues?: Partial<DashboardFormValues>;
  mode: 'create' | 'edit';
  onSubmit: (values: DashboardFormValues) => void;
  onCancel: () => void;
}

export interface DashboardFormRef {
  submit: () => void;
}

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

const DashboardForm = forwardRef<DashboardFormRef, DashboardFormProps>(
  ({ initialValues, mode, onSubmit, onCancel }, ref) => {
    const { t } = useTranslation();

    const {
      metricIds,
      hiddenMetricIds,
      manualMetricIds,
      setManualMetricIds,
      metricModalOpen,
      setMetricModalOpen,
      selectableMetrics,
      handleReorder,
      handleDelete,
      handleHide,
      metricToModelMap,
    } = useDashboardMetrics({ initialValues });

    const {
      name,
      setName,
      type,
      setType,
      compareMode,
      setCompareMode,
      projects,
      setProjects,
      competitors,
      setCompetitors,
      validateAndSubmit,
    } = useDashboardFormState({
      initialValues,
      onSubmit,
      metricIds,
      selectedModels: [],
      hiddenMetricIds,
      metricToModelMap,
    });

    useImperativeHandle(ref, () => ({
      submit: validateAndSubmit,
    }));

    return (
      <>
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
                    type === 'repo'
                      ? 'border border-blue-600 bg-blue-50 px-3 py-2'
                      : 'border px-3 py-2'
                  }
                  onClick={() =>
                    !mode || mode === 'create' ? setType('repo') : undefined
                  }
                  type="button"
                  disabled={mode === 'edit'}
                  style={
                    mode === 'edit'
                      ? { opacity: 0.6, cursor: 'not-allowed' }
                      : {}
                  }
                >
                  {t('os_board:dashboard.type.repo')}
                </button>
                <button
                  className={
                    type === 'community'
                      ? 'border border-blue-600 bg-blue-50 px-3 py-2'
                      : 'border px-3 py-2'
                  }
                  onClick={() =>
                    !mode || mode === 'create'
                      ? setType('community')
                      : undefined
                  }
                  type="button"
                  disabled={mode === 'edit'}
                  style={
                    mode === 'edit'
                      ? { opacity: 0.6, cursor: 'not-allowed' }
                      : {}
                  }
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
                  type === 'repo'
                    ? t('os_board:create.scope.placeholder_repo')
                    : t('os_board:create.scope.placeholder_community')
                }
                searchLevel={type === 'repo' ? 'repo' : 'community'}
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
                    type === 'repo'
                      ? t('os_board:create.scope.placeholder_repo')
                      : t('os_board:create.scope.placeholder_community')
                  }
                  searchLevel={type === 'repo' ? 'repo' : 'community'}
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
          </div>

          <div>
            <div className="mb-2 font-semibold">
              {t('os_board:create.metrics.selected')}（{metricIds.length}）
            </div>
            <DraggableMetricList
              metricIds={metricIds}
              hiddenMetricIds={hiddenMetricIds}
              allMetrics={selectableMetrics}
              onReorder={handleReorder}
              onDelete={handleDelete}
              onHide={handleHide}
            />
          </div>
        </Section>

        <MetricSelectionModal
          open={metricModalOpen}
          onClose={() => setMetricModalOpen(false)}
          selectedIds={manualMetricIds}
          onConfirm={(newIds) => {
            // 更新手动选择的指标列表
            setManualMetricIds(newIds);
          }}
        />
        {/* <ModelSelectionModal
          open={modelModalOpen}
          onClose={() => setModelModalOpen(false)}
          selectedModelIds={selectedModels}
          onConfirm={(newModelIds) => {
            const added = newModelIds.filter(
              (id) => !selectedModels.includes(id)
            );
            if (added.length > 0) {
              setNewlyAddedModels(added);
            }
            setSelectedModels(newModelIds);
          }}
        /> */}
      </>
    );
  }
);

DashboardForm.displayName = 'DashboardForm';

export default DashboardForm;
