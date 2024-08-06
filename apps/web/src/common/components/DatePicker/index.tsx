import React, { useEffect, useState } from 'react';
import { DatePicker, ConfigProvider } from 'antd';
import getLocale from '@common/utils/getLocale';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import 'dayjs/locale/zh-cn';

const MyDatePicker = (props) => {
  const [local, setLocale] = useState(enUS);
  useEffect(() => {
    const l = getLocale();
    setLocale(l === 'zh' ? zhCN : enUS);
  }, []);
  return (
    <ConfigProvider locale={local}>
      <DatePicker {...props} />
    </ConfigProvider>
  );
};
export default MyDatePicker;
