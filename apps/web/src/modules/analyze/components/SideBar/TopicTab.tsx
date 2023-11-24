import React from 'react';
import { useTranslation } from 'next-i18next';
import MyTab from '@common/components/Tab';
import { useTopicType, setTopicType, TopicType } from '@modules/analyze/store';
import { useSnapshot } from 'valtio';

const TopicTab = () => {
  const { t } = useTranslation();
  const { topicType } = useSnapshot(useTopicType);
  const tabOptions = [
    {
      label: t('analyze:collaboration'),
      value: 'collaboration',
    },
    { label: t('analyze:contributor'), value: 'contributor' },
    { label: t('analyze:software'), value: 'software', disable: true },
  ];

  return (
    <div>
      <div className="mb-3 flex w-full flex-col items-center  pl-2">
        <MyTab
          options={tabOptions}
          value={topicType}
          onChange={(v) => setTopicType(v as TopicType)}
        />
      </div>
    </div>
  );
};

export default TopicTab;
