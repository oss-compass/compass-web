import React, { useId, useState } from 'react';
import { Radio, Space } from 'antd';
import type { CiProblem } from '../../types';
import { trackingProblemKey } from './model';

const CommonIssueJudgment: React.FC<{
  problem: CiProblem;
  problems: CiProblem[];
  disabled: boolean;
}> = ({ problem, problems, disabled }) => {
  const formId = useId();
  const reportType = problem.common_issue_type?.trim();
  const [isCommon, setIsCommon] = useState(
    problem.is_common_issue ?? (reportType ? true : undefined)
  );
  const [issueType, setIssueType] = useState(isCommon ? reportType : undefined);
  const knownIssues = problems.filter(
    (item) => item.is_common_issue ?? Boolean(item.common_issue_type?.trim())
  );
  const issueTypes = Array.from(
    new Set(
      [
        reportType,
        ...knownIssues.map((item) => item.common_issue_type?.trim()),
      ].filter(Boolean)
    )
  );

  return (
    <section aria-label="共性问题判断" className="min-w-0 space-y-2">
      <div className="flex flex-wrap items-start gap-x-8 gap-y-3">
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-slate-700">
            是否共性问题
            <span className="ml-1 text-xs text-slate-500">（选填）</span>
          </legend>
          <Radio.Group
            name={`${formId}-is-common`}
            value={isCommon}
            disabled={disabled}
            onChange={(event) => {
              setIsCommon(event.target.value);
              if (event.target.value === false) setIssueType(undefined);
            }}
          >
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>
        </fieldset>
        {isCommon === true && (
          <fieldset className="min-w-0">
            <legend className="mb-2 text-sm font-medium text-slate-700">
              共性问题类型
            </legend>
            {issueTypes.length ? (
              <Radio.Group
                name={`${formId}-issue-type`}
                value={issueType}
                disabled={disabled}
                onChange={(event) => setIssueType(event.target.value)}
              >
                <Space direction="vertical">
                  {issueTypes.map((type) => (
                    <Radio key={type} value={type} className="break-words">
                      {type}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            ) : (
              <p className="text-xs text-slate-500">报告暂无可选类型</p>
            )}
          </fieldset>
        )}
      </div>
      <details>
        <summary className="w-fit cursor-pointer rounded text-xs leading-5 text-slate-600 hover:text-sky-700">
          共性问题参考
        </summary>
        <div className="mt-2 space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs leading-5 text-slate-600">
            共性问题包括在不同项目中高频出现的普遍缺陷，以及需要社区统筹协调资源或通过标准化工具与协议解决的问题。
          </p>
          <h4 className="text-sm font-medium text-slate-700">已知共性问题</h4>
          {knownIssues.length ? (
            <ul className="max-h-48 list-disc space-y-1 overflow-auto break-words pl-5 text-xs text-slate-700">
              {knownIssues.map((item) => (
                <li key={trackingProblemKey(item)}>
                  {[item.common_issue_type?.trim(), item.title]
                    .filter(Boolean)
                    .join(' · ')}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500">暂无已知共性问题</p>
          )}
        </div>
      </details>
    </section>
  );
};

export default CommonIssueJudgment;
