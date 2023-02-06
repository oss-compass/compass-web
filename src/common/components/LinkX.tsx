import React, { PropsWithChildren, useState, useEffect } from 'react';
import Link, { LinkProps } from 'next/link';
import getLocale from '@common/utils/getLocale';

export const addLinkLocale = (href: string, locale: string): string => {
  if (href.startsWith('/docs') && locale != 'en') {
    const [, link] = href.split('/docs');
    return `/docs/${locale}${link}`;
  }
  return href;
};

type DocLinkProps = Omit<LinkProps, 'href'>;

// auto add local prefix
const LinkX: React.FC<PropsWithChildren<DocLinkProps & { href: string }>> = ({
  children,
  href,
  legacyBehavior,
  ...restProps
}) => {
  const isDocLink = href.startsWith('/docs');
  const [local, setLocale] = useState('en');
  const localHref = addLinkLocale(href, local);
  useEffect(() => {
    const l = getLocale();
    setLocale(l);
  }, []);

  return (
    <Link
      href={localHref}
      legacyBehavior={legacyBehavior || isDocLink}
      {...restProps}
    >
      {children}
    </Link>
  );
};

export default LinkX;
