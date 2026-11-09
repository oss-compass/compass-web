import type {
  CiJourneyCells,
  CiJourneyProblem,
  CiJourneyStage,
} from '../../types';
import { trackingProblemKey } from '../PainTracking/model';

export const DIM_META: Array<{ key: keyof CiJourneyCells; label: string }> = [
  { key: 'stability', label: '稳定性' },
  { key: 'efficiency', label: '效率' },
  { key: 'interaction', label: '交互体验' },
  { key: 'cost', label: '成本' },
];

export const getStageProblems = (stage: CiJourneyStage): CiJourneyProblem[] =>
  Array.from(
    new Map(
      (stage.problems ?? []).map((problem) => [
        trackingProblemKey(problem),
        problem,
      ])
    ).values()
  );

export type StageObservation = {
  name: string;
  value: string;
  dimensions: string[];
};

/** 只统计阶段实际观测值；同一指标跨维度复用时合并，零值仍是有效观测。 */
export const getStageObservations = (
  stage: CiJourneyStage
): StageObservation[] => {
  const observations = new Map<string, StageObservation>();
  DIM_META.forEach(({ key, label }) => {
    const cell = stage.cells[key];
    const name = cell?.name?.trim();
    const value = cell?.disp?.trim();
    if (
      cell?.fallback ||
      !name ||
      !value ||
      ['—', '-', 'N/A', '本次未评估'].includes(value)
    )
      return;
    const observationKey = JSON.stringify([name, value]);
    const existing = observations.get(observationKey);
    if (existing) {
      existing.dimensions.push(label);
    } else {
      observations.set(observationKey, { name, value, dimensions: [label] });
    }
  });
  return Array.from(observations.values());
};

/** 一条痛点中实际提供的建议动作记为一项，不拆分自然语言段落。 */
export const getStageRecommendations = (problems: CiJourneyProblem[]) =>
  problems.flatMap((problem) => {
    const action = problem.root.action?.trim();
    return action ? [{ problem, action }] : [];
  });
