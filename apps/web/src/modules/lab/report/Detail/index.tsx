import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Center from '@common/components/Layout/Center';
import { useTranslation } from 'react-i18next';
import { useEventEmitter } from 'ahooks';
import { ReFetch } from '@common/constant';
import {
  useLabModelVersion,
  useLabModelDetail,
} from '@modules/lab/model/hooks';

const ReportDetail = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const modelId = Number(router.query.model);
  const { data: modelDetail, isLoading, refetch } = useLabModelVersion();
  // const { data: modelDetail } = useLabModelVersion();

  const event$ = useEventEmitter<string>();
  event$.useSubscription((flag) => {
    if (flag === ReFetch) {
      refetch();
    }
  });
  // useEffect(() => {
  //   // actions.resetForm();
  //   // if (modelDetail?.labModelDetail) {
  //   //   const { name, dimension, isGeneral, isPublic } =
  //   //     modelDetail.labModelDetail;
  //   //   formState.name = name;
  //   //   formState.dimension = dimension;
  //   //   formState.isGeneral = isGeneral;
  //   //   formState.isPublic = isPublic;
  //   // }
  // }, [modelDetail]);

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

    return <>{/* < model={modelDetail.labModelVersion} fullWidth /> */}</>;
  };
  return (
    <div className="flex-1 bg-[#fafafa] py-12 text-sm">
      <Center className="my-auto md:px-4">
        <div className="mb-6 flex items-center justify-between">
          {/* <div className="text-xl font-semibold"></div> */}
          {getContent()}
        </div>
      </Center>
    </div>
  );
};

export default ReportDetail;
