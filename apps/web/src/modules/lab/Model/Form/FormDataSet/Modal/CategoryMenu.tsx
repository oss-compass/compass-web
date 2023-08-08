import React, { useState, useEffect, PropsWithChildren } from 'react';
import classnames from 'classnames';
import { useSnapshot, subscribe } from 'valtio';
import { useDataSetListQuery } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import { BadgeCount } from '../../styled';
import { formFiledState, actions, useSelectedCount, getKey } from '../state';

const CategoryMenu = ({ ident }: { ident: string }) => {
  const [collapse, setCollapse] = useState(false);
  const snapshot = useSnapshot(formFiledState);
  const { data, isLoading } = useDataSetListQuery(
    gqlClient,
    {
      firstIdent: snapshot.levelFirst,
    },
    { enabled: Boolean(snapshot.levelFirst), staleTime: 5 * 60 * 1000 }
  );

  useEffect(() => {
    if (ident === snapshot.levelFirst) {
      setCollapse(true);
    }
  }, [ident, snapshot.levelFirst]);

  const count = useSelectedCount({ firstIdent: ident });

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
          const isSubMenuActive = snapshot.levelSecond === item;
          return (
            <CategorySubMenu
              key={item}
              active={isSubMenuActive}
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

const CategorySubMenu = ({
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
  const count = useSelectedCount({ firstIdent: ident, secondIdent: subIdent });

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

export default CategoryMenu;
