import React from 'react';
import { useTranslation } from 'react-i18next';
import { SiGitee, SiGithub } from 'react-icons/si';
import Image from 'next/image';
import Slack from '@public/images/logos/slack.svg';
import Wechat from '@public/images/logos/wechat.svg';
import { Provider, ProviderItem } from './ProviderItem';

const OAuthList = () => {
  const { t } = useTranslation();

  const providers: Provider[] = [
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
    {
      name: 'AtomGit',
      id: 'gitcode',
      desc: t('setting:profile.can_be_used_to_submit_project_after_binding'),
      icon: (
        <div className="flex h-10 w-10 items-center justify-center">
          <Image
            src="/images/logos/gitcode.png"
            alt="gitcode"
            width={40}
            height={40}
          />
        </div>
      ),
    },
    {
      name: 'Slack',
      id: 'slack',
      desc: t(
        'setting:profile.can_be_used_to_receive_notifications_for_analysis_reports'
      ),
      icon: (
        <div className="h-10 w-10">
          <Slack />
        </div>
      ),
    },
    {
      name: 'WeChat',
      id: 'wechat',
      desc: t(
        'setting:profile.can_be_used_to_receive_notifications_for_analysis_reports'
      ),
      icon: (
        <div className="h-10 w-10">
          <Wechat />
        </div>
      ),
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
          return <ProviderItem key={provider.id} provider={provider} />;
        })}
      </div>
    </div>
  );
};

export default OAuthList;
