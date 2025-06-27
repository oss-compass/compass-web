import React from 'react';
import { useTranslation } from 'next-i18next';
import classnames from 'classnames';
// import LabelItems from './LabelItems';
import useMetrics from '@modules/os-situation/hooks/useMetrics';
import { Select } from 'antd';

const NavBar = ({ defaultValue }) => {
  const { t } = useTranslation();
  const merticsList = useMetrics();
  const handleChange = (value: string, option) => {
    window.location.href = '/os-situation/metrics' + option.url;
  };
  return (
    <nav
      className={classnames(
        'flex h-14 items-center justify-between border-b border-t bg-white px-6',
        'md:h-12 md:px-4'
      )}
    >
      <div className="flex items-center">
        <div className="mr-1 text-base font-semibold">
          {t('os-situation:dimensionLabel')}{' '}
        </div>
        <Select
          defaultValue={defaultValue}
          style={{ width: 350, backgroundColor: '#e6f4ff', color: 'blue' }}
          onChange={handleChange}
          options={merticsList.map((item) => {
            return { label: item.title, value: item.name, ...item };
          })}
        />
      </div>
    </nav>
  );
};

export default NavBar;
