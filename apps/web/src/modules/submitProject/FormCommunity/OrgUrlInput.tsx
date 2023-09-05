import React from 'react';
import { useTranslation } from 'react-i18next';
import Input from '@common/components/Input';

const OrgUrlInput = ({
  error,
  value,
  onChange,
}: {
  error?: boolean;
  value: string;
  onChange: (v: string) => void;
}) => {
  const { t } = useTranslation();
  return (
    <div>
      <Input
        value={value}
        className="w-full"
        placeholder={t('submit_project:type_address_of')}
        error={false}
        onChange={(e) => {
          const url = e.target.value;
          onChange(url);
        }}
        onBlur={() => {}}
      />
      {value && error ? (
        <p className="p-1 text-red-500">请输入合法 url</p>
      ) : null}
    </div>
  );
};

export default OrgUrlInput;
