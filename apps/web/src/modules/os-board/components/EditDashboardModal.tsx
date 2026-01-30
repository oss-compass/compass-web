import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { GrClose } from 'react-icons/gr';
import { Button, Modal } from '@oss-compass/ui';
import DashboardForm, { DashboardFormValues } from './DashboardForm';
import type { OsBoardDashboardType } from '../types';

interface EditDashboardModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: DashboardFormValues) => void;
  initialValues: {
    name: string;
    type: OsBoardDashboardType;
    projects: string[];
    competitors: string[];
    compareMode: boolean;
    metricIds: string[];
  };
}

const EditDashboardModal: React.FC<EditDashboardModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialValues,
}) => {
  const { t } = useTranslation();
  const formRef = useRef<{ submit: () => void }>(null);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="relative h-[80vh] w-[80vw] border-2 border-black bg-white shadow outline-0">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-8 pb-4 pt-8">
            <h2 className="text-2xl font-medium">
              {t('os_board:detail.edit')}
            </h2>
            <div
              className="cursor-pointer p-2 hover:bg-gray-100"
              onClick={onClose}
            >
              <GrClose />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-8 py-6">
            <DashboardForm
              ref={formRef}
              mode="edit"
              initialValues={initialValues}
              onSubmit={onSubmit}
              onCancel={onClose}
            />
          </div>
          <div className="flex justify-end border-t px-8 py-4">
            <Button intent="text" size="sm" onClick={onClose}>
              {t('common:btn.cancel')}
            </Button>
            <Button
              intent="primary"
              size="sm"
              className="ml-4"
              onClick={() => {
                formRef.current?.submit();
              }}
            >
              {t('common:btn.save')}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditDashboardModal;
