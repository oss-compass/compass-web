import React, { type ReactNode, useState } from 'react';
import { Modal, Popover } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import IssueScoreRulePanel from './IssueScoreRulePanel';

type IssueScoreRulePopoverTriggerProps = {
  className?: string;
  rubricVersion?: string;
  children?: ReactNode;
};

const IssueScoreRulePopoverTrigger: React.FC<
  IssueScoreRulePopoverTriggerProps
> = ({ className, rubricVersion, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Popover
        content={
          <span className="text-xs font-medium text-slate-700">
            点击查看评分细则
          </span>
        }
        placement="top"
        trigger="hover"
      >
        <button
          type="button"
          className={
            className ??
            'inline-flex shrink-0 items-center justify-center text-slate-400 transition-colors hover:text-slate-600'
          }
          aria-label="查看 Issue 综合体验评分细则"
          onClick={() => setOpen(true)}
        >
          {children ?? <InfoCircleOutlined className="text-[14px]" />}
        </button>
      </Popover>
      <Modal
        title={
          rubricVersion
            ? `综合体验评分规则 · ${rubricVersion}`
            : '综合体验评分规则'
        }
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width="min(92vw, 1460px)"
        centered
      >
        <div className="max-h-[70vh] overflow-auto pr-1">
          <IssueScoreRulePanel />
        </div>
      </Modal>
    </>
  );
};

export default IssueScoreRulePopoverTrigger;
