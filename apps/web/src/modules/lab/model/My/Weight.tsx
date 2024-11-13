import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { MetricName } from '@modules/lab/model/Form/Misc';

const Weight = ({ metrics }) => {
  const { t } = useTranslation();
  const headCell = 'text-steel border-r pl-3 text-left text-sm font-bold h-7';
  const bodyCell = 'px-2 border';

  return (
    <div className="mb-2 mt-2">
      <div>
        <table className="w-full table-fixed">
          <thead>
            <tr className="border">
              <th className={classnames(headCell, 'w-1/2')}>
                {t('lab:weight_threshold_settings.metrics')}
              </th>
              <th className={classnames(headCell, 'w-1/4')}>
                {t('lab:weight_threshold_settings.weight_percentage')}
              </th>
              <th className={classnames(headCell, 'w-1/4')}>
                {t('lab:weight_threshold_settings.threshold')}
              </th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((item, index) => {
              return (
                <tr
                  key={item.ident}
                  className={'border-silver h-7 border-b border-l'}
                >
                  <td className={classnames(bodyCell, 'w-1/2')}>
                    <div className="line-clamp-1 pl-1">
                      <MetricName ident={item.ident} category={item.category} />
                    </div>
                  </td>
                  <td className={classnames(bodyCell, 'w-1/4')}>
                    <div className="flex items-center pl-1">{item.weight}</div>
                  </td>
                  <td className={classnames(bodyCell, 'w-1/4')}>
                    <div className="flex items-center pl-1">
                      {item.threshold}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Weight;
