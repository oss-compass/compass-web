import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import gqlClient from '@common/gqlClient';
import {
  useLabModelDetailQuery,
  useCreateLabModelVersionMutation,
} from '@oss-compass/graphql';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Center from '@common/components/Layout/Center';
import { formState, actions } from '../Form/state';
import Form from '../Form';
import { useLabModelDetail } from '../hooks';

const VersionCreate = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const modelId = Number(router.query.model);

  useEffect(() => {
    actions.resetForm();
  }, []);

  const { isLoading, data: modelDetail } = useLabModelDetail({
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
        <div className="mb-6 flex items-center justify-between">
          <div className="text-xl font-semibold">
            <Link href={'/lab/model/my'}>{t('lab:my_models')}</Link> /
            <span className="ml-2">{modelDetail?.labModelDetail?.name}</span> /
            <span className="ml-2">NewVersion</span>
          </div>
        </div>
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
