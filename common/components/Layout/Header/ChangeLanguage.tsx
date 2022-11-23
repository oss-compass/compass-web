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
    id: 'zh',
    label: '简体中文',
    value: '中文',
  },
  {
    id: 'en',
    label: 'English',
    value: 'EN',
  },
];

const ChangeLanguage = () => {
  const { reload } = useRouter();
  const topDomain = getTopDomain();
  const local = getLocale();
  const language = languages.find((i) => i.id === local);

  return (
    <div className="group relative mx-5 flex h-full items-center transition">
      <div className="flex h-[32px] cursor-pointer items-center justify-center border border-gray-200 px-2">
        <MdLanguage className="mr-1 text-white" />
        <span className="mr-1 text-sm text-white">{language?.value}</span>
        <AiFillCaretDown className="text-white" />
      </div>

      <div className="absolute top-[100%] z-dropdown hidden w-[120px] border-t-2 border-transparent group-hover:block">
        <ul className="bg-black/90 text-white">
          {languages.map((item) => (
            <li
              key={item.id}
              className="flex cursor-pointer items-center border-white/20 py-3 pl-6 hover:bg-[#333333] [&:not(:last-child)]:border-b"
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
            </li>
          ))}
        </ul>
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
