import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@oss-compass/ui';
import FormIsPublic from './FormIsPublic';
import FormDomain from './FormDomain';
import FormTitle from './FormTitle';
import FormDataSet from './FormDataSet';
import FormMetric from './FormMetric';
import FormWeight from './FormWeight';
import FormAlgorithm from './FormAlgorithm';

const Form = ({
  formType,
  onSubmit,
  loading,
  submitLoading,
}: {
  formType?: 'VersionCreate' | 'VersionEdit' | 'ModelCreate' | 'ModelEdit';
  loading?: boolean;
  submitLoading: boolean;
  onSubmit: () => void;
}) => {
  const router = useRouter();

  const isVersion = formType === 'VersionCreate' || formType === 'VersionEdit';

  if (loading) {
    return (
      <div className="animate-pulse py-4">
        <div className="flex-1 space-y-4 ">
          <div className="h-4 rounded bg-slate-200"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-4 rounded bg-slate-200"></div>
            <div className="col-span-1 h-4 rounded bg-slate-200"></div>
          </div>
          <div className="h-4 rounded bg-slate-200"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 h-4 rounded bg-slate-200"></div>
            <div className="col-span-2 h-4 rounded bg-slate-200"></div>
          </div>
          <div className="h-4 rounded bg-slate-200"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <FormTitle disabled={isVersion} />
      <FormDomain disabled={isVersion} />
      <FormIsPublic disabled={isVersion} />

      {formType === 'ModelEdit' ? null : (
        <>
          <FormDataSet />
          <FormMetric />
          <FormWeight />
          <FormAlgorithm />
        </>
      )}

      <div className="flex items-center">
        <Button
          className="mr-6 w-28"
          size="md"
          loading={submitLoading}
          onClick={() => {
            onSubmit();
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
