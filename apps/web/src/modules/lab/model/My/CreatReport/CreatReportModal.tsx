import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Input, Modal } from '@oss-compass/ui';
import { GrClose } from 'react-icons/gr';
import { useTranslation } from 'react-i18next';
import ModalSelect from '@modules/lab/model/Form/FormDataSet/Modal';
import ReportForm from '@modules/lab/report/components/ReportForm';
import { formState } from '@modules/lab/report/components/ReportForm/state';
import toast from 'react-hot-toast';
import { useCreateLabDatasetMutation } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import getErrorMessage from '@common/utils/getErrorMessage';

const CreatReport = ({
  model,
  version,
  open,
  onClose,
}: {
  model?: any;
  version?: any;
  open: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const handleSave = () => {};
  const createMutation = useCreateLabDatasetMutation(gqlClient, {
    onSuccess(res) {
      toast.success(() => <>{t('lab:create_succeed')}</>, {
        position: 'top-center',
      });
      router.push('/lab/report/my');
    },
    onError(res) {
      toast.error(getErrorMessage(res) || (() => <>{t('lab:edit_failed')}</>), {
        position: 'top-center',
      });
    },
  });
  return (
    <>
      <Modal open={open} onClose={() => onClose()}>
        <div className="relative h-[700px] w-[900px] border-2 border-black bg-white shadow outline-0 md:w-full">
          <div
            className="absolute top-10 right-10 cursor-pointer p-2 "
            onClick={() => {
              onClose();
            }}
          >
            <GrClose />
          </div>
          <div className="px-10 pt-8 md:px-2">
            <div className="mb-3 text-2xl font-medium">
              {t('lab:generate_model_evaluation_reports')}
            </div>

            <ReportForm version={version} name={model.name} />
            <div className="border-silver absolute left-0 right-0 bottom-0 flex h-20 items-center justify-end border-t bg-white px-9 text-sm">
              <div>
                <Button
                  className="min-w-[100px]"
                  onClick={() => {
                    const { isPublic, name, dataSet } = formState;
                    const dataSetLen = formState.dataSet.length;
                    if (dataSetLen === 0) {
                      toast.error(t('lab:form_tips.dataset_require'));
                      return;
                    }
                    createMutation.mutate({
                      modelId: model.id,
                      versionId: version.id,
                      datasets: dataSet,
                    });
                    // setOpenModalSelect(true);
                    handleSave();
                  }}
                >
                  {t('common:btn.confirm')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreatReport;
