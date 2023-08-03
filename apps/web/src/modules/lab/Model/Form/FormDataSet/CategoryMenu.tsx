import React, { useState, useEffect, PropsWithChildren } from 'react';
import classnames from 'classnames';
import { useSnapshot, subscribe } from 'valtio';
import { useDataSetListQuery } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import { BadgeCount } from '../styled';
import { formFiledState, actions } from './state';
import SubMenu from './SubMenu';

const CategoryMenu = ({ ident }: { ident: string }) => {
  const snapshot = useSnapshot(formFiledState);

  const [collapse, setCollapse] = useState(false);
  const { data, isLoading } = useDataSetListQuery(
    gqlClient,
    {
      firstIdent: snapshot.levelFirst,
    },
    { enabled: collapse, staleTime: 5 * 60 * 1000 }
  );

  const keys = Object.keys(snapshot.selected);
  const count = keys.reduce((acc, cur) => {
    if (cur.startsWith(ident)) {
      // eslint-disable-next-line valtio/state-snapshot-rule
      acc += snapshot.selected[cur].length;
    }
    return acc;
  }, 0);

  return (
    <div className="w-60">
      <div
        className="bg-smoke border-silver flex h-10 cursor-pointer  cursor-pointer items-center justify-between border-b pl-4 pr-4 font-medium "
        onClick={() => {
          actions.changeLevelFirst(ident);
          setCollapse((p) => !p);
        }}
      >
        <div className="truncate">{ident}</div>
        {count ? <BadgeCount count={count} /> : null}
      </div>
      <div
        className={classnames('border-silver overflow-hidden  transition', [
          collapse ? 'border-b' : 'h-0 ',
        ])}
      >
        {isLoading ? (
          <div className="animate-pulse p-4">
            <div className="flex-1 space-y-4 ">
              <div className="h-4 rounded bg-slate-200"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-4 rounded bg-slate-200"></div>
                <div className="col-span-1 h-4 rounded bg-slate-200"></div>
              </div>
              <div className="h-4 rounded bg-slate-200"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 h-4 rounded bg-slate-200"></div>
                <div className="col-span-2 h-4 rounded bg-slate-200"></div>
              </div>
              <div className="h-4 rounded bg-slate-200"></div>
            </div>
          </div>
        ) : null}

        {data?.datasetOverview?.map((item) => {
          return (
            <SubMenu
              key={item}
              active={snapshot.levelSecond === item}
              ident={ident}
              subIdent={item}
              onSelectItem={(sub) => {
                actions.changeMenuLevel({
                  levelFirst: ident,
                  levelSecond: sub,
                });
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CategoryMenu;
