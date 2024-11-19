import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import classname from 'classnames';
import { useSnapshot } from 'valtio';
import { MetricSetListQuery } from '@oss-compass/graphql';
import Chaoss from '@common/components/PoweredBy/Chaoss';
import { formFiledState, actions, MetricItem, FormFiledState } from '../state';
import { MetricName, MetricDesc } from '../../Misc';
import { Popover } from 'antd';

const isYearCheck = (ident) => {
  return ident.includes('_year');
};
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
const hasYear = (
  ident: string,
  list: Readonly<Record<string, MetricItem[]>> | {}
): boolean => {
  const arr = Object.values(list).flat();
  if (arr.length > 0) {
    const hasYear = arr.some((i) => isYearCheck(i.ident));
    const isYear = isYearCheck(ident);
    return hasYear !== isYear;
  }
  return false;
};
export const MetricItemsCard = ({
  item,
}: {
  item: MetricSetListQuery['metricSetOverview'][number];
}) => {
  const { t } = useTranslation();
  const { ident, category } = item;
  const snapshot = useSnapshot(formFiledState);
  const select = checkIsSelect(ident, snapshot.selected[category]);
  const hasDisable = hasYear(ident, snapshot.selected);
  return (
    <Popover content={hasDisable ? t('lab:cannot_select_both') : ''}>
      <div
        className={classname(
          'min-h-16 flex items-center justify-between border border-[#CCCCCC]  p-3',
          [
            select
              ? ['border-blue-600', 'border-2', 'bg-smoke']
              : ['border', 'p-px'],
            hasDisable ? ['cursor-not-allowed'] : ['cursor-pointer'],
          ]
        )}
        onClick={() => {
          !hasDisable && actions.onSelect({ ...item } as MetricItem);
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
    </Popover>
  );
};
