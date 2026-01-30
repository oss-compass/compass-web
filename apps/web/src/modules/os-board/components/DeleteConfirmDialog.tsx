import React from 'react';
import { useTranslation } from 'react-i18next';
import Dialog from '@common/components/Dialog';
import { Button } from '@oss-compass/ui';

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      dialogTitle={t('os_board:detail.delete.title')}
      dialogContent={
        <div className="w-96">{t('os_board:detail.delete.body')}</div>
      }
      dialogActions={
        <div className="flex">
          <Button intent="text" size="sm" onClick={onClose}>
            {t('common:btn.cancel')}
          </Button>
          <Button
            intent="primary"
            size="sm"
            className="ml-4"
            onClick={onConfirm}
          >
            {t('common:btn.confirm')}
          </Button>
        </div>
      }
      handleClose={onClose}
    />
  );
};

export default DeleteConfirmDialog;
