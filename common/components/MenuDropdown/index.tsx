import React, { PropsWithChildren } from 'react';
import Link from 'next/link';
import { AiFillCaretDown } from 'react-icons/ai';
import Slack from './logo-slack.svg';
import Wechat from './logo-wechat.svg';

export const HeaderCommunityMenu = () => {
  return (
    <div className="group relative flex h-full items-center transition">
      <div className="flex cursor-pointer items-center justify-center py-3 px-7 group-hover:bg-[#333333]">
        <a className={'font-medium text-white'}>Community</a>
        <AiFillCaretDown color="#fff" className="ml-2" />
      </div>
      <ul className="absolute top-[82px] z-dropdown hidden w-[360px] bg-black/90 text-white group-hover:block">
        <li className="flex cursor-pointer items-center border-b border-white/30 py-4 pl-6 hover:bg-[#333333]">
          <div className="mr-4 w-8">
            <Slack />
          </div>
          <Link
            href="https://join.slack.com/t/slack-vit2156/shared_invite/zt-1hv9pabzr-80W3QeM4zABSJFWEmPNipw"
            passHref
          >
            <a target="_blank" rel="noopener noreferrer">
              <p className="text-base">Slack</p>
              <p className="text-sm text-white/50">
                Join our community channel on Slack
              </p>
            </a>
          </Link>
        </li>
        <li className="flex cursor-pointer items-center py-4 pl-6 hover:bg-[#333333]">
          <div className="mr-4 w-8">
            <Wechat />
          </div>
          <Link href="/">
            <a>
              <div className="text-base">Wechat</div>
              <div className="text-sm text-white/50">
                Scan our group chat QR code to join
              </div>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};
