import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import { toast } from 'react-hot-toast';
import { Button } from '@oss-compass/ui';
import Dialog from '@common/components/Dialog';
import { userInfoStore, userEvent } from '@modules/auth/UserInfoStore';
import client from '@graphql/client';
import { UserinfoQuery, useUserUnbindMutation } from '@graphql/generated';
import { cookieSetCallbackUrl } from '@common/utils/cookie';
import { isWechat } from '@common/utils/misc';
import WechatCodeImage from './WechatCodeImage';

export interface Provider {
  name: string;
  id: string;
  desc: string;
  icon: React.ReactNode;
}

const findBindInfo = (
  provider: string,
  currentUser: DeepReadonly<UserinfoQuery['currentUser']>
) => {
  if (currentUser?.loginBinds) {
    return currentUser?.loginBinds.find((i) => {
      return i.provider === provider;
    });
  }
  return null;
};

const UnBindBtn = ({ providerId }: { providerId: string }) => {
  const { t } = useTranslation();
  const mutation = useUserUnbindMutation(client);

  return (
    <Button
      intent="text"
      size="sm"
      loading={mutation.isLoading}
      className="text-primary"
      onClick={() => {
        mutation.mutate(
          { provider: providerId },
          {
            onSuccess: (e) => {
              if (e?.userUnbind?.status === 'false') {
                toast.error((t) => <>{e?.userUnbind?.message}</>, {
                  position: 'top-center',
                });
              } else {
                userInfoStore.event$?.emit(userEvent.REFRESH);
              }
            },
          }
        );
      }}
    >
      {t('setting:profile.disconnect')}
    </Button>
  );
};

export const ProviderItem = ({ provider }: { provider: Provider }) => {
  const { t } = useTranslation();
  const { currentUser } = useSnapshot(userInfoStore);
  const bindInfo = findBindInfo(provider.id, currentUser);

  const [wxPopOpen, setWxPopOpen] = React.useState(false);
  const handleClose = () => {
    setWxPopOpen(false);
  };
  const inWechatBrowser = isWechat();

  useEffect(() => {
    if (inWechatBrowser && !bindInfo) {
      setWxPopOpen(true);
    } else {
      setWxPopOpen(false);
    }
  }, [bindInfo, inWechatBrowser]);

  // hidden wechat in oss-compass.org
  // if (
  //   provider.id === 'wechat' &&
  //   window.location.origin.indexOf('oss-compass.org') > -1
  // ) {
  //   return null;
  // }

  return (
    <>
      <div
        className="flex items-center border-b border-[#E7E7E7] py-4 last:border-b-0"
        key={provider.name}
      >
        <div className="pr-4">{provider.icon}</div>
        <div className="flex-1 pr-4">
          <div className="text-sm font-bold">{provider.name}</div>
          {bindInfo ? (
            <div className="text-sm text-[#868690]">
              {bindInfo.nickname || t('setting:profile.bound_already')}
            </div>
          ) : (
            <div className="text-sm text-[#868690]">{provider.desc}</div>
          )}
        </div>
        <div>
          {bindInfo ? (
            <UnBindBtn providerId={provider.id} />
          ) : (
            <Button
              intent="secondary"
              size="sm"
              onClick={() => {
                if (provider.id === 'wechat') {
                  setWxPopOpen(true);
                } else {
                  cookieSetCallbackUrl('/settings/profile');
                  window.location.href = `/users/auth/${provider.id}`;
                }
              }}
            >
              {t('setting:profile.connect')}
            </Button>
          )}
        </div>
      </div>

      <Dialog
        open={wxPopOpen}
        dialogTitle={
          <div>
            <h1>{t('setting:profile.wechat_connect')}</h1>
          </div>
        }
        dialogContent={
          <div>
            <div className="px-6 pt-4">
              <WechatCodeImage />
            </div>
            {inWechatBrowser ? (
              <p className="pt-4 text-center text-sm text-gray-500">
                长按二维码绑定
              </p>
            ) : null}
          </div>
        }
        dialogActions={
          <>
            <Button
              intent="text"
              size="sm"
              className="mr-2"
              onClick={handleClose}
            >
              {t('common:btn.cancel')}
            </Button>
          </>
        }
        handleClose={() => {
          setWxPopOpen(false);
        }}
      />
    </>
  );
};
