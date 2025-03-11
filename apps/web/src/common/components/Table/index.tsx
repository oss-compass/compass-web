import React, { useEffect, useState, useRef } from 'react';
import { Table, ConfigProvider } from 'antd';
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
    <ConfigProvider locale={local}>
      <Table {...props} />
    </ConfigProvider>
  );
};
export default React.memo(MyTable);
