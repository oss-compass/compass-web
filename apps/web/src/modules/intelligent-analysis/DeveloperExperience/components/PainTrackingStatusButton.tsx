import React from 'react';

/** 社区贡献与 CI 痛点共用的状态管理入口。 */
const PainTrackingStatusButton: React.FC<{
  label: string;
  className: string;
  pending?: boolean;
  disabled?: boolean;
  actionLabel?: string | null;
  title?: string;
  onClick: () => void;
}> = ({
  label,
  className,
  pending = false,
  disabled = false,
  actionLabel,
  title,
  onClick,
}) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    title={title || (pending ? '点击确认该痛点' : '查看痛点跟踪详情')}
    className={`inline-flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all hover:shadow-sm disabled:cursor-not-allowed disabled:hover:shadow-none ${
      pending && !disabled
        ? 'border-dashed border-amber-400 bg-amber-50 text-amber-700 hover:border-amber-500 hover:bg-amber-100'
        : `${className} ${disabled ? '' : 'hover:brightness-95'}`
    }`}
  >
    {pending && !disabled ? (
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-50" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
      </span>
    ) : null}
    <span>{label}</span>
    {!pending && !disabled && actionLabel ? (
      <span className="opacity-70">· {actionLabel}</span>
    ) : null}
  </button>
);

export default PainTrackingStatusButton;
