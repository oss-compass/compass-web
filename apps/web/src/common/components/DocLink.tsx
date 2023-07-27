import React, { PropsWithChildren, ComponentProps } from 'react';
import { useTranslation } from 'next-i18next';

const docusaurusLinkPrefix = ['/docs', '/blog'];
const checkIsDocusaurusLink = (link: string) => {
  return docusaurusLinkPrefix.some((prefix) => link.startsWith(prefix));
};

export const addDocsLinkLocale = (href: string, locale: string): string => {
  // automatically local prefixed, except English
  if (locale != 'en' && checkIsDocusaurusLink(href)) {
    return `/${locale}${href}`;
  }

  return href;
};

type DocLinkProps = Omit<ComponentProps<'a'>, 'href'>;

// auto add local prefix
const DocLink: React.FC<
  PropsWithChildren<DocLinkProps & { className?: string; href: string }>
> = ({
  children,
  className = 'mx-1 inline-block text-primary',
  href,
  ...restProps
}) => {
  const { i18n } = useTranslation();
  const localHref = addDocsLinkLocale(href, i18n.language);

  return (
    <a href={localHref} className={className} {...restProps}>
      {children}
    </a>
  );
};

export default DocLink;
