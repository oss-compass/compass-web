import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { SiGitee, SiGithub } from 'react-icons/si';
import { Subscription } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import Dialog from '@common/components/Dialog';
import { Button } from '@oss-compass/ui';
import { useCancelSubscriptionMutation } from '@oss-compass/graphql';
import { getRepoName, getProvider, getNameSpace } from '@common/utils/url';
import { formatISO } from '@common/utils/time';
import { getAnalyzeLink } from '@common/utils/links';
import { Level } from '@modules/analyze/constant';
import Tooltip from '@common/components/Tooltip';

const ItemStatus = ({ item }: { item: Subscription }) => {
  const { t } = useTranslation();

  if (item.status === 'complete') {
    const tooltipText = `${t('setting:subscriptions.collect_at')} : ${formatISO(
      item.collectAt
    )}<br>   
    ${t('setting:subscriptions.complete_at')} : ${formatISO(item.completeAt)}`;

    return (
      <span className="cursor-default text-xs text-secondary">
        <Tooltip
          title={
            <div
              className="p-2 text-center"
              dangerouslySetInnerHTML={{ __html: tooltipText }}
            />
          }
          arrow
          placement="bottom"
        >
          <span>
            {t('setting:subscriptions.updated_on')}
            {formatISO(item.statusUpdatedAt)}
          </span>
        </Tooltip>
      </span>
    );
  }

  return (
    <span className="inline-block rounded-full bg-[#FFEEC6] px-2 text-xs text-[#AA8122]">
      {t('setting:subscriptions.analyzing')}
    </span>
  );
};

const RepoItem = ({ item }: { item: Subscription }) => {
  const provider = getProvider(item.label);
  const repo = getRepoName(item.label);
  const ns = getNameSpace(item.label);
  return (
    <Link href={getAnalyzeLink({ label: item.label, level: item.level })}>
      <a className="flex cursor-pointer">
        <span className="pr-2 pt-1">
          {provider === 'github' ? (
            <SiGithub />
          ) : (
            <SiGitee className="text-[#c71c27]" />
          )}
        </span>
        <span className="flex flex-col">
          <span className="text-sm font-bold">{repo}</span>
          <span className="text-xs text-secondary">{ns}</span>
        </span>
      </a>
    </Link>
  );
};

const CommunityItem = ({ item }: { item: Subscription }) => {
  return (
    <Link href={getAnalyzeLink({ label: item.label, level: item.level })}>
      <a className="flex cursor-pointer flex-col">
        <span className="text-base font-bold">{item.label}</span>
        <span className="text-xs text-secondary">{item.level}</span>
      </a>
    </Link>
  );
};

const SubscribeItem = ({
  item,
  onRefresh,
}: {
  item: Subscription;
  onRefresh: () => void;
}) => {
  const { t } = useTranslation();
  const [openConfirm, setOpenConfirm] = useState(false);

  const Cancel = useCancelSubscriptionMutation(client, {
    onSuccess: (res) => {
      setOpenConfirm(false);
      onRefresh();
    },
  });

  return (
    <>
      <div className="flex items-center border-b py-3">
        <div className="flex">
          {item.level === Level.REPO ? (
            <RepoItem item={item} />
          ) : (
            <CommunityItem item={item} />
          )}
        </div>

        <div className="flex flex-1 justify-end">
          <div className="w-[200px]">
            <ItemStatus item={item} />
          </div>
        </div>

        <Button
          intent="text"
          size="sm"
          className="text-xs"
          onClick={() => {
            setOpenConfirm(true);
          }}
        >
          {t('setting:subscriptions.unsubscribe')}
        </Button>
      </div>

      <Dialog
        open={openConfirm}
        dialogTitle={<>{t('setting:subscriptions.confirm_cancel')}</>}
        dialogContent={
          <div className="w-96">
            {t(
              'setting:subscriptions.after_unsubscribing_you_will_no_longer_receive_any'
            )}
          </div>
        }
        dialogActions={
          <div className="flex">
            <Button
              intent="text"
              size="sm"
              onClick={() => {
                setOpenConfirm(false);
              }}
            >
              {t('common:btn.back')}
            </Button>
            <Button
              intent="primary"
              size="sm"
              className="ml-4"
              loading={Cancel.isLoading}
              onClick={() => {
                Cancel.mutate({ label: item.label, level: item.level });
              }}
            >
              {t('common:btn.confirm')}
            </Button>
          </div>
        }
        handleClose={() => {}}
      />
    </>
  );
};

export default SubscribeItem;
