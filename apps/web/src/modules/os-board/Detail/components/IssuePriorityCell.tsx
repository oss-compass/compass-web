import React from 'react';
import { Select } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { FiEdit } from 'react-icons/fi';
import getErrorMessage from '@common/utils/getErrorMessage';
import { IssuePriority, updateIssuePriority } from '../../api/tableData';

interface PriorityConfig {
  label: string;
  color: string;
  bg: string;
}

const PRIORITY_CONFIG: Record<IssuePriority, PriorityConfig> = {
  fatal: { label: '致命', color: '#cf1322', bg: '#fff1f0' },
  serious: { label: '严重', color: '#d46b08', bg: '#fff7e6' },
  medium: { label: '一般', color: '#096dd9', bg: '#e6f4ff' },
  info: { label: '提示', color: '#389e0d', bg: '#f6ffed' },
};

const PRIORITY_ORDER: IssuePriority[] = ['fatal', 'serious', 'medium', 'info'];

interface IssuePriorityCellProps {
  priority?: IssuePriority | null;
  label: string;
  url?: string | null;
  identifier?: string | null;
  /** 是否有编辑权限（editor / admin） */
  hasEditPermission?: boolean;
  onUpdated?: () => unknown | Promise<unknown>;
}

const PriorityBadge: React.FC<{ priority: IssuePriority }> = ({ priority }) => {
  const config = PRIORITY_CONFIG[priority];
  return (
    <span
      className="inline-block rounded px-1.5 py-0.5 text-xs font-medium leading-none"
      style={{ color: config.color, background: config.bg }}
    >
      {config.label}
    </span>
  );
};

const IssuePriorityCell: React.FC<IssuePriorityCellProps> = ({
  priority,
  label,
  url,
  identifier,
  hasEditPermission = false,
  onUpdated,
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  // 具备编辑权限且必要参数完整时才可编辑
  const canEdit = hasEditPermission && Boolean(label && url && identifier);

  const mutation = useMutation({
    mutationFn: updateIssuePriority,
  });

  // 无论是否有编辑权限，useRef 必须无条件调用
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleChange = React.useCallback(
    async (value: IssuePriority) => {
      if (!canEdit || !url || !identifier) return;

      try {
        const response = await mutation.mutateAsync({
          label,
          url,
          priority: value,
          identifier,
        });

        const success =
          response.status === true || String(response.status) === 'success';

        if (!success) {
          toast.error(
            response.message || t('common:toast.modification_failed')
          );
          return;
        }

        toast.success(t('common:toast.modification_successful'));
        setTimeout(() => {
          onUpdated?.();
        }, 2000);
      } catch (error) {
        const message = getErrorMessage(error);
        if (message) {
          toast.error(message);
        }
      } finally {
        setOpen(false);
      }
    },
    [canEdit, identifier, label, mutation, onUpdated, t, url]
  );

  // 无编辑权限：只读展示
  if (!canEdit) {
    return priority ? (
      <PriorityBadge priority={priority} />
    ) : (
      <span className="text-gray-400">-</span>
    );
  }

  // 有编辑权限：badge + FiEdit 图标，点击图标展开 Select

  return (
    <div ref={anchorRef} className="relative flex items-center gap-1.5">
      {priority ? (
        <PriorityBadge priority={priority} />
      ) : (
        <span className="text-sm text-gray-400">-</span>
      )}
      <Select
        open={open}
        onDropdownVisibleChange={setOpen}
        value={priority ?? undefined}
        size="small"
        loading={mutation.isLoading}
        onChange={handleChange}
        variant="borderless"
        style={{
          position: 'absolute',
          visibility: 'hidden',
          width: 0,
          height: 0,
          padding: 0,
          margin: 0,
        }}
        popupMatchSelectWidth={false}
        getPopupContainer={() => anchorRef.current ?? document.body}
        options={PRIORITY_ORDER.map((p) => ({
          value: p,
          label: <PriorityBadge priority={p} />,
        }))}
      />
      <button
        type="button"
        title={t('common:btn.click_to_edit', '点击修改')}
        className="flex-shrink-0 cursor-pointer text-blue-600 hover:text-blue-700"
        onClick={() => setOpen(true)}
      >
        <FiEdit className="text-sm" />
      </button>
    </div>
  );
};

export default IssuePriorityCell;
