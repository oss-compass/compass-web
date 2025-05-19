import React from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

const ApplyToken = () => {
  const { t } = useTranslation();

  return (
    <div className="absolute right-6 ">
      <Button
        type="primary"
        onClick={() =>
          window.open(`https://oss-compass.org/settings/profile#personalTokens`)
        }
      >
        {t('common:header.apply_api_key')}
      </Button>
    </div>
  );
};

export default ApplyToken;
