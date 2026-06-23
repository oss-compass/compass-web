import React, { useEffect, useMemo, useState } from 'react';
import EvidencePanel from './EvidencePanel';
import TaskCardShell, { TaskCardTab } from './TaskCardShell';
import { StepTaskGroup } from '../taskMeta';

type JourneyTaskEvidenceCardProps = {
  group: StepTaskGroup;
  cardIndex: number;
  fileKey?: string;
  stepId?: string;
  cardId?: string;
  summaryExpanded?: boolean;
  onSummaryExpandedChange?: (expanded: boolean) => void;
  painExpanded?: boolean;
  onPainExpandedChange?: (expanded: boolean) => void;
  isLatestReport?: boolean;
  previewMode?: boolean;
  onStepClick?: (toolIds: string[], ctx?: { taskId?: string }) => void;
  sharedSearchEngine?: string;
  hideTabs?: boolean;
};

const JourneyTaskEvidenceCard: React.FC<JourneyTaskEvidenceCardProps> = ({
  group,
  cardIndex,
  fileKey,
  stepId,
  cardId,
  summaryExpanded,
  onSummaryExpandedChange,
  painExpanded,
  onPainExpandedChange,
  isLatestReport = false,
  previewMode = false,
  onStepClick,
  sharedSearchEngine,
  hideTabs = false,
}) => {
  const [activeTaskId, setActiveTaskId] = useState(
    group.variants[0]?.taskId || ''
  );

  useEffect(() => {
    setActiveTaskId(group.variants[0]?.taskId || '');
  }, [group.groupKey, group.variants]);

  const activeVariant =
    (sharedSearchEngine
      ? group.variants.find(
          (variant) => variant.searchEngine === sharedSearchEngine
        )
      : undefined) ??
    group.variants.find((variant) => variant.taskId === activeTaskId) ??
    group.variants[0];

  const tabs = useMemo<TaskCardTab[]>(
    () =>
      group.variants.map((variant) => ({
        key: variant.taskId,
        label: variant.searchEngineLabel || '默认',
        description: variant.description || group.description,
      })),
    [group.description, group.variants]
  );

  const observations = activeVariant?.logTask?.evidence?.observations ?? [];
  const painPoints = activeVariant?.logTask?.evidence?.pain_points ?? [];
  const observationsToolNums =
    activeVariant?.logTask?.evidence?.observations_tool_nums;
  const painPointsToolNums =
    activeVariant?.logTask?.evidence?.pain_points_tool_nums;

  return (
    <TaskCardShell
      cardIndex={cardIndex}
      title={group.displayName}
      description={group.description}
      cardId={cardId}
      tabs={hideTabs ? [] : tabs}
      activeTabKey={activeVariant?.taskId}
      onTabChange={setActiveTaskId}
    >
      <div className="px-5 py-4">
        <EvidencePanel
          key={activeVariant?.taskId || group.groupKey}
          observations={observations}
          pain_points={painPoints}
          observations_tool_nums={observationsToolNums}
          pain_points_tool_nums={painPointsToolNums}
          fileKey={fileKey}
          stepId={activeVariant?.taskId || group.groupKey}
          legacyStepId={group.groupKey}
          legacyStepIds={
            [activeVariant?.taskId, group.groupKey, stepId].filter(
              Boolean
            ) as string[]
          }
          summaryExpanded={summaryExpanded}
          onSummaryExpandedChange={onSummaryExpandedChange}
          painExpanded={painExpanded}
          onPainExpandedChange={onPainExpandedChange}
          highlightTaskId={activeVariant?.taskId}
          onStepClick={onStepClick}
          isLatestReport={isLatestReport}
          previewMode={previewMode}
        />
      </div>
    </TaskCardShell>
  );
};

export default JourneyTaskEvidenceCard;
