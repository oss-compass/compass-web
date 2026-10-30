import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';

const IssueExportButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-600"
    title="导出完整列表（不限当前分页）"
  >
    <DownloadOutlined />
    导出
  </button>
);
export default IssueExportButton;
