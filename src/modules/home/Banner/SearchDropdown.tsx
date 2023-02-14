import React, { useState } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation, Trans } from 'next-i18next';
import { AiOutlineRightCircle } from 'react-icons/ai';
import useDropDown from '@common/hooks/useDropDown';
import { SearchQuery } from '@graphql/generated';
import {
  getAnalyzeLink,
  getPathname,
  getProvider,
  getRepoName,
} from '@common/utils';
import { SiGitee, SiGithub } from 'react-icons/si';
import { Level } from '@modules/analyze/constant';

const SubmitYourProject: React.FC<{
  content: React.ReactNode;
  noResult?: boolean;
  className?: string;
}> = ({ className, noResult, content }) => {
  const { t } = useTranslation();
  return (
    <p
      className={classnames(
        className,
        'block flex items-center justify-between pl-4  pr-2.5 text-lg text-gray-500',
        'md:px-2 md:text-sm',
        [noResult ? 'min-h-[84px]' : 'min-h-[48px]']
      )}
    >
      <span className="flex-wrap text-base leading-none">{content}</span>
      <Link href="/submit-your-project">
        <a
          className={classnames(
            'flex-shrink-0 bg-black  px-3 text-sm text-white shadow hover:opacity-90 ',
            'md:px-2 md:text-sm',
            [noResult ? 'py-2.5' : 'py-1']
          )}
        >
          {t('home:submit_your_project')}
        </a>
      </Link>
    </p>
  );
};

const Icon: React.FC<{ name: string }> = ({ name, ...restProps }) => {
  if (name === 'gitee') {
    return <SiGitee className="flex-shrink-0 text-[#c71c27]" />;
  }
  if (name === 'github') {
    return <SiGithub className="flex-shrink-0" />;
  }
  return null;
};

const LinkItem: React.FC<{
  item: SearchQuery['fuzzySearch'][number];
  active: boolean;
}> = ({ item, active }) => {
  const { t } = useTranslation();
  const host = getProvider(item.label!);

  const getContent = () => {
    if (item.level === Level.REPO) {
      return (
        <>
          <div className="mb-1 truncate text-xl font-medium">
            {getRepoName(item.label!)}
          </div>
          <div className="flex items-center text-xs ">
            <Icon name={host} />
            <div className="ml-1 truncate text-gray-600">
              {getPathname(item.label!)}
            </div>
          </div>
        </>
      );
    }

    return (
      <div className="flex items-center">
        <div className="mb-1 truncate text-xl font-medium">{item.label}</div>
        <div className="ml-2 rounded-[10px] bg-[#FFF9F2] px-2 py-0.5 text-xs text-[#D98523]">
          {item.level === Level.COMMUNITY ? t('home:community') : item.level}
        </div>
      </div>
    );
  };

  return (
    <Link key={item.label} href={getAnalyzeLink(item)}>
      <div
        className={classnames(
          'flex min-h-[66px] cursor-pointer items-center justify-between px-4 py-3 text-xl hover:bg-gray-100',
          'md:py-2 md:px-2 md:text-base',
          { 'bg-gray-100': active }
        )}
      >
        <div className="min-w-0 flex-1 overflow-hidden pr-4">
          {getContent()}
        </div>
        <div className="flex flex-shrink-0 items-center text-sm font-medium text-primary">
          {t('home:compass_report')}
          <AiOutlineRightCircle className="ml-2 text-base" />
        </div>
      </div>
    </Link>
  );
};

const DropDownList: React.FC<{ result: SearchQuery['fuzzySearch'] }> = ({
  result,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { active } = useDropDown({
    totalLength: result.length,
    onPressEnter: () => {
      const activeItem = result[active];
      router.push(getAnalyzeLink(activeItem));
    },
  });

  return (
    <>
      {result.map((item, index) => {
        return (
          <LinkItem key={item.label} item={item} active={active === index} />
        );
      })}
      <SubmitYourProject
        content={t('home:cant_find_the_right_option')}
        className="border-t-2 border-black"
      />
    </>
  );
};

const SearchDropdown: React.FC<{
  keyword: string;
  result: SearchQuery['fuzzySearch'];
}> = ({ result, keyword }) => {
  if (!result || (Array.isArray(result) && result.length === 0)) {
    return (
      <SubmitYourProject
        noResult
        content={
          <>
            <Trans
              i18nKey="nothing_about_yet"
              ns="home"
              values={{
                expr:
                  keyword?.length > 10 ? keyword.slice(0, 10) + '...' : keyword,
              }}
              components={{
                s: <span className="mx-2 font-semibold italic" />,
              }}
            />
          </>
        }
      />
    );
  }

  return <DropDownList result={result!} />;
};

export default SearchDropdown;
