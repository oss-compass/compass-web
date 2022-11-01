import React, { useState } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { AiOutlineRightCircle } from 'react-icons/ai';
import useDropDown from '@common/hooks/useDropDown';
import { SearchQuery } from '@graphql/generated';
import {
  removeHttps,
  getAnalyzeLink,
  repoUrlFormat,
  getPathname,
  getHostLabel,
} from '@common/utils';
import { SiGitee, SiGithub } from 'react-icons/si';

const SubmitYourProject: React.FC<{
  content: React.ReactNode;
  noResult?: boolean;
  className?: string;
}> = ({ className, noResult, content }) => {
  return (
    <p
      className={classnames(
        className,
        'block flex items-center justify-between pl-4  pr-2.5 text-lg text-gray-500',
        'md:px-2 md:text-sm',
        [noResult ? 'min-h-[84px]' : 'min-h-[48px]']
      )}
    >
      <span className="flex-wrap leading-none">{content}</span>
      <Link href="/submit-your-project">
        <a
          className={classnames(
            'flex-shrink-0 bg-black  px-3 text-sm text-white shadow hover:opacity-90 ',
            'md:px-2 md:text-sm',
            [noResult ? 'py-2.5' : 'py-1']
          )}
        >
          Submit your project
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

// todo community level
const LinkItem: React.FC<{
  item: SearchQuery['fuzzySearch'][number];
  active: boolean;
}> = ({ item, active }) => {
  const host = getHostLabel(item.label!);

  return (
    <Link key={item.label} href={getAnalyzeLink(item)}>
      <div
        className={classnames(
          'flex min-h-[66px] cursor-pointer items-center justify-between px-4 py-3 text-xl hover:bg-gray-100',
          'md:py-2 md:px-2 md:text-base',
          { 'bg-gray-100': active }
        )}
      >
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="mb-1 text-xl font-medium line-clamp-1">
            {repoUrlFormat(item.label!)}
          </div>
          <div className="flex items-center text-xs ">
            <Icon name={host} />
            <div className="ml-1 text-gray-600 line-clamp-1">
              {getPathname(item.label!)}
            </div>
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center text-sm font-medium text-primary">
          Insights report <AiOutlineRightCircle className="ml-2 text-base" />
        </div>
      </div>
    </Link>
  );
};

const DropDownList: React.FC<{ result: SearchQuery['fuzzySearch'] }> = ({
  result,
}) => {
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
        content="Can't find the right option?"
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
            Nothing about
            <span className="mx-2 font-semibold italic">
              {keyword?.length > 10 ? keyword.slice(0, 10) + '...' : keyword}
            </span>
            yet.
          </>
        }
      />
    );
  }

  return <DropDownList result={result!} />;
};

export default SearchDropdown;
