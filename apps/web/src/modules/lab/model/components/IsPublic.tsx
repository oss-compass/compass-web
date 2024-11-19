import React from 'react';
import { useTranslation } from 'react-i18next';
import { Popover } from 'antd';
import { useRouter } from 'next/router';

const IsPublic = ({ model }: { model: any }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const permissions = model?.permissions;

  return (
    <Popover content={permissions.canUpdate ? t('lab:click_to_modify') : ''}>
      <div
        className="curse flex cursor-pointer items-center"
        onClick={() => {
          permissions.canUpdate && router.push(`/lab/model/${model.id}/edit`);
        }}
      >
        {model.isPublic ? (
          <span className="ml-2 rounded-2xl bg-[#cdf0ce] px-2 py-0.5  text-xs text-[#00B400]">
            {t('lab:is_public')}
          </span>
        ) : (
          <span className="ml-2 rounded-2xl bg-[#e5e5e5] px-2  py-0.5 text-xs text-[#616161]">
            {t('lab:is_public_options.non_public')}
          </span>
        )}
      </div>
    </Popover>
  );
};

export default IsPublic;
