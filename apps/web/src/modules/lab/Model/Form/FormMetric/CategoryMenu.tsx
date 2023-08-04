import React, { useState, ReactNode, PropsWithChildren } from 'react';
import classnames from 'classnames';
import { useSnapshot } from 'valtio';
import { formFiledState } from './state';
import { BadgeCount } from '../styled';

const CategoryMenu = ({ category }: { category: string }) => {
  const snapshot = useSnapshot(formFiledState);
  const categorySelected = snapshot[category];
  const count = categorySelected?.length || 0;

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
