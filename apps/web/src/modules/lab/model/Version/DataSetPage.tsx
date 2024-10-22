import React, { useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Center from '@common/components/Layout/Center';
import DataSetPanel from '../components/DataSetPanel';
import { useLabModelVersion, useLabModelDetail } from '../hooks';

const ModelVersionDataSet = () => {
  const { t } = useTranslation();
  const { data: modelDetail } = useLabModelDetail();
  const { data: versionData } = useLabModelVersion();

  const modelId = modelDetail?.labModelDetail?.id;
  const versionId = versionData?.labModelVersion?.id;

  return (
    <div className="flex-1 bg-[#FAFAFA] pt-12 pb-10 text-sm">
      <Center className="md:px-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="text-xl font-semibold">
            <Link href={'/lab/model/my'}>{t('lab:my_models')}</Link> /
            <span className="ml-2">{modelDetail.labModelDetail.name}</span> /
            <span className="ml-2">{versionData.labModelVersion.version}</span>
          </div>
        </div>

        {/* <DataSetPanel
          fullWidth
          modelId={modelId}
          versionId={versionId}
          dataSet={dataset}
        /> */}
      </Center>
    </div>
  );
};

export default ModelVersionDataSet;
