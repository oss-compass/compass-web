import React from 'react';
import { Button, Modal, Tooltip } from 'antd';
import { SeverityBadge, StatusBadge } from './Badges';
import type { DashboardIssue, IssueModalState } from './types';

type IssueDetailModalProps = {
  state: IssueModalState;
  onClose: () => void;
  onEdit: (issue: DashboardIssue) => void;
};

const IssueDetailModal: React.FC<IssueDetailModalProps> = ({
  state,
  onClose,
  onEdit,
}) => (
  <Modal
    open={state.open}
    onCancel={onClose}
    footer={null}
    width={1320}
    title={state.title}
    destroyOnHidden
  >
    <div className="max-h-[70vh] overflow-auto rounded-xl border border-slate-200">
      <table className="w-full border-collapse text-[13px] text-slate-700">
        <thead className="sticky top-0 z-10 bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-3 py-3 text-left font-semibold">仓库</th>
            <th className="px-3 py-3 text-left font-semibold">责任团队</th>
            <th className="px-3 py-3 text-left font-semibold">阶段</th>
            <th className="px-3 py-3 text-left font-semibold">问题类型</th>
            <th className="px-3 py-3 text-left font-semibold">问题描述</th>
            <th className="px-3 py-3 text-left font-semibold">严重程度</th>
            <th className="px-3 py-3 text-left font-semibold">状态</th>
            <th className="px-3 py-3 text-left font-semibold">责任人</th>
            <th className="px-3 py-3 text-left font-semibold">报告地址</th>
            <th className="px-3 py-3 text-left font-semibold">操作</th>
          </tr>
        </thead>
        <tbody>
          {state.issues.length > 0 ? (
            state.issues.map((issue, index) => (
              <tr
                key={`${issue.id}-${index}`}
                className="border-t border-slate-100 align-top transition-colors hover:bg-slate-50"
              >
                <td className="px-3 py-3 font-medium text-slate-900">
                  {issue.repoName}
                </td>
                <td className="px-3 py-3">{issue.team}</td>
                <td className="whitespace-nowrap px-3 py-3">
                  {issue.journeyStage}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {issue.issueType}
                </td>
                <td className="max-w-[360px] px-3 py-3">
                  <Tooltip title={issue.description}>
                    <span className="line-clamp-2 cursor-default">
                      {issue.description}
                    </span>
                  </Tooltip>
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  <SeverityBadge severity={issue.severity} />
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  <StatusBadge status={issue.normalizedStatus} />
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {issue.owner || '--'}
                </td>
                <td className="px-3 py-3">
                  {(() => {
                    const childIds = issue.childIds ?? [];
                    const seen = new Set<string>();
                    const fileKeys: string[] = [];
                    for (let i = childIds.length - 1; i >= 0; i -= 1) {
                      const fileKey = String(childIds[i] || '').split('#')[0];
                      if (!fileKey || seen.has(fileKey)) continue;
                      seen.add(fileKey);
                      fileKeys.push(fileKey);
                      if (fileKeys.length >= 3) break;
                    }

                    if (!fileKeys.length) {
                      return <span className="text-slate-300">--</span>;
                    }

                    return fileKeys.map((fileKey) => {
                      const href = `/intelligent-analysis/community-experience?project=${encodeURIComponent(
                        fileKey
                      )}`;
                      const displayText = (() => {
                        const last = fileKey.lastIndexOf('_');
                        if (last <= 0) return fileKey;
                        const prev = fileKey.lastIndexOf('_', last - 1);
                        if (prev < 0 || prev + 1 >= fileKey.length)
                          return fileKey;
                        return fileKey.slice(prev + 1);
                      })();
                      return (
                        <div key={fileKey} className="leading-5">
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className="overview-table-link text-blue-600"
                          >
                            {displayText}
                          </a>
                        </div>
                      );
                    });
                  })()}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {issue.sourceType === 'parent' ? (
                    <span className="text-slate-300">--</span>
                  ) : (
                    <Button
                      type="link"
                      size="small"
                      onClick={() => onEdit(issue)}
                    >
                      编辑
                    </Button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={10}
                className="px-3 py-12 text-center text-sm text-slate-400"
              >
                暂无数据
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </Modal>
);

export default IssueDetailModal;
