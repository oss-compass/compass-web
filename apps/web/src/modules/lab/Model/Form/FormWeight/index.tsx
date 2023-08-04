import React from 'react';
import { useSnapshot } from 'valtio';
import classnames from 'classnames';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { CustomRadio, Select, SelectOption, Input } from '@oss-compass/ui';
import { formState } from '../state';
import { FormItemLabel } from '../styled';

const FormMetric = () => {
  const snapshot = useSnapshot(formState);
  const headCell =
    'bg-smoke text-steel border-r pl-3 text-left text-sm font-normal h-7';
  const bodyCell = 'px-2 border-r border-silver';

  if (snapshot.metricSet.length <= 0) return null;

  return (
    <div className="mb-6">
      <FormItemLabel>权重 & 阈值设置</FormItemLabel>
      <div>
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-silver border-t border-b">
              <th className={classnames(headCell)}>度量指标</th>
              <th className={classnames(headCell)}>权重百分比</th>
              <th className={classnames(headCell)}>阈值</th>
            </tr>
          </thead>
          <tbody>
            {snapshot.metricSet.map((item) => {
              return (
                <tr key={item.ident} className={'border-silver h-10 border-b'}>
                  <td className={classnames(bodyCell)}>{item.ident}</td>
                  <td className={classnames(bodyCell)}>
                    <input
                      className="w-20 border outline-0"
                      type="number"
                      value={item.threshold}
                      onChange={(e) => {}}
                    />
                  </td>
                  <td className={classnames(bodyCell)}>
                    <input
                      className="w-20 border outline-0"
                      type="number"
                      value={item.weight}
                      onChange={(e) => {}}
                    />
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
