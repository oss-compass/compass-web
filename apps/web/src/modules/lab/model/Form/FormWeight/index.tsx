import React from 'react';
import { useSnapshot } from 'valtio';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { formState, actions } from '../state';
import { FormItemLabel, MetricName, MetricThresholdRanges } from '../Misc';
import SliderRange from './SliderRange';
import { countDecimalPlaces } from '@common/utils/number';

const FormMetric = () => {
  const { t } = useTranslation();
  const snapshot = useSnapshot(formState);
  const headCell =
    'bg-smoke text-steel border-r border-silver pl-3 text-left text-sm font-normal h-7';
  const bodyCell = 'px-2 border-r border-silver';

  if (snapshot.metricSet.length <= 0) return null;

  const weightValues = snapshot.metricSet.map((i) => i.weight);

  return (
    <div className="mb-6">
      <FormItemLabel>{t('lab:weight_threshold_settings.label')}</FormItemLabel>
      <div>
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-silver border-t border-b">
              <th className={classnames(headCell, 'w-3/12')}>
                {t('lab:weight_threshold_settings.metrics')}
              </th>
              <th className={classnames(headCell, 'w-1/2')}>
                {t('lab:weight_threshold_settings.weight_percentage')}
              </th>
              <th className={classnames(headCell, 'w-3/12')}>
                {t('lab:weight_threshold_settings.threshold')}
              </th>
            </tr>
          </thead>
          <tbody>
            {snapshot.metricSet.map((item, index) => {
              return (
                <tr key={item.ident} className={'border-silver h-10 border-b'}>
                  <td className={classnames(bodyCell, 'w-3/12')}>
                    <MetricName ident={item.ident} category={item.category} />
                  </td>
                  <td className={classnames(bodyCell, 'w-1/2')}>
                    <div className="flex items-center">
                      <input
                        className="w-20 border px-1 outline-0"
                        type="number"
                        value={item.weight}
                        max={100}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (countDecimalPlaces(value) > 2) return;
                          if (isNaN(value) || value > 100 || value < 0) return;
                          actions.adjustMetricWeightHandle(value, index);
                        }}
                      />
                      <div className="flex-1 px-6">
                        <SliderRange
                          value={item.weight}
                          index={index}
                          values={weightValues}
                        />
                      </div>
                    </div>
                  </td>
                  <td className={classnames(bodyCell, ' w-3/12 ')}>
                    <div className="flex items-center">
                      <input
                        className="w-20 border outline-0"
                        type="number"
                        value={item.threshold}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (countDecimalPlaces(value) > 2) return;
                          actions.adjustThresholdHandle(value, index);
                        }}
                      />
                      <span className="text-steel ml-2 text-xs">
                        <MetricThresholdRanges
                          ident={item.ident}
                          category={item.category}
                        />
                      </span>
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

export default FormMetric;
