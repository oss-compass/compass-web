import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import LinkX from '@common/components/LinkX';
import { useTranslation } from 'react-i18next';
import Logo from '@common/components/Logo';
import NoSsr from '@common/components/NoSsr';
import MobileHeader from './MobileHeader';
import CommunityDropdown from './CommunityDropdown';
import ChangeLanguage from './ChangeLanguage';
import SubmitYouProject from './SubmitYouProject';
import User from './User';

const Header: React.FC<{
  sticky?: boolean;
  mobileMenu?: React.ReactNode;
}> = ({ sticky = true, mobileMenu }) => {
  const { t } = useTranslation();
  return (
    <header>
      <div className={classnames('bg-black lg:hidden')}>
        <div
          className={classnames(
            'h-20 px-8',
            'flex items-center justify-between'
          )}
        >
          <div className="flex h-full flex-shrink-0 items-center">
            <Link href="/" className="mr-6 2xl:mr-2">
              <Logo color="white" />
            </Link>

            <LinkX href="/docs/dimensions-define" legacyBehavior>
              <a
                className={
                  'mx-6 flex-shrink-0 px-2.5 font-medium text-white 2xl:mx-2'
                }
              >
                {t('common:header.docs')}
              </a>
            </LinkX>

            <Link
              href="/explore"
              className={'mx-6 px-2.5 font-medium text-white 2xl:mx-2'}
            >
              {t('common:header.projects')}
            </Link>
            <Link
              href="/academe"
              className={'mx-6 px-2.5 font-medium text-white 2xl:mx-2'}
            >
              {t('common:header.academe')}
            </Link>

            <Link
              href="/lab"
              className={'mx-6 px-2.5 font-medium text-white 2xl:mx-2'}
            >
              {t('common:header.lab')}
            </Link>

            <LinkX href="/blog" legacyBehavior>
              <a
                className={
                  'mx-6 flex-shrink-0 px-2.5 font-medium text-white 2xl:mx-2'
                }
              >
                {t('common:header.news')}
              </a>
            </LinkX>

            <CommunityDropdown />

            <Link
              href="/about"
              className={'mx-6 px-2.5 font-medium text-white 2xl:mx-2'}
            >
              {t('common:header.about')}
            </Link>
          </div>

          <div className="flex h-full items-center">
            <ChangeLanguage />
            <SubmitYouProject />
            <User />
          </div>
        </div>
      </div>

      <NoSsr>
        <div className={classnames('>lg:hidden bg-white')}>
          <MobileHeader>{mobileMenu}</MobileHeader>
        </div>
      </NoSsr>
    </header>
  );
};

export default Header;
