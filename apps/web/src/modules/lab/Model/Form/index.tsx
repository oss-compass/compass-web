import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { useCreateLabModelMutation } from '@oss-compass/graphql';
import { Button } from '@oss-compass/ui';
import gqlClient from '@common/gqlClient';
import { formState } from './state';
import FormIsPublic from './FormIsPublic';
import FormDomain from './FormDomain';
import FormTitle from './FormTitle';
import FormDataSet from './FormDataSet';
import FormMetric from './FormMetric';
import FormWeight from './FormWeight';
import FormAlgorithm from './FormAlgorithm';

const Form = () => {
  const router = useRouter();
  const mutation = useCreateLabModelMutation(gqlClient);

  const handleSubmit = () => {
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
        id: i.id,
        threshold: i.threshold,
        weight: i.weight,
      })),
    });
  };

  return (
    <>
      <FormTitle />
      <FormDomain />
      <FormIsPublic />
      <FormDataSet />
      <FormMetric />
      <FormWeight />
      <FormAlgorithm />
      <div className="flex items-center">
        <Button
          className="mr-6 w-28"
          size="md"
          loading={mutation.isLoading}
          onClick={() => {
            handleSubmit();
          }}
        >
          Save
        </Button>
        <Button
          intent="text"
          onClick={() => {
            router.back();
          }}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default Form;
