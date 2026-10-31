import type {
  IssueReportPain,
  IssueReportPainIssue,
  IssueScoreRow,
} from './types';
import { getEvidenceActorName } from './evidenceActor';

export type IssueExportContext = {
  community: string;
  period: string;
};

const exportFilename = (name: string, context?: IssueExportContext) =>
  [context?.community, context?.period, name].filter(Boolean).join('_') +
  '.csv';

export const escapeCsvCell = (value: unknown): string => {
  let text = String(value ?? '');
  // Prevent spreadsheet formula execution in report-provided text.
  if (/^[\s]*[=+\-@]/.test(text)) text = `'${text}`;
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

export const downloadCsv = (
  filename: string,
  headers: string[],
  rows: unknown[][]
) => {
  const content = [headers, ...rows]
    .map((row) => row.map(escapeCsvCell).join(','))
    .join('\r\n');
  const href = URL.createObjectURL(
    new Blob([`\uFEFF${content}\r\n`], { type: 'text/csv;charset=utf-8' })
  );
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.download = filename.replace(/[\\/:*?"<>|]+/g, '_');
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(href);
};

export const exportPainIssues = (
  issues: IssueReportPainIssue[],
  context?: IssueExportContext
) =>
  downloadCsv(
    exportFilename('痛点涉及Issue', context),
    [
      'Issue',
      '标题',
      '链接',
      '责任人',
      'Issue 状态',
      '状态更新时间',
      '优先级',
      '得分',
      '低分原因',
      '原文依据',
    ],
    issues.map((issue) => [
      issue.number,
      issue.title,
      issue.url,
      issue.assignees?.join('、'),
      issue.issue_state === 'closed'
        ? '已关闭'
        : issue.issue_state === 'open'
        ? '开启中'
        : '—',
      issue.issue_state_updated_at,
      issue.priority,
      issue.score,
      issue.reason,
      issue.evidence
        ?.map((e) =>
          [e.time, e.type, getEvidenceActorName(e.actor), e.text]
            .filter(Boolean)
            .join(' · ')
        )
        .join('\n'),
    ])
  );

/** 只收集当前报告评分列表中的痛点 Issue，保留跨痛点的不同低分明细。 */
export const collectReportPainIssues = (
  rows: IssueScoreRow[],
  pains: IssueReportPain[]
): IssueReportPainIssue[] => {
  const rowByNumber = new Map(rows.map((row) => [row.number, row]));
  return pains.flatMap((pain) =>
    (pain.low_score_issues ?? []).flatMap((issue) => {
      const row = rowByNumber.get(issue.number);
      if (!row) return [];
      return [
        {
          ...issue,
          title: issue.title || row.title,
          url: issue.url || row.url,
          assignees: issue.assignees ?? row.assignees,
          issue_state:
            issue.issue_state ??
            (row.state === 'open' || row.state === 'closed' ? row.state : null),
        },
      ];
    })
  );
};

export const exportIssueScores = (
  rows: IssueScoreRow[],
  stageId?: string,
  context?: IssueExportContext
) =>
  downloadCsv(
    exportFilename(
      stageId ? `${stageId}_全部Issue得分` : '全部Issue得分',
      context
    ),
    [
      'Issue',
      '标题',
      '链接',
      '责任人',
      'Issue 状态',
      '类型',
      '范围',
      '综合得分',
      '阶段',
      '阶段得分',
      '指标',
      '指标得分',
      '评分原因',
    ],
    rows.flatMap((row) =>
      row.stage_details
        .filter((stage) => !stageId || stage.stage_id === stageId)
        .flatMap((stage) =>
          (stage.metrics.length
            ? stage.metrics
            : [{ code: '', name_cn: '', score: '', reason: '' }]
          ).map((metric) => [
            row.number,
            row.title,
            row.url,
            row.assignees?.join('、') || '—',
            row.state,
            row.issue_type,
            row.scope,
            row.overall,
            stage.stage_name,
            stage.stage_score,
            metric.name_cn || metric.code,
            metric.score,
            metric.reason,
          ])
        )
    )
  );
