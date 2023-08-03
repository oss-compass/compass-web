import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import Center from '@common/components/Layout/Center';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import {
  CustomRadio,
  Select,
  SelectOption,
  Input,
  Button,
} from '@oss-compass/ui';
import FormIsPublic from './FormIsPublic';
import FormDomain from './FormDomain';
import FormTitle from './FormTitle';
import FormDataSet from './FormDataSet';
import FormMetric from './FormMetric';
import FormWeight from './FormWeight';
import FormAlgorithm from './FormAlgorithm';

const ModelForm = () => {
  const router = useRouter();

  return (
    <div className="py-12 text-sm">
      <Center className="md:px-4">
        <div className="mb-6 text-xl font-semibold">我的模型 / 新建模型</div>
        <FormTitle />
        <FormDomain />
        <FormIsPublic />
        <FormDataSet />
        <FormMetric />
        <FormWeight />
        <FormAlgorithm />
        <div className="flex items-center">
          <Button className="mr-6 w-28" size="md">
            Save
          </Button>
          <Button
            intent="text"
            onClick={() => {
              router.back();
            }}
          >
            Cancel
          </Button>
        </div>
      </Center>
    </div>
  );
};

export default ModelForm;
