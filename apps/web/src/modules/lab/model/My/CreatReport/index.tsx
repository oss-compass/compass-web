import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineSelect } from 'react-icons/ai';
import ModalSelect from '@modules/lab/model/Form/FormDataSet/Modal';
import CreatReportModal from './CreatReportModal';

const CreatReport = ({ version, model }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <CreatReportModal
        version={version}
        model={model}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
      <div
        className="hover:bg-smoke flex flex-1 basis-1/2 cursor-pointer items-center justify-center"
        onClick={() => {
          setOpen(true);
          // router.push(`/lab/model/${modelId}/version/${version.id}/detail`);
        }}
      >
        <AiOutlineSelect className="text-secondary" />
        <span className="ml-2 block text-sm">{'使用模型进行评估'}</span>
      </div>
    </>
  );
};
export default CreatReport;
