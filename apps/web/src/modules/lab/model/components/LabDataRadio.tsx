import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Radio } from 'antd';
import { useRouter } from 'next/router';

const LabDataRadio = ({ defaultValue }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const radioOptions = [
    { label: t('lab:my_models'), value: 'myModels' },
    { label: '我的模型报告', value: 'myReports' },
    // { label: '我的数据集', value: '3' },
  ];
  const routeMap = {
    myModels: '/lab/model/my',
    myReports: '/lab/report/my',
  };

  const onChange = useCallback(
    ({ target }) => {
      const { value } = target;
      if (value !== defaultValue && routeMap[value]) {
        router.push(routeMap[value]);
      }
    },
    [defaultValue, router, routeMap]
  );
  return (
    <Radio.Group
      options={radioOptions}
      onChange={onChange}
      value={defaultValue}
      optionType="button"
      //   buttonStyle="solid"
    />
  );
};

export default LabDataRadio;
