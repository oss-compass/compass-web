import React from 'react';
import router from 'next/router';
import { useTranslation } from 'react-i18next';
import { SiGitee, SiGithub } from 'react-icons/si';
import Button from '@common/components/Button';
import Center from '@common/components/Layout/Center';
import Pagination from '@common/components/Pagination';

interface SubscribeItemProps {}

const SubscribeItem = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center border-b py-3">
      <div className="flex">
        <div className="pr-2">
          <SiGithub />
        </div>
        <div>
          <div className="text-sm font-bold">MLFlow</div>
          <div className="text-xs text-secondary">dromara</div>
        </div>
      </div>
      <div className="flex flex-1 justify-end">
        <div className="w-[200px] text-sm text-secondary">
          Updated on 2023-04-28
        </div>
      </div>
      <Button intent="text" size="sm">
        {t('setting:subscriptions.unsubscribe')}
      </Button>
    </div>
  );
};

export default SubscribeItem;
