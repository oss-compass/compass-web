import React, { useEffect } from 'react';
import classnames from 'classnames';
import { useSnapshot } from 'valtio';
import { formFiledState } from '../state';
import { BadgeCount } from '../../Misc';

const CategoryMenu = ({ category }: { category: string }) => {
  const snapshot = useSnapshot(formFiledState);
  const categorySelected = snapshot.selected[category];
  const count = categorySelected?.length || 0;

  useEffect(() => {
    if (!formFiledState.activeCategory && count > 0) {
      formFiledState.activeCategory = category;
    }
  }, [count, category, snapshot.activeCategory]);

  return (
    <div className="w-60">
      <div
        className={classnames(
          ' border-silver flex h-10 cursor-pointer  cursor-pointer items-center justify-between border-b pl-4 pr-4 font-medium ',
          [formFiledState.activeCategory === category ? 'bg-smoke' : '']
        )}
        onClick={() => {
          formFiledState.activeCategory = category;
        }}
      >
        <div>{category}</div>
        {count ? <BadgeCount count={count} /> : null}
      </div>
    </div>
  );
};

export default CategoryMenu;
