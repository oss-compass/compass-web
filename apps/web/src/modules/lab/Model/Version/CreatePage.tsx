import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import gqlClient from '@common/gqlClient';
import {
  useLabModelDetailQuery,
  useCreateLabModelVersionMutation,
} from '@oss-compass/graphql';
import Center from '@common/components/Layout/Center';
import { formState, actions } from '../Form/state';
import Form from '../Form';
import Breadcrumb from '../Breadcrumb';

const VersionCreate = () => {
  const router = useRouter();
  const modelId = Number(router.query.model);

  useEffect(() => {
    actions.resetForm();
  }, []);

  const { isLoading } = useLabModelDetailQuery(
    gqlClient,
    { modelId },
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

  const createMutation = useCreateLabModelVersionMutation(gqlClient, {
    onSuccess() {
      router.push('/lab/model/my');
    },
    onError(res) {
      toast.error((t) => <>创建失败</>, {
        position: 'top-center',
      });
    },
  });

  return (
    <div className="py-12 text-sm">
      <Center className="md:px-4">
        <Breadcrumb className="mb-6" />
        <Form
          loading={isLoading}
          formType={'VersionCreate'}
          submitLoading={createMutation.isLoading}
          onSubmit={() => {
            const { version, dataSet, metricSet, algorithm } = formState;
            createMutation.mutate({
              modelId: modelId,
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

export default VersionCreate;
