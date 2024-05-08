import React, { useState } from 'react';
import { Select } from 'antd';
import { useTranslation } from 'next-i18next';

const DetailHeaderFilter: React.FC<{
  type: string;
  isBot?: boolean;
  onBotChange?: (v) => void;
}> = ({ type, isBot, onBotChange }) => {
  const { t } = useTranslation();

  const isBotOptions = [
    {
      label: t('analyze:metric_detail:include_robot'),
      value: true,
    },
    {
      label: t('analyze:metric_detail:exclude_robot'),
      value: false,
    },
  ];
  if (type == 'issue') {
    return (
      <>
        <div className="mb-1 text-lg font-semibold text-[#000000]">
          {t('analyze:metric_detail:issues')}
        </div>
      </>
    );
  } else if (type == 'pr') {
    return (
      <>
        <div className="mb-1 text-lg font-semibold text-[#000000]">
          {t('analyze:metric_detail:pull_requests')}
        </div>
      </>
    );
  }
  return (
    <>
      <Select
        style={{ width: 120 }}
        onChange={(v) => {
          onBotChange(v);
          //   handleQueryParams({ tab: v });
        }}
        value={isBot}
        options={isBotOptions}
      />
    </>
  );
};

export default DetailHeaderFilter;
