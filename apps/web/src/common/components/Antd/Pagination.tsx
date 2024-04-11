import React, { useEffect, useState } from 'react';
import { Pagination, ConfigProvider } from 'antd';
import getLocale from '@common/utils/getLocale';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';

const MyTable = (props) => {
  const [local, setLocale] = useState(enUS);
  useEffect(() => {
    const l = getLocale();
    setLocale(l === 'zh' ? zhCN : enUS);
  }, []);
  return (
    <div>
      <ConfigProvider locale={local}>
        <Pagination {...props} />
      </ConfigProvider>
    </div>
  );
};
export default MyTable;
