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
import getErrorMessage from '@common/utils/getErrorMessage';

const ModelEdit = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const modelId = Number(router.query.model);
  const { data: modelDetail, isLoading } = useLabModelDetail();

  useEffect(() => {
    actions.resetForm();

    if (modelDetail?.labModelDetail) {
      const { name, description, isPublic } = modelDetail.labModelDetail;

      formState.name = name;
      formState.description = description;
      formState.isPublic = isPublic;
    }
  }, [modelDetail]);

  const updateMutation = useUpdateLabModelMutation(gqlClient, {
    onSuccess(res) {
      toast.success(() => <>{t('lab:edit_succeed')}</>, {
        position: 'top-center',
      });
      router.push('/lab/model/my');
    },
    onError(res) {
      toast.error(getErrorMessage(res) || (() => <>{t('lab:edit_failed')}</>), {
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
            <span className="ml-2">{t('lab:edit')}</span>
          </div>
        </div>

        <Form
          formType={'ModelEdit'}
          loading={isLoading}
          submitLoading={updateMutation.isLoading}
          onSubmit={() => {
            const { isPublic, name, description } = formState;
            updateMutation.mutate({
              isPublic,
              name,
              description,
              modelId: modelId,
            });
          }}
        />
      </Center>
    </div>
  );
};

export default ModelEdit;
