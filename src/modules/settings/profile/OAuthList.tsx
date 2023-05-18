import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import { toast } from 'react-hot-toast';
import { SiGitee, SiGithub } from 'react-icons/si';
import Button from '@common/components/Button';
import { userInfoStore, userEvent } from '@modules/auth/UserInfoStore';
import client from '@graphql/client';
import { UserinfoQuery, useUserUnbindMutation } from '@graphql/generated';
import { cookieSetCallbackUrl } from '@common/utils/cookie';

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

const OAuthList = () => {
  const { t } = useTranslation();
  const { currentUser } = useSnapshot(userInfoStore);

  const providers = [
    {
      name: 'GitHub',
      id: 'github',
      desc: t('setting:profile.can_be_used_to_submit_project_after_binding'),
      icon: <SiGithub className="h-10 w-10" />,
    },
    {
      name: 'Gitee',
      id: 'gitee',
      desc: t('setting:profile.can_be_used_to_submit_project_after_binding'),
      icon: <SiGitee className="h-10 w-10 text-[#c71c27]" />,
    },
  ];

  return (
    <div className="w-[560px] lg:w-full">
      <div className="pb-2 pt-10 text-xl font-bold">
        {t('setting:profile.connected_accounts')}
      </div>
      <div>
        {t(
          'setting:profile.connect_multiple_accounts_to_your_user_and_sign_in'
        )}
      </div>
      <div>
        {providers.map((provider) => {
          const bindInfo = findBindInfo(provider.id, currentUser);
          return (
            <div
              className="flex items-center border-b border-[#E7E7E7] py-4 last:border-b-0"
              key={provider.name}
            >
              <div className="pr-4">{provider.icon}</div>
              <div className="flex-1">
                <div className="text-sm font-bold">{provider.name}</div>
                {bindInfo ? (
                  <div className="text-sm text-[#868690]">
                    {bindInfo.nickname}
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
                      cookieSetCallbackUrl('/settings/profile');
                      window.location.href = `/users/auth/${provider.id}`;
                    }}
                  >
                    {t('setting:profile.connected')}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OAuthList;
