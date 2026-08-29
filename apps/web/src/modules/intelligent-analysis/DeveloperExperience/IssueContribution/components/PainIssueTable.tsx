import React from 'react';
import { LinkOutlined } from '@ant-design/icons';
import { Pagination, Tooltip } from 'antd';
import { getScoreTone } from '../presentation';
import type {
  IssuePainTracking,
  IssuePainTrackingActionPayload,
  IssueReportPainIssue,
} from '../types';
import { IssuePainTrackingStatus } from '../types';
import { IssueFixButton } from './PainTrackingModal/components';

const EVIDENCE_TYPE_META: Record<string, { label: string; cls: string }> = {
  open: { label: '创建', cls: 'bg-sky-50 text-sky-600' },
  comment: { label: '评论', cls: 'bg-slate-100 text-slate-600' },
  assign: { label: '指派', cls: 'bg-violet-50 text-violet-600' },
  label: { label: '打标', cls: 'bg-amber-50 text-amber-600' },
  close: { label: '关闭', cls: 'bg-rose-50 text-rose-600' },
  reopen: { label: '重开', cls: 'bg-emerald-50 text-emerald-600' },
  pr: { label: '关联 PR', cls: 'bg-indigo-50 text-indigo-600' },
};

const getEvidenceMeta = (type: string) =>
  EVIDENCE_TYPE_META[type] ?? {
    label: type || '动作',
    cls: 'bg-slate-100 text-slate-500',
  };

type PainIssueTableProps = {
  issues: IssueReportPainIssue[];
  tracking?: IssuePainTracking;
  pagination?: boolean;
  onTrackingAction?: (
    payload: Omit<IssuePainTrackingActionPayload, 'community'>
  ) => Promise<IssuePainTracking>;
};

