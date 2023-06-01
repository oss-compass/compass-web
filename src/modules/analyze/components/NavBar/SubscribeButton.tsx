import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsFillBookmarkFill, BsBookmark } from 'react-icons/bs';
import client from '@graphql/client';
import {
  useSubscriptionCountQuery,
  useCreateSubscriptionMutation,
  useCancelSubscriptionMutation,
} from '@graphql/generated';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import { CgSpinner } from 'react-icons/cg';

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
      <BsFillBookmarkFill className="text-base text-primary" />
      <div className="mr-1 ml-2 text-sm">{t('analyze:subscribed')}</div>
    </>
  ) : (
    <>
      <BsBookmark className="text-base " />
      <div className="mr-1 ml-2 text-sm">{t('analyze:subscribe')}</div>
    </>
  );

  const loading =
    isLoading || isFetching || Cancel.isLoading || Create.isLoading;

  return (
    <div
      className="ml-6 flex cursor-pointer select-none items-center rounded-full border border-[#CFCFCF] py-1 px-2 hover:bg-gray-100"
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