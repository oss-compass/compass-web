import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import Center from '@common/components/Layout/Center';
import { formState, actions } from '../Form/state';
import gqlClient from '@common/gqlClient';
import { useCreateLabModelMutation } from '@oss-compass/graphql';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Form from '../Form';
import getErrorMessage from '@common/utils/getErrorMessage';

const ModelCreate = () => {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    actions.resetForm();
  }, []);

  const mutation = useCreateLabModelMutation(gqlClient, {
    onSuccess(res) {
      toast.success(() => <>{t('lab:create_succeed')}</>, {
        position: 'top-center',
      });
      router.push('/lab/model/my');
    },
    onError(res) {
      toast.error(
        getErrorMessage(res) || (() => <>{t('lab:create_failed')}</>),
        {
          position: 'top-center',
        }
      );
    },
  });

  return (
    <div className="py-12 text-sm">
      <Center className="md:px-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="text-xl font-semibold">
            <Link href={'/lab/model/my'}>{t('lab:my_models')}</Link> /
            <span className="ml-2">{t('lab:create')}</span>
          </div>
        </div>

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