const PainIssueTable: React.FC<PainIssueTableProps> = ({
  issues,
  tracking,
  pagination = true,
  onTrackingAction,
}) => {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = React.useState(1);
  const issueListKey = issues.map((issue) => issue.number).join(',');
  React.useEffect(() => {
    setCurrentPage(1);
  }, [issueListKey]);
  const maxPage = Math.max(1, Math.ceil(issues.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, maxPage);
  const pagedIssues = pagination
    ? issues.slice((safeCurrentPage - 1) * pageSize, safeCurrentPage * pageSize)
    : issues;
  const showOperation = Boolean(
    tracking && onTrackingAction && tracking.trackingType !== 'observe'
  );
  const activeIssueMap = new Map(
    (tracking?.activeIssues ?? []).map((issue) => [issue.number, issue])
  );

  if (!issues.length) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
        当前痛点没有关联到具体 Issue，将按痛点整体进行跟踪。
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] table-fixed border-collapse text-[12px]">
          <thead className="bg-slate-50/80">
            <tr>
              <th className="w-[210px] border-b border-slate-200 px-3 py-2 text-left text-[11px] font-semibold text-slate-500">
                Issue
              </th>
              <th className="w-[68px] border-b border-slate-200 px-3 py-2 text-center text-[11px] font-semibold text-slate-500">
                得分
              </th>
              <th className="w-[230px] border-b border-slate-200 px-3 py-2 text-left text-[11px] font-semibold text-slate-500">
                低分原因
              </th>
              <th className="border-b border-slate-200 px-3 py-2 text-left text-[11px] font-semibold text-slate-500">
                原文依据
              </th>
              {showOperation ? (
                <th className="w-[168px] border-b border-slate-200 px-3 py-2 text-left text-[11px] font-semibold text-slate-500">
                  操作
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {pagedIssues.map((issue) => {
              const rawIssueScore: unknown = issue.score;
              const hasIssueScore =
                rawIssueScore !== null &&
                rawIssueScore !== undefined &&
                rawIssueScore !== '' &&
                Number.isFinite(Number(rawIssueScore));
              const issueTone = hasIssueScore
                ? getScoreTone(Number(rawIssueScore))
                : null;
              const activeIssue = activeIssueMap.get(issue.number);
              return (
                <tr key={issue.number} className="align-top">
                  <td className="border-b border-slate-100 px-3 py-2.5">
                    <a
                      href={issue.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline"
                    >
                      <LinkOutlined className="text-[11px]" />#{issue.number}
                    </a>
                    <Tooltip title={issue.title} placement="topLeft">
                      <div className="mt-1 line-clamp-2 break-words leading-5 text-slate-600">
                        {issue.title}
                      </div>
                    </Tooltip>
                  </td>
                  <td className="border-b border-slate-100 px-3 py-2.5 text-center">
                    {issueTone ? (
                      <span
                        className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-bold ${issueTone.badge}`}
                      >
                        {Number(rawIssueScore)}
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="border-b border-slate-100 px-3 py-2.5 align-top leading-5 text-slate-600">
                    <Tooltip
                      title={
                        <div className="flex w-[420px] max-w-[72vw] items-start gap-2">
                          <span className="mt-0.5 shrink-0 rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
                            原因
                          </span>
                          <div className="min-w-0 break-words text-[12px] leading-5 text-slate-700">
                            {issue.reason || '—'}
                          </div>
                        </div>
                      }
                      placement="topLeft"
                      color="#ffffff"
                      overlayStyle={{ maxWidth: 480 }}
                      overlayInnerStyle={{ padding: 12 }}
                    >
                      <div className="line-clamp-2 break-words">
                        {issue.reason || '—'}
                      </div>
                    </Tooltip>
                  </td>
                  <td className="border-b border-slate-100 px-3 py-2.5 align-top">
                    {issue.evidence.length ? (
                      <Tooltip
                        title={
                          <div className="w-[500px] max-w-[76vw] space-y-2">
                            {issue.evidence.map((ev, index) => {
                              const meta = getEvidenceMeta(ev.type);
                              return (
                                <div
                                  key={`${ev.type}-tooltip-${index}`}
                                  className="flex items-start gap-2"
                                >
                                  <span
                                    className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold ${meta.cls}`}
                                  >
                                    {meta.label}
                                  </span>
                                  <div className="min-w-0 break-words text-[12px] leading-5 text-slate-700">
                                    {ev.actor ? (
                                      <span className="mr-1 font-semibold text-slate-500">
                                        {ev.actor}：
                                      </span>
                                    ) : null}
                                    <span>{ev.text}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        }
                        placement="topLeft"
                        color="#ffffff"
                        overlayStyle={{ maxWidth: 560 }}
                        overlayInnerStyle={{ padding: 12 }}
                      >
                        <div className="h-11 overflow-hidden">
                          <ul className="space-y-1">
                            {issue.evidence.slice(0, 2).map((ev, index) => {
                              const meta = getEvidenceMeta(ev.type);
                              return (
                                <li
                                  key={`${ev.type}-${index}`}
                                  className="flex h-5 min-w-0 items-start gap-1.5 overflow-hidden"
                                >
                                  <span
                                    className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold ${meta.cls}`}
                                  >
                                    {meta.label}
                                  </span>
                                  <span className="min-w-0 flex-1 truncate leading-5 text-slate-600">
                                    {ev.actor ? (
                                      <span className="font-medium text-slate-500">
                                        {ev.actor}：
                                      </span>
                                    ) : null}
                                    {ev.url ? (
                                      <a
                                        href={ev.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                      >
                                        {ev.text}
                                      </a>
                                    ) : (
                                      ev.text
                                    )}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </Tooltip>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  {showOperation ? (
                    <td className="border-b border-slate-100 px-3 py-2.5">
                      {tracking?.status ===
                      IssuePainTrackingStatus.PENDING ? null : activeIssue &&
                        tracking &&
                        onTrackingAction ? (
                        <IssueFixButton
                          tracking={tracking}
                          issue={activeIssue}
                          onAction={onTrackingAction}
                          compact
                        />
                      ) : (
                        <span className="text-[11px] text-slate-400">
                          历史 Issue
                        </span>
                      )}
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {pagination && issues.length > pageSize ? (
        <div className="flex justify-end border-t border-slate-100 bg-white px-3 py-3">
          <Pagination
            size="small"
            current={safeCurrentPage}
            pageSize={pageSize}
            total={issues.length}
            showSizeChanger={false}
            hideOnSinglePage
            onChange={setCurrentPage}
          />
        </div>
      ) : null}
    </div>
  );
};

export default PainIssueTable;
