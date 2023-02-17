import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import LinkX from '@common/components/LinkX';
import { useTranslation } from 'react-i18next';
import Logo from '@common/components/Logo';
import MobileHeader from './MobileHeader';
import CommunityDropdown from './CommunityDropdown';
import ChangeLanguage from './ChangeLanguage';
import SubmitYouProject from './SubmitYouProject';

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
          <div className="flex h-full items-center">
            <Link href="/">
              <a className="mr-6">
                <Logo color="white" />
              </a>
            </Link>

            <LinkX href="/docs/dimensions-define" legacyBehavior>
              <a className={'mx-6 px-2.5 font-medium text-white'}>
                {t('common:header.metrics_models')}
              </a>
            </LinkX>

            <CommunityDropdown />

            <Link href="/about">
              <a className={'mx-6 px-2.5 font-medium text-white'}>
                {t('common:header.about')}
              </a>
            </Link>
          </div>

          <div className="flex h-full items-center">
            <ChangeLanguage />
            <SubmitYouProject />
          </div>
        </div>
      </div>

      <div className={classnames('bg-white >lg:hidden')}>
        <MobileHeader>{mobileMenu}</MobileHeader>
      </div>
    </header>
  );
};
export default Header;
