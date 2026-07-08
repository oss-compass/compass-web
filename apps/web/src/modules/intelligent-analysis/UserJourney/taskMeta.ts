import { LogData, LogTask } from './hooks/useLogData';
import { ActionDetailRecord, JourneyStep } from './types';
import taskDefinitions from './rawData/task_definitions.json';

type TaskDefinition = {
  task_id: string;
  name: string;
  phase: string;
  description: string;
  base_task_id?: string;
  search_engine?: string;
};

export type TaskDisplayMeta = {
  taskId?: string;
  baseTaskId?: string;
  searchEngine?: string;
  searchEngineLabel?: string;
  displayName: string;
  description: string;
};

export type StepTaskVariant = TaskDisplayMeta & {
  taskId: string;
  logTask?: LogTask;
};

export type StepTaskGroup = {
  groupKey: string;
  displayName: string;
  description: string;
  variants: StepTaskVariant[];
};

export type ActionTaskVariant = TaskDisplayMeta & {
  logTask?: LogTask;
  rows: { item: ActionDetailRecord; globalIndex: number }[];
};

export type ActionTaskGroup = {
  groupKey: string;
  displayName: string;
  description: string;
  variants: ActionTaskVariant[];
};

export type SearchEngineOption = {
  value: string;
  label: string;
  score?: number | null;
};

const TASK_DEF_MAP = (
  taskDefinitions as { tasks: Record<string, TaskDefinition> }
).tasks as Record<string, TaskDefinition>;

const normalizeSearchEngine = (value?: string) => {
  const raw = String(value || '')
    .trim()
    .toLowerCase();
  return raw || undefined;
};

const inferTaskIdentityFromId = (taskId?: string) => {
  const rawTaskId = String(taskId || '').trim();
  const matched = rawTaskId.match(/^(.*)_(baidu|google)$/i);
  if (!matched) {
    return {
      baseTaskId: rawTaskId || undefined,
      searchEngine: undefined,
    };
  }

  return {
    baseTaskId: matched[1] || rawTaskId,
    searchEngine: normalizeSearchEngine(matched[2]),
  };
};

export const getSearchEngineLabel = (value?: string) => {
  const engine = normalizeSearchEngine(value);
  if (!engine) return '默认';
  if (engine === 'baidu') return '百度';
  if (engine === 'google') return 'Google';
  return engine.toUpperCase();
};

export const getTaskDisplayMeta = (
  taskId?: string,
  logTask?: Partial<LogTask>
): TaskDisplayMeta => {
  const normalizedTaskId =
    String(taskId || logTask?.id || '').trim() || undefined;
  const taskDef = normalizedTaskId ? TASK_DEF_MAP[normalizedTaskId] : undefined;
  const inferred = inferTaskIdentityFromId(normalizedTaskId);
  const baseTaskId =
    String(
      logTask?.base_task_id ||
        taskDef?.base_task_id ||
        inferred.baseTaskId ||
        normalizedTaskId ||
        ''
    ).trim() || undefined;
  const baseTaskDef = baseTaskId ? TASK_DEF_MAP[baseTaskId] : undefined;
  const searchEngine = normalizeSearchEngine(
    logTask?.search_engine || taskDef?.search_engine || inferred.searchEngine
  );

  return {
    taskId: normalizedTaskId,
    baseTaskId,
    searchEngine,
    searchEngineLabel: searchEngine
      ? getSearchEngineLabel(searchEngine)
      : undefined,
    displayName:
      baseTaskDef?.name || taskDef?.name || normalizedTaskId || '未分组',
    description:
      baseTaskDef?.description ||
      taskDef?.description ||
      String(logTask?.name || '').trim(),
  };
};

export const getOrderedUniqueTaskIds = (step: JourneyStep): string[] => {
  const seen = new Set<string>();
  const ids: string[] = [];
  (step.executionPath ?? []).forEach((action) => {
    if (action.taskId && !seen.has(action.taskId)) {
      seen.add(action.taskId);
      ids.push(action.taskId);
    }
  });
  return ids;
};

export const groupStepTasks = (
  taskIds: string[],
  logData: LogData | null
): StepTaskGroup[] => {
  const groupMap = new Map<string, StepTaskGroup>();

  taskIds.forEach((taskId) => {
    const logTask = logData
      ? (logData[taskId] as LogTask | undefined)
      : undefined;
    const meta = getTaskDisplayMeta(taskId, logTask);
    const groupKey = meta.baseTaskId || meta.taskId || taskId;
    const existingGroup = groupMap.get(groupKey);
    const nextVariant: StepTaskVariant = {
      ...meta,
      taskId,
      logTask,
    };

    if (!existingGroup) {
      groupMap.set(groupKey, {
        groupKey,
        displayName: meta.displayName,
        description: meta.description,
        variants: [nextVariant],
      });
      return;
    }

    if (!existingGroup.variants.some((variant) => variant.taskId === taskId)) {
      existingGroup.variants.push(nextVariant);
    }
  });

  return Array.from(groupMap.values());
};

type GroupWithSearchVariants = {
  variants: Array<{
    searchEngine?: string;
    searchEngineLabel?: string;
  }>;
};

export const getSharedSearchEngineOptions = (
  groups: GroupWithSearchVariants[]
): SearchEngineOption[] => {
  const eligibleGroups = groups
    .map((group) => ({
      group,
      engines: Array.from(
        new Set(
          group.variants
            .map((variant) => normalizeSearchEngine(variant.searchEngine))
            .filter((engine): engine is string => !!engine)
        )
      ),
    }))
    .filter((item) => item.engines.length > 1);

  if (eligibleGroups.length < 2) {
    return [];
  }

  const sharedEngineSet = eligibleGroups
    .slice(1)
    .reduce(
      (acc, item) => new Set(item.engines.filter((engine) => acc.has(engine))),
      new Set(eligibleGroups[0].engines)
    );

  if (sharedEngineSet.size < 2) {
    return [];
  }

  return eligibleGroups[0].engines
    .filter((engine) => sharedEngineSet.has(engine))
    .map((engine) => ({
      value: engine,
      label: getSearchEngineLabel(engine),
    }));
};

export const groupActionItemsByTask = (
  items: ActionDetailRecord[],
  logData: LogData | null
): ActionTaskGroup[] => {
  const groupMap = new Map<string, ActionTaskGroup>();

  items.forEach((item, index) => {
    const taskId = item.taskId;
    const logTask =
      logData && taskId ? (logData[taskId] as LogTask | undefined) : undefined;
    const meta = getTaskDisplayMeta(taskId, logTask);
    const groupKey = meta.baseTaskId || meta.taskId || '__no_task__';
    const existingGroup = groupMap.get(groupKey);
    const variantKey = meta.taskId || '__no_task__';

    if (!existingGroup) {
      groupMap.set(groupKey, {
        groupKey,
        displayName: meta.displayName,
        description: meta.description,
        variants: [
          {
            ...meta,
            logTask,
            rows: [{ item, globalIndex: index }],
          },
        ],
      });
      return;
    }

    const existingVariant = existingGroup.variants.find(
      (variant) => (variant.taskId || '__no_task__') === variantKey
    );
    if (existingVariant) {
      existingVariant.rows.push({ item, globalIndex: index });
      if (!existingVariant.logTask && logTask) {
        existingVariant.logTask = logTask;
      }
      return;
    }

    existingGroup.variants.push({
      ...meta,
      logTask,
      rows: [{ item, globalIndex: index }],
    });
  });

  return Array.from(groupMap.values());
};
