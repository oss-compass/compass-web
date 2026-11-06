import React from 'react';
import Link from 'next/link';
import { buildIssueTaskManagementHref } from '../../routes';

const TaskManagementEntry: React.FC<{ org?: string }> = ({ org }) => {
  return (
    <Link
      href={buildIssueTaskManagementHref({ org })}
      className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
    >
      任务管理
    </Link>
  );
};
export default TaskManagementEntry;
