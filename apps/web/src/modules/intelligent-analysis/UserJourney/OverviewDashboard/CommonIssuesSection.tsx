import React from 'react';
import { Tag, Tooltip } from 'antd';
import { SEVERITY_CFG, STATUS_CFG } from './constants';
import type { CommonIssueGroup } from './types';
import { normalizeSeverity } from './utils';

type CommonIssuesSectionProps = {
  commonIssues: CommonIssueGroup[];
  onOpenIssueModal: (title: string, items: CommonIssueGroup['items']) => void;
};

const CommonIssuesSection: React.FC<CommonIssuesSectionProps> = ({
  commonIssues,
  onOpenIssueModal,
}) => (
  <>
    <div className="section-title">🔍 共性问题统计</div>
    <div className="section-card">
      <div className="table-wrapper">
        <table className="common-issues-table">
          <thead>
            <tr>
              <th className="nowrap-col">序号</th>
              <th className="nowrap-col">阶段</th>
              <th>描述</th>
              <th className="nowrap-col">类型</th>
              <th className="nowrap-col">涉及仓库</th>
              <th className="nowrap-col severity-col">严重程度</th>
              <th className="nowrap-col status-col">状态</th>
            </tr>
          </thead>
          <tbody>
            {commonIssues.length > 0 ? (
              commonIssues.map((group, index) => {
                const sev = normalizeSeverity(group.severity);
                return (
                  <tr key={group.key}>
                    <td className="row-num nowrap-col">{index + 1}</td>
                    <td className="nowrap-col">{group.journeyStage}</td>
                    <td>
                      <Tooltip title={group.description}>
                        <span>{group.description}</span>
                      </Tooltip>
                    </td>
                    <td className="nowrap-col">{group.issueType}</td>
                    <td className="nowrap-col">
                      <span
                        className="clickable-count"
                        onClick={() =>
                          onOpenIssueModal(
                            `共性问题 · ${group.description}`,
                            group.items
                          )
                        }
                      >
                        {group.repoCount}
                      </span>
                    </td>
                    <td className="nowrap-col severity-col">
                      <Tag
                        className="overview-ant-tag nowrap-tag"
                        style={{
                          background: SEVERITY_CFG[sev].tagBg,
                          color: SEVERITY_CFG[sev].tagColor,
                          borderColor: SEVERITY_CFG[sev].tagBorder,
                        }}
                      >
                        {SEVERITY_CFG[sev].label}
                      </Tag>
                    </td>
                    <td className="nowrap-col status-col">
                      <Tag
                        className="overview-ant-tag nowrap-tag"
                        style={{
                          background: STATUS_CFG[group.status].tagBg,
                          color: STATUS_CFG[group.status].tagColor,
                          borderColor: STATUS_CFG[group.status].tagBorder,
                        }}
                      >
                        {STATUS_CFG[group.status].label}
                      </Tag>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-8 text-center text-sm text-slate-400"
                >
                  暂无共性问题
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </>
);

export default CommonIssuesSection;
