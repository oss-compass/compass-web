import React from 'react';
import { FormItemLabel } from './styled';
import classnames from 'classnames';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { CustomRadio, Select, SelectOption, Input } from '@oss-compass/ui';
import { ItemCard, ItemCardPlus } from './styled';

const FormDataSet = () => {
  return (
    <div className="mb-6">
      <FormItemLabel>选择数据集</FormItemLabel>
      <div className="grid grid-cols-4 gap-4 md:grid-cols-2">
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCardPlus />
      </div>
    </div>
  );
};

export default FormDataSet;
