import React from 'react';
import { useTranslation } from 'next-i18next';
import Navber from '@modules/os-situation/components/NavBar';
import { useRouter } from 'next/router';

const MerticPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const metric = router.query.metric;
  console.log(router);

  return (
    <>
      <Navber defaultValue={metric} />
    </>
  );
};

export default MerticPage;
