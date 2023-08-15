import React, { useEffect } from 'react';
import classnames from 'classnames';
import Center from '@common/components/Layout/Center';
import Breadcrumb from '../Breadcrumb';
import RepoCard from '../components/RepoCard';
import { useLabModelVersion } from '../hooks';

const ModelVersionDataSet = () => {
  const { data: versionData } = useLabModelVersion();
  const dataset = versionData?.labModelVersion?.dataset?.items || [];

  return (
    <div className="flex-1 bg-[#FAFAFA] pt-12 pb-10 text-sm">
      <Center className="md:px-4">
        <Breadcrumb className="mb-6" />

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
