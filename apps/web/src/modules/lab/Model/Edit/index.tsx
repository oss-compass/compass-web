import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import gqlClient from '@common/gqlClient';
import { useUpdateLabModelMutation } from '@oss-compass/graphql';
import { toast } from 'react-hot-toast';
import Center from '@common/components/Layout/Center';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Form from '../Form';
import { formState, actions } from '../Form/state';
import { useLabModelDetail } from '../hooks';

const ModelEdit = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const modelId = Number(router.query.model);
  const { data: modelDetail, isLoading } = useLabModelDetail({
    onSuccess(res) {
      if (res.labModelDetail) {
        const { name, dimension, isGeneral, isPublic } = res.labModelDetail;
        formState.name = name;
        formState.dimension = dimension;
        formState.isGeneral = isGeneral;
        formState.isPublic = isPublic;
      }
    },
  });

  useEffect(() => {
    actions.resetForm();
  }, []);

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
        <div className="mb-6 flex items-center justify-between">
          <div className="text-xl font-semibold">
            <Link href={'/lab/model/my'}>{t('lab:my_models')}</Link> /
            <span className="ml-2">{modelDetail?.labModelDetail?.name}</span> /
            <span className="ml-2">Edit</span>
          </div>
        </div>

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
