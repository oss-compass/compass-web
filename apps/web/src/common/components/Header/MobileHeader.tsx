import React, { PropsWithChildren } from 'react';
import Link from 'next/link';
import LinkX from '@common/components/LinkX';
import { AiOutlineMenu, AiOutlineClose, AiOutlineHome } from 'react-icons/ai';
import { useToggle } from 'react-use';
import Drawer from '../Drawer';
import { useTranslation } from 'react-i18next';

const MenuItem: React.FC<
  PropsWithChildren<{ title: string; href: string; onClick?: () => void }>
> = ({ title, href, children, onClick }) => {
  return (
    <LinkX href={href} legacyBehavior>
      <a
        className="flex cursor-pointer items-center py-2 px-6 hover:bg-gray-200"
        onClick={() => {
          onClick?.();
        }}
      >
        {children}
        <h2 className="pl-2 font-semibold">{title}</h2>
      </a>
    </LinkX>
  );
};

const MobileHeader: React.FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();
  const [show, toggle] = useToggle(false);
  const headLinks = [
    {
      title: t('common:header.home'),
      href: '/',
      icon: null,
    },
    {
      title: t('common:header.docs'),
      href: '/docs/dimensions-define',
      icon: null,
    },
    {
      title: t('common:header.projects'),
      href: '/explore',
      icon: null,
    },
    {
      title: t('common:header.academe'),
      href: '/collaboration',
      icon: null,
    },
    {
      title: t('common:header.lab'),
      href: '/lab',
      icon: null,
    },
    {
      title: t('common:header.news'),
      href: '/blog',
      icon: null,
    },
    {
      title: t('common:header.community'),
      href: '/docs/community',
      icon: null,
    },

    {
      title: t('common:header.about'),
      href: '/about',
      icon: null,
    },
  ];

  return (
    <>
      <div className="flex h-12 w-full justify-between border-b px-4">
        <div className="flex items-center">
          <div
            className="mr-2"
            onClick={() => {
              toggle();
            }}
          >
            <AiOutlineMenu className="text-xl" />
          </div>
          <h1 className="text-base font-semibold">OSS compass</h1>
        </div>
        <div className="flex items-center">
          <Link
            href="/submit-your-project"
            className="cursor-pointer border border-black px-1 py-1 text-sm "
          >
            {t('common:header.submit_your_project')}
          </Link>
        </div>
      </div>

      <Drawer
        visible={show}
        onClose={() => {
          toggle();
        }}
      >
        <div className="pt-14">
          <div
            className="absolute top-2 right-2 cursor-pointer p-2"
            onClick={() => toggle()}
          >
            <AiOutlineClose />
          </div>
          <div
            className=""
            onClickCapture={() => {
              toggle();
            }}
          >
            {headLinks.map((item) => {
              return (
                <MenuItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                  onClick={() => {
                    toggle();
                  }}
                >
                  {item.icon}
                </MenuItem>
              );
            })}
            {children}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default MobileHeader;
