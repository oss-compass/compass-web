import React from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

const ApplyToken = () => {
  const { t } = useTranslation();
  const baseUrl = window.location.origin;
  const openUrl =
    baseUrl === 'https://oss-compass.org' ||
    baseUrl === 'https://compass.gitee.com'
      ? baseUrl
      : 'https://oss-compass.org';
  return (
    <div className="absolute right-6 ">
      <Button
        type="primary"
        onClick={() =>
          window.open(`${openUrl}/settings/profile#personalTokens`)
        }
      >
        {t('common:header.apply_api_key')}
      </Button>
    </div>
  );
};

export default ApplyToken;
