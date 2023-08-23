import React, { PropsWithChildren } from 'react';
import classname from 'classnames';
import { useSnapshot } from 'valtio';
import { MetricSetListQuery } from '@oss-compass/graphql';
import Chaoss from '@common/components/PoweredBy/Chaoss';
import { formFiledState, actions, MetricItem, FormFiledState } from '../state';
import { MetricName, MetricDesc } from '../../Misc';

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

export const MetricItemsCard = ({
  item,
}: {
  item: MetricSetListQuery['metricSetOverview'][number];
}) => {
  const { ident, category } = item;
  const snapshot = useSnapshot(formFiledState);
  const select = checkIsSelect(ident, snapshot.selected[category]);

  return (
    <div
      className={classname(
        'min-h-16 flex cursor-pointer items-center justify-between border border-[#CCCCCC]  p-3',
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
        <div className="flex items-center ">
          <span className="text-sm font-medium">
            <MetricName ident={ident} category={category} />
          </span>
          {item.from ? <Chaoss /> : ''}
        </div>
        <div className="text-xs text-[#585858]">
          <MetricDesc ident={ident} category={category} />
        </div>
      </div>
      <div className="pl-5">
        <input checked={select} type="checkbox" onChange={() => {}} />
      </div>
    </div>
  );
};
