import React from 'react';
import Link from 'next/link';
import LogoSquare from '@common/components/LogoSquare';
import { Center } from '@common/components/Layout';

const linkData = [
  {
    title: 'Tutorial',
    links: [
      { text: 'Get Standard', href: '/docs/quick-start' },
      { text: 'Dimensions Define', href: '/docs/dimensions-define' },
      { text: 'Models', href: '/docs/category/productivity-metrics-models' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { text: 'Terms', href: '' },
      { text: 'Privacy', href: '' },
      { text: 'Built With', href: '' },
    ],
  },
  {
    title: 'Community',
    links: [
      { text: 'Slack', href: '/docs/community/slack' },
      { text: 'WeChat', href: '/docs/community/wechat' },
    ],
  },
  {
    title: 'Code',
    links: [
      { text: 'GitHub', href: 'https://github.com/oss-compass' },
      { text: 'Gitee', href: 'https://gitee.com/oss-compass' },
    ],
  },
];

const FooterLinks = () => {
  return (
    <div className="grid grid-cols-5 gap-4 px-6 pt-20 pb-16 md:grid-cols-2 md:flex-col ">
      <LogoSquare />
      {linkData.map((item) => {
        return (
          <div className="mr-4 ml-4 mb-4 flex w-44 flex-col " key={item.title}>
            <h3 className="mb-4 text-sm font-bold">{item.title}</h3>
            {item.links.map((link) => {
              return (
                <Link href={link.href} key={link.text} legacyBehavior>
                  <a className="mb-2 text-sm text-gray-500">{link.text}</a>
                </Link>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default FooterLinks;
