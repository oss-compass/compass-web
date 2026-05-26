import React, { useState } from 'react';
import { Modal, Popover } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import ExperienceScoreRulePanel from './ExperienceScoreRulePanel';

type ExperienceScoreRulePopoverTriggerProps = {
  className?: string;
  iconClassName?: string;
};

const ExperienceScoreRulePopoverTrigger: React.FC<
  ExperienceScoreRulePopoverTriggerProps
> = ({ className, iconClassName }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Popover
        title={null}
        content={
          <span className="text-xs font-medium text-slate-700">
            点击查看评分规则
          </span>
        }
        placement="top"
        trigger="hover"
      >
        <button
          type="button"
          className={
            className ??
            'inline-flex items-center justify-center rounded-full text-slate-400 transition-colors hover:text-slate-600'
          }
          aria-label="查看综合体验评分规则"
          onClick={() => setOpen(true)}
        >
          <InfoCircleOutlined className={iconClassName ?? 'text-[14px]'} />
        </button>
      </Popover>

      <Modal
        title="综合体验评分规则"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width="min(92vw, 1460px)"
        centered
      >
        <div className="max-h-[70vh] overflow-auto pr-1">
          <ExperienceScoreRulePanel />
        </div>
      </Modal>
    </>
  );
};

export default ExperienceScoreRulePopoverTrigger;
