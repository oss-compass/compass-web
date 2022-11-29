import { useRouter } from 'next/router';
import Button from '@modules/submitProject/Form/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';

const SwitchToCommunity = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className="basis-80 md:mt-10">
      <div className="border-l border-gray-300 pl-10 md:border-none md:pl-0">
        <p className="mb-4 text-xl font-medium">
          {t('submit_project:run_for_a_community_with_multiple_repositories')}
        </p>
        <Button
          className="mb-4 !bg-[#F89E34]"
          onClick={(e) => {
            router.replace(`/submit-your-project/community`);
          }}
        >
          {t('submit_project:submit_as_community')}
        </Button>
        <p className="text-sm text-gray-400">
          {t('submit_project:please_note_that_when_submitted_as_a_community')}
        </p>
      </div>
    </div>
  );
};

export default SwitchToCommunity;
