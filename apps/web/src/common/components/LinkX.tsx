import React, { PropsWithChildren, useState, useEffect } from 'react';
import Link, { LinkProps } from 'next/link';
import { useTranslation } from 'next-i18next';
import { addDocsLinkLocale } from './DocLink';

type DocLinkProps = Omit<LinkProps, 'href'>;

// auto add local prefix
const LinkX: React.FC<PropsWithChildren<DocLinkProps & { href: string }>> = ({
  children,
  href,
  legacyBehavior,
  ...restProps
}) => {
  const { i18n } = useTranslation();
  const isDocLink = href.includes('/docs/');
  const localHref = addDocsLinkLocale(href, i18n.language);

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
