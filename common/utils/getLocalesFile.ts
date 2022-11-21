import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { SSRConfig } from 'next-i18next';
import type { NextApiRequestCookies } from 'next/dist/server/api-utils';
import getLocale from '@common/utils/getLocale';
import { TypeLang } from './getLocale';

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
    return serverSideTranslations(reqOrLang, [...fileNames, 'common']);
  } else {
    return serverSideTranslations(getLocale(reqOrLang), fileNamesWidthDefault);
  }
}

export default getLocalesFile;
