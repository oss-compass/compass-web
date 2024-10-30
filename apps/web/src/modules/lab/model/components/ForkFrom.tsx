import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const ForkFrom = ({ name, id }: { name: string; id: number }) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <>
      <div className="ml-6 pt-1 text-xs font-normal">
        Fork form{' '}
        <span
          onClick={() => {
            router.push(`/lab/model/${id}/detail`);
          }}
          className="cursor-pointer text-[#3a82f8]"
        >
          {name}
        </span>
      </div>
    </>
  );
};

export default ForkFrom;
