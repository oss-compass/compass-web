import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import gqlClient from '@common/gqlClient';
import { toast } from 'react-hot-toast';
import { useUpdateLabModelVersionMutation } from '@oss-compass/graphql';
import Center from '@common/components/Layout/Center';
import { useTranslation } from 'react-i18next';
import Form from '../Form';
import Link from 'next/link';
import { formState, actions } from '../Form/state';
import { useLabModelVersion, useLabModelDetail } from '../hooks';

const ModelVersionEdit = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const modelId = Number(router.query.model);
  const versionId = Number(router.query.version);

  const { isLoading, data: modelDetail } = useLabModelDetail();

  useEffect(() => {
    actions.resetForm();

    if (modelDetail?.labModelDetail) {
      const { name, isPublic } = modelDetail.labModelDetail;
      formState.name = name;
      // formState.dimension = dimension;
      // formState.isGeneral = isGeneral;
      formState.isPublic = isPublic;
    }
  }, [modelDetail]);

  const { isLoading: vLoading, data: modelVersion } = useLabModelVersion();

  useEffect(() => {
    if (modelVersion?.labModelVersion) {
      const { algorithm, metrics, version, isScore } =
        modelVersion.labModelVersion;
      formState.version = version;
      formState.isScore = isScore;
      formState.algorithm = algorithm.ident;
      // formState.dataSet = dataset.items.map((i) => {
      //   return {
      //     label: i.label,
      //     level: i.level,
      //     firstIdent: i.firstIdent,
      //     secondIdent: i.secondIdent,
      //   };
      // });
      formState.metricSet = metrics.map((i) => {
        return {
          defaultThreshold: i.defaultThreshold,
          defaultWeight: i.defaultWeight,
          id: i.id,
          metricId: i.metricId,
          ident: i.ident,
          threshold: i.threshold,
          weight: i.weight,
          category: i.category,
        };
      });
    }
  }, [modelVersion]);

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
        <div className="mb-6 flex items-center justify-between">
          <div className="text-xl font-semibold">
            <Link href={'/lab/model/my'}>{t('lab:my_models')}</Link> /
            <span className="ml-2">{modelDetail?.labModelDetail?.name}</span> /
            <span className="ml-2">
              {modelVersion?.labModelVersion?.version}
            </span>
            /<span className="ml-2">{t('lab:edit')}</span>
          </div>
        </div>

        <Form
          loading={isLoading || vLoading}
          formType={'VersionEdit'}
          submitLoading={updateMutation.isLoading}
          onSubmit={() => {
            const { version, isScore, metricSet, algorithm } = formState;
            updateMutation.mutate({
              modelId,
              versionId,
              version,
              algorithm,
              isScore,
              metrics: metricSet.map((i) => ({
                id: i.metricId,
                versionId,
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
