import React, { PropsWithChildren, useState, useEffect } from 'react';
import Link, { LinkProps } from 'next/link';
import { useTranslation } from 'next-i18next';
import { addDocsLinkLocale } from './DocLink';

type DocLinkProps = Omit<LinkProps, 'href'> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

// auto add local prefix
const LinkX: React.FC<PropsWithChildren<DocLinkProps & { href: string }>> = ({
  children,
  href,
  ...restProps
}) => {
  const { i18n } = useTranslation();
  const isDocLink = href?.includes('/docs/');
  const localHref = addDocsLinkLocale(href, i18n.language);

  // 对于文档链接，我们需要确保不会创建嵌套的<a>标签
  if (isDocLink) {
    return (
      <Link href={localHref} {...restProps}>
        {children}
      </Link>
    );
  }

  // 对于非文档链接，直接传递children给Link组件
  return (
    <Link href={localHref} {...restProps}>
      {children}
    </Link>
  );
};

export default LinkX;
