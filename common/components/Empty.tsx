import React from 'react';
import { useTranslation } from 'next-i18next';

const Empty: React.FC<{
  content?: String;
  type?: 'DropDownItem' | 'default';
}> = ({ type = 'default', content }) => {
  const { t } = useTranslation();

  if (type === 'DropDownItem') {
    return (
      <p className="block px-4 py-3 text-center text-sm text-gray-400">
        {content || t('common:search.no_result')}
      </p>
    );
  }

  return <div> {content || 'Empty'}</div>;
};

export default Empty;
