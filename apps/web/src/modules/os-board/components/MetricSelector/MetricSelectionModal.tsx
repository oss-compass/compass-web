import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { GrClose } from 'react-icons/gr';
import { Button, Input, Modal } from '@oss-compass/ui';
import { useMetricSetListQuery } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import groupBy from 'lodash/groupBy';
import { useThrottle } from 'ahooks';
import classnames from 'classnames';
import LinkA from '@common/components/LinkA';

interface MetricSelectionModalProps {
  open: boolean;
  onClose: () => void;
  selectedIds: string[];
  onConfirm: (metricIds: string[]) => void;
}

// 临时状态管理
let tempSelectedIds: string[] = [];
let activeCategory: string = '';

const MetricSelectionModal: React.FC<MetricSelectionModalProps> = ({
  open,
  onClose,
  selectedIds,
  onConfirm,
}) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const throttleSearch = useThrottle(search, { wait: 200 });
  const [currentCategory, setCurrentCategory] = useState('');
  const [tempSelected, setTempSelected] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setTempSelected(selectedIds);
      tempSelectedIds = [...selectedIds];
      setSearch('');
    }
  }, [open, selectedIds]);

  const { data, isLoading } = useMetricSetListQuery(
    gqlClient,
    {},
    { staleTime: 5 * 60 * 1000 }
  );

  const categoryMap = groupBy(data?.metricSetOverview, 'category');
  const categoryKeys = Object.keys(categoryMap);

  // 设置默认分类
  useEffect(() => {
    if (open && categoryKeys.length > 0 && !currentCategory) {
      setCurrentCategory(categoryKeys[0]);
      activeCategory = categoryKeys[0];
    }
  }, [open, categoryKeys, currentCategory]);

  const showListItem = useMemo(() => {
    return data?.metricSetOverview
      ?.filter((i) => i.category === currentCategory)
      .map((i) => ({ ...i, metricId: i.id }));
  }, [data?.metricSetOverview, currentCategory]);

  const searchResult = useMemo(() => {
    return data?.metricSetOverview
      .map((i) => ({ ...i, metricId: i.id }))
      ?.filter((i) => {
        return i.ident.indexOf(throttleSearch) > -1;
      });
  }, [data?.metricSetOverview, throttleSearch]);

  const toggleMetric = (metricIdent: string) => {
    const idStr = metricIdent;
    setTempSelected((prev) =>
      prev.includes(idStr)
        ? prev.filter((id) => id !== idStr)
        : [...prev, idStr]
    );
  };

  const handleSave = () => {
    onConfirm(tempSelected);
    onClose();
  };

  const count = tempSelected.length;

  const renderCategoryMenu = () => {
    return (
      <div className="thin-scrollbar overflow-auto">
        <div className="border-silver flex flex-col border-l border-r border-t">
          {categoryKeys?.map((category) => {
            const categoryCount = tempSelected.filter((ident) => {
              const metric = data?.metricSetOverview?.find(
                (m) => m.ident === ident
              );
              return metric?.category === category;
            }).length;

            return (
              <div
                key={category}
                className="w-60 md:w-auto"
                onClick={() => {
                  setCurrentCategory(category);
                  activeCategory = category;
                }}
              >
                <div
                  className={classnames(
                    'border-silver flex h-10 cursor-pointer items-center justify-between border-b pl-4 pr-4 font-medium',
                    [currentCategory === category ? 'bg-smoke' : '']
                  )}
                >
                  <div>{t(`lab_metrics:${category}.title`)}</div>
                  {categoryCount > 0 && (
                    <span className="bg-primary h-4 min-w-[16px] shrink-0 text-center text-xs leading-4 text-white">
                      {categoryCount}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMetricCard = (metric: any) => {
    const { ident, category } = metric;
    const isSelected = tempSelected.includes(ident);

    return (
      <div
        key={ident}
        className={classnames(
          'flex min-h-16 items-center justify-between border border-[#CCCCCC]',
          [
            isSelected
              ? ['border-blue-600', 'border-2', 'bg-smoke', 'p-[11px]']
              : ['border', 'p-3'],
            'cursor-pointer',
          ]
        )}
        onClick={() => toggleMetric(ident)}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center">
            <span className="text-sm font-medium">
              {t(`lab_metrics:${category}.${ident}`)}
            </span>
          </div>
          <div className="mt-1 truncate text-xs text-[#585858]">
            {t(`lab_metrics:${category}.${ident}_desc`)}
          </div>
        </div>
        <div className="pl-5">
          <input checked={isSelected} type="checkbox" onChange={() => {}} />
        </div>
      </div>
    );
  };

  const content = () => {
    if (throttleSearch) {
      if (!searchResult || searchResult.length === 0) {
        return (
          <div className="text-secondary w-full text-center">
            {t('common:no_data')}
          </div>
        );
      }

      return (
        <div className="thin-scrollbar flex-1 overflow-auto pl-4">
          <div className="grid grid-cols-1 gap-4 pr-2">
            {searchResult?.map((metric) => renderMetricCard(metric))}
          </div>
        </div>
      );
    }

    return (
      <>
        {renderCategoryMenu()}
        <div className="thin-scrollbar flex-1 overflow-auto pl-4">
          {isLoading ? (
            <div className="animate-pulse p-4">
              <div className="flex-1 space-y-4">
                <div className="h-4 bg-slate-200"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-4 bg-slate-200"></div>
                  <div className="col-span-1 h-4 bg-slate-200"></div>
                </div>
                <div className="h-4 bg-slate-200"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 h-4 bg-slate-200"></div>
                  <div className="col-span-2 h-4 bg-slate-200"></div>
                </div>
                <div className="h-4 bg-slate-200"></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 pr-2">
              {showListItem?.map((metric) => renderMetricCard(metric))}
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="relative h-[700px] w-[900px] border-2 border-black bg-white shadow outline-0">
        <div
          className="absolute right-10 top-10 cursor-pointer p-2"
          onClick={onClose}
        >
          <GrClose />
        </div>

        <div className="px-10 pt-8 md:px-2">
          <div className="mb-3 text-2xl font-medium">{t('lab:add_metric')}</div>
          <div className="mb-4 text-sm">已选择指标（{count}）</div>
          <Input
            value={search}
            placeholder={t('lab:search_metric_placeholder')}
            className="mb-4 border-2"
            onChange={(v) => setSearch(v)}
          />

          <div className="flex h-[440px]">{content()}</div>

          <div className="border-silver absolute bottom-0 left-0 right-0 flex h-20 items-center justify-between border-t bg-white px-9 text-sm">
            <div>
              {t('lab:cant_find_a_suitable_metric')}
              <Trans
                i18nKey={'contact_us' as any}
                ns="common"
                components={{
                  s: <LinkA href={'/docs/community/'} />,
                }}
              />
            </div>
            <div>
              <Button
                disabled={count > 10}
                className="min-w-[100px]"
                onClick={handleSave}
              >
                {count > 10
                  ? t('lab:select_over_tips')
                  : t('common:btn.confirm')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MetricSelectionModal;
