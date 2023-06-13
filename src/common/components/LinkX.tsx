import React, { PropsWithChildren, useState, useEffect } from 'react';
import Link, { LinkProps } from 'next/link';
import getLocale from '@common/utils/getLocale';
import { addDocsLinkLocale } from './DocLink';

type DocLinkProps = Omit<LinkProps, 'href'>;

// auto add local prefix
const LinkX: React.FC<PropsWithChildren<DocLinkProps & { href: string }>> = ({
  children,
  href,
  legacyBehavior,
  ...restProps
}) => {
  const isDocLink = href.includes('/docs/');
  const [local, setLocale] = useState('en');
  const localHref = addDocsLinkLocale(href, local);

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
