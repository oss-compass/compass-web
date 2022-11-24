import React from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { MdLanguage } from 'react-icons/md';
import { AiFillCaretDown } from 'react-icons/ai';
import { getTopDomain } from '@common/utils';
import getLocale from '@common/utils/getLocale';
import { NoSsr } from '@mui/base';

const languages = [
  {
    id: 'en',
    label: 'English',
    value: 'EN',
  },
  {
    id: 'zh',
    label: '简体中文',
    value: '中文',
  },
];

const ChangeLanguage = () => {
  const { reload } = useRouter();
  const topDomain = getTopDomain();
  const local = getLocale();
  const language = languages.find((i) => i.id === local);

  return (
    <div className="group relative mx-5 flex h-full items-center transition">
      <div className="flex h-[32px] cursor-pointer items-center justify-center px-3 group-hover:bg-[#333333]">
        <MdLanguage className="mr-1 text-white" />
        <span className="mr-1 text-sm text-white">{language?.value}</span>
        <AiFillCaretDown className="text-white" />
      </div>

      <div className="absolute top-[100%] z-dropdown hidden w-[160px] border-t-2 bg-black/90 text-white group-hover:block">
        {languages.map((item) => (
          <div
            key={item.id}
            className="flex cursor-pointer border-b border-white/30 py-4 pl-6 text-center hover:bg-[#333333]"
            onClick={() => {
              Cookies.set('user_locale', item.id, {
                expires: 365,
                path: '/',
                domain: topDomain,
              });
              reload();
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

const ChangeLanguageWrap = () => (
  <NoSsr>
    <ChangeLanguage />
  </NoSsr>
);

export default ChangeLanguageWrap;
