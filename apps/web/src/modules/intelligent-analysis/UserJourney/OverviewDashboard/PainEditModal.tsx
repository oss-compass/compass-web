import React, { useEffect, useState } from 'react';
import { Input, Modal, Select } from 'antd';
import type { OverviewPainPointRow } from '../rawData/apiClient';
import { SEVERITY_CFG } from './constants';
import type { Severity } from './types';

type PainEditModalProps = {
  open: boolean;
  row: OverviewPainPointRow | null;
  onClose: () => void;
  onSubmit: (
    row: OverviewPainPointRow,
    patch: Record<string, unknown>
  ) => Promise<void>;
};

const PainEditModal: React.FC<PainEditModalProps> = ({
  open,
  row,
  onClose,
  onSubmit,
}) => {
  const [formState, setFormState] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (!row) {
      setFormState({});
      return;
    }
    setFormState({
      issue_type: row.issueType,
      severity: row.severity,
      description: row.description,
      owner: row.owner,
      is_real_issue: row.isRealIssue,
      remark: row.remark,
      improvement_status: row.improvementStatus,
      issue_or_pr_link: row.issueOrPrLink,
      retest_report_id: row.retestReportId,
      retest_report_score: row.retestReportScore,
      agent_score_after_retest: row.agentScoreAfterRetest,
    });
  }, [row]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={async () => {
        if (!row) return;
        await onSubmit(row, formState);
        onClose();
      }}
      title="编辑痛点"
      width={720}
      destroyOnClose
    >
      <div className="grid grid-cols-2 gap-3">
        <Input
          value={(formState.issue_type as string) ?? ''}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, issue_type: e.target.value }))
          }
          placeholder="问题类型"
        />
        <Select
          value={(formState.severity as string) ?? undefined}
          onChange={(value) =>
            setFormState((prev) => ({ ...prev, severity: value }))
          }
          options={Object.keys(SEVERITY_CFG).map((value) => ({
            value,
            label: SEVERITY_CFG[value as Severity].label,
          }))}
          placeholder="问题严重度"
        />
        <Input
          value={(formState.owner as string) ?? ''}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, owner: e.target.value }))
          }
          placeholder="责任人"
        />
        <Select
          value={formState.is_real_issue as boolean | null}
          onChange={(value) =>
            setFormState((prev) => ({ ...prev, is_real_issue: value }))
          }
          options={[
            { value: true, label: '是问题' },
            { value: false, label: '不是问题' },
            { value: null, label: '待确认' },
          ]}
          placeholder="是否是问题"
        />
        <Select
          value={(formState.improvement_status as string) ?? 'pending'}
          onChange={(value) =>
            setFormState((prev) => ({ ...prev, improvement_status: value }))
          }
          options={[
            { value: 'pending', label: '待处理' },
            { value: 'in_progress', label: '处理中' },
            { value: 'resolved', label: '已处理' },
            { value: 'closed', label: '已闭环' },
          ]}
          placeholder="改进状态"
        />
        <Input
          value={(formState.issue_or_pr_link as string) ?? ''}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              issue_or_pr_link: e.target.value,
            }))
          }
          placeholder="Issue / PR 链接"
        />
      </div>
      <Input.TextArea
        className="mt-3"
        rows={4}
        value={(formState.description as string) ?? ''}
        onChange={(e) =>
          setFormState((prev) => ({ ...prev, description: e.target.value }))
        }
        placeholder="问题描述及根因分析"
      />
      <Input.TextArea
        className="mt-3"
        rows={3}
        value={(formState.remark as string) ?? ''}
        onChange={(e) =>
          setFormState((prev) => ({ ...prev, remark: e.target.value }))
        }
        placeholder="备注"
      />
    </Modal>
  );
};

export default PainEditModal;
