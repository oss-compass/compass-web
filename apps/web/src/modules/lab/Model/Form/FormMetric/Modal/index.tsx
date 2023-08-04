import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSnapshot } from 'valtio';
import { useMetricSetListQuery } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import groupBy from 'lodash/groupBy';
import { GrClose } from 'react-icons/gr';
import { Button, Input, Modal } from '@oss-compass/ui';
import { formState } from '../../state';
import { formFiledState, actions } from '../state';
import { MetricItemsCard } from './MetricCard';
import CategoryMenu from './CategoryMenu';

const ModalSelect = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const formSnapshot = useSnapshot(formState);
  const fieldSnapshot = useSnapshot(formFiledState);

  useEffect(() => {
    if (open) {
      // reset filed
      formFiledState.selected = {};
      formState.metricSet.forEach((item) => {
        actions.onBackFill({
          id: item.id,
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
    formState.metricSet = categoryKeys.reduce((acc, category) => {
      const metrics = formFiledState.selected[category];
      const items = metrics.map((i) => ({ ...i }));
      return acc.concat(items);
    }, []);
    onClose();
  };

  const showListItem = data?.metricSetOverview?.filter((i) => {
    // eslint-disable-next-line valtio/state-snapshot-rule
    return i.category === fieldSnapshot.activeCategory;
  });

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
          <div className="mb-3 text-2xl font-medium">Add Dataset</div>
          <div className="mb-4 text-sm">Select up to 10 projects</div>
          <Input placeholder="search..." className="mb-4 border-2" />

          <div className="flex h-[440px]">
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
                <div className="grid grid-cols-1 gap-4">
                  {showListItem?.map((metric) => {
                    return (
                      <MetricItemsCard
                        key={metric.ident}
                        id={metric.id}
                        ident={metric.ident}
                        threshold={metric.threshold}
                        weight={metric.weight}
                        category={metric.category}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>

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
