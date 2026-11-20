import React, { useEffect, useRef, useState } from 'react';
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
import { ModelVersionQueryBoundary } from '../Provider/ModelVersionProvider';

const ModelVersionEdit = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const modelId = Number(router.query.model);
  const versionId = Number(router.query.version);

  const {
    isLoading,
    data: modelDetail,
    error: modelError,
  } = useLabModelDetail();
  const {
    isLoading: vLoading,
    data: modelVersion,
    error: versionError,
  } = useLabModelVersion();
  const initialized = useRef(false);
  const [initializedTarget, setInitializedTarget] = useState<string | null>(
    null
  );
  const target = `${modelId}/${versionId}`;

  useEffect(() => {
    // Query refreshes must not reset an in-progress edit of the same version.
    actions.resetForm();
    initialized.current = false;
    setInitializedTarget(null);
  }, [modelId, versionId]);

  useEffect(() => {
    // Initialize both halves together, regardless of which request finishes first.
    if (
      !initialized.current &&
      modelId &&
      versionId &&
      !modelError &&
      !versionError &&
      modelDetail?.labModelDetail?.id &&
      modelVersion?.labModelVersion?.id
    ) {
      const { name, isPublic, description } = modelDetail.labModelDetail;
      formState.name = name;
      formState.description = description;
      // formState.dimension = dimension;
      // formState.isGeneral = isGeneral;
      formState.isPublic = isPublic;
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
      initialized.current = true;
      setInitializedTarget(target);
    }
  }, [
    modelId,
    versionId,
    target,
    modelDetail,
    modelVersion,
    modelError,
    versionError,
  ]);

  const updateMutation = useUpdateLabModelVersionMutation(gqlClient, {
    onSuccess(res) {
      console.log(res);
      toast.success(
        () => <>{res.updateLabModelVersion.message || '更新成功'}</>,
        {
          position: 'top-center',
        }
      );
      router.push('/lab/model/my');
    },
    onError(res) {
      toast.error(() => <>更新失败</>, {
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

        <ModelVersionQueryBoundary
          loading={isLoading || vLoading}
          failed={Boolean(modelError || versionError)}
          hasData={Boolean(
            modelDetail?.labModelDetail?.id && modelVersion?.labModelVersion?.id
          )}
        >
          <Form
            loading={initializedTarget !== target}
            formType={'VersionEdit'}
            submitLoading={updateMutation.isLoading}
            onSubmit={() => {
              if (initializedTarget !== target) return;
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
        </ModelVersionQueryBoundary>
      </Center>
    </div>
  );
};

export default ModelVersionEdit;
