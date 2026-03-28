import React from 'react';
import { useTranslation } from 'react-i18next';
import Dialog from '@common/components/Dialog';
import { Button } from '@oss-compass/ui';

interface ExportDialogProps {
  open: boolean;
  onClose: () => void;
  dashboardId: string;
  dashboardName: string;
}

const ExportDialog: React.FC<ExportDialogProps> = ({ open, onClose }) => {
  const { t } = useTranslation();

  const doExport = (_format: 'json' | 'csv' | 'pdf') => {
    // TODO: 接入后端导出接口
  };

  const downloadReport = (_template: 'weekly' | 'monthly') => {
    // TODO: 接入后端报告生成接口
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
            <Button size="sm" onClick={() => downloadReport('weekly')}>
              {t('os_board:detail.report_weekly')}
            </Button>
            <Button size="sm" onClick={() => downloadReport('monthly')}>
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
