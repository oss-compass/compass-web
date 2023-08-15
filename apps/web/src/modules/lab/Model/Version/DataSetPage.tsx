import React, { useEffect } from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Center from '@common/components/Layout/Center';
import RepoCard from '../components/RepoCard';
import { useLabModelVersion, useLabModelDetail } from '../hooks';

const ModelVersionDataSet = () => {
  const { t } = useTranslation();
  const { data: modelDetail } = useLabModelDetail();
  const { data: versionData } = useLabModelVersion();
  const dataset = versionData?.labModelVersion?.dataset?.items || [];

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

        <div
          className={classnames(
            'grid flex-1 gap-6',
            'grid-cols-4',
            'xl:grid-cols-3',
            'md:grid-cols-2 md:gap-4',
            'sm:grid-cols-1'
          )}
        >
          {dataset.map((item) => {
            return (
              <RepoCard
                key={item.label}
                label={item.label}
                shortCode={item.shortCode}
              />
            );
          })}
        </div>
      </Center>
    </div>
  );
};

export default ModelVersionDataSet;
