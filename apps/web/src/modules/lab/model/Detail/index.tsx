import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Center from '@common/components/Layout/Center';
import { useTranslation } from 'react-i18next';
import { IoArrowBack } from 'react-icons/io5';
import { useLabModelDetail } from '../hooks';
import { useEventEmitter } from 'ahooks';
import { ReFetch } from '@common/constant';
import DetailPage from './DetailPage';
import Link from 'next/link';

const ModelDetail = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const modelId = Number(router.query.model);
  const { data: modelDetail, isLoading, refetch } = useLabModelDetail();
  console.log(modelDetail);
  const event$ = useEventEmitter<string>();
  event$.useSubscription((flag) => {
    if (flag === ReFetch) {
      refetch();
    }
  });

  const getContent = () => {
    if (isLoading) {
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
    if (!modelDetail) {
      return <>{t('lab:lab_models.forbidden')}</>;
    }
    return (
      <>
        <DetailPage model={modelDetail.labModelDetail} event$={event$} />
      </>
    );
  };
  return (
    <div className="flex-1 bg-[#ffffff] py-12 text-sm">
      <Center className="my-auto md:px-4">
        <div className="hover:text-primary text-lg">
          <Link
            href={`/lab?modelType=${
              modelDetail?.labModelDetail?.modelType || '0'
            }`}
            className="flex items-center gap-2 px-4"
          >
            <IoArrowBack /> {t('common:btn.back')}
          </Link>
        </div>
        <div className="mb-6 flex items-center justify-between">
          {getContent()}
        </div>
      </Center>
    </div>
  );
};

export default ModelDetail;
