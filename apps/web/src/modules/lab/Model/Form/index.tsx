import React, { PropsWithChildren, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@oss-compass/ui';
import FormIsPublic from './FormIsPublic';
import FormVersionTitle from './FormVersionTitle';
import FormDomain from './FormDomain';
import FormTitle from './FormTitle';
import FormDataSet from './FormDataSet';
import FormMetric from './FormMetric';
import FormWeight from './FormWeight';
import FormAlgorithm from './FormAlgorithm';
import CheckTerms from '@modules/lab/components/CheckTerms';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const isVersion = formType === 'VersionCreate' || formType === 'VersionEdit';
  const isModel = formType === 'ModelCreate' || formType === 'ModelEdit';
  const [select, setSelect] = useState(false);

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
          {isModel ? null : <FormVersionTitle />}
          <FormDataSet />
          <FormMetric />
          <FormWeight />
          <FormAlgorithm />
          {isModel && (
            <CheckTerms
              select={select}
              setSelect={() => {
                setSelect(!select);
              }}
            />
          )}
        </>
      )}

      <div className="flex items-center">
        <Button
          className="mr-6 w-28"
          size="md"
          loading={submitLoading}
          onClick={() => {
            if (formType !== 'ModelEdit' && isModel && !select) {
              toast.error(t('lab:please_check_the_terms'));
            } else {
              onSubmit();
            }
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
