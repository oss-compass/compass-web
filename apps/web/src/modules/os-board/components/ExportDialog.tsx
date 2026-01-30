import React from 'react';
import { useTranslation } from 'react-i18next';
import Dialog from '@common/components/Dialog';
import { Button } from '@oss-compass/ui';
import { actions, buildReportText, saveToStorage } from '../state';
import type { OsBoardExportFormat } from '../types';

interface ExportDialogProps {
  open: boolean;
  onClose: () => void;
  dashboardId: string;
  dashboardName: string;
}

const ExportDialog: React.FC<ExportDialogProps> = ({
  open,
  onClose,
  dashboardId,
  dashboardName,
}) => {
  const { t } = useTranslation();

  const doExport = (format: OsBoardExportFormat) => {
    const res = actions.exportDashboardSnapshot(dashboardId, format);
    if (!res.ok) return;
    const filename =
      format === 'json'
        ? `${dashboardName}.json`
        : format === 'csv'
        ? `${dashboardName}.csv`
        : `${dashboardName}.txt`;
    const blob = new Blob([res.payload], {
      type:
        format === 'json'
          ? 'application/json;charset=utf-8'
          : format === 'csv'
          ? 'text/csv;charset=utf-8'
          : 'text/plain;charset=utf-8',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    saveToStorage();
  };

  const downloadText = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Dialog
      open={open}
      dialogTitle={t('os_board:detail.export_title')}
      dialogContent={
        <div className="w-96">
          <div className="mb-2 text-sm text-gray-600">
            {t('os_board:detail.export.help')}
          </div>
          <div className="mb-3 flex flex-wrap gap-2">
            <Button size="sm" onClick={() => doExport('json')}>
              JSON
            </Button>
            <Button size="sm" onClick={() => doExport('csv')}>
              CSV
            </Button>
            <Button size="sm" intent="text" onClick={() => doExport('pdf')}>
              {t('os_board:detail.export.print')}
            </Button>
          </div>
          <div className="text-xs text-gray-500">
            {t('os_board:detail.report')}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <Button
              size="sm"
              onClick={() => {
                const text = buildReportText({
                  dashboardId,
                  template: 'weekly',
                });
                if (!text) return;
                downloadText(`${dashboardName}-weekly-report.txt`, text);
              }}
            >
              {t('os_board:detail.report_weekly')}
            </Button>
            <Button
              size="sm"
              onClick={() => {
                const text = buildReportText({
                  dashboardId,
                  template: 'monthly',
                });
                if (!text) return;
                downloadText(`${dashboardName}-monthly-report.txt`, text);
              }}
            >
              {t('os_board:detail.report_monthly')}
            </Button>
          </div>
        </div>
      }
      dialogActions={
        <div className="flex">
          <Button intent="text" size="sm" onClick={onClose}>
            {t('common:btn.close')}
          </Button>
        </div>
      }
      handleClose={onClose}
    />
  );
};

export default ExportDialog;
