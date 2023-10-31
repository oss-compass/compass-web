import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import LinkA from '@common/components/LinkA';
import { CustomRadio, Select, SelectOption, Input } from '@oss-compass/ui';
import { FormItemLabel } from './Misc';
import Image from 'next/image';

const FormAlgorithm = () => {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });
  return (
    <div className="mb-6">
      <FormItemLabel>{t('lab:algorithm_selection.label')}</FormItemLabel>
      <div className="mb-3 flex flex-col">
        <div className="mb-2 flex w-80 items-center">
          <CustomRadio id="modal-public" {...controlProps('a')} />
          <label htmlFor={'modal-public'} className="ml-2">
            {t('lab:algorithm_selection.default')}
          </label>
        </div>
        <div className="text-secondary pl-8">
          <Trans
            i18nKey="algorithm_selection.default_desc"
            ns="lab"
            components={{
              s: (
                <LinkA
                  href={
                    'https://github.com/oss-compass/compass-metrics-model/blob/main/quantifying_criticality_algorithm.pdf'
                  }
                />
              ),
              b: <LinkA href={'https://en.wikipedia.org/wiki/Rob_Pike'} />,
              c: <LinkA href={'https://github.com/ossf/criticality_score'} />,
              d: (
                <LinkA
                  href={
                    'https://github.com/oss-compass/compass-metrics-model/blob/main/compass_common/algorithm_utils.py'
                  }
                />
              ),
              e: (
                <LinkA
                  href={
                    '/blog/2023/08/05/scoring-system-switch/scoring-system-switch/'
                  }
                />
              ),
            }}
          />
          <div className="flex items-center md:my-6 md:flex-col">
            <Image
              width={520}
              height={80}
              src={'/images/lab/algorithm.jpeg'}
              unoptimized
              alt={''}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
            <p className="ml-6 text-xl  italic text-black md:mt-4 md:ml-0 md:text-base">
              (
              <i className="font-medium">
                S<sub>𝑖 </sub>
              </i>
              : {t('lab:algorithm_selection.metrics_value')};{'   '}
              <i className="font-medium">
                T<sub>𝑖 </sub>
              </i>
              :{t('lab:algorithm_selection.metrics_threshold')};{'   '}
              <i className="font-medium">
                α<sub>𝑖 </sub>
              </i>
              :{t('lab:algorithm_selection.metrics_weight')};)
            </p>
          </div>
        </div>
      </div>

      {/*<div className="flex items-center">*/}
      {/*  <div className="flex w-40 items-center">*/}
      {/*    <CustomRadio*/}
      {/*      id="modal-private"*/}
      {/*      {...controlProps('b')}*/}
      {/*      color="secondary"*/}
      {/*    />*/}
      {/*    <label htmlFor="modal-private" className="ml-2">*/}
      {/*      AIAIAI算法*/}
      {/*    </label>*/}
      {/*  </div>*/}
      {/*  <div className=" text-secondary">算法介绍文案，设置度量指标的权重</div>*/}
      {/*</div>*/}

      <div className="border border-[#D6B76B] bg-[#FFF6D5] py-3 px-4">
        <Trans
          i18nKey="algorithm_selection.contact_us"
          ns="lab"
          components={{
            s: <LinkA href={'/docs/community/'} />,
          }}
        />
      </div>
    </div>
  );
};

export default FormAlgorithm;
