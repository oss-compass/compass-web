import { useRouter } from 'next/router';
import Button from '@common/components/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';

const SwitchToSingleRepo = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className="basis-80 md:mt-10">
      <div className="border-l border-gray-300 pl-10  md:border-none md:pl-0">
        <p className="mb-4 text-xl font-medium">
          {t('submit_project:run_for_a_single_repository')}
        </p>
        <Button
          className="mb-4 bg-primary"
          onClick={(e) => {
            router.replace(`/submit-your-project`);
          }}
        >
          {t('submit_project:submit_a_single_repository')}
        </Button>
        <p className="text-sm text-gray-400">
          {t(
            'submit_project:please_note_that_when_submitted_as_single_repository'
          )}
        </p>
      </div>
    </div>
  );
};

export default SwitchToSingleRepo;
