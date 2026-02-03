import React from 'react';
import LinkX from '@common/components/LinkX';
import LogoSquare from '@common/components/LogoSquare';
import { useTranslation } from 'react-i18next';

interface FooterLinks {
  dark?: boolean;
}

const FooterLinks = ({ dark = false }: FooterLinks) => {
  const { t } = useTranslation();
  const linkData = [
    {
      title: t('common:footer.tutorial'),
      links: [
        { text: t('common:footer.quick_start'), href: '/docs/service-guide' },
        {
          text: t('common:footer.dimensions_define'),
          href: '/docs/service-guide',
        },
      ],
    },
    {
      title: t('common:footer.legal'),
      links: [
        { text: t('common:footer.terms'), href: '/docs/terms-of-use' },
        { text: t('common:footer.privacy'), href: '/docs/privacy-policy' },
        // { text: t('common:footer.built_with'), href: '/docs/built-with' },
      ],
    },
    {
      title: t('common:footer.community'),
      links: [
        { text: t('common:footer.slack'), href: '/docs/community/slack' },
        { text: t('common:footer.wechat'), href: '/docs/community/wechat' },
      ],
    },
    {
      title: t('common:footer.code'),
      links: [
        { text: 'GitHub', href: 'https://github.com/oss-compass' },
        { text: 'Gitee', href: 'https://gitee.com/oss-compass' },
        { text: 'AtomGit', href: 'https://atomgit.com/oss-compass' },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-4 px-6 pb-16 pt-20 md:grid-cols-2 md:flex-col ">
      <LogoSquare />
      {linkData.map((item) => {
        return (
          <div className="mb-4 ml-4 mr-4 flex w-44 flex-col " key={item.title}>
            <h3 className="mb-4 text-sm font-bold">{item.title}</h3>
            {item.links.map((link) => {
              return (
                <LinkX
                  href={link.href}
                  className="mb-2 text-sm text-gray-500"
                  key={link.text}
                >
                  {link.text}
                </LinkX>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default FooterLinks;
