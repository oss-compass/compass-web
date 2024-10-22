import React, { useEffect } from 'react';
import classnames from 'classnames';
import { useSnapshot } from 'valtio';
import { useTranslation } from 'next-i18next';
import { BadgeCount } from '@modules/lab/model/components/BadgeCount';
import { formFiledState } from '../state';

const CategoryMenu = ({ category }: { category: string }) => {
  const { t } = useTranslation();
  const snapshot = useSnapshot(formFiledState);
  const categorySelected = snapshot.selected[category];
  const count = categorySelected?.length || 0;

  useEffect(() => {
    if (!formFiledState.activeCategory && count > 0) {
      formFiledState.activeCategory = category;
    }
  }, [count, category, snapshot.activeCategory]);

  return (
    <div className="w-60 md:w-auto">
      <div
        className={classnames(
          ' border-silver flex h-10 cursor-pointer items-center justify-between border-b pl-4 pr-4 font-medium ',
          [formFiledState.activeCategory === category ? 'bg-smoke' : '']
        )}
        onClick={() => {
          formFiledState.activeCategory = category;
        }}
      >
        <div>{t(`lab_metrics:${category}.title`)}</div>
        {count ? <BadgeCount count={count} /> : null}
      </div>
    </div>
  );
};

export default CategoryMenu;
