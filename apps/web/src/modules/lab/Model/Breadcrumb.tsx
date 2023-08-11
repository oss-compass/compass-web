import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

const lab_prefix = '/lab';

const Breadcrumbs = ({ className }: { className?: string }) => {
  const { t } = useTranslation();

  const router = useRouter();
  const { pathname, query } = router;
  console.log(router);

  const textMap = {
    model: t('lab:my_models'),
    version: t('lab:versions'),
    create: t('common:btn.create'),
    edit: t('common:btn.edit'),
  };

  const routerMap = {
    model: '/lab/model/my',
    version: '/lab/model/my',
  };

  const pathArray = pathname.replace(lab_prefix, '').split('/').filter(Boolean);
  const pathWithLabel = pathArray.map((x) => ({
    key: x,
    label: textMap[x],
  }));

  return (
    <div className={classnames(className)}>
      {pathWithLabel.map((route, index) => {
        const notLast = index !== pathArray.length - 1;
        const link = routerMap[route.key];

        if (!route.label) {
          return null;
        }

        if (link) {
          return (
            <Link key={route.key} href={link}>
              <>
                <span className="text-xl font-semibold">{route.label}</span>
                {notLast ? (
                  <span className="ml-1 mr-1 text-xl font-semibold">/</span>
                ) : null}
              </>
            </Link>
          );
        }

        return (
          <span key={route.key}>
            <>
              <span className="text-xl font-semibold">{route.label}</span>
              {notLast ? (
                <span className="ml-1 mr-1 text-xl font-semibold">/</span>
              ) : null}
            </>
          </span>
        );
      })}
    </div>
  );
};
export default Breadcrumbs;
