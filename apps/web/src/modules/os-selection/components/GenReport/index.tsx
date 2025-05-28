import React, { useState } from 'react';
import client from '@common/gqlClient';
import { useCreateThirdSoftwareReportMutation } from '@oss-compass/graphql';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const GenReport = ({ selectedSoftware }) => {
  const { t } = useTranslation();
  const createMutation = useCreateThirdSoftwareReportMutation(client, {
    onSuccess(res) {
      if (res.createThirdSoftwareReport?.status) {
        toast.success('提交生成报告成功，可在我的报告中查看生成状态');
      } else {
        toast.error(
          res.createThirdSoftwareReport?.message || t('common:toast.add_failed')
        );
      }
    },
    onError(e: any) {
      const errors = e?.response?.errors;
      let msg = '';
      if (Array.isArray(errors) && errors.length > 0) {
        msg = errors[0].message;
      }
      toast.error(msg || t('common:toast.add_failed'));
    },
  });
  const handleCompare = () => {
    console.log(selectedSoftware);
    if (selectedSoftware.length > 0) {
      createMutation.mutate({
        label: 'OpenHarmony-TPC',
        level: 'community',
        softwareReports: selectedSoftware.map((item) => {
          return { name: item.name, codeUrl: item.label };
        }),
      });
    }
  };
  return (
    <div className="">
      <button
        onClick={handleCompare}
        className="flex items-center gap-2 bg-blue-500 px-4 py-2 text-white shadow-lg transition-all hover:bg-blue-600"
      >
        <span>生成报告</span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm text-blue-500">
          {selectedSoftware.length}
        </span>
      </button>
    </div>
  );
};

export default GenReport;
