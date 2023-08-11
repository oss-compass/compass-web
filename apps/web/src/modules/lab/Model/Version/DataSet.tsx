import React, { useEffect } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import gqlClient from '@common/gqlClient';
import { toast } from 'react-hot-toast';
import {
  useLabModelDetailQuery,
  useLabModelVersionQuery,
} from '@oss-compass/graphql';
import Center from '@common/components/Layout/Center';
import Breadcrumb from '../Breadcrumb';
import RepoCard from './component/RepoCard';

const ModelVersionDataSet = () => {
  const router = useRouter();
  const modelId = Number(router.query.model);
  const versionId = Number(router.query.version);

  const { isLoading } = useLabModelDetailQuery(
    gqlClient,
    { id: modelId },
    {
      enabled: Boolean(modelId),
      onSuccess(res) {
        if (res.labModelDetail) {
          const { name, dimension, isGeneral, isPublic } = res.labModelDetail;
        }
      },
    }
  );

  const { isLoading: versionLoading, data: versionData } =
    useLabModelVersionQuery(
      gqlClient,
      {
        modelId,
        versionId,
      },
      {
        enabled: Boolean(modelId) && Boolean(versionId),
        onSuccess(res) {
          if (res.labModelVersion) {
          }
        },
      }
    );

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
