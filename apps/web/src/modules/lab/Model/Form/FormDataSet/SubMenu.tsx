import React, { useState, ReactNode, PropsWithChildren } from 'react';
import classnames from 'classnames';
import { useSnapshot, subscribe } from 'valtio';
import { formFiledState, getKey } from './state';
import { BadgeCount } from '../styled';

const SubMenu = ({
  active,
  ident,
  subIdent,
  onSelectItem,
}: {
  ident?: string;
  subIdent?: string;
  active?: boolean;
  onSelectItem: (sub: string) => void;
}) => {
  const snapshot = useSnapshot(formFiledState);

  const keys = Object.keys(snapshot.selected);
  const count = keys.reduce((acc, cur) => {
    if (cur === getKey(ident, subIdent)) {
      acc += formFiledState.selected[cur].length;
    }
    return acc;
  }, 0);

  return (
    <div
      className="hover:bg-smoke flex cursor-pointer items-center justify-between bg-white py-2 pl-6 pr-4"
      onClick={() => {
        onSelectItem(subIdent);
      }}
    >
      <div className={classnames('truncate', [active ? 'text-primary' : ''])}>
        {subIdent}
      </div>
      {count ? <BadgeCount count={count} /> : null}
    </div>
  );
};

export default SubMenu;
