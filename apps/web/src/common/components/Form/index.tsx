import React, { useEffect, useState } from 'react';
import { DatePicker, ConfigProvider } from 'antd';
import getLocale from '@common/utils/getLocale';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import dayjs from 'dayjs';

const MyDatePicker = (props) => {
  const [local, setLocale] = useState(enUS);
  useEffect(() => {
    const l = getLocale();
    setLocale(l === 'zh' ? zhCN : enUS);
  }, []);
  // dayjs.locale(zhCN);
  // dayjs.locale(enUS);
  return (
    <div>
      <ConfigProvider locale={local}>
        <DatePicker format={'YYYY-MM-DD'} {...props} />
      </ConfigProvider>
    </div>
  );
};
export default MyDatePicker;
