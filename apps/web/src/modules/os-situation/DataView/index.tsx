import React from 'react';
import { useTranslation } from 'next-i18next';
import Navber from '@modules/os-situation/components/NavBar';
import { useRouter } from 'next/router';
import Charts from './Charts';

const MerticPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const metric = router.query.metric;
  console.log(router);

  return (
    <>
      <Navber defaultValue={metric} />
      <div className="relative flex min-w-0 flex-1 flex-col bg-gray-50 px-10 pt-8 md:p-0">
        <Charts />
      </div>
    </>
  );
};

export default MerticPage;
