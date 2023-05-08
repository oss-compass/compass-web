import React from 'react';
import classnames from 'classnames';
import { SiGitee, SiGithub } from 'react-icons/si';
import Button from '@common/components/Button';

const providers = [
  {
    name: 'GitHub',
    desc: 'Can be used to submit project after binding',
    icon: <SiGithub className="h-10 w-10" />,
  },
  {
    name: 'Gitee',
    desc: 'Can be used to submit project after binding',
    icon: <SiGitee className="h-10 w-10 text-[#c71c27]" />,
  },
];

const OAuthList = () => {
  return (
    <div className="w-[560px] lg:w-full">
      <div className="pb-5 pt-10 text-xl font-bold">Connected Accounts</div>
      <div>
        Connect multiple accounts to your user and sign in with any of them
      </div>
      <div className="">
        {providers.map((provider) => {
          return (
            <div
              className="flex items-center border-b border-[#E7E7E7] py-4"
              key={provider.name}
            >
              <div className="pr-4">{provider.icon}</div>
              <div className="flex-1">
                <div className="text-sm font-bold">{provider.name}</div>
                <div className="text-sm text-[#868690]">{provider.desc}</div>
              </div>
              <div>
                <Button intent="secondary" size="sm">
                  Connect
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OAuthList;
