import React from 'react';
import router from 'next/router';
import { useTranslation } from 'react-i18next';
import Center from '@common/components/Layout/Center';
import Button from '@common/components/Button';
import Pagination from '@common/components/Pagination';
import SubscribeItem from './SubscribeItem';

const Subscribe = () => {
  const { t } = useTranslation();
  return (
    <Center widthClassName="w-[1000px] pb-20 lg:px-6">
      <div className="flex justify-between pb-3 pt-10">
        <div className="text-xl font-bold">
          {t('setting:subscriptions.title')}
        </div>
        <div>
          <Button
            size="sm"
            intent="secondary"
            onClick={() => {
              router.push('/submit-your-project');
            }}
          >
            {t('setting:subscriptions.submit_a_project')}
          </Button>
        </div>
      </div>

      <SubscribeItem />

      <div className="py-6">
        <Pagination page={1} pageTotal={10} onChange={() => {}} />
      </div>
    </Center>
  );
};

export default Subscribe;
