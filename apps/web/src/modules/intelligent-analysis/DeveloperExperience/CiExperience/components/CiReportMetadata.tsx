import React from 'react';
import type { CiDatasetResponse } from '../api';

const CiReportMetadata: React.FC<{
  day: string;
  report: Pick<CiDatasetResponse, 'journey' | 'uploaded_at'>;
}> = ({ day, report }) => {
  const caliber = report.journey?.boards[day]?.scores?.caliber;
  return (
    <footer className="px-1 py-2 text-xs leading-relaxed text-slate-400">
      Cogito · CI 体验诊断 · 观测日 {day}
      {caliber ? ` · 评分版本 ${caliber}` : ''}
      {report.uploaded_at ? ` · 数据更新时间 ${report.uploaded_at}` : ''}
    </footer>
  );
};

export default CiReportMetadata;
