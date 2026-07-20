import React, { useEffect, useState } from 'react';
import { Card } from 'antd';

export type ReportSectionNavItem = {
  id: string;
  title: string;
  description: string;
};

type ReportSectionNavProps = {
  items: ReportSectionNavItem[];
  title?: string;
  compact?: boolean;
};

const ReportSectionNav: React.FC<ReportSectionNavProps> = ({
  items,
  title = '报告目录',
  compact = false,
}) => {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');

  useEffect(() => {
    if (!items.some((item) => item.id === activeId)) {
      setActiveId(items[0]?.id ?? '');
    }
  }, [activeId, items]);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const nextId = visible[0]?.target.id;
        if (nextId) setActiveId(nextId);
      },
      { rootMargin: '-88px 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  const handleSelect = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    setActiveId(id);
  };

  if (compact) {
    return (
      <nav
        aria-label={title}
        className="flex gap-2 overflow-x-auto rounded-2xl border border-white/80 bg-white/95 p-2 shadow-[0_12px_32px_rgba(15,23,42,0.08)] backdrop-blur [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => {
          const active = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              aria-current={active ? 'location' : undefined}
              onClick={() => handleSelect(item.id)}
              className={`flex-none rounded-xl px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${
                active
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {index + 1}. {item.title}
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <Card
      bordered={false}
      className="w-full rounded-3xl border border-white/80 bg-white/90 shadow-[0_20px_48px_rgba(15,23,42,0.08)]"
      bodyStyle={{ padding: 16 }}
    >
      <div className="mb-4 text-base font-semibold text-slate-800">{title}</div>
      <nav aria-label={title} className="flex flex-col gap-3">
        {items.map((item, index) => {
          const active = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              aria-current={active ? 'location' : undefined}
              onClick={() => handleSelect(item.id)}
              className={`w-full rounded-2xl border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${
                active
                  ? 'border-slate-900 bg-slate-900 text-white shadow-[0_14px_32px_rgba(15,23,42,0.18)]'
                  : 'border-slate-200/80 bg-white/90 text-slate-700 shadow-[0_12px_32px_rgba(15,23,42,0.05)] hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_14px_28px_rgba(15,23,42,0.1)]'
              }`}
            >
              <span className="flex items-center gap-3 px-4 py-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${
                    active
                      ? 'bg-white/[0.12] text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {index + 1}
                </span>
                <span className="min-w-0">
                  <span
                    className={`block truncate text-sm font-semibold ${
                      active ? 'text-white' : 'text-slate-800'
                    }`}
                  >
                    {item.title}
                  </span>
                  <span
                    className={`mt-0.5 block truncate text-xs ${
                      active ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {item.description}
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </nav>
    </Card>
  );
};

export default ReportSectionNav;
