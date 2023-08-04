import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import gqlClient from '@common/gqlClient';
import { toast } from 'react-hot-toast';
import {
  useUpdateLabModelVersionMutation,
  useLabModelDetailQuery,
  useLabModelVersionQuery,
} from '@oss-compass/graphql';
import Center from '@common/components/Layout/Center';
import Form from '../Form';
import { formState, actions } from '../Form/state';
import Breadcrumb from '../Breadcrumb';

const ModelVersionEdit = () => {
  const router = useRouter();
  const modelId = Number(router.query.model);
  const versionId = Number(router.query.version);

  useEffect(() => {
    actions.resetForm();
  }, []);

  const { isLoading } = useLabModelDetailQuery(
    gqlClient,
    { id: modelId },
    {
      enabled: Boolean(modelId),
      onSuccess(res) {
        if (res.labModelDetail) {
          const { name, dimension, isGeneral, isPublic } = res.labModelDetail;
          formState.name = name;
          formState.dimension = dimension;
          formState.isGeneral = isGeneral;
          formState.isPublic = isPublic;
        }
      },
    }
  );

  const { isLoading: versionLoading } = useLabModelVersionQuery(
    gqlClient,
    {
      modelId,
      versionId,
    },
    {
      enabled: Boolean(modelId) && Boolean(versionId),
      onSuccess(res) {
        if (res.labModelVersion) {
          const { dataset, algorithm, metrics, version } = res.labModelVersion;
          formState.version = version;
          formState.algorithm = algorithm.ident;
          formState.dataSet = dataset.items.map((i) => {
            return {
              label: i.label,
              level: i.level,
              firstIdent: i.firstIdent,
              secondIdent: i.secondIdent,
            };
          });
          formState.metricSet = metrics.map((i) => {
            return {
              id: i.id,
              ident: i.ident,
              threshold: i.threshold,
              weight: i.weight,
              category: i.category,
            };
          });
        }
      },
    }
  );

  const updateMutation = useUpdateLabModelVersionMutation(gqlClient, {
    onSuccess(res) {
      toast.success((t) => <>更新成功</>, {
        position: 'top-center',
      });
      router.push('/lab/model/my');
    },
    onError(res) {
      toast.error((t) => <>更新失败</>, {
        position: 'top-center',
      });
    },
  });

  return (
    <div className="py-12 text-sm">
      <Center className="md:px-4">
        <Breadcrumb className="mb-6" />
        <Form
          loading={isLoading || versionLoading}
          formType={'VersionEdit'}
          submitLoading={updateMutation.isLoading}
          onSubmit={() => {
            const { version, dataSet, metricSet, algorithm } = formState;
            updateMutation.mutate({
              modelId,
              versionId,
              version,
              algorithm,
              datasets: dataSet,
              metrics: metricSet.map((i) => ({
                id: i.id,
                threshold: i.threshold,
                weight: i.weight,
              })),
            });
          }}
        />
      </Center>
    </div>
  );
};

export default ModelVersionEdit;
