import React from 'react';
import { FormItemLabel } from './styled';
import classnames from 'classnames';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { CustomRadio, Select, SelectOption, Input } from '@oss-compass/ui';

const FormMetric = () => {
  return (
    <div className="mb-6">
      <FormItemLabel>权重 & 阈值设置</FormItemLabel>
    </div>
  );
};

export default FormMetric;
