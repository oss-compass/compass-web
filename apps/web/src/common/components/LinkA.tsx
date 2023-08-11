import React, { PropsWithChildren, ComponentProps } from 'react';
import { useTranslation } from 'next-i18next';
import { addDocsLinkLocale } from './DocLink';

const LinkA: React.FC<
  PropsWithChildren<{ href: string } & ComponentProps<'a'>>
> = ({ children, href, ...props }) => {
  const { i18n } = useTranslation();
  const isDocLink = href.includes('/docs/');
  const localHref = addDocsLinkLocale(href, i18n.language);

  return (
    <a href={localHref} className="text-primary mx-1 inline-block" {...props}>
      {children}
    </a>
  );
};

export default LinkA;
