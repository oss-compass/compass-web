import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useSnapshot } from 'valtio';
import { useMetricSetListQuery } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import groupBy from 'lodash/groupBy';
import { GrClose } from 'react-icons/gr';
import { useThrottle } from 'ahooks';
import { useTranslation } from 'react-i18next';
import { Button, Input, Modal } from '@oss-compass/ui';
import { percentRound } from '@common/utils/number';
import { formState } from '../../state';
import { formFiledState, actions, useSelectedCount } from '../state';
import { MetricItemsCard } from './MetricCard';
import CategoryMenu from './CategoryMenu';

const ModalSelect = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const formSnapshot = useSnapshot(formState);
  const fieldSnapshot = useSnapshot(formFiledState);

  const [search, setSearch] = useState('');
  const throttleSearch = useThrottle(search, { wait: 200 });

  useEffect(() => {
    if (open) {
      // reset filed
      formFiledState.selected = {};
      formState.metricSet.forEach((item) => {
        actions.onBackFill({
          defaultWeight: item.defaultWeight,
          defaultThreshold: item.threshold,
          metricId: item.metricId,
          ident: item.ident,
          threshold: item.threshold,
          weight: item.weight,
          category: item.category,
        });
      });
    }
  }, [formSnapshot.dataSet, open]);

  const { data, isLoading } = useMetricSetListQuery(
    gqlClient,
    {},
    { staleTime: 5 * 60 * 1000 }
  );

  const categoryMap = groupBy(data?.metricSetOverview, 'category');
  const categoryKeys = Object.keys(categoryMap);

  const handleSave = () => {
    const categoryKeys = Object.keys(formFiledState.selected);
    const result = categoryKeys.reduce((acc, category) => {
      const metrics = formFiledState.selected[category];
      const items = metrics.map((i) => ({ ...i }));
      return acc.concat(items);
    }, []);

    //  Equal division
    const weights = new Array(result.length).fill(1);
    const percentRoundWeights = percentRound(weights, 2);

    formState.metricSet = result.map((i, index) => {
      return { ...i, weight: percentRoundWeights[index] };
    });

    onClose();
  };

  const activeCategory = fieldSnapshot.activeCategory;
  const showListItem = useMemo(() => {
    return data?.metricSetOverview
      ?.filter((i) => {
        return i.category === activeCategory;
      })
      .map((i) => ({ ...i, metricId: i.id }));
  }, [data?.metricSetOverview, activeCategory]);

  const searchResult = useMemo(() => {
    return data?.metricSetOverview
      .map((i) => ({ ...i, metricId: i.id }))
      ?.filter((i) => {
        return i.ident.indexOf(throttleSearch) > -1;
      });
  }, [data?.metricSetOverview, throttleSearch]);

  const count = useSelectedCount();

  const content = () => {
    if (throttleSearch) {
      if (searchResult.length === 0) {
        return (
          <div className="text-secondary w-full text-center ">
            {t('common:no_data')}
          </div>
        );
      }

      return (
        <div className="thin-scrollbar flex-1 overflow-auto pl-4">
          <div className="grid grid-cols-1 gap-4 pr-2">
            {searchResult?.map((metric) => {
              return <MetricItemsCard key={metric.ident} item={metric} />;
            })}
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="thin-scrollbar overflow-auto">
          <div className="border-silver flex flex-col border-l border-r border-t ">
            {categoryKeys?.map((category) => {
              return <CategoryMenu key={category} category={category} />;
            })}
          </div>
        </div>
        <div className="thin-scrollbar flex-1 overflow-auto pl-4">
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
          ) : (
            <div className="grid grid-cols-1 gap-4 pr-2">
              {showListItem?.map((metric) => {
                return <MetricItemsCard key={metric.ident} item={metric} />;
              })}
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <Modal open={open} onClose={() => onClose()}>
      <div className="relative h-[700px] w-[900px] border-2 border-black bg-white shadow outline-0">
        <div
          className="absolute top-10 right-10 cursor-pointer p-2 "
          onClick={() => {
            onClose();
          }}
        >
          <GrClose />
        </div>

        <div className="px-10 pt-8">
          <div className="mb-3 text-2xl font-medium">{t('lab:add_metric')}</div>
          <div className="mb-4 text-sm">Selected {count} items</div>
          <Input
            value={search}
            placeholder="search..."
            className="mb-4 border-2"
            onChange={(v) => {
              setSearch(v);
            }}
          />

          <div className="flex h-[440px]">{content()}</div>

          <div className="border-silver absolute left-0 right-0 bottom-0 flex h-20 items-center justify-between border-t bg-white px-9">
            <div>
              找不到合适的数据集？点此通过社区
              <Link href={'/docs/community/'} prefetch={false}>
                <span className="text-primary mr-2">联系我们</span>
              </Link>
            </div>
            <div>
              <Button
                onClick={() => {
                  handleSave();
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSelect;
