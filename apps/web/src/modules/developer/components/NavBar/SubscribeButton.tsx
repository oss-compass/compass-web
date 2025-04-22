import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsFillBookmarkFill, BsBookmark } from 'react-icons/bs';
import client from '@common/gqlClient';
import {
  useSubscriptionCountQuery,
  useCreateSubscriptionMutation,
  useCancelSubscriptionMutation,
} from '@oss-compass/graphql';
import useCompareItems from '@modules/developer/hooks/useCompareItems';
import { CgSpinner } from 'react-icons/cg';
import { toast } from 'react-hot-toast';

const SubscribeButton = () => {
  const { t } = useTranslation();
  const { compareItems } = useCompareItems();
  const [item] = compareItems;

  const { data, refetch, isLoading, isFetching } = useSubscriptionCountQuery(
    client,
    { level: item?.level, label: item?.label },
    { enabled: Boolean(item?.level && item?.label) }
  );

  const Create = useCreateSubscriptionMutation(client, {
    onSuccess: () => {
      refetch();
    },
    onError: (e: any) => {
      const errors = e?.response?.errors;
      let msg = '';
      if (Array.isArray(errors) && errors.length > 0) {
        msg = errors[0].message;
      }

      toast.error(msg || 'failed');
    },
  });
  const Cancel = useCancelSubscriptionMutation(client, {
    onSuccess: () => {
      refetch();
    },
  });

  // Show when not comparing
  if (compareItems && compareItems.length > 1) {
    return null;
  }

  const subscribed = data?.subjectSubscriptionCount?.subscribed;
  const count = data?.subjectSubscriptionCount?.count;

  const icon = subscribed ? (
    <>
      <BsFillBookmarkFill className="text-primary text-base" />
      <div className="mr-1 ml-2 text-sm lg:hidden">
        {t('analyze:subscribed')}
      </div>
    </>
  ) : (
    <>
      <BsBookmark className="text-base " />
      <div className="mr-1 ml-2 text-sm lg:hidden">
        {t('analyze:subscribe')}
      </div>
    </>
  );

  const loading =
    isLoading || isFetching || Cancel.isLoading || Create.isLoading;

  return (
    <div
      className="ml-6 flex cursor-pointer select-none items-center rounded-full border border-[#CFCFCF] py-1 px-2 hover:bg-gray-100 lg:ml-2"
      onClick={() => {
        if (subscribed) {
          Cancel.mutate({ level: item?.level, label: item?.label });
        } else {
          Create.mutate({ level: item?.level, label: item?.label });
        }
      }}
    >
      {loading ? <CgSpinner className="mr-1 animate-spin text-xl" /> : icon}
      <div className="rounded-full border border-[#EAEAEA] bg-[#F8F9FB] px-1 text-xs">
        {count || 0}
      </div>
    </div>
  );
};

export default SubscribeButton;
