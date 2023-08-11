import React, { PropsWithChildren } from 'react';
import classname from 'classnames';
import { useSnapshot } from 'valtio';
import { formFiledState, actions, MetricItem, FormFiledState } from '../state';

const checkIsSelect = (
  ident: string,
  list: Readonly<FormFiledState['selected'][string]>
): boolean => {
  if (list) {
    const index = list.findIndex((i) => i.ident === ident);
    return index > -1;
  }
  return false;
};

export const MetricItemsCard = ({ item }: { item: Partial<MetricItem> }) => {
  const { ident, category } = item;
  const snapshot = useSnapshot(formFiledState);
  const select = checkIsSelect(ident, snapshot.selected[category]);

  return (
    <div
      className={classname(
        'relative flex h-16 cursor-pointer flex-col border border-[#CCCCCC]  p-3',
        [
          select
            ? ['border-blue-600', 'border-2', 'bg-smoke']
            : ['border', 'p-px'],
        ]
      )}
      onClick={() => {
        actions.onSelect({ ...item } as MetricItem);
      }}
    >
      <div className="flex-1">
        <div>{ident}</div>
        <div className="text-xs text-[#585858]"></div>
      </div>
      <div className="absolute bottom-4 right-4">
        <input checked={select} type="checkbox" onChange={() => {}} />
      </div>
    </div>
  );
};
