import React, { type ReactNode } from 'react';

type ReportSectionCardProps = {
  id?: string;
  cardIndex?: number;
  title: ReactNode;
  description?: ReactNode;
  headerMeta?: ReactNode;
  headerAction?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyPadding?: boolean;
};

/** Shared numbered section shell for developer-experience reports. */
const ReportSectionCard: React.FC<ReportSectionCardProps> = ({
  id,
  cardIndex,
  title,
  description,
  headerMeta,
  headerAction,
  children,
  className = '',
  bodyPadding = true,
}) => {
  const generatedId = React.useId();
  const titleId = id ? `${id}-title` : `report-section-${generatedId}`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={`>lg:scroll-mt-6 scroll-mt-20 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.06)] ${className}`}
    >
      <div className="flex items-stretch border-b border-slate-100">
        {typeof cardIndex === 'number' ? (
          <div className="flex w-14 shrink-0 flex-col items-center justify-center self-stretch border-r border-slate-100 bg-slate-50 py-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600">
              {cardIndex}
            </span>
          </div>
        ) : null}

        <div className=">md:px-5 flex min-w-0 flex-1 items-center gap-4 px-4 py-3.5">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2
                id={titleId}
                className="text-base font-semibold text-slate-900"
              >
                {title}
              </h2>
              {headerMeta}
            </div>
            {description ? (
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                {description}
              </p>
            ) : null}
          </div>
          {headerAction ? <div className="shrink-0">{headerAction}</div> : null}
        </div>
      </div>

      <div className={bodyPadding ? '>md:p-5 p-4' : ''}>{children}</div>
    </section>
  );
};

export default ReportSectionCard;
