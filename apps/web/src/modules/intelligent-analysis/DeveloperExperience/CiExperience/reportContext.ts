import type { CiVal } from './types';

export type CiObservedMetric = {
  dimension: string;
  label: string;
  value: CiVal | string | number | null;
  score: number | null;
  weight: number | null;
};
export type CiReportContext = {
  day: string;
  repo: string;
  name: string;
  workflow: string;
  caliber: string | null;
  dict_version: string | null;
  uploaded_at: string | null;
  generated_at: string | null;
  score_note: string | null;
  low_confidence: boolean | null;
  score_dimensions: Array<{
    key: string;
    score: number | null;
    metrics: Array<{
      label: string;
      score: number | null;
      weight: number | null;
    }>;
  }>;
  findings: Array<{
    key: string;
    title: string;
    tone: 'crit' | 'warn' | 'good' | 'neutral';
    summary: string;
    metrics: CiObservedMetric[];
    recommendations: string[];
  }>;
  metrics: CiObservedMetric[];
  taxonomy: Array<{
    classification: string;
    mechanism: string;
    problem_count: number;
    owners: string[];
  }>;
  problem_count: number;
  taxonomy_note: string;
  rules: string | null;
};
