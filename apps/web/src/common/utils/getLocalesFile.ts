import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { SSRConfig, UserConfig } from 'next-i18next';
import type { NextApiRequestCookies } from 'next/dist/server/api-utils';
import getLocale from '@common/utils/getLocale';
import { TypeLang } from './getLocale';
import path from 'path';

// 内联 i18n 配置,避免 webpack 模块解析问题
const i18nConfig: UserConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    localeDetection: false,
  },
  fallbackLng: {
    default: ['en'],
  },
  defaultNS: 'common',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  localePath:
    typeof window === 'undefined'
      ? path.resolve(process.cwd(), 'i18n')
      : undefined,
};

function getLocalesFile(
  reqOrLang: NextApiRequestCookies,
  fileNames?: Array<string>
): Promise<SSRConfig>;

function getLocalesFile(
  reqOrLang: TypeLang,
  fileNames?: Array<string>
): Promise<SSRConfig>;

function getLocalesFile(
  reqOrLang: NextApiRequestCookies | TypeLang,
  fileNames: Array<string> = []
) {
  const fileNamesWidthDefault = fileNames.includes('common')
    ? fileNames
    : fileNames.concat('common');

  if (typeof reqOrLang === 'string') {
    return serverSideTranslations(reqOrLang, fileNamesWidthDefault, i18nConfig);
  } else {
    return serverSideTranslations(
      getLocale(reqOrLang),
      fileNamesWidthDefault,
      i18nConfig
    );
  }
}

export default getLocalesFile;
