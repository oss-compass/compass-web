import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import Center from '@common/components/Layout/Center';
import { formState, actions } from '../Form/state';
import gqlClient from '@common/gqlClient';
import { useCreateLabModelMutation } from '@oss-compass/graphql';
import Form from '../Form';
import Breadcrumbs from '../Breadcrumb';

const ModelCreate = () => {
  const router = useRouter();

  useEffect(() => {
    actions.resetForm();
  }, []);

  const mutation = useCreateLabModelMutation(gqlClient, {
    onSuccess() {
      toast.success((t) => <>创建成功</>, {
        position: 'top-center',
      });
      router.push('/lab/model/my');
    },
    onError(err) {
      toast.error((t) => <>{'创建失败'}</>, {
        position: 'top-center',
      });
    },
  });

  return (
    <div className="py-12 text-sm">
      <Center className="md:px-4">
        <Breadcrumbs className="mb-6" />
        <Form
          formType="ModelCreate"
          submitLoading={mutation.isLoading}
          onSubmit={() => {
            const {
              isPublic,
              isGeneral,
              dimension,
              name,
              dataSet,
              metricSet,
              algorithm,
            } = formState;

            mutation.mutate({
              isPublic,
              isGeneral,
              dimension,
              name,
              algorithm,
              datasets: dataSet,
              metrics: metricSet.map((i) => ({
                id: i.metricId,
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

export default ModelCreate;
