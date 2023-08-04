import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import gqlClient from '@common/gqlClient';
import {
  useLabModelDetailQuery,
  useUpdateLabModelMutation,
} from '@oss-compass/graphql';
import { toast } from 'react-hot-toast';
import Center from '@common/components/Layout/Center';
import { formState, actions } from '../Form/state';
import Form from '../Form';
import Breadcrumb from '../Breadcrumb';

const ModelEdit = () => {
  const router = useRouter();
  const modelId = Number(router.query.model);

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

  const updateMutation = useUpdateLabModelMutation(gqlClient, {
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
          formType={'ModelEdit'}
          loading={isLoading}
          submitLoading={updateMutation.isLoading}
          onSubmit={() => {
            const { isPublic, isGeneral, dimension, name } = formState;
            updateMutation.mutate({
              isPublic,
              isGeneral,
              dimension,
              name,
              modelId: modelId,
            });
          }}
        />
      </Center>
    </div>
  );
};

export default ModelEdit;
