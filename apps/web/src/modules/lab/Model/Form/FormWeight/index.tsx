import React from 'react';
import { useSnapshot } from 'valtio';
import classnames from 'classnames';
import Slider from '@common/components/Slider';
import { formState } from '../state';
import { FormItemLabel } from '../styled';
import { sumPre, adjustmentArray } from './utils';

const adjustHandle = (result: number, index: number) => {
  const weights = formState.metricSet.map((i) => i.weight);
  const newWeights = adjustmentArray(weights, index, result);
  newWeights.forEach((newVal, index) => {
    formState.metricSet[index].weight = newVal;
  });
};

const SliderRange = ({
  index,
  value,
  values,
}: {
  index: number;
  value: number;
  values: number[];
}) => {
  const isFirst = index === 0;
  const isLast = index === values.length - 1;

  let range: number | number[] = [0, value];

  if (index > 0) {
    const preSum = sumPre(index, values);
    range = [preSum, preSum + value];

    // last item
    if (isLast) {
      range = preSum;
    }
  }

  if (isFirst) {
    range = value;
  }

  return (
    <Slider
      value={range}
      className={isLast ? 'inverted-slider' : ''}
      track={isLast ? 'inverted' : 'normal'}
      onChange={(e, value) => {
        if (Array.isArray(value)) {
          const result = value[1] - value[0];
          adjustHandle(result, index);
        } else {
          const result = isLast ? 100 - value : value;
          adjustHandle(result, index);
        }
      }}
    />
  );
};

const FormMetric = () => {
  const snapshot = useSnapshot(formState);
  const headCell =
    'bg-smoke text-steel border-r border-silver pl-3 text-left text-sm font-normal h-7';
  const bodyCell = 'px-2 border-r border-silver';

  if (snapshot.metricSet.length <= 0) return null;

  const weightValues = snapshot.metricSet.map((i) => i.weight);

  return (
    <div className="mb-6">
      <FormItemLabel>权重 & 阈值设置</FormItemLabel>
      <div>
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-silver border-t border-b">
              <th className={classnames(headCell, 'w-3/12')}>度量指标</th>
              <th className={classnames(headCell, 'w-1/2')}>权重百分比</th>
              <th className={classnames(headCell, 'w-3/12')}>阈值</th>
            </tr>
          </thead>
          <tbody>
            {snapshot.metricSet.map((item, index) => {
              return (
                <tr key={item.ident} className={'border-silver h-10 border-b'}>
                  <td className={classnames(bodyCell, 'w-3/12')}>
                    {item.ident}
                  </td>
                  <td className={classnames(bodyCell, 'w-1/2')}>
                    <div className="flex items-center">
                      <input
                        className="w-20 border outline-0"
                        type="number"
                        value={item.weight}
                        max={100}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (isNaN(value) || value > 100 || value < 0) return;
                          adjustHandle(value, index);
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
                  <td className={classnames(bodyCell, 'w-3/12')}>
                    <input
                      className="w-20 border outline-0"
                      type="number"
                      value={item.threshold}
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
