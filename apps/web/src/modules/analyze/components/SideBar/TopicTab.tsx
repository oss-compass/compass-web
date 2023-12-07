import React from 'react';
import { useTranslation } from 'next-i18next';
import MyTab from '@common/components/Tab';
import useQueryMetricType from '@modules/analyze/hooks/useQueryMetricType';
import useSwitchMetricType from '@modules/analyze/hooks/useSwitchMetricType';

const TopicTab = () => {
  const { t } = useTranslation();
  const topicType = useQueryMetricType();
  const { switchMetricType } = useSwitchMetricType();

  const tabOptions = [
    {
      label: t('analyze:collaboration'),
      value: 'collaboration',
      tabCls: 'min-w-[66px] text-center',
    },
    {
      label: t('analyze:contributor'),
      value: 'contributor',
      tabCls: 'min-w-[80px] text-center',
    },
    {
      label: t('analyze:software'),
      value: 'software',
      disable: true,
      tooltip: t('analyze:coming_soon'),
      tabCls: 'min-w-[60px] text-center',
    },
  ];

  return (
    <div>
      <div className="mb-3 flex w-full flex-col items-center  pl-2">
        <MyTab
          options={tabOptions}
          value={topicType}
          onChange={(v) => switchMetricType(v)}
        />
      </div>
    </div>
  );
};

export default TopicTab;
