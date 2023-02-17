import React, {
  PropsWithChildren,
  useState,
  useEffect,
  ComponentProps,
} from 'react';
import getLocale from '@common/utils/getLocale';

export const addLinkLocale = (href: string, locale: string): string => {
  if (href.startsWith('/docs') && locale != 'en') {
    const [, link] = href.split('/docs');
    return `/docs/${locale}${link}`;
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
  const [local, setLocale] = useState('en');
  const localHref = addLinkLocale(href, local);

  useEffect(() => {
    const l = getLocale();
    setLocale(l);
  }, []);

  return (
    <a href={localHref} className={className} {...restProps}>
      {children}
    </a>
  );
};

export default DocLink;
