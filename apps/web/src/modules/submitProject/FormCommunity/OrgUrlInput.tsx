import React from 'react';
import { useTranslation } from 'react-i18next';
import Input from '@common/components/Input';
import { useSubmitUser } from '@modules/auth';

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
  const { submitUser: user } = useSubmitUser();
  const provider = user?.provider || 'github';
  const providerName =
    provider === 'github'
      ? t('common:community.github')
      : t('common:community.gitee');
  return (
    <div>
      <Input
        value={value}
        className="w-full"
        placeholder={
          t('submit_project:type_address_of', {
            providerName: providerName,
          }) as string
        }
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
