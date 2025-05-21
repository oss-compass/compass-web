import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Logo from '@common/components/Logo';
import NoSsr from '@common/components/NoSsr';
import MobileHeader from './MobileHeader';
import ChangeLanguage from './ChangeLanguage';
import Image from 'next/image';

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
            <Link href="/" className="relative mr-4 2xl:mx-1 2xl:mr-2">
              <Logo color="white" />
              <div className="absolute -top-[2px] -right-[36px] translate-x-1/4 -translate-y-1/4 transform">
                <span className="whitespace-nowrap rounded-full bg-[#2eb263] px-1.5 py-[1px] text-[12px] text-white transition-opacity duration-200">
                  镜像站
                </span>
              </div>
            </Link>
            <div className="mx-6 h-8 w-1 "></div>
            <Image
              src={'/images/about/软件所.png'}
              width={124}
              height={38}
              alt={'软件所'}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
            <div className="ml-2 text-xl font-bold text-white">
              {t('common:header.mirror_site_of_iscas')}
            </div>
          </div>

          <div className="flex h-full items-center">
            <ChangeLanguage />
            <div className="group relative flex h-full items-center transition">
              <a
                href="https://oss-compass.org/settings/profile"
                className={
                  'ml-2 cursor-pointer truncate border-2 border-white bg-black px-4 py-2 font-medium text-white xl:px-1'
                }
                target="_blank"
              >
                {t('common:header.apply_api_key')}
              </a>
              <div className="z-dropdown absolute top-[100%] -left-8 hidden w-[200px] group-hover:block">
                <div className="mt-[2px] bg-black/90 p-2 text-sm text-white">
                  点击前往 OSS Compass 官网个人中心申请 API Key
                </div>
              </div>
            </div>
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
